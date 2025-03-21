"use client";
import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import { GlassCard, GlassButton } from "../components/ui/Glass";
import { CompanySelector } from "../components/CompanySelector";
import { getCompanyProblems } from "@/utils/parseCsv";
import { Problem } from "@/utils/types";
import { FiChevronRight, FiZap, FiBookOpen, FiFilter } from "react-icons/fi";
import Link from "next/link";
import { DifficultyPill } from "../components/ui/DifficultyPill";
import { ClipLoader } from "react-spinners";

export default function InterviewPrep() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [sortOrder, setSortOrder] = useState<"frequency" | "acceptance">("frequency");

  // Filter and sort problems
  const filteredProblems = problems
    .filter((problem) => selectedDifficulty === "ALL" || problem.Difficulty.toUpperCase() === selectedDifficulty)
    .sort((a, b) => {
      const frequencyA = parseInt(a.Frequency?.replace("%", "") || "0", 10);
      const frequencyB = parseInt(b.Frequency?.replace("%", "") || "0", 10);
      const acceptanceA = parseInt(a.AcceptanceRate?.replace("%", "") || "0", 10);
      const acceptanceB = parseInt(b.AcceptanceRate?.replace("%", "") || "0", 10);

      if (sortOrder === "frequency") {
        return frequencyB - frequencyA; // Sort by frequency (descending)
      }
      return acceptanceB - acceptanceA; // Sort by acceptance rate (descending)
    });

  // Handle company and duration selection
  const handleSelect = async (company: string, duration: string) => {
    try {
      setCompanyLoading(true);
      const problems = await getCompanyProblems(company, duration);
      setProblems(problems);
      setSelectedProblem(null); // Reset selected problem when new problems are loaded
    } catch (error) {
      console.error("Error loading problems:", error);
    } finally {
      setCompanyLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#121212]">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/3 -left-20 w-[800px] h-[800px] bg-gradient-to-r from-[#00A8E8]/10 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 -right-20 w-[800px] h-[800px] bg-gradient-to-l from-[#8A2BE2]/10 to-transparent rounded-full blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A8E8] to-[#8A2BE2] bg-clip-text text-transparent mb-4">
            Tech Interview Prep
          </h1>
          <p className="text-[#EAEAEA]/80 text-lg font-light max-w-2xl mx-auto">
            Master technical interviews with curated company-specific questions and AI-powered solutions
          </p>
        </div>

        {/* Company selector */}
        <GlassCard className="p-6 mb-8 backdrop-blur-xl bg-[#1E1E1E]/90 border border-white/10">
          <CompanySelector onSelectAction={handleSelect} disabled={companyLoading} />
        </GlassCard>

        {/* Problem list and details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Problem list */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 backdrop-blur-lg bg-[#1E1E1E]/80 border border-white/10">
              {/* Filter and sort controls */}
              <div className="flex flex-wrap gap-4 mb-6 items-center">
                <div className="flex items-center gap-2 text-[#EAEAEA]/80">
                  <FiFilter className="w-5 h-5 text-[#00A8E8]" />
                  <span className="mr-2">Filter:</span>
                  {["ALL", "EASY", "MEDIUM", "HARD"].map((difficulty) => (
                    <GlassButton
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 text-sm ${
                        selectedDifficulty === difficulty
                          ? "border-[#00A8E8] text-[#00A8E8]"
                          : "border-white/10 text-[#EAEAEA]/60"
                      }`}
                    >
                      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                    </GlassButton>
                  ))}
                </div>

                {/* Sort by dropdown */}
                <div className="flex items-center gap-2 ml-auto">
                  <label htmlFor="sort-order" className="text-[#EAEAEA]/80 text-sm">
                    Sort by:
                  </label>
                  <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "frequency" | "acceptance")}
                    className="glass-input px-3 py-1 text-sm bg-[#1E1E1E]/50 border-white/10"
                    aria-label="Sort by"
                  >
                    <option value="frequency">Frequency</option>
                    <option value="acceptance">Acceptance Rate</option>
                  </select>
                </div>
              </div>

              {/* Problem cards */}
              <div className="space-y-3">
                {filteredProblems.map((problem, index) => (
                  <GlassCard
                    key={index}
                    className={`p-4 cursor-pointer transition-all hover:bg-white/5 group border ${
                      selectedProblem?.Title === problem.Title
                        ? "border-[#00A8E8]/40 bg-[#00A8E8]/5"
                        : "border-white/10 hover:border-[#00A8E8]/20"
                    }`}
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-[#EAEAEA] group-hover:text-[#00A8E8] transition-colors">
                        {problem.Title}
                      </h3>
                      <DifficultyPill level={problem.Difficulty as "EASY" | "MEDIUM" | "HARD"} />
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-[#EAEAEA]/60 text-sm">
                      <span className="flex items-center gap-1">
                        <FiZap className="w-4 h-4 text-[#00FF99]" />
                        {problem.Frequency}% Frequency
                      </span>
                      <span>·</span>
                      <span>{problem.AcceptanceRate}% Acceptance</span>
                    </div>

                    {/* Generate AI solution link */}
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={`/?question=${encodeURIComponent(problem.Title)}`}
                        target="_blank"
                        className="text-sm flex items-center gap-1 text-[#00A8E8] hover:text-[#8A2BE2] transition-colors"
                      >
                        <FiZap className="w-4 h-4" />
                        Generate AI Solution
                        <FiChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Selected problem details */}
          <div className="lg:col-span-1">
            {selectedProblem && (
              <GlassCard className="p-6 backdrop-blur-lg bg-[#1E1E1E]/80 border border-white/10 sticky top-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#EAEAEA]">
                      {selectedProblem.Title}
                    </h2>
                    <DifficultyPill level={selectedProblem.Difficulty as "EASY" | "MEDIUM" | "HARD"} />
                  </div>

                  {/* Acceptance rate */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#EAEAEA]/80">Acceptance Rate</label>
                      <div className="h-2 bg-[#1E1E1E] rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-[#00A8E8] to-[#00FF99] rounded-full transition-all"
                          style={{ width: `${selectedProblem.AcceptanceRate ?? 0}%` }} // Fallback to 0 if undefined
                        />
                      </div>
                      <span className="text-sm text-[#EAEAEA]/60">
                        {selectedProblem.AcceptanceRate}% Success Rate
                      </span>
                    </div>

                    {/* Related topics */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#EAEAEA]/80">Related Topics</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProblem.Topics.split(", ").map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-[#1E1E1E] text-[#EAEAEA]/80 text-sm border border-white/10"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View full problem button */}
                    <GlassButton
  onClick={() => window.open(selectedProblem.Link, "_blank")} // Open link in new tab
  className="w-full flex items-center justify-center gap-2 bg-[#00A8E8]/10 hover:bg-[#00A8E8]/20 border border-[#00A8E8]/30 hover:border-[#00A8E8]/50"
  glow
>
  <FiBookOpen className="w-5 h-5 text-[#00A8E8]" />
  View Full Problem
  <FiChevronRight className="w-4 h-4 text-[#00A8E8]" />
</GlassButton>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Loading state */}
        {companyLoading && (
          <div className="mt-8 text-center text-[#EAEAEA]/60 flex items-center justify-center gap-2">
            <ClipLoader size={20} color="#00A8E8" />
            Analyzing company question patterns...
          </div>
        )}
      </div>
    </main>
  );
}