'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Loader2 } from 'lucide-react'

interface AnalyticsDashboardProps {
  userId: string
}

export function AnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  const [stats, setStats] = useState<any>(null)
  const [trendData, setTrendData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics?userId=${userId}`)
        const data = await response.json()
        setStats(data.stats)
        setTrendData(data.trendData)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Detections"
          value={stats?.totalDetections || 0}
          subtext="analyses performed"
          color="cyan"
        />
        <StatCard
          title="Avg Confidence"
          value={`${stats?.avgConfidence || 0}%`}
          subtext="detection accuracy"
          color="blue"
        />
        <StatCard
          title="Total Searches"
          value={stats?.totalSearches || 0}
          subtext="search queries"
          color="violet"
        />
        <StatCard
          title="Avg Accuracy"
          value={`${stats?.avgAccuracy || 0}%`}
          subtext="search relevance"
          color="green"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4">Activity Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="detections" stroke="#06b6d4" name="Detections" strokeWidth={2} />
              <Line type="monotone" dataKey="searches" stroke="#3b82f6" name="Searches" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Chart */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4">Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: 'Detections', value: stats?.totalDetections || 0 }, { name: 'Searches', value: stats?.totalSearches || 0 }]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white mb-3">Insights</h3>
        <ul className="space-y-2">
          <li className="text-sm text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            You&apos;ve analyzed <span className="text-cyan-400 font-semibold">{stats?.totalDetections || 0}</span> pieces of content with <span className="text-cyan-400 font-semibold">{stats?.avgConfidence || 0}%</span> average confidence
          </li>
          <li className="text-sm text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            Your search accuracy average is <span className="text-blue-400 font-semibold">{stats?.avgAccuracy || 0}%</span> across <span className="text-blue-400 font-semibold">{stats?.totalSearches || 0}</span> queries
          </li>
          <li className="text-sm text-slate-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            Keep using the platform to improve AI detection accuracy over time
          </li>
        </ul>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  subtext: string
  color: 'cyan' | 'blue' | 'violet' | 'green'
}

function StatCard({ title, value, subtext, color }: StatCardProps) {
  const colors = {
    cyan: 'from-cyan-500/20 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/20 border-blue-500/30 text-blue-400',
    violet: 'from-violet-500/20 border-violet-500/30 text-violet-400',
    green: 'from-green-500/20 border-green-500/30 text-green-400',
  }

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-4 backdrop-blur-sm`}>
      <p className="text-sm text-slate-400 mb-2">{title}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-400">{subtext}</p>
    </div>
  )
}
