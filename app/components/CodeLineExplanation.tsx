// app/components/CodeLineExplanation.tsx
"use client"
import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

export const CodeLineExplanation = ({ 
  code, 
  explanation 
}: { 
  code: string; 
  explanation: string 
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative">
      <div className="flex items-start gap-2 p-2 hover:bg-[#1E1E1E]/40 rounded-lg">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#00A8E8] mt-1 hover:text-[#8A2BE2] transition-colors"
        >
          <FiInfo className="w-4 h-4" />
        </button>
        <pre className="flex-1 overflow-x-auto">
          <code className="text-sm text-[#EAEAEA]/90 font-mono">
            {code}
          </code>
        </pre>
      </div>
      {expanded && (
        <div className="ml-8 pl-4 border-l-2 border-[#00A8E8]/30 mb-4">
          <div className="prose prose-invert max-w-none text-sm p-4 bg-[#1E1E1E]/60 rounded-lg">
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};