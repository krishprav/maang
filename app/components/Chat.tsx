//app/components/Chat.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from "rehype-highlight";
import { getAIResponse } from '../../lib/api';
import "highlight.js/styles/github-dark.css";

interface Message {
  content: string;
  isUser: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('JavaScript');

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setMessages(prev => [...prev, { content: input, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, selectedLanguage);
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    } catch {
      setMessages(prev => [...prev, {
        content: "⚠️ Failed to get response. Please try again.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="glass-pane p-4 m-4">
        <h1 className="text-gradient text-2xl font-bold">AI Mentor</h1>
        <p className="text-gray-400 mt-1">Your personal interview preparation assistant</p>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-2 bg-gray-800/50 rounded p-2 text-sm text-white"
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="C++">C++</option>
        </select>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`glass-pane p-4 max-w-3xl ${message.isUser ? 'bg-primary/10' : ''}`}>
                {message.isUser ? (
                  <p className="text-gray-100">{message.content}</p>
                ) : (
                  <div className="markdown">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>

                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-pane p-4 max-w-3xl w-fit"
          >
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="glass-pane m-4 p-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your interview question..."
            className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Ask'}
          </button>
        </div>
      </form>
    </div>
  );
}