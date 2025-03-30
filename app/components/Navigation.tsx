import React from 'react';
import { GlassCard } from './ui/Glass';
import Link from 'next/link';
import { 
  FiHome, 
  FiBook, 
  FiInfo, 
  FiZap
} from 'react-icons/fi';

export const Navigation: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-lg">
      <GlassCard className="rounded-none border-x-0 border-t-0 px-4 sm:px-8 py-3 flex items-center justify-between bg-white/5 border-b border-white/10 shadow-xl">
        {/* Logo with Gradient */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <FiZap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Mentor
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {[
            { href: "/", icon: FiHome, text: "Home" },
            { href: "/interview-prep", icon: FiBook, text: "Company Specific" },
            // { href: "/code-review", icon: FiGitPullRequest, text: "AI Code-Review" },
            // { href: "/chat", icon: FiMessageCircle, text: "AI Mentor" },
            { href: "/about", icon: FiInfo, text: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-white/0 hover:bg-white/5
                     border border-transparent hover:border-white/10
                     text-gray-300 hover:text-white
                     transition-all duration-200"
            >
              <item.icon className="w-4 h-4 transition-colors group-hover:text-blue-400" />
              <span className="hidden sm:inline text-sm font-medium">{item.text}</span>
            </Link>
          ))}
        </nav>
      </GlassCard>
    </header>
  );
};
