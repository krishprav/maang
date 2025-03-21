export async function getAIResponse(question: string): Promise<string> {
    const API_KEY = process.env.OPENROUTER_API_KEY;
    const MODEL = "google/gemini-2.0-flash-lite-preview-02-05:free";
  
    if (!API_KEY) throw new Error("Missing OpenRouter API Key");
  
    // 🔥 Optimized FAANG-style prompt with suggested follow-ups
    const prompt = `
    You are a senior FAANG engineer helping candidates prepare for coding interviews.  
  
    However, for coding-related questions (like data structures, algorithms, LeetCode problems, system design, etc.), strictly follow this structured response format:
  
    1️⃣ **Problem Statement**: Clearly define the problem.
    2️⃣ **Constraints Analysis**: List the constraints and analyze their impact. And also possible Q&A followups with proper answer to enhance the experience.
    3️⃣ **Intuition**: Explain the thought process behind solving the problem.How to think ,why this way of thinking , what made you decide this way.
    4️⃣ **Brute-Force Approach**: Provide the naive c++ solution with explanation.Also add comments for each line.
    5️⃣ **Better Approach**: Introduce a more optimized c++ solution.Also add comments for each line.
    6️⃣ **Optimal Approach**: Present the best possible c++ solution with explantion.Also add comments for each line.
    7️⃣ **Time & Space Complexity**: Analyze complexities for all approaches.
    8️⃣ **Edge Cases Discussion**: Cover test cases that might cause failures.
    9️⃣ **Pattern Matching with Similar Problems**: Mention similar problems.
    🔟 **Suggested Follow-ups**: Based on the problem type, suggest 3–5 related LeetCode-style problems. Format them as clickable links.
    
    Ensure every coding-related response follows this format. If the question is not coding-related, respond normally.
    `;
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [{ role: "user", content: `${question}\n\n${prompt}` }],
        }),
      });
  
      const data = await response.json();
      const aiResponse = data?.choices?.[0]?.message?.content || "⚠️ AI could not generate a response. Try again.";
  
      return aiResponse;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      return "⚠️ Failed to fetch AI response. Please try again later.";
    }
  }