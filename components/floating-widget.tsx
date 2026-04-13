'use client'

import { useState, useEffect } from 'react'
import { X, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

export function FloatingWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const socialPlatforms = [
    { name: 'Twitter', icon: Twitter, color: 'hover:bg-blue-500' },
    { name: 'Facebook', icon: Facebook, color: 'hover:bg-blue-600' },
    { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-700' },
    { name: 'Email', icon: Mail, color: 'hover:bg-orange-500' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-24 right-0 mb-2 space-y-2 animate-in fade-in duration-200">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.name}
                title={`Share to ${platform.name}`}
                className={`flex items-center gap-3 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-medium transition-all duration-200 ${platform.color} group hover:border-slate-600`}
                onClick={() => {
                  console.log(`[v0] Sharing to ${platform.name}`)
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{platform.name}</span>
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110"
        title={isOpen ? 'Close' : 'Share'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
      </button>
    </div>
  )
}
