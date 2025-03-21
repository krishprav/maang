//app/components/AIResponse.tsx
"use client"
import { useState } from 'react';
import { GlassButton, GlassCard } from './ui/Glass';
import { CopyButton } from './ui/CopyButton';
import { ComplexityTable } from './ui/ComplexityTable';
import { FlashcardSummary } from './FlashcardSummary';
import { parseResponse } from '@/utils/parseResponse';
import { SectionBlock } from './SectionBlock';
import MacOSWindow from './ui/MacOSWindow';

const SECTION_EMOJIS: { [key: string]: string } = {
  'Problem Statement': '📝',
  'Constraints Analysis': '🔍',
  'Intuition': '💡',
  'Brute-Force Approach': '🛠️',
  'Better Approach': '⚡',
  'Optimal Approach': '🚀',
  'Time & Space Complexity': '⏳',
  'Edge Cases Discussion': '⚠️',
  'Pattern Matching': '🧩',
  'Suggested Follow-ups': '🔗',
};

export const AIResponse = ({ response, loading }: { response: string; loading: boolean }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const parsedResponse = parseResponse(response);

  const toggleSection = (title: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <GlassCard className="mt-8 w-full animate-fadeIn backdrop-blur-lg">
      <div className="flex items-center justify-between mb-6 p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl">🤖</span>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Mentor Solution
          </h2>
        </div>
        <div className="flex gap-3">
          <CopyButton content={response} />
          <GlassButton 
            onClick={() => window.print()} 
            className="px-4 py-2 hover:scale-105 transition-transform"
          >
            📄 Export PDF
          </GlassButton>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mt-4">Generating response...</p>
          </div>
        ) : (
          <>
            {parsedResponse.sections.map((section, index) => (
              <SectionBlock
                key={index}
                section={section}
                expanded={expandedSections.has(section.title)}
                onToggle={toggleSection}
                emoji={SECTION_EMOJIS[section.title] || '📌'}
              />
            ))}

            {/* Complexity Analysis */}
            <MacOSWindow title="Complexity Analysis">
              {parsedResponse.complexityData.length > 0 ? (
                <ComplexityTable data={parsedResponse.complexityData} />
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No complexity data available.
                </p>
              )}
            </MacOSWindow>

            {/* Key Takeaways */}
            <MacOSWindow title="Key Takeaways">
              {parsedResponse.summary.optimalApproach ? (
                <FlashcardSummary data={parsedResponse.summary} />
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No summary data available.
                </p>
              )}
            </MacOSWindow>
          </>
        )}
      </div>
    </GlassCard>
  );
};