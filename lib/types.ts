export interface DetectionResult {
  id: string
  userId: string
  content: string
  isAI: boolean
  confidence: number
  detectedTool?: string
  estimatedPrompt?: string
  purpose?: string
  indicators: Indicator[]
  createdAt: string
}

export interface Indicator {
  name: string
  confidence: number
  description: string
  color: 'success' | 'warning' | 'destructive'
}

export interface SearchResult {
  id: string
  userId: string
  query: string
  results: SearchItem[]
  createdAt: string
}

export interface SearchItem {
  id: string
  title: string
  url: string
  description: string
  source: 'article' | 'video' | 'research' | 'news'
  relevance: number
  accuracy: number
}

export interface AnalyticsData {
  userId: string
  detectionCount: number
  searchCount: number
  averageConfidence: number
  averageAccuracy: number
  trends: TrendData[]
  topTools: ToolStats[]
  topQueries: QueryStats[]
}

export interface TrendData {
  date: string
  detections: number
  searches: number
}

export interface ToolStats {
  tool: string
  count: number
  percentage: number
}

export interface QueryStats {
  query: string
  count: number
  accuracy: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
