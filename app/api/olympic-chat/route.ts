// app/api/omnibot/route.ts
import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const SYSTEM_PROMPT = (isCodeQuery: boolean) => `You are CodeBot, an AI Mentor that ${
  isCodeQuery 
    ? 'provides expert programming help with code examples. Format code blocks with triple backticks when needed.'
    : 'answers general questions in clear, conversational English'
}. Follow these rules:

1. ${isCodeQuery ? 'Analyze problems before answering' : 'Be concise and friendly'}
2. ${isCodeQuery ? 'Include time/space complexity' : 'Use simple language'}
3. ${isCodeQuery ? 'Provide optimized solutions' : 'Break down complex concepts'}
4. Always maintain professional tone
5. Admit when unsure`;

export async function POST(req: Request) {
  try {
    const { message, isCodeQuery } = await req.json();
    
    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourdomain.com",
      },
      body: JSON.stringify({
        model: "open-r1/olympiccoder-7b:free",
        messages: [
          { role: "system", content: SYSTEM_PROMPT(isCodeQuery) },
          { role: "user", content: message }
        ],
        temperature: isCodeQuery ? 0.4 : 0.7,
        max_tokens: isCodeQuery ? 2000 : 1000,
        top_p: 0.9,
        frequency_penalty: isCodeQuery ? 0.2 : 0,
        presence_penalty: isCodeQuery ? 0.2 : 0,
      }),
    });

    const data = await response.json();
    let content = data.choices[0]?.message?.content || '';

    // Formatting cleanup
    if (!isCodeQuery) {
      content = content
        .replace(/```/g, '');
    }

    return NextResponse.json({ response: content });
    
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}