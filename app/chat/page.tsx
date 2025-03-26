"use client"
import { useState } from 'react';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { FiArrowUp, FiUser, FiMessageSquare } from 'react-icons/fi';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      // Simulate API call
      const response = await new Promise<string>(resolve => 
        setTimeout(() => resolve(`Great question! Let's break this down step by step:
        
        1. First, consider the problem constraints...
        2. Then think about the time complexity...
        3. A common approach would be...`), 1500)
      );

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response 
      }]);
    } catch (error) {
      console.error('Chat error:', error); // Now using the error variable
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <GlassCard className="bg-gradient-to-br from-gray-900/50 to-gray-950/60 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg">
            <FiMessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FAANG Mentor
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Senior Engineer • 10+ YOE • Specialized in System Design & DSA
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div 
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-4`}
            >
              {msg.role === 'assistant' && (
                <div className="mt-1 p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
                  <FiUser className="w-5 h-5 text-primary" />
                </div>
              )}
              <GlassCard
                className={`max-w-[85%] p-4 ${
                  msg.role === 'user' 
                    ? 'bg-blue-500/10 border-blue-500/20' 
                    : 'bg-gray-800/30 border-gray-700/30'
                } border backdrop-blur-sm`}
              >
                <p className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
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
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-gray-900/50 border border-white/10 rounded-xl px-5 py-3
                       text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-primary/50 focus:border-transparent backdrop-blur-sm
                       transition-all duration-200 hover:border-white/20"
              placeholder="Ask your FAANG interview question..."
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