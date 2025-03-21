// types.ts
export interface Problem {
    Title: string;
    Difficulty: string;
    AcceptanceRate: string;
    Link: string;
    Topics: string;
    Frequency?: string; 
  }
  export interface CompanySelectorProps {
    onSelect: (company: string, duration: string) => Promise<void>;
    disabled?: boolean;
  }