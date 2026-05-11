'use client';

import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ActionList } from '../ui/ActionItem';
import { MomentumMeter } from '../ui/MomentumMeter';
import { DealStatusBadge } from '../ui/Badge';
import { getDealHealthIndicators } from '@/data/mockData';
import { surfaceSignals } from '@/lib/coreEngine';
import { ArrowRight, TrendingUp, AlertTriangle, Zap, Radio } from 'lucide-react';

export default function Dashboard() {
  const { deals, actions, accounts, setCurrentModule } = useApp();

  // Today's date for filtering
  const today = new Date().toISOString().split('T')[0];

  // Get actions due today or overdue
  const urgentActions = actions
    .filter(a => !a.completed && a.dueDate <= today)
    .slice(0, 5);

  // Get upcoming actions (next 7 days)
  const upcomingActions = actions
    .filter(a => !a.completed && a.dueDate > today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 5);

  // Deals requiring attention (momentum < 50 or stalled)
  const dealsNeedingAttention = deals
    .filter(d => (d.status === 'active' && d.momentumScore < 50) || d.status === 'stalled')
    .slice(0, 3);

  // High momentum deals
  const highMomentumDeals = deals
    .filter(d => d.status === 'active' && d.momentumScore >= 70)
    .sort((a, b) => b.momentumScore - a.momentumScore)
    .slice(0, 3);

  // Summary stats
  const activeDeals = deals.filter(d => d.status === 'active').length;
  const totalAccounts = accounts.length;
  const pendingActions = actions.filter(a => !a.completed).length;

  // Core Engine signals — methodology-driven cues
  const coreSignals = surfaceSignals(deals, actions);
  const topCoreSignals = coreSignals.slice(0, 3);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Today</h1>
          <p className="module-subtitle">Your executive command center</p>
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </header>

      {/* Quick Stats */}
      <div className="stats-grid">
        <Card>
          <CardContent>
            <div className="stat-item">
              <span className="stat-value">{activeDeals}</span>
              <span className="stat-label">Active Deals</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="stat-item">
              <span className="stat-value">{pendingActions}</span>
              <span className="stat-label">Pending Actions</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="stat-item">
              <span className="stat-value">{totalAccounts}</span>
              <span className="stat-label">Accounts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-grid">
        {/* Urgent Actions */}
        <Card className="dashboard-card">
          <CardHeader action={
            <button className="link-button" onClick={() => setCurrentModule('deal-map')}>
              View all <ArrowRight size={14} />
            </button>
          }>
            <CardTitle>
              <Zap size={18} className="text-warning" /> Urgent Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActionList
              actions={urgentActions}
              showDeal={true}
              emptyMessage="No urgent actions. You're on track!"
            />
          </CardContent>
        </Card>

        {/* High Momentum Deals */}
        <Card className="dashboard-card">
          <CardHeader action={
            <button className="link-button" onClick={() => setCurrentModule('deal-map')}>
              View all <ArrowRight size={14} />
            </button>
          }>
            <CardTitle>
              <TrendingUp size={18} className="text-success" /> High Momentum
            </CardTitle>
          </CardHeader>
          <CardContent>
            {highMomentumDeals.length === 0 ? (
              <p className="empty-state">No deals with high momentum</p>
            ) : (
              <div className="deal-list">
                {highMomentumDeals.map(deal => {
                  const { health } = getDealHealthIndicators(deal);
                  return (
                    <div key={deal.id} className="deal-item">
                      <div className="deal-item-header">
                        <span className="deal-name">{deal.dealName}</span>
                        <DealStatusBadge status={deal.status} />
                      </div>
                      <MomentumMeter score={deal.momentumScore} size="sm" />
                      <p className="deal-next-action">
                        Next: {deal.nextBestAction}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Core Engine Signals */}
        <Card className="dashboard-card">
          <CardHeader action={
            <button className="link-button" onClick={() => setCurrentModule('deal-map')}>
              Open DealMap <ArrowRight size={14} />
            </button>
          }>
            <CardTitle>
              <Radio size={18} className="text-warning" /> Core Engine Signals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topCoreSignals.length === 0 ? (
              <p className="empty-state">No signals — pipeline is steady</p>
            ) : (
              <ul className="core-engine-dashboard-list">
                {topCoreSignals.map((signal, idx) => (
                  <li
                    key={`${signal.dealId}-${signal.signalType}-${idx}`}
                    className={`core-engine-dashboard-item core-engine-signal--p${signal.priority}`}
                  >
                    <button
                      type="button"
                      className="core-engine-dashboard-button"
                      onClick={() => setCurrentModule('deal-map')}
                    >
                      {signal.message}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Deals Needing Attention */}
        <Card className="dashboard-card">
          <CardHeader action={
            <button className="link-button" onClick={() => setCurrentModule('deal-map')}>
              View all <ArrowRight size={14} />
            </button>
          }>
            <CardTitle>
              <AlertTriangle size={18} className="text-danger" /> Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dealsNeedingAttention.length === 0 ? (
              <p className="empty-state">All deals healthy</p>
            ) : (
              <div className="deal-list">
                {dealsNeedingAttention.map(deal => {
                  const { recommendation } = getDealHealthIndicators(deal);
                  return (
                    <div key={deal.id} className="deal-item deal-item--warning">
                      <div className="deal-item-header">
                        <span className="deal-name">{deal.dealName}</span>
                        <DealStatusBadge status={deal.status} />
                      </div>
                      <MomentumMeter score={deal.momentumScore} size="sm" />
                      <p className="deal-recommendation">{recommendation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* What Should I Do Next Section */}
      <Card className="next-action-card">
        <CardContent>
          <h2 className="next-action-title">What should I do next?</h2>
          {urgentActions.length > 0 ? (
            <div className="next-action-content">
              <p className="next-action-recommendation">
                You have <strong>{urgentActions.length} urgent action{urgentActions.length > 1 ? 's' : ''}</strong> requiring attention.
                Focus on completing these before moving to other tasks.
              </p>
              <div className="next-action-primary">
                <span className="next-action-label">Top Priority:</span>
                <span className="next-action-text">{urgentActions[0]?.description}</span>
              </div>
            </div>
          ) : topCoreSignals.length > 0 ? (
            <div className="next-action-content">
              <p className="next-action-recommendation">
                No urgent actions queued. The Core Engine surfaced{' '}
                <strong>{topCoreSignals.length} signal{topCoreSignals.length > 1 ? 's' : ''}</strong>{' '}
                worth addressing.
              </p>
              <div className="next-action-primary">
                <span className="next-action-label">Top Signal:</span>
                <span className="next-action-text">{topCoreSignals[0].message}</span>
              </div>
            </div>
          ) : upcomingActions.length > 0 ? (
            <div className="next-action-content">
              <p className="next-action-recommendation">
                No urgent items. Your next action is due{' '}
                <strong>{upcomingActions[0]?.dueDate}</strong>.
              </p>
              <div className="next-action-primary">
                <span className="next-action-label">Next Up:</span>
                <span className="next-action-text">{upcomingActions[0]?.description}</span>
              </div>
            </div>
          ) : (
            <p className="next-action-recommendation">
              All caught up! Consider reviewing your deal pipeline or reaching out to dormant relationships.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
