import { ReactNode } from 'react';

type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'muted';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {children}
    </span>
  );
}

// Status-specific badges for common use cases
export function DealStatusBadge({ status }: { status: string }) {
  const variants: Record<string, BadgeVariant> = {
    idea: 'info',
    active: 'success',
    stalled: 'warning',
    'closed-won': 'success',
    'closed-lost': 'danger',
  };

  return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
}

export function RelationshipBadge({ status }: { status: string }) {
  const variants: Record<string, BadgeVariant> = {
    cold: 'muted',
    warming: 'info',
    engaged: 'success',
    champion: 'success',
    dormant: 'warning',
  };

  return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
}

export function AccountTypeBadge({ type }: { type: string }) {
  const variants: Record<string, BadgeVariant> = {
    client: 'success',
    partner: 'info',
    investor: 'warning',
    platform: 'default',
    other: 'muted',
  };

  return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
}
