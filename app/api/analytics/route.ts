import { getSupabaseServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServerClient()

    // Get detection statistics
    const { data: detections } = await supabase
      .from('detection_results')
      .select('confidence_score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    // Get search statistics
    const { data: searches } = await supabase
      .from('search_results')
      .select('accuracy_score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    // Calculate statistics
    const totalDetections = detections?.length || 0
    const avgConfidence =
      totalDetections > 0
        ? detections!.reduce((sum, d) => sum + d.confidence_score, 0) / totalDetections
        : 0

    const totalSearches = searches?.length || 0
    const avgAccuracy =
      totalSearches > 0
        ? searches!.reduce((sum, s) => sum + s.accuracy_score, 0) / totalSearches
        : 0

    // Generate trend data (last 7 days)
    const now = new Date()
    const trendData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]

      const dayDetections = detections?.filter(
        (d) => d.created_at.startsWith(dateStr)
      ).length || 0

      const daySearches = searches?.filter(
        (s) => s.created_at.startsWith(dateStr)
      ).length || 0

      trendData.push({
        date: dateStr,
        detections: dayDetections,
        searches: daySearches,
      })
    }

    return NextResponse.json({
      stats: {
        totalDetections,
        avgConfidence: Math.round(avgConfidence),
        totalSearches,
        avgAccuracy: Math.round(avgAccuracy),
      },
      trendData,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
