import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Server-side client with service role
export function getSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

export interface DetectionResult {
  id: string
  user_id: string
  content: string
  confidence_score: number
  detection_type: string
  is_ai_generated: boolean
  analysis: Record<string, any>
  created_at: string
}

export interface SearchResult {
  id: string
  user_id: string
  query: string
  results: Record<string, any>
  accuracy_score: number
  source: string
  created_at: string
}

export interface AnalyticsData {
  id: string
  user_id: string
  detection_count: number
  average_confidence: number
  search_count: number
  average_accuracy: number
  date: string
}
