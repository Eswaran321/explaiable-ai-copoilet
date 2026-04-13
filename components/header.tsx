'use client'

import { Zap, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = () => {
    setIsResetting(true)
    localStorage.removeItem('userId')
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  return (
    <header className="glass sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and branding */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden">
            <div className="absolute inset-0 gradient-accent opacity-80"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white drop-shadow-lg" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              AI Analyzer Pro
            </h1>
            <p className="text-xs text-muted-foreground">Advanced Content Detection</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-surface-light rounded-lg transition-colors duration-200"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>

          <button
            onClick={handleReset}
            disabled={isResetting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
              isResetting
                ? 'bg-muted text-muted-foreground opacity-50'
                : 'bg-muted hover:bg-surface-light text-foreground hover:text-accent'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{isResetting ? 'Resetting...' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Subtle gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
    </header>
  )
}
