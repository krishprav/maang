//app/components/ui/Glass.tsx
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
  as?: React.ElementType;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  glow = false,
  disabled = false,
  as: Component = "button",
  ...props
}) => {
  return (
    <Component
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