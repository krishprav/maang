'use client';
import { useState, useEffect, useRef } from 'react';
import { FiX, FiSend, FiTerminal } from 'react-icons/fi';

type ChatMessage = {
  content: string;
  isUser: boolean;
  isCode?: boolean;
};

export default function CodeBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const detectContentType = (message: string) => {
    const codeKeywords = ['code', 'algorithm', 'function', 'bug', 'error', 'compile'];
    return codeKeywords.some(kw => message.toLowerCase().includes(kw));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const isCodeQuery = detectContentType(inputMessage);
    
    setMessages(prev => [...prev, { 
      content: inputMessage, 
      isUser: true,
      isCode: false 
    }]);
    
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/olympic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputMessage,
          isCodeQuery
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { 
        content: data.response,
        isUser: false,
        isCode: isCodeQuery
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        content: error instanceof Error ? error.message : 'Connection error 🔌',
        isUser: false,
        isCode: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 bg-purple-600/80 rounded-full shadow-lg hover:bg-purple-700/90 transition-all ring-2 ring-purple-400/30 backdrop-blur-lg"
        >
          <FiTerminal className="w-6 h-6 text-purple-100" />
        </button>
      ) : (
        <div className="w-96 h-[450px] bg-white/10 rounded-xl shadow-2xl flex flex-col border border-white/20 backdrop-blur-lg">
          <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/5">
            <h3 className="font-semibold text-purple-100">🤖 AI Mentor</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5 text-purple-200 hover:text-purple-100" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-xl ${
                  message.isUser 
                    ? 'bg-purple-600/80 text-purple-50' 
                    : 'bg-white/10 text-purple-100'
                } backdrop-blur-sm`}>
                  {message.isCode ? (
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {message.content}
                    </pre>
                  ) : (
                    <p className="text-sm leading-relaxed">
                      {message.content.replace(/\*\*\*|```/g, '')}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-pulse text-purple-200">✨ Generating response...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-white/20 bg-white/5">
            <div className="flex gap-2">
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything 💡..."
                className="flex-1 p-2 bg-white/15 text-purple-100 placeholder-purple-200/70 border border-white/20 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-sm backdrop-blur-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-purple-600/80 text-purple-50 rounded-xl hover:bg-purple-700/90 disabled:opacity-50 backdrop-blur-sm"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}