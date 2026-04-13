import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Content Analyzer Pro',
  description: 'Advanced AI-powered content detection, analysis, and search platform with real-time accuracy scoring',
  keywords: 'AI detection, content analysis, search, accuracy, analytics',
  openGraph: {
    title: 'AI Content Analyzer Pro',
    description: 'Advanced AI-powered content detection and analysis platform',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <div className="relative flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
