import { marked } from 'marked';

interface ComplexityData {
  approach: string;
  time: string;
  space: string;
}

interface ParsedSection {
  title: string;
  content: string;
  explanation?: string;
  htmlContent: string;
  rawContent: string;
  type: 'code' | 'text';
}

interface ParsedResponse {
  sections: ParsedSection[];
  complexityData: ComplexityData[];
  summary: {
    optimalApproach: string;
    optimalTime: string;
    optimalSpace: string;
  };
}

export const parseResponse = (response: string): ParsedResponse => {
  if (!response) {
    return {
      sections: [],
      complexityData: [],
      summary: {
        optimalApproach: '',
        optimalTime: '',
        optimalSpace: '',
      },
    };
  }

  const sections = response.split(/\n(?=🔟|⏳|📝|💡)/);
  const complexityData: ComplexityData[] = [];
  const summary = {
    optimalApproach: '',
    optimalTime: '',
    optimalSpace: '',
  };

  const parsedSections = sections.map((section) => {
    const [titleLine, ...contentLines] = section.split('\n');
    const title = titleLine.replace(/^[🔢🔟⏳📝💡⚠️🧩🔍🛠️⚡🚀🔗]+/, '').trim();
    const content = contentLines.join('\n').trim();

    if (title === 'Time & Space Complexity') {
      const matches = content.matchAll(/- (\w+-\w+ Approach):\s*Time: (O\(.+?\)),\s*Space: (O\(.+?\))/g);
      for (const match of matches) {
        complexityData.push({
          approach: match[1],
          time: match[2],
          space: match[3],
        });
      }
    }

    if (title === 'Optimal Approach') {
      const [, time, space] = content.match(/Time: (O\(.+?\)), Space: (O\(.+?\))/) || [];
      summary.optimalApproach = content.split('\n')[0].replace('**Optimal Approach:**', '').trim();
      summary.optimalTime = time || '';
      summary.optimalSpace = space || '';
    }

    return {
        title,
        content,
        explanation: content.includes('```') ? 'Explanation placeholder' : undefined,
        htmlContent: marked.parse(content) as string,
        rawContent: content,
        type: content.includes('```') ? ('code' as const) : ('text' as const),  
      };
      
  });

  return { sections: parsedSections, complexityData, summary };
};
