import { CONFIDENCE_LEVELS } from './constants'

export function getConfidenceLevel(confidence: number): string {
  if (confidence <= CONFIDENCE_LEVELS.VERY_LOW.max) return CONFIDENCE_LEVELS.VERY_LOW.label
  if (confidence <= CONFIDENCE_LEVELS.LOW.max) return CONFIDENCE_LEVELS.LOW.label
  if (confidence <= CONFIDENCE_LEVELS.MEDIUM.max) return CONFIDENCE_LEVELS.MEDIUM.label
  if (confidence <= CONFIDENCE_LEVELS.HIGH.max) return CONFIDENCE_LEVELS.HIGH.label
  return CONFIDENCE_LEVELS.VERY_HIGH.label
}

export function getConfidenceColor(confidence: number): string {
  if (confidence <= CONFIDENCE_LEVELS.VERY_LOW.max) return 'success'
  if (confidence <= CONFIDENCE_LEVELS.LOW.max) return 'warning'
  if (confidence <= CONFIDENCE_LEVELS.MEDIUM.max) return 'warning'
  if (confidence <= CONFIDENCE_LEVELS.HIGH.max) return 'warning'
  return 'destructive'
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatShortDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function calculateAccuracy(sources: number, relevance: number): number {
  return Math.round((sources * 0.4 + relevance * 0.6) * 100) / 100
}

export function generateChartData(detections: number[], searches: number[]) {
  const data = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: formatShortDate(date),
      detections: detections[6 - i] || 0,
      searches: searches[6 - i] || 0
    })
  }
  
  return data
}

export function shareToSocial(platform: string, text: string, url?: string) {
  const encodedText = encodeURIComponent(text)
  const encodedUrl = url ? encodeURIComponent(url) : ''
  
  const urls: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=Check this out&body=${encodedText}%0D%0A${encodedUrl}`
  }
  
  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'width=500,height=500')
  }
}

export function cn(...classes: (string | undefined | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}
