'use client';

/**
 * Accounts Module
 *
 * Manage strategic accounts and stakeholder relationships.
 * Focused on relationship strength and strategic relevance.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge, RelationshipBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  mockAccounts,
  mockStakeholders,
  mockDeals,
  getStakeholdersByAccount,
} from '@/data/mockData';
import { formatRelativeDate } from '@/lib/dealLogic';
import type { Account, AccountType, Stakeholder } from '@/types';

const accountTypeLabels: Record<AccountType, string> = {
  client: 'Client',
  partner: 'Partner',
  investor: 'Investor',
  platform: 'Platform',
  other: 'Other',
};

const accountTypeColors: Record<AccountType, string> = {
  client: 'bg-emerald-900/50 text-emerald-400 border-emerald-800',
  partner: 'bg-blue-900/50 text-blue-400 border-blue-800',
  investor: 'bg-purple-900/50 text-purple-400 border-purple-800',
  platform: 'bg-amber-900/50 text-amber-400 border-amber-800',
  other: 'bg-zinc-700 text-zinc-300 border-zinc-600',
};

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [filterType, setFilterType] = useState<AccountType | 'all'>('all');

  const filteredAccounts =
    filterType === 'all'
      ? mockAccounts
      : mockAccounts.filter((a) => a.type === filterType);

  const sortedAccounts = [...filteredAccounts].sort(
    (a, b) => b.relationshipStrength - a.relationshipStrength
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Accounts</h1>
          <p className="text-zinc-500 mt-1">
            {mockAccounts.length} accounts • {mockStakeholders.length} stakeholders
          </p>
        </div>
        <Button variant="primary">+ New Account</Button>
      </div>

      {/* Type Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
            ${
              filterType === 'all'
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }
          `}
        >
          All
        </button>
        {(['client', 'partner', 'investor', 'platform'] as AccountType[]).map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                ${
                  filterType === type
                    ? 'bg-zinc-700 text-zinc-100'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }
              `}
            >
              {accountTypeLabels[type]}
            </button>
          )
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Account List */}
        <div className="lg:col-span-2 space-y-4">
          {sortedAccounts.map((account) => {
            const stakeholders = getStakeholdersByAccount(account.id);
            const linkedDeals = mockDeals.filter((d) =>
              d.associatedAccountIds.includes(account.id)
            );
            const isSelected = selectedAccount?.id === account.id;

            return (
              <Card
                key={account.id}
                hover
                onClick={() => setSelectedAccount(account)}
                className={isSelected ? 'ring-2 ring-zinc-600' : ''}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-medium text-zinc-100">
                          {account.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${accountTypeColors[account.type]}`}
                        >
                          {accountTypeLabels[account.type]}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-2">
                        {account.strategicRelevance}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <RelationshipBadge strength={account.relationshipStrength} />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                    <span>{stakeholders.length} stakeholder{stakeholders.length !== 1 ? 's' : ''}</span>
                    <span>{linkedDeals.length} deal{linkedDeals.length !== 1 ? 's' : ''}</span>
                    <span>Updated {formatRelativeDate(account.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Detail Panel */}
        <div className="lg:col-span-1">
          {selectedAccount ? (
            <AccountDetailPanel account={selectedAccount} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-500">Select an account to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function AccountDetailPanel({ account }: { account: Account }) {
  const stakeholders = getStakeholdersByAccount(account.id);
  const linkedDeals = mockDeals.filter((d) =>
    d.associatedAccountIds.includes(account.id)
  );

  return (
    <div className="space-y-4 sticky top-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>{account.name}</CardTitle>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${accountTypeColors[account.type]}`}
            >
              {accountTypeLabels[account.type]}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Strategic Relevance</p>
            <p className="text-sm text-zinc-300">{account.strategicRelevance}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Relationship Strength</p>
              <RelationshipBadge strength={account.relationshipStrength} />
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-6 rounded ${
                    level <= account.relationshipStrength
                      ? 'bg-emerald-500'
                      : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {account.notes && (
            <div>
              <p className="text-xs text-zinc-500 mb-1">Notes</p>
              <p className="text-sm text-zinc-400">{account.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stakeholders */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Stakeholders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {stakeholders.length === 0 ? (
            <p className="px-5 py-4 text-sm text-zinc-500">No stakeholders</p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {stakeholders.map((stakeholder) => (
                <StakeholderRow key={stakeholder.id} stakeholder={stakeholder} />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Linked Deals */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Linked Deals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {linkedDeals.length === 0 ? (
            <p className="px-5 py-4 text-sm text-zinc-500">No linked deals</p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {linkedDeals.map((deal) => (
                <li key={deal.id} className="px-5 py-3">
                  <p className="text-sm text-zinc-200">{deal.dealName}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {deal.status} • Momentum: {deal.momentumScore}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StakeholderRow({ stakeholder }: { stakeholder: Stakeholder }) {
  const statusColors: Record<string, string> = {
    new: 'text-zinc-400',
    warming: 'text-amber-400',
    engaged: 'text-blue-400',
    champion: 'text-emerald-400',
    dormant: 'text-red-400',
  };

  return (
    <li className="px-5 py-3 hover:bg-zinc-800/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-200">{stakeholder.name}</p>
          <p className="text-xs text-zinc-500">{stakeholder.role}</p>
        </div>
        <div className="text-right">
          <Badge variant="muted" className="text-xs capitalize">
            {stakeholder.influenceLevel.replace('-', ' ')}
          </Badge>
          <p className={`text-xs mt-1 capitalize ${statusColors[stakeholder.relationshipStatus]}`}>
            {stakeholder.relationshipStatus}
          </p>
        </div>
      </div>
      {stakeholder.lastContactDate && (
        <p className="text-xs text-zinc-600 mt-1">
          Last contact: {formatRelativeDate(stakeholder.lastContactDate)}
        </p>
      )}
    </li>
  );
}
