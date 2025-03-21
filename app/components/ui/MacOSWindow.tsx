//app/components/ui/MacOSWindow.tsx
import React, { forwardRef } from "react";
import { X, Minus, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";

interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const MacOSWindow = forwardRef<HTMLDivElement, MacOSWindowProps>(
  ({ title = "Untitled", children, className }, ref) => {
    return (
      <div 
        ref={ref}
        className={`
          w-full
          bg-gray-900/95 backdrop-blur-lg text-white 
          rounded-xl shadow-2xl shadow-black/50 
          border border-white/10 overflow-hidden 
          transition-all hover:shadow-black/60
          ${className || ""}
        `}
      >
        {/* Window Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-gray-800 to-gray-900 border-b border-white/5">
          <div className="flex space-x-2">
            <Button className="group w-3 h-3 bg-red-500 rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <X className="w-2 h-2 text-red-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button className="group w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <Minus className="w-2 h-2 text-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button className="group w-3 h-3 bg-green-500 rounded-full flex items-center justify-center transition-transform hover:scale-110">
              <ChevronsUpDown className="w-2 h-2 text-green-100 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
            </Button>
          </div>
          <p className="text-gray-300 text-sm font-medium tracking-wide">{title}</p>
          <div className="w-6" />
        </div>
        
        {/* Window Content */}
        <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-900/80">
          {children}
        </div>
      </div>
    );
  }
);

MacOSWindow.displayName = "MacOSWindow";

export default MacOSWindow;