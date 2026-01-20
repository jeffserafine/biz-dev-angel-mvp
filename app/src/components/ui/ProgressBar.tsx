'use client';

import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  size = 'md',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  // Determine color based on value
  let colorClass = 'bg-emerald-500';
  if (value < 30) colorClass = 'bg-red-500';
  else if (value < 60) colorClass = 'bg-amber-500';

  const heightClass = size === 'sm' ? 'h-1' : 'h-2';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-zinc-800 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${heightClass} ${colorClass} transition-all duration-300`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-400 font-medium w-8 text-right">
          {value}
        </span>
      )}
    </div>
  );
}

// Momentum-specific progress indicator
export function MomentumIndicator({
  score,
  showLabel = true,
}: {
  score: number;
  showLabel?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <ProgressBar value={score} size="sm" className="flex-1" />
      {showLabel && (
        <span
          className={`text-sm font-semibold w-8 text-right ${
            score >= 60
              ? 'text-emerald-400'
              : score >= 30
              ? 'text-amber-400'
              : 'text-red-400'
          }`}
        >
          {score}
        </span>
      )}
    </div>
  );
}
