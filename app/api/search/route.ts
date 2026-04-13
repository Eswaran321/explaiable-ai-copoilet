import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { getSupabaseServerClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query, userId } = await request.json()

    if (!query || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: query and userId' },
        { status: 400 }
      )
    }

    // Use Groq to generate search results and rank by relevance
    const prompt = `You are an advanced search engine. For the query: "${query}"
    
Generate 5-8 highly relevant search results with:
1. Title (catchy and informative)
2. URL (realistic format)
3. Snippet (2-3 sentences)
4. Relevance score (0-100)
5. Source type (article/video/research/news/documentation)

Return as JSON array with objects containing: title, url, snippet, relevance_score, source_type, accuracy`

    const { text } = await generateText({
      model: groq('mixtral-8x7b-32768') as any,
      prompt,
      temperature: 0.5,
    })

    // Parse results
    let results
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      results = jsonMatch ? JSON.parse(jsonMatch[0]) : []
    } catch {
      results = [{ title: query, snippet: text, relevance_score: 75, source_type: 'article' }]
    }

    // Calculate average accuracy
    const accuracy = results.reduce((sum: number, r: any) => sum + (r.relevance_score || 75), 0) / results.length

    // Store in Supabase
    const supabase = getSupabaseServerClient()
    const { error } = await supabase
      .from('search_results')
      .insert([
        {
          user_id: userId,
          query,
          results,
          accuracy_score: accuracy,
          source: 'groq-powered-search',
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
    }

    return NextResponse.json({
      success: true,
      results,
      accuracy: Math.round(accuracy),
      query,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to process search' },
      { status: 500 }
    )
  }
}

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
    const { data, error } = await supabase
      .from('search_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch search history' },
        { status: 500 }
      )
    }

    return NextResponse.json({ results: data })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch search history' },
      { status: 500 }
    )
  }
}
