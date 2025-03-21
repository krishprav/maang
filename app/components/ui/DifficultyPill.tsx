// components/ui/DifficultyPill.tsx
import React from "react";

interface DifficultyPillProps {
    level: "EASY" | "MEDIUM" | "HARD";
  }

export const DifficultyPill: React.FC<DifficultyPillProps> = ({ level }) => {
  const difficultyColors = {
    EASY: "bg-emerald-500/20 text-emerald-400",
    MEDIUM: "bg-amber-500/20 text-amber-400",
    HARD: "bg-rose-500/20 text-rose-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[level]}`}>
      {level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()}
    </span>
  );
};