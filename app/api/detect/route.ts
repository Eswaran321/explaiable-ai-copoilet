import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { getSupabaseServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

interface DetectionRequest {
  content: string
  userId: string
}

interface AnalysisResult {
  confidence_score: number
  indicators: string[]
  explanation: string
  detection_type: 'human' | 'ai_generated' | 'mixed' | 'unknown'
  detected_tool?: string
  estimated_prompt?: string
  purpose?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as DetectionRequest
    const { content, userId } = body

    // Validation
    if (!content?.trim()) {
      return NextResponse.json(
        { error: 'Content is required and cannot be empty' },
        { status: 400 }
      )
    }

    if (!userId?.trim()) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    if (content.length > 50000) {
      return NextResponse.json(
        { error: 'Content exceeds maximum length of 50,000 characters' },
        { status: 400 }
      )
    }

    // Enhanced prompt for better Groq analysis
    const prompt = `You are an expert AI detection specialist. Analyze the following content and determine if it appears to be AI-generated. Be thorough and precise.

Content to analyze:
"${content}"

Provide your analysis in valid JSON format with these exact fields:
{
  "confidence_score": <number 0-100>,
  "indicators": [<list of detected indicators>],
  "explanation": "<brief explanation>",
  "detection_type": "<'human', 'ai_generated', or 'mixed'>",
  "detected_tool": "<identified AI tool if any>",
  "estimated_prompt": "<estimated prompt if detectable>",
  "purpose": "<detected purpose or use case>"
}

Focus on:
1. Repetitive patterns and sentence structures
2. Generic expressions and predictable language
3. Lack of specific details or human experiences
4. Unusual punctuation or formatting
5. Grammatical perfection that seems unnatural
6. Presence of AI-generated artifacts or hallucinations

Respond ONLY with valid JSON, no additional text.`

    const { text } = await generateText({
      model: groq('mixtral-8x7b-32768'),
      prompt,
      temperature: 0.2, // Lower temperature for more consistent results
      maxTokens: 1000,
    })

    // Parse and validate the response
    let analysis: AnalysisResult
    try {
      const parsed = JSON.parse(text)
      analysis = {
        confidence_score: Math.min(100, Math.max(0, parsed.confidence_score || 50)),
        indicators: Array.isArray(parsed.indicators) ? parsed.indicators : [],
        explanation: parsed.explanation || 'Unable to provide explanation',
        detection_type: ['human', 'ai_generated', 'mixed'].includes(parsed.detection_type)
          ? parsed.detection_type
          : 'unknown',
        detected_tool: parsed.detected_tool,
        estimated_prompt: parsed.estimated_prompt,
        purpose: parsed.purpose,
      }
    } catch (parseError) {
      console.error('Failed to parse Groq response:', parseError)
      // Fallback analysis
      analysis = {
        confidence_score: 50,
        indicators: ['Unable to determine'],
        explanation: text,
        detection_type: 'unknown',
      }
    }

    // Store in Supabase
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('detection_results')
      .insert([
        {
          user_id: userId,
          content,
          confidence_score: analysis.confidence_score,
          detection_type: analysis.detection_type,
          is_ai_generated: analysis.confidence_score > 60,
          detected_tool: analysis.detected_tool || null,
          estimated_prompt: analysis.estimated_prompt || null,
          purpose: analysis.purpose || null,
          analysis_details: analysis,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save detection result' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data?.[0]?.id,
        ...analysis,
        saved: true,
      },
    })
  } catch (error) {
    console.error('Detection error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process content detection',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '50'), 100)

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('detection_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch results' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch detection results' },
      { status: 500 }
    )
  }
}
