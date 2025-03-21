// components/CompanySelector.tsx

"use client";
import React, { useState } from "react";
import { companies, durations } from "@/utils/constants";
import { ClipLoader } from "react-spinners";

interface CompanySelectorProps {
  onSelectAction: (company: string, duration: string) => Promise<void>;
  disabled?: boolean;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({ 
  onSelectAction, 
  disabled 
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  return (
    <GlassCard className="p-6 space-y-4 bg-slate-800/50 border border-slate-700/30">
      <h2 className="text-2xl font-bold text-slate-100">Select Company and Duration</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Company Select Dropdown */}
        <div>
          <label htmlFor="company-select" className="block text-sm font-medium text-slate-400 mb-2">
            Company
          </label>
          <select
            id="company-select"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/30 transition-all cursor-pointer appearance-none"
            disabled={disabled}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Select Dropdown */}
        <div>
          <label htmlFor="duration-select" className="block text-sm font-medium text-slate-400 mb-2">
            Duration
          </label>
          <select
            id="duration-select"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/30 transition-all cursor-pointer appearance-none"
            disabled={disabled}
          >
            <option value="">Select Duration</option>
            {durations.map((duration) => (
              <option key={duration} value={duration}>
                {duration.replace(/([A-Z])/g, " $1").trim()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <GlassButton
        onClick={() => onSelectAction(selectedCompany, selectedDuration)}
        disabled={!selectedCompany || !selectedDuration || disabled}
        className="w-full mt-4 bg-slate-700 hover:bg-slate-600/80 text-slate-100"
      >
        {disabled ? (
          <div className="flex items-center justify-center gap-2">
            <ClipLoader size={16} color="#ffffff" />
            Loading...
          </div>
        ) : (
          "Load Problems"
        )}
      </GlassButton>
    </GlassCard>
  );
};

// GlassCard, GlassButton, GlassInput, and GlassDivider components remain unchanged
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  glow = false,
  ...props 
}) => {
  return (
    <div 
      className={`glass rounded-xl p-6 ${glow ? "glow" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  glow = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`glass-button px-6 py-2 text-white font-medium transition-all 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"} 
        ${glow ? "glow" : ""} 
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {disabled ? (
        <div className="flex items-center justify-center gap-2">
          <ClipLoader size={16} color="#ffffff" />
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

interface GlassInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  placeholder,
  value,
  onChange,
  className = "",
  multiline = false,
  rows = 4
}) => {
  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`glass-input px-4 py-3 w-full focus:outline-none focus:ring-2 
        focus:ring-primary focus:border-transparent transition-all ${className}`}
      />
    );
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`glass-input px-4 py-3 w-full focus:outline-none focus:ring-2 
      focus:ring-primary focus:border-transparent transition-all ${className}`}
    />
  );
};

interface GlassDividerProps {
  className?: string;
}

export const GlassDivider: React.FC<GlassDividerProps> = ({ className = "" }) => {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4 ${className}`} />
  );
};