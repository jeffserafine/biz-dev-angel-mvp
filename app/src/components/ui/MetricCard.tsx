'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  alert?: boolean;
}

export function MetricCard({
  label,
  value,
  subtext,
  trend,
  alert = false,
}: MetricCardProps) {
  const alertStyles = alert ? 'border-amber-800 bg-amber-900/10' : 'border-zinc-800 bg-zinc-900';

  return (
    <div className={`rounded-lg border p-4 ${alertStyles}`}>
      <p className="text-sm text-zinc-500 font-medium">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className={`text-2xl font-semibold ${alert ? 'text-amber-400' : 'text-zinc-100'}`}>
          {value}
        </p>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-red-400'
                : 'text-zinc-500'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-zinc-500 mt-1">{subtext}</p>}
    </div>
  );
}
