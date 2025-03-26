// app/code-review/page.tsx
"use client"
import { useState } from 'react';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { FiArrowUp, FiUser, FiCode, FiAlertTriangle } from 'react-icons/fi';
import { parseResponse } from '@/utils/parseResponse';
import MacOSWindow from '../components/ui/MacOSWindow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  analysis?: {
    quality: string[];
    optimizations: string[];
    vulnerabilities: string[];
    complexity: {
      time: string;
      space: string;
    };
  };
};

export default function CodeReviewPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: input,
          language: selectedLanguage 
        })
      });

      if (!response.ok) throw new Error('Review failed');
      const data = await response.json();
      
      const parsed = parseResponse(data.response, selectedLanguage);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: parsed.sections.find(s => s.title === 'Code Review')?.content || '',
        analysis: parsed.complexityData?.length > 0 ? {
          quality: parsed.sections.find(s => s.title === 'Code Quality')?.content.split('\n') || [],
          optimizations: parsed.sections.find(s => s.title === 'Optimizations')?.content.split('\n') || [],
          vulnerabilities: parsed.sections.find(s => s.title === 'Vulnerabilities')?.content.split('\n') || [],
          complexity: {
            time: parsed.complexityData[0]?.time || 'O(n)',
            space: parsed.complexityData[0]?.space || 'O(1)'
          }
        } : undefined
      }]);
    } catch (error) {
      console.error('Code review error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '⚠️ Failed to analyze code. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <GlassCard className="bg-gradient-to-br from-gray-900/50 to-gray-950/60 border border-white/10 shadow-2xl">
        {/* Header with language selector */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg">
            <FiCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Code Review AI
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Senior Engineer • Code Quality • Performance Optimization • Security Analysis
            </p>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="ml-auto bg-gray-800/50 border border-white/10 rounded-lg px-3 py-1 text-sm text-white"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
          </select>
        </div>

        {/* Chat Area */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-4`}>
              {msg.role === 'assistant' && (
                <div className="mt-1 p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                  <FiUser className="w-5 h-5 text-primary" />
                </div>
              )}
              
              <GlassCard className={`max-w-[85%] p-4 ${
                msg.role === 'user' 
                  ? 'bg-blue-500/10 border-blue-500/20' 
                  : 'bg-gray-800/30 border-gray-700/30'
              } border backdrop-blur-sm`}>
                {msg.role === 'user' ? (
                  <MacOSWindow title="Your Code" className="mb-2">
                    <pre className="p-4 bg-gray-900/50 rounded-b-lg overflow-x-auto text-sm">
                      <code className="font-mono text-gray-100">{msg.content}</code>
                    </pre>
                  </MacOSWindow>
                ) : (
                  <div className="space-y-4">
                    <div className="prose prose-invert max-w-none">
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className="my-2 text-gray-200">{line}</p>
                      ))}
                    </div>

                    {msg.analysis && (
                      <div className="space-y-4 mt-4">
                        <div className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl border border-green-800/30">
                          <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                            <FiCode className="w-4 h-4" /> Code Quality
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-green-100">
                            {msg.analysis.quality.map((item, i) => (
                              <li key={i}>{item.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-800/30">
                          <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                            ⚡ Optimizations
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-blue-100">
                            {msg.analysis.optimizations.map((item, i) => (
                              <li key={i}>{item.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl border border-red-800/30">
                          <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                            <FiAlertTriangle className="w-4 h-4" /> Vulnerabilities
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-red-100">
                            {msg.analysis.vulnerabilities.map((item, i) => (
                              <li key={i}>{item.replace(/^- /, '')}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-4">
                          <div className="p-3 bg-gray-800/30 rounded-lg border border-white/10">
                            <span className="text-sm text-gray-400">Time</span>
                            <div className="text-xl font-mono text-primary">
                              {msg.analysis.complexity.time}
                            </div>
                          </div>
                          <div className="p-3 bg-gray-800/30 rounded-lg border border-white/10">
                            <span className="text-sm text-gray-400">Space</span>
                            <div className="text-xl font-mono text-secondary">
                              {msg.analysis.complexity.space}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </GlassCard>
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-4 animate-pulse">
              <div className="mt-1 p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                <FiUser className="w-5 h-5 text-primary" />
              </div>
              <div className="h-24 w-full bg-gray-800/30 rounded-xl" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-5 py-3
                       text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-primary/50 focus:border-transparent backdrop-blur-sm
                       transition-all duration-200 hover:border-white/20 resize-none
                       font-mono text-sm h-24"
              placeholder="Paste your code here for review..."
              disabled={loading}
            />
            <GlassButton
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30
                       hover:from-primary/40 hover:to-secondary/40 border border-white/10
                       transition-all duration-200 hover:shadow-[0_0_20px_-5px_var(--primary)]"
            >
              <FiArrowUp className="w-5 h-5" />
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}