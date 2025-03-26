
"use client";
import React, { useState } from "react";
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
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Tech Interview Prep
          </h1>
          <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl mx-auto px-2">
            Master technical interviews with curated company-specific questions and AI-powered solutions
          </p>
        </div>

        {/* Company selector */}
        <GlassCard className="p-6 mb-8 backdrop-blur-lg bg-white/5 border border-white/10">
          <CompanySelector onSelectAction={handleSelect} disabled={companyLoading} />
        </GlassCard>

        {/* Problem list and details */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Problem list */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 backdrop-blur-lg bg-white/5 border border-white/10">
              {/* Filter and sort controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
                <div className="flex flex-wrap items-center gap-2 text-gray-300">
                  <FiFilter className="w-5 h-5 text-blue-400" />
                  <span className="mr-2 text-sm md:text-base">Filter:</span>
                  {["ALL", "EASY", "MEDIUM", "HARD"].map((difficulty) => (
                    <GlassButton
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-3 py-1 text-sm ${
                        selectedDifficulty === difficulty
                          ? "border-blue-400 text-green-400"
                          : "border-white/10 text-gray-300 hover:text-white"
                      }`}
                    >
                      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                    </GlassButton>
                  ))}
                </div>

                {/* Sort by dropdown */}
                <div className="flex items-center gap-2 md:ml-auto w-full md:w-auto">
                  <label htmlFor="sort-order" className="text-gray-300 text-sm">
                    Sort by:
                  </label>
                  <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "frequency" | "acceptance")}
                    className="glass-input px-3 py-1 text-sm bg-white/5 border-white/10 w-full md:w-auto"
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
                        ? "border-blue-400/40 bg-blue-400/5"
                        : "border-white/10 hover:border-blue-400/20"
                    }`}
                    onClick={() => setSelectedProblem(problem)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors text-base md:text-lg mb-2 md:mb-0">
                        {problem.Title}
                      </h3>
                      <DifficultyPill level={problem.Difficulty as "EASY" | "MEDIUM" | "HARD"} />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-3 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <FiZap className="w-4 h-4 text-green-400" />
                        {problem.Frequency}% Frequency
                      </span>
                      <span className="hidden md:inline">·</span>
                      <span>{problem.AcceptanceRate}% Acceptance</span>
                    </div>

                    {/* Generate AI solution link */}
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={`/?question=${encodeURIComponent(problem.Title)}`}
                        target="_blank"
                        className="text-sm flex items-center gap-1 text-blue-400 hover:text-purple-400 transition-colors"
                      >
                        <FiZap className="w-4 h-4" />
                        <span className="text-xs md:text-sm">Generate AI Solution</span>
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
              <GlassCard className="p-6 backdrop-blur-lg bg-white/5 border border-white/10 sticky top-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="text-xl font-semibold text-white mb-2 md:mb-0">
                      {selectedProblem.Title}
                    </h2>
                    <DifficultyPill level={selectedProblem.Difficulty as "EASY" | "MEDIUM" | "HARD"} />
                  </div>

                  {/* Acceptance rate */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Acceptance Rate</label>
                      <div className="h-2 bg-gray-800 rounded-full">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all"
                          style={{ width: `${selectedProblem.AcceptanceRate ?? 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-400">
                        {selectedProblem.AcceptanceRate}% Success Rate
                      </span>
                    </div>

                    {/* Related topics */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Related Topics</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProblem.Topics.split(", ").map((topic, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300 border border-white/10"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View full problem button */}
                    <GlassButton
                      onClick={() => window.open(selectedProblem.Link, "_blank")}
                      className="w-full flex items-center justify-center gap-2 bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/30 hover:border-blue-400/50 text-base"
                      glow
                    >
                      <FiBookOpen className="w-5 h-5 text-blue-400" />
                      View Full Problem
                      <FiChevronRight className="w-5 h-5 text-blue-400" />
                    </GlassButton>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Loading state */}
        {companyLoading && (
          <div className="mt-8 text-center text-gray-400 flex items-center justify-center gap-2 text-base">
            <ClipLoader size={20} color="#00A8E8" />
            Analyzing company question patterns...
          </div>
        )}
      </div>
    </main>
  );
}