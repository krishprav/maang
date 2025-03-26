"use client";
import { useState, useEffect } from "react";
import { GlassButton, GlassCard } from "./ui/Glass";
import { CopyButton } from "./ui/CopyButton";
import { ComplexityTable } from "./ui/ComplexityTable";
import { parseResponse } from "../../utils/parseResponse";
import MacOSWindow from "./ui/MacOSWindow";
import { FiChevronDown, FiChevronUp, FiDownload, FiZap } from "react-icons/fi";

export const LANGUAGES = [
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "Java",
  "Go",
  "Rust",
  "Swift",
] as const;
export type Language = (typeof LANGUAGES)[number];
interface AIResponseProps {
  response: string;
  loading: boolean;
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
}

const SECTION_CONFIG = [
  {
    title: "Problem Statement",
    emoji: "📝",
    color: "text-blue-400",
    defaultOpen: true,
  },
  {
    title: "Constraints Analysis",
    emoji: "🔍",
    color: "text-purple-400",
    defaultOpen: true,
  },
  {
    title: "Intuition",
    emoji: "💡",
    color: "text-green-400",
  },
  {
    title: "Brute-Force Approach",
    emoji: "🛠️",
    color: "text-yellow-400",
  },
  {
    title: "Better Approach",
    emoji: "🚤",
    color: "text-teal-400",
  },
  {
    title: "Optimal Approach",
    emoji: "🚀",
    color: "text-red-400",
  },
  {
    title: "Time & Space Complexity",
    emoji: "⏳",
    color: "text-pink-400",
    defaultOpen: true,
  },
  {
    title: "Edge Cases Discussion",
    emoji: "⚠️",
    color: "text-orange-400",
  },
  {
    title: "Pattern Matching",
    emoji: "🧩",
    color: "text-indigo-400",
  },
  {
    title: "Suggested Follow-ups",
    emoji: "🔗",
    color: "text-cyan-400",
  },
];

const AIResponse = ({
  response,
  loading,
  selectedLanguage,
  setSelectedLanguage
}: AIResponseProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [parsedData, setParsedData] = useState(() => parseResponse(response, selectedLanguage));

  useEffect(() => {
    const initialSections = SECTION_CONFIG.filter((s) => s.defaultOpen).map((s) => s.title);
    setExpandedSections(new Set(initialSections));
    setParsedData(parseResponse(response, selectedLanguage));
  }, [response, selectedLanguage]);

  const getSectionContent = (title: string) => {
    return (
      parsedData.sections.find((s) => s.title === title) || {
        title,
        content: "Analysis in progress...",
        codeExamples: {},
      }
    );
  };

  const toggleSection = (title: string) => {
    setExpandedSections(
      (prev) =>
        new Set(
          prev.has(title)
            ? [...prev].filter((t) => t !== title)
            : [...prev, title]
        )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <GlassCard className="p-3 backdrop-blur-md bg-white/5 border border-white/10">
            <span className="text-2xl">🧠</span>
          </GlassCard>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
              Interview Style Solution
            </h1>
            <p className="text-sm text-gray-400">
              Multi-Approach Technical Breakdown
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
            className="glass-input px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Select programming language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang} className="bg-surface">
                {lang}
              </option>
            ))}
          </select>
          <GlassButton
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20"
          >
            <FiDownload className="w-4 h-4 text-primary" />
            <span className="text-primary">Export</span>
          </GlassButton>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {SECTION_CONFIG.map(({ title, emoji, color }) => {
          const section = getSectionContent(title);
          const isExpanded = expandedSections.has(title);

          return (
            <GlassCard
              key={title}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl transition-all"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors rounded-xl"
                onClick={() => toggleSection(title)}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl ${color} drop-shadow-lg`}>
                    {emoji}
                  </span>
                  <h2 className={`text-lg font-semibold ${color}`}>{title}</h2>
                </div>
                <div className="flex items-center gap-3">
                  {section?.content && <CopyButton content={section.content} />}
                  {isExpanded ? (
                    <FiChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 pt-0 space-y-4">
                  <div className="prose prose-invert max-w-none text-gray-300 text-base leading-relaxed">
                    {section.content.split("\n").map((line, i) => (
                      <p key={i} className="my-3">
                        {line}
                      </p>
                    ))}
                  </div>

                  {section.codeExamples?.[selectedLanguage] && (
                    <MacOSWindow
                      title={`${selectedLanguage} Implementation`}
                      className="mt-4"
                    >
                      <div className="relative group">
                        <pre className="p-4  rounded-lg overflow-x-auto text-sm ">
                          <code
                            className={`font-mono language-${selectedLanguage.toLowerCase()} text-gray-100`}
                          >
                            {section.codeExamples[selectedLanguage]}
                          </code>
                          <CopyButton
                            content={section.codeExamples[selectedLanguage]}
                            className="absolute top-3 right-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                          />
                        </pre>
                      </div>
                    </MacOSWindow>
                  )}

                  {title === "Time & Space Complexity" &&
                    parsedData.complexityData?.length > 0 && (
                      <div className="mt-4">
                        <ComplexityTable
                          data={parsedData.complexityData}
                          className="bg-surface rounded-xl overflow-hidden border border-white/10"
                        />
                      </div>
                    )}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center space-y-4 animate-pulse">
            <div className="flex items-center justify-center gap-3">
              <FiZap className="w-8 h-8 text-primary animate-pulse" />
              <span className="text-2xl font-medium text-white">
                Crafting Solution...
              </span>
            </div>
            <p className="text-gray-300">
              Analyzing multiple approaches and optimizing complexity
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResponse;