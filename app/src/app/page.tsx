'use client';

/**
 * Dashboard / Today View
 *
 * The executive command center. Answers: "What should I do next?"
 * Shows prioritized actions, deal momentum, and key metrics.
 */

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge, DealStatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { MetricCard } from '@/components/ui/MetricCard';
import { MomentumIndicator } from '@/components/ui/ProgressBar';
import {
  mockDeals,
  mockActions,
  mockMeetings,
  mockAccounts,
  getAccountById,
  getDealById,
  getOverdueActions,
} from '@/data/mockData';
import {
  calculateDashboardMetrics,
  formatCurrency,
  formatRelativeDate,
  prioritizeDeals,
} from '@/lib/dealLogic';

export default function Dashboard() {
  const metrics = calculateDashboardMetrics(mockDeals, mockActions, mockMeetings);
  const prioritizedDeals = prioritizeDeals(mockDeals.filter(d => d.status !== 'closed-won' && d.status !== 'closed-lost'));
  const overdueActions = getOverdueActions();
  const upcomingMeetings = mockMeetings
    .filter(m => !m.completed && m.scheduledAt > new Date())
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())
    .slice(0, 3);

  // Get today's actions
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayActions = mockActions.filter(
    a => !a.completed && a.dueDate >= today && a.dueDate < tomorrow
  );

  // Critical actions: overdue + today's critical/high priority
  const criticalActions = [
    ...overdueActions,
    ...todayActions.filter(a => a.priority === 'critical' || a.priority === 'high'),
  ].slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-100">Today</h1>
        <p className="text-zinc-500 mt-1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Active Deals"
          value={metrics.totalActiveDeals}
          subtext={formatCurrency(metrics.totalDealValue) + ' pipeline'}
        />
        <MetricCard
          label="Avg Momentum"
          value={metrics.avgMomentumScore}
          trend={metrics.avgMomentumScore >= 60 ? 'up' : 'down'}
        />
        <MetricCard
          label="Actions Overdue"
          value={metrics.actionsOverdue}
          alert={metrics.actionsOverdue > 0}
        />
        <MetricCard
          label="Meetings This Week"
          value={metrics.meetingsThisWeek}
        />
      </div>

      {/* Main Grid: Actions + Deals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Actions - Left column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Critical Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Priority Actions</span>
                {criticalActions.length > 0 && (
                  <Badge variant="danger">{criticalActions.length}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {criticalActions.length === 0 ? (
                <p className="px-5 py-4 text-sm text-zinc-500">No urgent actions</p>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {criticalActions.map((action) => {
                    const deal = getDealById(action.linkedDealId);
                    const isOverdue = action.dueDate < new Date();
                    return (
                      <li key={action.id} className="px-5 py-3 hover:bg-zinc-800/50">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-zinc-200 truncate">
                              {action.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-zinc-500">
                                {deal?.dealName}
                              </span>
                              <span className={`text-xs ${isOverdue ? 'text-red-400' : 'text-zinc-500'}`}>
                                {isOverdue ? 'Overdue' : formatRelativeDate(action.dueDate)}
                              </span>
                            </div>
                          </div>
                          <PriorityBadge priority={action.priority} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingMeetings.length === 0 ? (
                <p className="px-5 py-4 text-sm text-zinc-500">No upcoming meetings</p>
              ) : (
                <ul className="divide-y divide-zinc-800">
                  {upcomingMeetings.map((meeting) => {
                    const account = getAccountById(meeting.linkedAccountId);
                    return (
                      <li key={meeting.id} className="px-5 py-3 hover:bg-zinc-800/50">
                        <p className="text-sm font-medium text-zinc-200">
                          {meeting.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-zinc-500">
                            {account?.name}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {formatRelativeDate(meeting.scheduledAt)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Deal Pipeline - Right columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Deal Pipeline</CardTitle>
                <Link
                  href="/deals"
                  className="text-sm text-zinc-400 hover:text-zinc-200"
                >
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Deal</th>
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Account</th>
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Status</th>
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Momentum</th>
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Value</th>
                      <th className="text-left text-xs font-medium text-zinc-500 px-5 py-3">Signals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {prioritizedDeals.slice(0, 6).map((deal) => {
                      const account = getAccountById(deal.primaryAccountId);
                      return (
                        <tr
                          key={deal.id}
                          className="hover:bg-zinc-800/50 cursor-pointer"
                        >
                          <td className="px-5 py-4">
                            <Link href={`/deals`} className="text-sm font-medium text-zinc-200 hover:text-zinc-100">
                              {deal.dealName}
                            </Link>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-zinc-400">
                              {account?.name}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <DealStatusBadge status={deal.status} />
                          </td>
                          <td className="px-5 py-4 w-32">
                            <MomentumIndicator score={deal.momentumScore} />
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-sm text-zinc-300">
                              {deal.estimatedValue
                                ? formatCurrency(deal.estimatedValue)
                                : '—'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {deal.signals.slice(0, 2).map((signal, i) => (
                                <Badge key={i} variant="muted" className="text-xs">
                                  {signal}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Next Best Actions for Top Deals */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {prioritizedDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  className="flex items-start gap-4 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-200">
                      {deal.nextBestAction}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {deal.dealName}
                    </p>
                  </div>
                  <MomentumIndicator score={deal.momentumScore} showLabel={false} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
