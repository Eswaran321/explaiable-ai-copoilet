'use client'

import { useState } from 'react'
import { Send, Loader2, AlertCircle, Copy, Trash2, Zap } from 'lucide-react'
import { DetectionResults } from './detection-results'

interface DetectionPanelProps {
  userId: string
}

export function DetectionPanel({ userId }: DetectionPanelProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setContent(value)
    setCharCount(value.length)
  }

  const handleDetect = async () => {
    if (!content.trim()) {
      setError('Please enter some content to analyze')
      return
    }

    if (content.length > 50000) {
      setError('Content exceeds maximum length of 50,000 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, userId }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Detection failed')
        return
      }

      setResult(data.data || data.result)
      setContent('')
      setCharCount(0)
    } catch (err) {
      setError('An error occurred during detection')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
  }

  const handleClear = () => {
    setContent('')
    setCharCount(0)
    setError('')
  }

  const maxLength = 50000

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Input Card */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-accent rounded-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">AI Content Detection</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Analyze content to detect AI-generation with confidence scoring
              </p>
            </div>
          </div>
        </div>

        {/* Textarea Container */}
        <div className="relative">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Paste your content here for AI detection analysis..."
            className="w-full h-48 bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none transition-all duration-200 font-mono text-sm leading-relaxed"
            disabled={loading}
          />

          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {charCount.toLocaleString()} / {maxLength.toLocaleString()}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-slide-in">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <button
            onClick={handleDetect}
            disabled={loading || !content.trim()}
            className="flex items-center gap-2 px-6 py-2.5 gradient-accent text-primary-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analyze</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            disabled={!content}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface-light border border-border rounded-lg text-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Copy</span>
          </button>

          <button
            onClick={handleClear}
            disabled={!content}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface-light border border-border rounded-lg text-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear content"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Clear</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {result && <DetectionResults result={result} />}
    </div>
  )
}
