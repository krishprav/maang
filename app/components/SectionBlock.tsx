//app/components/SectionBlock.tsx
import React from 'react';
import { CodeExplanation } from './CodeExplanation';
import { CopyButton } from './ui/CopyButton';
import MacOSWindow from './ui/MacOSWindow';

interface SectionBlockProps {
  section: {
    title: string;
    content: string;
    explanation?: string;
    htmlContent: string;
    rawContent: string;
    type: 'code' | 'text';
  };
  expanded: boolean;
  onToggle: (section: string) => void;
  emoji: string;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({ 
  section, 
  expanded, 
  onToggle,
  emoji 
}) => {
  return (
    <div className="border-b border-white/10 pb-6 last:border-0">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onToggle(section.title)}
      >
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
          {section.title}
        </h3>
        <button className="ml-auto text-sm text-gray-400 hover:text-white transition-colors">
          {expanded ? '▲ Collapse' : '▼ Expand'}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pl-2 space-y-4 animate-fadeIn">
          {section.type === 'code' ? (
            <MacOSWindow title="Implementation">
              <CodeExplanation 
                code={section.content} 
                explanation={section.explanation || ''} 
              />
            </MacOSWindow>
          ) : (
            <div className="prose prose-invert max-w-none bg-white/5 rounded-lg p-4">
              <div dangerouslySetInnerHTML={{ __html: section.htmlContent }} />
              <CopyButton 
                content={section.rawContent} 
                className="mt-4 text-xs p-1" 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};