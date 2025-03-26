interface Section {
  title: string;
  content: string;
  codeExamples?: Record<string, string>;
}

interface ComplexityData {
  approach: string;
  time: string;
  space: string;
}

interface ParsedResponse {
  sections: Section[];
  complexityData: ComplexityData[];
}



const LANGUAGE_MAPPING: Record<string, string> = {
  'C++': 'cpp',
  'Python': 'python',
  'JavaScript': 'javascript',
  'Java': 'java',
  'Go': 'go',
  'Rust': 'rust',
  'Swift': 'swift'
};

export function parseResponse(response: string, selectedLanguage: string): ParsedResponse {
  const result: ParsedResponse = {
    sections: [],
    complexityData: []
  };

  const sectionPatterns = [
    { emoji: '📝', title: 'Problem Statement', regex: /📝\s*\*\*Problem Statement\*\*:([\s\S]+?)(?=🔍|$)/i },
    { emoji: '🔍', title: 'Constraints Analysis', regex: /🔍\s*\*\*Constraints Analysis\*\*:([\s\S]+?)(?=💡|$)/i },
    { emoji: '💡', title: 'Intuition', regex: /💡\s*\*\*Intuition\*\*:([\s\S]+?)(?=🛠️|$)/i },
    { emoji: '🛠️', title: 'Brute-Force Approach', regex: /🛠️\s*\*\*Brute-Force Approach\*\*:([\s\S]+?)(?=⚡|🚀|$)/i },
    { emoji: '⚡', title: 'Better Approach', regex: /⚡\s*\*\*Better Approach\*\*:([\s\S]+?)(?=🚀|⏳|$)/i },
    { emoji: '🚀', title: 'Optimal Approach', regex: /🚀\s*\*\*Optimal Approach\*\*:([\s\S]+?)(?=⏳|$)/i },
    { emoji: '⏳', title: 'Time & Space Complexity', regex: /⏳\s*\*\*Time & Space Complexity\*\*:([\s\S]+?)(?=⚠️|$)/i },
    { emoji: '⚠️', title: 'Edge Cases Discussion', regex: /⚠️\s*\*\*Edge Cases Discussion\*\*:([\s\S]+?)(?=🧩|$)/i },
    { emoji: '🧩', title: 'Pattern Matching', regex: /🧩\s*\*\*Pattern Matching\*\*:([\s\S]+?)(?=🔗|$)/i },
    { emoji: '🔗', title: 'Suggested Follow-ups', regex: /🔗\s*\*\*Suggested Follow-ups\*\*:([\s\S]+)$/i }
  ];

  sectionPatterns.forEach(({ title, regex }) => {
    const match = response.match(regex);
    if (match) {
      const content = match[1].trim();
      const codeExamples: Record<string, string> = {};
      
      const langIdentifier = LANGUAGE_MAPPING[selectedLanguage];
      const escapedLang = langIdentifier.replace(/\+/g, '\\+');
      const codeRegex = new RegExp(
        `\`\`\`${escapedLang}\\n([\\s\\S]+?)\\n\`\`\``,
        'i'
      );
      const codeMatch = content.match(codeRegex);

      if (codeMatch) {
        codeExamples[selectedLanguage] = codeMatch[1].trim();
      }

      const cleanedContent = content
        .replace(/```[\s\S]+?```/g, '')
        .trim();

      if (cleanedContent || Object.keys(codeExamples).length > 0) {
        result.sections.push({
          title,
          content: cleanedContent || 'No detailed description available.',
          codeExamples: Object.keys(codeExamples).length > 0 ? codeExamples : undefined
        });
      }
    } else {
      result.sections.push({
        title,
        content: 'No details available for this section.',
      });
    }
  });

  // Enhanced complexity extraction
  const complexityPatterns = [
    /Brute-Force:\s*(O\([^)]+\))\s*Time\s*\|\s*(O\([^)]+\))\s*Space/i,
    /Better:\s*(O\([^)]+\))\s*Time\s*\|\s*(O\([^)]+\))\s*Space/i,
    /Optimal:\s*(O\([^)]+\))\s*Time\s*\|\s*(O\([^)]+\))\s*Space/i
  ];

  complexityPatterns.forEach((pattern, index) => {
    const complexityMatch = response.match(pattern);
    if (complexityMatch) {
      const approaches = ['Brute-Force', 'Better', 'Optimal'];
      result.complexityData.push({
        approach: approaches[index],
        time: complexityMatch[1].trim(),
        space: complexityMatch[2].trim()
      });
    }
  });

  // Fallback complexity extraction
  if (result.complexityData.length === 0) {
    const fallbackComplexityRegex = /Time & Space Complexity[\s\S]+?(Brute-Force|Better|Optimal):\s*(O\([^)]+\))\s*Time\s*\|\s*(O\([^)]+\))\s*Space/i;
    const fallbackMatch = response.match(fallbackComplexityRegex);
    if (fallbackMatch) {
      result.complexityData.push({
        approach: fallbackMatch[1].trim(),
        time: fallbackMatch[2].trim(),
        space: fallbackMatch[3].trim()
      });
    }
  }

  return result;
}