'use client'

import { AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react'

interface DetectionResultsProps {
  result: any
}

export function DetectionResults({ result }: DetectionResultsProps) {
  const confidence = result.confidence_score || 0
  const isAI = confidence > 60

  const getColor = (score: number) => {
    if (score < 30) return 'text-green-400'
    if (score < 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getBgColor = (score: number) => {
    if (score < 30) return 'bg-green-500/10 border-green-500/30'
    if (score < 60) return 'bg-yellow-500/10 border-yellow-500/30'
    return 'bg-red-500/10 border-red-500/30'
  }

  return (
    <div className={`border rounded-xl p-6 backdrop-blur-sm ${getBgColor(confidence)} border`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {isAI ? (
            <AlertTriangle className={`w-8 h-8 ${getColor(confidence)}`} />
          ) : (
            <CheckCircle className={`w-8 h-8 ${getColor(confidence)}`} />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">
            {isAI ? 'AI-Generated Content Detected' : 'Human-Written Content'}
          </h3>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Confidence Score</span>
              <span className={`text-2xl font-bold ${getColor(confidence)}`}>{confidence}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  confidence < 30
                    ? 'bg-green-500'
                    : confidence < 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Detection Type</p>
              <p className="text-white font-semibold text-sm">{result.detection_type || 'Unknown'}</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Status</p>
              <p className="text-white font-semibold text-sm">
                {result.is_ai_generated ? 'AI Generated' : 'Human Written'}
              </p>
            </div>
          </div>

          {result.analysis?.indicators && result.analysis.indicators.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Key Indicators
              </p>
              <ul className="space-y-1">
                {result.analysis.indicators.map((indicator: string, i: number) => (
                  <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.analysis?.explanation && (
            <div className="mt-4 p-3 bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-400 mb-1">Analysis</p>
              <p className="text-sm text-slate-200">{result.analysis.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
