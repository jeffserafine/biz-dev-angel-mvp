'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { DealStatusBadge } from '../ui/Badge';
import { MomentumMeter, MomentumIndicator } from '../ui/MomentumMeter';
import { ActionList } from '../ui/ActionItem';
import { getDealHealthIndicators } from '@/data/mockData';
import type { Deal, DealStatus } from '@/lib/types';
import { Briefcase, Filter, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DealDesk() {
  const { deals, actions, accounts, getAccountById, getActionsByDeal } = useApp();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [filterStatus, setFilterStatus] = useState<DealStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'momentum' | 'updated' | 'value'>('momentum');

  // Filter and sort deals
  const filteredDeals = deals
    .filter(deal => filterStatus === 'all' || deal.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'momentum') return b.momentumScore - a.momentumScore;
      if (sortBy === 'updated') return b.updatedAt.localeCompare(a.updatedAt);
      return 0;
    });

  const statusOptions: (DealStatus | 'all')[] = [
    'all',
    'idea',
    'active',
    'stalled',
    'closed-won',
    'closed-lost',
  ];

  // Get associated account names
  const getAccountNames = (accountIds: string[]) =>
    accountIds
      .map(id => getAccountById(id)?.name)
      .filter(Boolean)
      .join(', ');

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Deal Desk</h1>
          <p className="module-subtitle">Your strategic opportunity pipeline</p>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <Filter size={16} />
          {statusOptions.map(status => (
            <button
              key={status}
              className={`filter-chip ${filterStatus === status ? 'filter-chip--active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'All Deals' : status}
            </button>
          ))}
        </div>
        <div className="sort-group">
          <span className="sort-label">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="sort-select"
          >
            <option value="momentum">Momentum</option>
            <option value="updated">Last Updated</option>
          </select>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="pipeline-summary">
        <div className="pipeline-stat">
          <span className="pipeline-stat-value">
            {deals.filter(d => d.status === 'active').length}
          </span>
          <span className="pipeline-stat-label">Active</span>
        </div>
        <div className="pipeline-stat">
          <span className="pipeline-stat-value">
            {deals.filter(d => d.status === 'stalled').length}
          </span>
          <span className="pipeline-stat-label">Stalled</span>
        </div>
        <div className="pipeline-stat">
          <span className="pipeline-stat-value">
            {Math.round(
              deals
                .filter(d => d.status === 'active')
                .reduce((sum, d) => sum + d.momentumScore, 0) /
                deals.filter(d => d.status === 'active').length || 0
            )}
          </span>
          <span className="pipeline-stat-label">Avg Momentum</span>
        </div>
      </div>

      <div className="deal-desk-layout">
        {/* Deal List */}
        <div className="deal-list-container">
          {filteredDeals.map(deal => {
            const { health, recommendation } = getDealHealthIndicators(deal);
            const isSelected = selectedDeal?.id === deal.id;

            return (
              <Card
                key={deal.id}
                onClick={() => setSelectedDeal(deal)}
                variant={isSelected ? 'highlight' : 'default'}
                className={`deal-card ${health === 'critical' ? 'deal-card--critical' : ''}`}
              >
                <CardContent>
                  <div className="deal-card-header">
                    <Briefcase size={18} />
                    <DealStatusBadge status={deal.status} />
                    <MomentumIndicator score={deal.momentumScore} />
                  </div>

                  <h3 className="deal-card-title">{deal.dealName}</h3>

                  <p className="deal-card-accounts">
                    {getAccountNames(deal.associatedAccountIds)}
                  </p>

                  <MomentumMeter score={deal.momentumScore} size="sm" />

                  {deal.potentialValue && (
                    <div className="deal-card-value">{deal.potentialValue}</div>
                  )}

                  <div className="deal-card-next">
                    <span className="next-label">Next:</span>
                    <span className="next-action">{deal.nextBestAction}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Deal Detail Panel */}
        {selectedDeal ? (
          <div className="deal-detail">
            <Card>
              <CardHeader>
                <CardTitle subtitle={getAccountNames(selectedDeal.associatedAccountIds)}>
                  {selectedDeal.dealName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="deal-detail-status">
                  <DealStatusBadge status={selectedDeal.status} />
                  {selectedDeal.potentialValue && (
                    <span className="deal-value">{selectedDeal.potentialValue}</span>
                  )}
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">
                    <TrendingUp size={16} /> Momentum
                  </h4>
                  <MomentumMeter score={selectedDeal.momentumScore} size="lg" />
                  <p className="momentum-insight">
                    {getDealHealthIndicators(selectedDeal).recommendation}
                  </p>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">Deal Thesis</h4>
                  <p className="detail-text">{selectedDeal.dealThesis}</p>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">Last Action</h4>
                  <p className="detail-text">
                    {selectedDeal.lastAction}
                    <span className="detail-date"> • {selectedDeal.lastActionDate}</span>
                  </p>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">
                    <AlertTriangle size={16} /> Next Best Action
                  </h4>
                  <div className="next-best-action">
                    <p className="nba-text">{selectedDeal.nextBestAction}</p>
                    {selectedDeal.nextActionDueDate && (
                      <span className="nba-due">Due: {selectedDeal.nextActionDueDate}</span>
                    )}
                  </div>
                </div>

                {selectedDeal.notes && (
                  <div className="detail-section">
                    <h4 className="detail-label">Notes</h4>
                    <p className="detail-text">{selectedDeal.notes}</p>
                  </div>
                )}

                {/* Associated Actions */}
                <div className="detail-section">
                  <h4 className="detail-label">Actions</h4>
                  <ActionList
                    actions={getActionsByDeal(selectedDeal.id).filter(a => !a.completed)}
                    compact
                    emptyMessage="No pending actions"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="deal-detail deal-detail--empty">
            <Briefcase size={48} />
            <p>Select a deal to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
