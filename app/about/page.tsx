//app/about/page.tsx
import React from "react";
import { Navigation } from "../components/Navigation";
import { GlassCard } from "../components/ui/Glass";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navigation />

      {/* Background effects */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-20 left-20 bg-accent/20 w-72 h-72 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 bg-primary/20 w-72 h-72 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <GlassCard className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            About AI Mentor
          </h1>
          <div className="text-gray-200 space-y-4 mt-4">
            <p>
              AI Mentor is designed to help software engineers prepare for technical interviews at 
              top tech companies like FAANG (Facebook/Meta, Amazon, Apple, Netflix, Google).
            </p>
            <p>
              Our platform leverages advanced AI to provide structured, detailed responses to your coding 
              and interview preparation questions, following the same format used by actual technical 
              interviewers at these companies.
            </p>
            <h2 className="text-2xl font-bold text-white mt-6">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Structured responses with clear problem statements</li>
              <li>Multiple solution approaches from brute force to optimal</li>
              <li>Detailed code explanations with comments</li>
              <li>Time and space complexity analysis</li>
              <li>Pattern matching with similar problems</li>
              <li>Follow-up problems to practice similar concepts</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}