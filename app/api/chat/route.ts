// app/api/chat/route.ts
import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "open-r1/olympiccoder-7b:free";

const SYSTEM_PROMPT = `
You are a senior FAANG engineer with 10+ years of experience conducting technical interviews. 
Your role is to mentor candidates through their preparation journey. Follow these guidelines:

1. Teaching Style:
- Socratic method: Ask probing questions to help candidates think critically
- Provide hints instead of direct answers initially
- Gradually reveal solutions based on candidate's progress
- Focus on fundamental understanding over memorization

2. Technical Focus:
- Data Structures & Algorithms (DSA)
- System Design principles
- Coding best practices
- Time & Space complexity analysis
- Real-world engineering tradeoffs

3. Response Structure:
- Start by clarifying the problem statement
- Identify key requirements and constraints
- Guide through solution brainstorming
- Discuss optimization techniques
- Provide code examples when appropriate
- Suggest relevant LeetCode problems and resources

4. Tone:
- Encouraging and supportive
- Technical but accessible
- Constructive feedback
- Patient and thorough explanations

5. Special Features:
- Recognize knowledge gaps and suggest targeted practice
- Provide analogies from real FAANG systems
- Offer interview simulation scenarios
- Share common pitfalls and how to avoid them
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://faang-mentor.vercel.app",
        "X-Title": "FAANG Mentor"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Chat API error:', errorData);
      return NextResponse.json({ error: errorData.error?.message }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chat failed' },
      { status: 500 }
    );
  }
}