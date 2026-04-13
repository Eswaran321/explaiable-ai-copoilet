'use client'

import { ExternalLink, TrendingUp } from 'lucide-react'

interface SearchResultsProps {
  results: any[]
  accuracy: number
  query: string
}

export function SearchResults({ results, accuracy, query }: SearchResultsProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Search Results for &quot;{query}&quot;</h3>
          <p className="text-sm text-slate-400 mt-1">
            Accuracy: <span className="text-cyan-400 font-semibold">{accuracy}%</span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300">{results.length} Results</span>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-4 transition-all duration-200 hover:bg-slate-900"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-white font-semibold hover:text-cyan-400 transition-colors">
                  {result.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{result.url || 'Web Result'}</p>
              </div>
              <a
                href={`https://${result.url || 'example.com'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 ml-2 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </a>
            </div>

            <p className="text-sm text-slate-300 mb-3">{result.snippet}</p>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    style={{ width: `${result.relevance_score || 0}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-semibold text-cyan-400">{result.relevance_score || 0}%</span>
            </div>

            {result.source_type && (
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
                  {result.source_type}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
