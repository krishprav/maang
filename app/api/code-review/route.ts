import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "open-r1/olympiccoder-7b:free";

// Modified system prompt with language parameter
const createSystemPrompt = (language: string) => `
You are a principal engineer conducting ${language} code reviews. Analyze provided code with:

1. **Code Quality**:
- ${language} best practices compliance
- Clean code principles
- SOLID/GRASP adherence
- Error handling strategy

2. **Performance**:
- Time complexity analysis
- Space complexity breakdown
- Potential bottlenecks
- ${language}-specific optimizations

3. **Security**:
- Vulnerability assessment
- Input validation
- Security best practices
- ${language}-specific risks

4. **Improvements**:
- Code structure suggestions
- Alternative approaches
- Testing strategy
- Documentation

Format response with:
\`\`\`markdown
### {Category}
- Analysis points
\`\`\``;

export async function POST(req: Request) {
  const { code, language } = await req.json(); 

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: createSystemPrompt(language) }, 
          { role: "user", content: code }
        ],
        temperature: 0.3,
        max_tokens: 30000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error?.message }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ 
      response: data.choices[0].message.content,
      language // Return language for parsing
    });
  } catch (error) {
    console.error('Code review error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Review failed' },
      { status: 500 }
    );
  }
}