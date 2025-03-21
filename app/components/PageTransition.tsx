// components/PageTransition.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
      {children}
    </div>
  );
};