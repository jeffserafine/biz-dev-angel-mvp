'use client';

import { useApp } from '@/lib/store';
import type { Action } from '@/lib/types';
import { Badge } from './Badge';
import {
  Mail,
  Phone,
  Users,
  Linkedin,
  FileText,
  RefreshCw,
  Search,
  Settings,
  CheckCircle,
  Circle,
} from 'lucide-react';

interface ActionItemProps {
  action: Action;
  showDeal?: boolean;
  compact?: boolean;
}

const actionIcons: Record<string, React.ReactNode> = {
  email: <Mail size={16} />,
  call: <Phone size={16} />,
  meeting: <Users size={16} />,
  linkedin: <Linkedin size={16} />,
  'intro-request': <Users size={16} />,
  proposal: <FileText size={16} />,
  'follow-up': <RefreshCw size={16} />,
  research: <Search size={16} />,
  internal: <Settings size={16} />,
  other: <Circle size={16} />,
};

export function ActionItem({ action, showDeal = false, compact = false }: ActionItemProps) {
  const { completeAction, getDealById, getStakeholderById } = useApp();

  const deal = getDealById(action.linkedDealId);
  const stakeholder = action.linkedStakeholderId
    ? getStakeholderById(action.linkedStakeholderId)
    : null;

  const isOverdue = !action.completed && new Date(action.dueDate) < new Date();

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    completeAction(action.id);
  };

  if (compact) {
    return (
      <div className={`action-item action-item--compact ${isOverdue ? 'action-item--overdue' : ''}`}>
        <button
          className="action-checkbox"
          onClick={handleComplete}
          aria-label={action.completed ? 'Completed' : 'Mark complete'}
        >
          {action.completed ? (
            <CheckCircle size={18} className="text-success" />
          ) : (
            <Circle size={18} />
          )}
        </button>
        <span className="action-icon">{actionIcons[action.actionType]}</span>
        <span className="action-description">{action.description}</span>
      </div>
    );
  }

  return (
    <div
      className={`action-item ${action.completed ? 'action-item--completed' : ''} ${isOverdue ? 'action-item--overdue' : ''}`}
    >
      <button
        className="action-checkbox"
        onClick={handleComplete}
        aria-label={action.completed ? 'Completed' : 'Mark complete'}
      >
        {action.completed ? (
          <CheckCircle size={20} className="text-success" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      <div className="action-content">
        <div className="action-header">
          <span className="action-icon">{actionIcons[action.actionType]}</span>
          <Badge variant="muted" size="sm">
            {action.actionType}
          </Badge>
          {isOverdue && <Badge variant="danger" size="sm">overdue</Badge>}
        </div>

        <p className="action-description">{action.description}</p>

        <div className="action-meta">
          {showDeal && deal && (
            <span className="action-deal">📋 {deal.dealName}</span>
          )}
          {stakeholder && (
            <span className="action-stakeholder">👤 {stakeholder.name}</span>
          )}
          <span className="action-due">Due: {action.dueDate}</span>
        </div>
      </div>
    </div>
  );
}

// List of actions with optional filtering
interface ActionListProps {
  actions: Action[];
  showDeal?: boolean;
  compact?: boolean;
  emptyMessage?: string;
}

export function ActionList({
  actions,
  showDeal = false,
  compact = false,
  emptyMessage = 'No actions',
}: ActionListProps) {
  if (actions.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="action-list">
      {actions.map(action => (
        <ActionItem
          key={action.id}
          action={action}
          showDeal={showDeal}
          compact={compact}
        />
      ))}
    </div>
  );
}
