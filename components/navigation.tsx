'use client'

import { Search, TrendingUp, Zap } from 'lucide-react'

interface NavigationProps {
  activeTab: 'detect' | 'search' | 'analytics'
  setActiveTab: (tab: 'detect' | 'search' | 'analytics') => void
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'detect', label: 'AI Detection', icon: Zap },
    { id: 'search', label: 'Advanced Search', icon: Search },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ]

  return (
    <div className="flex gap-2 border-b border-slate-700 pb-4">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
