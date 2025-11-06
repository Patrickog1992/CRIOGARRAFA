"use client";

import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  title: string;
  subtitle: string;
  onComplete: () => void;
}

export function LoadingScreen({ title, subtitle, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Brief pause before transitioning
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust for speed

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(2 * Math.PI * 45) * (1 - progress / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <span className="text-3xl font-bold text-primary">{progress}%</span>
      </div>
      <h1 className="text-2xl font-bold mt-8 text-primary">{title}</h1>
      <p className="text-muted-foreground mt-2 max-w-md">{subtitle}</p>
    </div>
  );
}
