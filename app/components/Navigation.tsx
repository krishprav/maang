//app/components/Navigation.tsx
import React from 'react';
import { GlassCard } from './ui/Glass';
import Link from 'next/link';

export const Navigation: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50">
      <GlassCard className="rounded-none rounded-b-lg border-t-0 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2a5 5 0 0 0-5 5v3H3v11h18V10h-4V7a5 5 0 0 0-5-5z"></path>
              <path d="M12 16v4"></path>
              <path d="M12 12h4"></path>
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Mentor
          </span>
        </Link>
        
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/interview-prep" className="text-gray-300 hover:text-white transition-colors">
            Interview Prep
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About
          </Link>
        </nav>
      </GlassCard>
    </header>
  );
};