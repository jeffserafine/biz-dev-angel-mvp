'use client';

/**
 * ICP & Target Matrix
 *
 * Manage ideal customer profile targets. Track progression
 * from identified prospects to converted accounts.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockICPTargets, getAccountById } from '@/data/mockData';
import { formatRelativeDate } from '@/lib/dealLogic';
import type { ICPTarget } from '@/types';

type ICPStatus = ICPTarget['status'];

const statusLabels: Record<ICPStatus, string> = {
  identified: 'Identified',
  researching: 'Researching',
  approaching: 'Approaching',
  converted: 'Converted',
  disqualified: 'Disqualified',
};

const statusColors: Record<ICPStatus, string> = {
  identified: 'bg-zinc-700 text-zinc-300',
  researching: 'bg-blue-900/50 text-blue-400 border border-blue-800',
  approaching: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  converted: 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  disqualified: 'bg-red-900/50 text-red-400 border border-red-800',
};

const companySizeLabels: Record<string, string> = {
  startup: 'Startup',
  smb: 'SMB',
  'mid-market': 'Mid-Market',
  enterprise: 'Enterprise',
};

export default function ICPPage() {
  const [filterStatus, setFilterStatus] = useState<ICPStatus | 'all'>('all');

  const filteredTargets =
    filterStatus === 'all'
      ? mockICPTargets
      : mockICPTargets.filter((t) => t.status === filterStatus);

  const sortedTargets = [...filteredTargets].sort(
    (a, b) => b.icpScore - a.icpScore
  );

  // Pipeline stats
  const pipelineStats = {
    identified: mockICPTargets.filter((t) => t.status === 'identified').length,
    researching: mockICPTargets.filter((t) => t.status === 'researching').length,
    approaching: mockICPTargets.filter((t) => t.status === 'approaching').length,
    converted: mockICPTargets.filter((t) => t.status === 'converted').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">ICP & Target Matrix</h1>
          <p className="text-zinc-500 mt-1">
            {mockICPTargets.length} targets • {pipelineStats.converted} converted
          </p>
        </div>
        <Button variant="primary">+ Add Target</Button>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-4 gap-4">
        {(['identified', 'researching', 'approaching', 'converted'] as const).map(
          (status) => (
            <Card key={status} className="text-center">
              <CardContent className="py-4">
                <p className="text-2xl font-semibold text-zinc-100">
                  {pipelineStats[status]}
                </p>
                <p className="text-sm text-zinc-500 mt-1 capitalize">
                  {statusLabels[status]}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
            ${
              filterStatus === 'all'
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }
          `}
        >
          All
        </button>
        {(['identified', 'researching', 'approaching', 'converted', 'disqualified'] as ICPStatus[]).map(
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
              {statusLabels[status]}
            </button>
          )
        )}
      </div>

      {/* Target List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTargets.map((target) => (
          <ICPTargetCard key={target.id} target={target} />
        ))}
      </div>

      {sortedTargets.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500">No targets matching filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ICPTargetCard({ target }: { target: ICPTarget }) {
  const convertedAccount = target.convertedToAccountId
    ? getAccountById(target.convertedToAccountId)
    : null;

  return (
    <Card hover>
      <CardContent className="py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-medium text-zinc-100">
                {target.companyName}
              </h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[target.status]}`}>
                {statusLabels[target.status]}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-zinc-500">
              <span>{target.industry}</span>
              <span>•</span>
              <span>{companySizeLabels[target.companySize]}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">ICP Score</span>
              <span
                className={`text-lg font-semibold ${
                  target.icpScore >= 80
                    ? 'text-emerald-400'
                    : target.icpScore >= 60
                    ? 'text-amber-400'
                    : 'text-zinc-400'
                }`}
              >
                {target.icpScore}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <ProgressBar value={target.icpScore} size="sm" />
        </div>

        {target.notes && (
          <p className="text-sm text-zinc-400 mt-3">{target.notes}</p>
        )}

        {convertedAccount && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <Badge variant="success">
              Converted to: {convertedAccount.name}
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800 text-xs text-zinc-500">
          <span>Added {formatRelativeDate(target.createdAt)}</span>
          <span>Updated {formatRelativeDate(target.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
