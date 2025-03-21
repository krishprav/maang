// src/components/CodeExplanation.tsx
import React from 'react';
import MacOSWindow from './ui/MacOSWindow';
import { CopyButton } from './ui/CopyButton';

interface CodeExplanationProps {
  code: string;
  explanation: string;
}

export const CodeExplanation: React.FC<CodeExplanationProps> = ({ code, explanation }) => {
  return (
    <div className="space-y-4">
      <MacOSWindow title="Code">
        <pre className="text-sm">
          <code>{code}</code>
        </pre>
        <CopyButton content={code}/>
      </MacOSWindow>

      {explanation && (
        <div className="prose prose-invert text-sm">
          <h4 className="text-primary font-semibold">Explanation:</h4>
          <div dangerouslySetInnerHTML={{ __html: explanation }} />
        </div>
      )}
    </div>
  );
};