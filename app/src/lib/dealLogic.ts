/**
 * Biz Dev Angel OS - Invisible Logic
 *
 * This module contains the simulated "AI" logic for:
 * - Deal momentum scoring
 * - Next-best-action suggestions
 * - Signal-based prioritization
 *
 * In production, these would be ML models or more sophisticated algorithms.
 * For MVP, we use heuristic-based calculations.
 */

import type { Deal, Action, Stakeholder, Meeting, Account } from '@/types';
import {
  getActionsByDeal,
  getMeetingsByDeal,
  getStakeholdersByAccount,
  getAccountById,
} from '@/data/mockData';

// ============================================================================
// MOMENTUM SCORING
// ============================================================================

interface MomentumFactors {
  recencyScore: number; // Recent activity = higher momentum
  engagementScore: number; // Stakeholder engagement level
  actionCompletionScore: number; // Completed vs overdue actions
  meetingScore: number; // Upcoming meetings = momentum
  stakeholderScore: number; // Champion involvement
  ageDecay: number; // Older deals without progress lose momentum
}

/**
 * Calculate deal momentum score (0-100)
 * Higher scores indicate deals more likely to close
 */
export function calculateMomentumScore(deal: Deal): number {
  const factors = getMomentumFactors(deal);

  // Weighted average of factors
  const weights = {
    recency: 0.25,
    engagement: 0.20,
    actionCompletion: 0.20,
    meeting: 0.15,
    stakeholder: 0.15,
    ageDecay: 0.05,
  };

  const score =
    factors.recencyScore * weights.recency +
    factors.engagementScore * weights.engagement +
    factors.actionCompletionScore * weights.actionCompletion +
    factors.meetingScore * weights.meeting +
    factors.stakeholderScore * weights.stakeholder -
    factors.ageDecay * weights.ageDecay;

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getMomentumFactors(deal: Deal): MomentumFactors {
  const now = new Date();
  const actions = getActionsByDeal(deal.id);
  const meetings = getMeetingsByDeal(deal.id);
  const account = getAccountById(deal.primaryAccountId);
  const stakeholders = account ? getStakeholdersByAccount(account.id) : [];

  // Recency: Days since last update (max 30 days consideration)
  const daysSinceUpdate = Math.floor(
    (now.getTime() - deal.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const recencyScore = Math.max(0, 100 - daysSinceUpdate * 5);

  // Engagement: Based on account relationship strength
  const engagementScore = account ? account.relationshipStrength * 20 : 20;

  // Action completion: Ratio of completed to total actions
  const completedActions = actions.filter((a) => a.completed).length;
  const overdueActions = actions.filter(
    (a) => !a.completed && a.dueDate < now
  ).length;
  const actionCompletionScore =
    actions.length > 0
      ? ((completedActions / actions.length) * 100) - (overdueActions * 10)
      : 50;

  // Meetings: Upcoming meetings boost momentum
  const upcomingMeetings = meetings.filter(
    (m) => !m.completed && m.scheduledAt > now
  ).length;
  const meetingScore = Math.min(100, upcomingMeetings * 30 + 40);

  // Stakeholder: Champion involvement
  const hasChampion = stakeholders.some(
    (s) => s.relationshipStatus === 'champion'
  );
  const hasDecisionMaker = stakeholders.some(
    (s) => s.influenceLevel === 'decision-maker'
  );
  const stakeholderScore =
    (hasChampion ? 50 : 0) + (hasDecisionMaker ? 50 : 25);

  // Age decay: Older deals lose momentum if stalled
  const dealAge = Math.floor(
    (now.getTime() - deal.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const ageDecay = deal.status === 'stalled' ? Math.min(50, dealAge / 2) : 0;

  return {
    recencyScore,
    engagementScore,
    actionCompletionScore: Math.max(0, actionCompletionScore),
    meetingScore,
    stakeholderScore,
    ageDecay,
  };
}

// ============================================================================
// NEXT BEST ACTION SUGGESTIONS
// ============================================================================

interface ActionSuggestion {
  action: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  rationale: string;
}

/**
 * Generate next-best-action suggestion for a deal
 * Based on deal status, momentum, and missing activities
 */
export function suggestNextBestAction(deal: Deal): ActionSuggestion {
  const actions = getActionsByDeal(deal.id);
  const meetings = getMeetingsByDeal(deal.id);
  const account = getAccountById(deal.primaryAccountId);
  const stakeholders = account ? getStakeholdersByAccount(account.id) : [];
  const now = new Date();

  // Check for overdue actions first
  const overdueActions = actions.filter(
    (a) => !a.completed && a.dueDate < now
  );
  if (overdueActions.length > 0) {
    const critical = overdueActions.find((a) => a.priority === 'critical');
    if (critical) {
      return {
        action: `Complete overdue: ${critical.description}`,
        priority: 'critical',
        rationale: 'Critical action is overdue and blocking deal progress',
      };
    }
    return {
      action: `Clear ${overdueActions.length} overdue action(s)`,
      priority: 'high',
      rationale: 'Overdue actions signal lack of momentum to stakeholders',
    };
  }

  // Check for decision-maker engagement
  const hasDecisionMakerEngaged = stakeholders.some(
    (s) =>
      s.influenceLevel === 'decision-maker' &&
      (s.relationshipStatus === 'engaged' || s.relationshipStatus === 'champion')
  );
  if (!hasDecisionMakerEngaged && deal.status === 'active') {
    return {
      action: 'Get meeting with decision-maker',
      priority: 'high',
      rationale: 'No decision-maker engagement. Deal cannot close without exec buy-in.',
    };
  }

  // Check for upcoming meetings
  const upcomingMeetings = meetings.filter(
    (m) => !m.completed && m.scheduledAt > now
  );
  if (upcomingMeetings.length === 0 && deal.status === 'active') {
    return {
      action: 'Schedule next touchpoint meeting',
      priority: 'medium',
      rationale: 'No meetings scheduled. Maintain momentum with regular contact.',
    };
  }

  // Check deal status
  if (deal.status === 'stalled') {
    return {
      action: 'Re-engage champion with new value prop or timeline',
      priority: 'high',
      rationale: 'Deal is stalled. Need creative approach to restart momentum.',
    };
  }

  if (deal.status === 'idea') {
    return {
      action: 'Validate deal thesis with initial discovery call',
      priority: 'medium',
      rationale: 'Deal is still an idea. Need to validate opportunity before investing more time.',
    };
  }

  // Default: Continue execution
  const pendingActions = actions.filter((a) => !a.completed);
  if (pendingActions.length > 0) {
    const nextAction = pendingActions.sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
    )[0];
    return {
      action: nextAction.description,
      priority: nextAction.priority,
      rationale: 'Continue executing on planned actions.',
    };
  }

  return {
    action: 'Define next milestone and create action plan',
    priority: 'medium',
    rationale: 'All actions complete. Time to plan next phase.',
  };
}

// ============================================================================
// SIGNAL-BASED PRIORITIZATION
// ============================================================================

interface PrioritizedDeal extends Deal {
  priorityRank: number;
  signals: string[];
}

/**
 * Prioritize deals based on multiple signals
 * Returns deals sorted by priority with signal explanations
 */
export function prioritizeDeals(deals: Deal[]): PrioritizedDeal[] {
  return deals
    .map((deal) => {
      const signals: string[] = [];
      let priorityScore = 0;

      // High momentum = high priority
      if (deal.momentumScore >= 70) {
        signals.push('High momentum - keep pushing');
        priorityScore += 30;
      } else if (deal.momentumScore < 30) {
        signals.push('Low momentum - needs attention');
        priorityScore += 20; // Still important to address
      }

      // Close to target date
      if (deal.targetCloseDate) {
        const daysToClose = Math.floor(
          (deal.targetCloseDate.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (daysToClose <= 14 && daysToClose > 0) {
          signals.push('Closing soon');
          priorityScore += 25;
        } else if (daysToClose <= 0) {
          signals.push('Past target close date');
          priorityScore += 15;
        }
      }

      // High value deals
      if (deal.estimatedValue && deal.estimatedValue >= 500000) {
        signals.push('High value opportunity');
        priorityScore += 20;
      }

      // Active status
      if (deal.status === 'active') {
        priorityScore += 15;
      } else if (deal.status === 'stalled') {
        signals.push('Stalled - needs intervention');
        priorityScore += 10;
      }

      // Check for overdue actions
      const actions = getActionsByDeal(deal.id);
      const overdueCount = actions.filter(
        (a) => !a.completed && a.dueDate < new Date()
      ).length;
      if (overdueCount > 0) {
        signals.push(`${overdueCount} overdue action(s)`);
        priorityScore += 15;
      }

      return {
        ...deal,
        priorityRank: priorityScore,
        signals,
      };
    })
    .sort((a, b) => b.priorityRank - a.priorityRank);
}

// ============================================================================
// DASHBOARD METRICS CALCULATION
// ============================================================================

export interface CalculatedMetrics {
  totalActiveDeals: number;
  totalDealValue: number;
  avgMomentumScore: number;
  dealsAtRisk: number;
  actionsOverdue: number;
  actionsDueToday: number;
  meetingsThisWeek: number;
}

export function calculateDashboardMetrics(
  deals: Deal[],
  actions: Action[],
  meetings: Meeting[]
): CalculatedMetrics {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const weekFromNow = new Date(now);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  const activeDeals = deals.filter((d) => d.status === 'active');

  return {
    totalActiveDeals: activeDeals.length,
    totalDealValue: activeDeals.reduce(
      (sum, d) => sum + (d.estimatedValue || 0),
      0
    ),
    avgMomentumScore:
      activeDeals.length > 0
        ? Math.round(
            activeDeals.reduce((sum, d) => sum + d.momentumScore, 0) /
              activeDeals.length
          )
        : 0,
    dealsAtRisk: deals.filter((d) => d.momentumScore < 30).length,
    actionsOverdue: actions.filter((a) => !a.completed && a.dueDate < now)
      .length,
    actionsDueToday: actions.filter(
      (a) => !a.completed && a.dueDate >= today && a.dueDate < tomorrow
    ).length,
    meetingsThisWeek: meetings.filter(
      (m) => !m.completed && m.scheduledAt >= now && m.scheduledAt <= weekFromNow
    ).length,
  };
}

// ============================================================================
// HELPER: FORMAT CURRENCY
// ============================================================================

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

// ============================================================================
// HELPER: FORMAT RELATIVE DATE
// ============================================================================

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      return 'Now';
    }
    if (diffHours > 0) {
      return `In ${diffHours}h`;
    }
    return `${Math.abs(diffHours)}h ago`;
  }

  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
