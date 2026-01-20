import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'highlight' | 'muted';
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  const clickableClass = onClick ? 'card--clickable' : '';

  return (
    <div
      className={`card ${variantClass} ${clickableClass} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ children, action }: CardHeaderProps) {
  return (
    <div className="card-header">
      <div className="card-header-content">{children}</div>
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export function CardTitle({ children, subtitle }: CardTitleProps) {
  return (
    <div className="card-title-group">
      <h3 className="card-title">{children}</h3>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`card-content ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
}

export function CardFooter({ children }: CardFooterProps) {
  return <div className="card-footer">{children}</div>;
}
