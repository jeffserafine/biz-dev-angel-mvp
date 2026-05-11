/**
 * Core Engine — Methodology service layer
 * Surfaces signals, next-best-actions, and momentum logic.
 * This is the methodology moat made visible in code.
 */

import type { Deal, Action, CoreEngineSignal } from './types';

export function computeMomentumScore(deal: Deal, actions: Action[]): number {
  const daysSinceLastAction = Math.floor(
    (Date.now() - new Date(deal.lastActionDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const pendingActions = actions.filter(a => a.linkedDealId === deal.id && !a.completed).length;
  const overdueActions = actions.filter(
    a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
  ).length;

  let score = deal.momentumScore;
  if (daysSinceLastAction > 14) score -= 20;
  else if (daysSinceLastAction > 7) score -= 10;
  if (overdueActions > 0) score -= overdueActions * 15;
  if (pendingActions > 0) score += 5;

  return Math.max(0, Math.min(100, score));
}

export function surfaceSignals(deals: Deal[], actions: Action[]): CoreEngineSignal[] {
  const signals: CoreEngineSignal[] = [];

  deals.forEach(deal => {
    if (deal.status !== 'active' && deal.status !== 'stalled') return;

    const overdue = actions.filter(
      a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
    );
    if (overdue.length > 0) {
      signals.push({
        dealId: deal.id,
        signalType: 'overdue_action',
        message: `${overdue.length} overdue action${overdue.length > 1 ? 's' : ''} on ${deal.dealName}`,
        priority: 1,
      });
    }

    if (deal.momentumScore < 30) {
      signals.push({
        dealId: deal.id,
        signalType: 'momentum_drop',
        message: `${deal.dealName} momentum is critical — consider re-engaging or reassessing`,
        priority: 1,
      });
    }

    if (deal.status === 'stalled') {
      signals.push({
        dealId: deal.id,
        signalType: 'stalled',
        message: `${deal.dealName} is stalled — needs a fresh angle or explicit close/no-close decision`,
        priority: 2,
      });
    }

    if (deal.momentumScore >= 80) {
      signals.push({
        dealId: deal.id,
        signalType: 'high_momentum',
        message: `${deal.dealName} is high momentum — prioritize advancing this week`,
        priority: 3,
      });
    }
  });

  return signals.sort((a, b) => a.priority - b.priority);
}

export function getNextBestAction(deal: Deal, actions: Action[]): string {
  const overdue = actions.filter(
    a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
  );
  if (overdue.length > 0) return `Complete overdue action: ${overdue[0].description}`;
  if (deal.momentumScore < 40) return 'Re-engage primary stakeholder with new value hook';
  if (deal.status === 'stalled') return 'Schedule a direct conversation to assess deal viability';
  return deal.nextBestAction;
}
