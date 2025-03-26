// app/components/ui/MacOSWindow.tsx
import React, { forwardRef, useState } from "react";
import { X, Minus, ChevronsUpDown, Info } from "lucide-react";

interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  explanation?: string;
  complexityBreakdown?: string;
  onExplanationToggle?: (state: boolean) => void;
  onComplexityToggle?: (state: boolean) => void;
}

const MacOSWindow = forwardRef<HTMLDivElement, MacOSWindowProps>(
  ({ title = "Untitled", children, className, explanation, complexityBreakdown }, ref) => {
    const [showExplanation, setShowExplanation] = useState(false);
    const [showComplexityBreakdown, setShowComplexityBreakdown] = useState(false);

    return (
      <div
        ref={ref}
        className={`
          w-full bg-gray-900/95 backdrop-blur-lg text-white 
          rounded-xl shadow-2xl shadow-black/50 border border-white/10 
          overflow-hidden transition-all hover:shadow-black/60
          ${className || ""}
        `}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-gray-800/90 to-gray-900/50 border-b border-white/5">
          <div className="flex space-x-2">
            <button className="group w-4 h-4 bg-red-500/80 rounded-full flex items-center justify-center transition-transform hover:scale-110 p-0 min-w-0 aspect-square">
              <X className="w-3 h-3 text-red-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="group w-4 h-4 bg-yellow-500/80 rounded-full flex items-center justify-center transition-transform hover:scale-110 p-0 min-w-0 aspect-square">
              <Minus className="w-3 h-3 text-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="group w-4 h-4 bg-green-500/80 rounded-full flex items-center justify-center transition-transform hover:scale-110 p-0 min-w-0 aspect-square">
              <ChevronsUpDown className="w-3 h-3 text-green-100 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
            </button>
          </div>
          <p className="text-gray-300 text-sm font-medium tracking-wide">{title}</p>
          <div className="flex gap-2">
            {explanation && (
              <button
                className="text-gray-400 hover:text-[#00A8E8] flex items-center gap-1"
                onClick={() => setShowExplanation(!showExplanation)}
              >
                <Info className="w-4 h-4" />
                <span className="text-xs">Deep Dive</span>
              </button>
            )}
            {complexityBreakdown && (
              <button
                className="text-gray-400 hover:text-[#00A8E8] flex items-center gap-1"
                onClick={() => setShowComplexityBreakdown(!showComplexityBreakdown)}
              >
                <Info className="w-4 h-4" />
                <span className="text-xs">Complexity</span>
              </button>
            )}
          </div>
        </div>

        {/* Window Content */}
        <div className="bg-gradient-to-b from-gray-900/90 to-gray-900/70">
          {showExplanation && (
            <div className="p-4 bg-[#1E1E1E]/60 border-b border-white/10">
              <div className="prose prose-invert max-w-none text-sm">
                {explanation}
              </div>
            </div>
          )}

          {showComplexityBreakdown && (
            <div className="p-4 bg-[#1E1E1E]/60 border-b border-white/10">
              <div className="prose prose-invert max-w-none text-sm">
                {complexityBreakdown}
              </div>
            </div>
          )}

          <div className="p-6 space-y-4">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

MacOSWindow.displayName = "MacOSWindow";

export default MacOSWindow;