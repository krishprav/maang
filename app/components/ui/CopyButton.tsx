// app/components/ui/CopyButton.tsx
"use client"
import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  content: string;
  className?: string;
  small?: boolean;
}

export const CopyButton = ({ 
  content, 
  className,
  small = false
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iconSize = small ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const buttonSize = small ? 'p-1.5' : 'p-2';

  return (
    <button
      onClick={copyToClipboard}
      className={`rounded-lg hover:bg-[#00A8E8]/20 transition-colors ${buttonSize} ${
        className || ''
      }`}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? (
        <FiCheck className={`${iconSize} text-green-500`} />
      ) : (
        <FiCopy className={`${iconSize} text-[#EAEAEA]/60 hover:text-[#00A8E8]`} />
      )}
    </button>
  );
};