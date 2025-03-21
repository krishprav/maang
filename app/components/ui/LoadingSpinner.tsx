// src/components/LoadingSpinner.tsx
export const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce" />
      <div className="w-4 h-4 bg-secondary rounded-full animate-bounce delay-100" />
      <div className="w-4 h-4 bg-accent rounded-full animate-bounce delay-200" />
    </div>
  );