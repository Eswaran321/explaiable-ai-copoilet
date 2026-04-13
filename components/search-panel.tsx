'use client'

import { useState } from 'react'
import { Search, Loader2, AlertCircle } from 'lucide-react'
import { SearchResults } from './search-results'

interface SearchPanelProps {
  userId: string
}

export function SearchPanel({ userId }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [accuracy, setAccuracy] = useState(0)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, userId }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Search failed')
        return
      }

      setResults(data.results || [])
      setAccuracy(data.accuracy || 0)
    } catch (err) {
      setError('An error occurred during search')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white mb-4">Advanced Search Engine</h2>
        <p className="text-slate-400 text-sm mb-4">
          Search with AI-powered ranking and accuracy scoring to find the most relevant results
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for anything..."
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            disabled={loading}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      {results.length > 0 && <SearchResults results={results} accuracy={accuracy} query={query} />}
    </div>
  )
}
