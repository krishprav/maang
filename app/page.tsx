"use client";

import React, { useState } from "react";
import { GlassCard, GlassButton, GlassInput, GlassDivider } from "./components/ui/Glass";
import { AIResponse } from "./components/AIResponse";
import { Navigation } from "./components/Navigation";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ question: string; answer: string }>>([]);

  // Business logic remains unchanged
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      
      const data = await response.json();
      setAiResponse(data.response);
      setChatHistory([...chatHistory, { question, answer: data.response }]);
      setQuestion("");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("⚠️ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#121212]">
      <Navigation />
      
      {/* Glassmorphic background effects */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#00A8E8]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8A2BE2]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Main Header Card */}
        <GlassCard className="mb-10 p-8 bg-[#1E1E1E]/90 backdrop-blur-xl border border-white/10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A8E8] via-[#8A2BE2] to-[#00FF99] bg-clip-text text-transparent text-center">
            FAANG Interview AI Mentor
          </h1>
          <p className="text-[#EAEAEA] mt-4 text-center text-opacity-80">
            Your personal AI mentor for technical interview preparation
          </p>
        </GlassCard>

        {/* Question Input Form */}
        <form onSubmit={handleSubmit}>
  <GlassCard className="bg-[#1E1E1E]/80 backdrop-blur-lg border border-white/10 p-6 relative group">
    {/* White Glow effect container */}
    <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
    
    <label htmlFor="question" className="block text-[#EAEAEA] font-medium mb-4">
      Ask an interview question
    </label>
    
    <div className="relative">
      <GlassInput
        placeholder="e.g., 'Explain the two-pointer technique'"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        multiline
        rows={4}
        className="bg-[#1E1E1E]/50 border-white/15 focus:ring-2 focus:ring-white pr-16
                  transition-all duration-300 hover:border-white/30 focus:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
      />
      
      <GlassButton 
        type="submit" 
        disabled={loading || !question.trim()}
        className="absolute bottom-3 right-3 p-3 bg-gradient-to-br from-[#00A8E8] to-[#8A2BE2]
                  hover:from-[#008CC1] hover:to-[#6A1B9A] transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group/button"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-black font-bold text-2xl">Send</span>
            <svg 
              className="w-5 h-5 text-black font-bold text-2xl transform group-hover/button:translate-x-1 transition-transform"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </div>
        )}
      </GlassButton>
    </div>
  </GlassCard>
</form>

        
        {/* AI Response Section */}
        {aiResponse && (
          <div className="mt-8 animate-fadeIn">
            <AIResponse response={aiResponse} loading={loading} />
          </div>
        )}
        
        {/* Chat History */}
        {chatHistory.length > 1 && (
          <GlassCard className="mt-8 bg-[#1E1E1E]/80 backdrop-blur-lg border border-white/10 p-6">
            <h2 className="text-xl font-bold text-[#EAEAEA] mb-4">Previous Questions</h2>
            <GlassDivider className="my-4 bg-white/10" />
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#00A8E8]/30 scrollbar-track-transparent">
              {chatHistory.slice(0, -1).reverse().map((chat, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg bg-[#1E1E1E]/50 backdrop-blur-sm border border-white/5 hover:border-[#00A8E8]/20 transition-colors"
                >
                  <p className="text-[#00A8E8] font-medium">{chat.question}</p>
                  <GlassDivider className="my-3 bg-white/5" />
                  <p className="text-[#EAEAEA]/80 text-sm line-clamp-2">
                    {chat.answer.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </main>
  );
}