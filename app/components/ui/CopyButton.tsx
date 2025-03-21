//app/components/ui/CopyButton.tsx
"use client";
import { useState } from "react";
interface CopyButtonProps {
  content: string;
  small?: boolean;
  className?: string; 
}

export const CopyButton: React.FC<CopyButtonProps> = ({ content, small = false, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`glass-button flex items-center gap-1 ${
        small ? 'px-2 py-1 text-sm' : 'px-3 py-1.5'
      } ${className}`} 
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};