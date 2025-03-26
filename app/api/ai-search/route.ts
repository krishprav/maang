import { NextResponse } from 'next/server';
import { getAIResponse } from '../../../lib/api';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { question, language } = await req.json();
    
    if (!question || !language) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const response = await getAIResponse(question, language);
    return NextResponse.json({ response });

  } catch (error) {
    console.error('AI search error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    );
  }
}