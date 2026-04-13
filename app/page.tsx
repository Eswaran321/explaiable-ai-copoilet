'use client'

import { useEffect, useState } from 'react'
import { DetectionPanel } from '@/components/detection-panel'
import { SearchPanel } from '@/components/search-panel'
import { AnalyticsDashboard } from '@/components/analytics-dashboard'
import { Header } from '@/components/header'
import { Navigation } from '@/components/navigation'
import { FloatingWidget } from '@/components/floating-widget'

export default function Home() {
  const [userId, setUserId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'detect' | 'search' | 'analytics'>('detect')

  useEffect(() => {
    // Generate or retrieve user ID from localStorage
    let id = localStorage.getItem('userId')
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('userId', id)
    }
    setUserId(id)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8 space-y-6">
          {activeTab === 'detect' && userId && <DetectionPanel userId={userId} />}
          {activeTab === 'search' && userId && <SearchPanel userId={userId} />}
          {activeTab === 'analytics' && userId && <AnalyticsDashboard userId={userId} />}
        </div>
      </div>

      <FloatingWidget />
    </main>
  )
}
