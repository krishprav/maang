// components/ErrorBoundary.tsx
"use client";
import { Component, ErrorInfo, ReactNode } from 'react';
import { GlassCard } from './ui/Glass';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <GlassCard className="p-6 text-red-400">
          <h2 className="text-xl font-bold">⚠️ Loading Failed</h2>
          <p className="mt-2">{this.state.error?.message}</p>
          <p className="text-sm mt-4">
            Check: 
            1. CSV files exist in /public/company-data
            2. Correct company/duration spelling
            3. Network connection
          </p>
        </GlassCard>
      );
    }

    return this.props.children;
  }
}