'use client';

import React from 'react';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-zinc-700 text-zinc-100',
  success: 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  warning: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  danger: 'bg-red-900/50 text-red-400 border border-red-800',
  info: 'bg-blue-900/50 text-blue-400 border border-blue-800',
  muted: 'bg-zinc-800 text-zinc-500',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Status-specific badges for common use cases
export function DealStatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, BadgeVariant> = {
    idea: 'info',
    active: 'success',
    stalled: 'warning',
    'closed-won': 'success',
    'closed-lost': 'danger',
  };

  const labelMap: Record<string, string> = {
    idea: 'Idea',
    active: 'Active',
    stalled: 'Stalled',
    'closed-won': 'Won',
    'closed-lost': 'Lost',
  };

  return (
    <Badge variant={statusMap[status] || 'default'}>
      {labelMap[status] || status}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const priorityMap: Record<string, BadgeVariant> = {
    critical: 'danger',
    high: 'warning',
    medium: 'info',
    low: 'muted',
  };

  return (
    <Badge variant={priorityMap[priority] || 'default'}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}

export function MomentumBadge({ score }: { score: number }) {
  let variant: BadgeVariant = 'success';
  if (score < 30) variant = 'danger';
  else if (score < 60) variant = 'warning';

  return <Badge variant={variant}>{score}</Badge>;
}

export function RelationshipBadge({ strength }: { strength: number }) {
  const labels = ['', 'Cold', 'Warming', 'Engaged', 'Strong', 'Champion'];
  const variants: BadgeVariant[] = [
    'muted',
    'danger',
    'warning',
    'info',
    'success',
    'success',
  ];

  return (
    <Badge variant={variants[strength] || 'muted'}>
      {labels[strength] || 'Unknown'}
    </Badge>
  );
}
