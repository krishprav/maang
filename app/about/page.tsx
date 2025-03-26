// app/about/page.tsx
import React from "react";
import { GlassCard } from "../components/ui/Glass";
import { FiAlertTriangle } from "react-icons/fi";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <GlassCard className="p-6 bg-gray-900/50 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            About AI Mentor
          </h1>
          
          <div className="text-gray-200 space-y-6">
            <div className="p-4 bg-red-900/20 backdrop-blur-sm rounded-lg border border-red-400/20">
              <div className="flex items-center gap-2 mb-2">
                <FiAlertTriangle className="w-5 h-5 text-red-300" />
                <h2 className="text-lg font-semibold text-red-100">Important Disclaimer</h2>
              </div>
              <p className="text-red-200 text-sm leading-relaxed">
                While AI Mentor strives to provide accurate and helpful information,
                please be aware that artificial intelligence systems can sometimes
                make mistakes. All responses should be verified through additional
                resources and human review.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Interactive DSA problem solving with multiple approaches</li>
                <li>Code review and optimization suggestions</li>
                <li>System design interview preparation</li>
                <li>Real-time complexity analysis</li>
                <li>Personalized interview simulations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Our Approach</h2>
              <ul className="list-decimal pl-5 space-y-2 text-gray-300">
                <li>Pattern recognition for common interview questions</li>
                <li>Adaptive difficulty scaling</li>
                <li>Context-aware feedback generation</li>
                <li>Real-world system design scenarios</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}