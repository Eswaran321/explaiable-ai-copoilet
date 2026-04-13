export const AI_TOOLS = [
  'ChatGPT',
  'GPT-4',
  'Gemini',
  'Claude',
  'Copilot',
  'Mistral',
  'Llama',
  'DALL-E',
  'Midjourney',
  'Stable Diffusion',
  'Unknown'
]

export const CONFIDENCE_LEVELS = {
  VERY_LOW: { min: 0, max: 20, label: 'Very Low', color: 'success' },
  LOW: { min: 20, max: 40, label: 'Low', color: 'warning' },
  MEDIUM: { min: 40, max: 60, label: 'Medium', color: 'warning' },
  HIGH: { min: 60, max: 80, label: 'High', color: 'warning' },
  VERY_HIGH: { min: 80, max: 100, label: 'Very High', color: 'destructive' }
}

export const DETECTION_INDICATORS = [
  {
    name: 'Repetitive Patterns',
    description: 'Frequent use of similar sentence structures'
  },
  {
    name: 'Generic Expressions',
    description: 'Common phrases and predictable language'
  },
  {
    name: 'Lack of Specificity',
    description: 'Missing concrete details or examples'
  },
  {
    name: 'Unusual Punctuation',
    description: 'Inconsistent or odd punctuation usage'
  },
  {
    name: 'Formatting Anomalies',
    description: 'Suspicious formatting or structure'
  }
]

export const SEARCH_SOURCES = ['article', 'video', 'research', 'news'] as const

export const ANALYTICS_PERIODS = [
  { value: '1d', label: '1 Day' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' }
]

export const SOCIAL_PLATFORMS = [
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: '𝕏',
    color: '#000000'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'f',
    color: '#1877F2'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'in',
    color: '#0A66C2'
  },
  {
    id: 'email',
    name: 'Email',
    icon: '✉',
    color: '#EA4335'
  }
]

export const API_ENDPOINTS = {
  DETECT: '/api/detect',
  SEARCH: '/api/search',
  ANALYTICS: '/api/analytics'
}
