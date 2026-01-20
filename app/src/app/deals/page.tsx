'use client';

/**
 * Deal Desk
 *
 * The core of Biz Dev Angel OS. Manage all active deals,
 * track momentum, and see recommended actions.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge, DealStatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MomentumIndicator } from '@/components/ui/ProgressBar';
import {
  mockDeals,
  mockActions,
  getAccountById,
  getActionsByDeal,
} from '@/data/mockData';
import {
  formatCurrency,
  formatRelativeDate,
  prioritizeDeals,
  suggestNextBestAction,
} from '@/lib/dealLogic';
import type { Deal, DealStatus } from '@/types';

type FilterStatus = DealStatus | 'all';

export default function DealsPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const filteredDeals =
    filterStatus === 'all'
      ? mockDeals
      : mockDeals.filter((d) => d.status === filterStatus);

  const prioritizedDeals = prioritizeDeals(filteredDeals);

  const statusCounts = {
    all: mockDeals.length,
    idea: mockDeals.filter((d) => d.status === 'idea').length,
    active: mockDeals.filter((d) => d.status === 'active').length,
    stalled: mockDeals.filter((d) => d.status === 'stalled').length,
    'closed-won': mockDeals.filter((d) => d.status === 'closed-won').length,
    'closed-lost': mockDeals.filter((d) => d.status === 'closed-lost').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Deal Desk</h1>
          <p className="text-zinc-500 mt-1">
            {mockDeals.length} deals • {formatCurrency(
              mockDeals
                .filter((d) => d.status === 'active')
                .reduce((sum, d) => sum + (d.estimatedValue || 0), 0)
            )} active pipeline
          </p>
        </div>
        <Button variant="primary">+ New Deal</Button>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'active', 'idea', 'stalled', 'closed-won', 'closed-lost'] as FilterStatus[]).map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                ${
                  filterStatus === status
                    ? 'bg-zinc-700 text-zinc-100'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }
              `}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              <span className="ml-2 text-xs text-zinc-500">
                {statusCounts[status]}
              </span>
            </button>
          )
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deal List */}
        <div className="lg:col-span-2 space-y-4">
          {prioritizedDeals.map((deal) => {
            const account = getAccountById(deal.primaryAccountId);
            const actions = getActionsByDeal(deal.id);
            const pendingActions = actions.filter((a) => !a.completed);
            const isSelected = selectedDeal?.id === deal.id;

            return (
              <Card
                key={deal.id}
                hover
                onClick={() => setSelectedDeal(deal)}
                className={isSelected ? 'ring-2 ring-zinc-600' : ''}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-medium text-zinc-100 truncate">
                          {deal.dealName}
                        </h3>
                        <DealStatusBadge status={deal.status} />
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">
                        {account?.name}
                      </p>
                      <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                        {deal.dealThesis}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-semibold text-zinc-200">
                        {deal.estimatedValue
                          ? formatCurrency(deal.estimatedValue)
                          : '—'}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {deal.valueType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <MomentumIndicator score={deal.momentumScore} />
                      </div>
                      {pendingActions.length > 0 && (
                        <span className="text-xs text-zinc-500">
                          {pendingActions.length} pending action
                          {pendingActions.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    {deal.targetCloseDate && (
                      <span className="text-xs text-zinc-500">
                        Target: {formatRelativeDate(deal.targetCloseDate)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Deal Detail Panel */}
        <div className="lg:col-span-1">
          {selectedDeal ? (
            <DealDetailPanel deal={selectedDeal} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-500">Select a deal to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function DealDetailPanel({ deal }: { deal: Deal }) {
  const account = getAccountById(deal.primaryAccountId);
  const actions = getActionsByDeal(deal.id);
  const suggestion = suggestNextBestAction(deal);

  return (
    <div className="space-y-4 sticky top-8">
      <Card>
        <CardHeader>
          <CardTitle>{deal.dealName}</CardTitle>
          <CardDescription>{account?.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Deal Thesis</p>
            <p className="text-sm text-zinc-300">{deal.dealThesis}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Value</p>
              <p className="text-sm font-medium text-zinc-200">
                {deal.estimatedValue
                  ? formatCurrency(deal.estimatedValue)
                  : 'TBD'}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Type</p>
              <p className="text-sm text-zinc-200 capitalize">{deal.valueType}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-2">Momentum</p>
            <MomentumIndicator score={deal.momentumScore} />
          </div>

          {deal.notes && (
            <div>
              <p className="text-xs text-zinc-500 mb-1">Notes</p>
              <p className="text-sm text-zinc-400">{deal.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Action */}
      <Card className="border-emerald-900/50 bg-emerald-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-emerald-400">
            Recommended Action
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-200">{suggestion.action}</p>
          <p className="text-xs text-zinc-500 mt-2">{suggestion.rationale}</p>
          <div className="mt-3">
            <PriorityBadge priority={suggestion.priority} />
          </div>
        </CardContent>
      </Card>

      {/* Actions List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {actions.length === 0 ? (
            <p className="px-5 py-4 text-sm text-zinc-500">No actions yet</p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {actions.map((action) => (
                <li
                  key={action.id}
                  className={`px-5 py-3 ${
                    action.completed ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={action.completed}
                      readOnly
                      className="mt-1 rounded border-zinc-600 bg-zinc-800"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          action.completed
                            ? 'text-zinc-500 line-through'
                            : 'text-zinc-200'
                        }`}
                      >
                        {action.description}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {formatRelativeDate(action.dueDate)}
                      </p>
                    </div>
                    <PriorityBadge priority={action.priority} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
