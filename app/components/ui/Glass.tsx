// app/components/ui/Glass.tsx
import React from "react";
import { ClipLoader } from 'react-spinners';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  glow?: boolean; // Change from string to boolean
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  disabled = false,
  glow = false, // Default to false
  as: Component = "button",
  ...props
}) => {
  return (
    <Component
      className={`px-4 py-2 rounded-xl transition-all
        bg-white/5 border border-white/10 
        hover:bg-white/10 hover:border-white/20
        ${glow ? "shadow-[0_0_10px_-2px_rgba(59,130,246,0.5)]" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
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
    </Component>
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
  const baseStyles = `w-full px-4 py-2 rounded-xl transition-all
    backdrop-blur-lg bg-white/5 border border-white/10 
    focus:outline-none focus:ring-2 focus:ring-primary/50
    placeholder-gray-400 text-white ${className}`;

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={baseStyles}
      />
    );
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={baseStyles}
    />
  );
};

interface GlassDividerProps {
  className?: string;
}

export const GlassDivider: React.FC<GlassDividerProps> = ({ className = "" }) => {
  return (
    <div className={`h-px bg-white/10 my-4 ${className}`} />
  );
};