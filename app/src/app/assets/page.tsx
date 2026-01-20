'use client';

/**
 * Deal Assets
 *
 * Central repository for sales collateral, templates, and deal materials.
 * Track usage and keep materials organized.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockDealAssets, getDealById } from '@/data/mockData';
import { formatRelativeDate } from '@/lib/dealLogic';
import type { DealAsset, AssetType } from '@/types';

const assetTypeLabels: Record<AssetType, string> = {
  deck: 'Deck',
  'one-pager': 'One-Pager',
  'case-study': 'Case Study',
  proposal: 'Proposal',
  contract: 'Contract',
  'email-template': 'Email Template',
  other: 'Other',
};

const assetTypeColors: Record<AssetType, string> = {
  deck: 'bg-blue-900/50 text-blue-400 border border-blue-800',
  'one-pager': 'bg-purple-900/50 text-purple-400 border border-purple-800',
  'case-study': 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  proposal: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  contract: 'bg-red-900/50 text-red-400 border border-red-800',
  'email-template': 'bg-cyan-900/50 text-cyan-400 border border-cyan-800',
  other: 'bg-zinc-700 text-zinc-300',
};

const assetTypeIcons: Record<AssetType, string> = {
  deck: '📊',
  'one-pager': '📄',
  'case-study': '📈',
  proposal: '📝',
  contract: '📋',
  'email-template': '✉️',
  other: '📁',
};

export default function AssetsPage() {
  const [selectedAsset, setSelectedAsset] = useState<DealAsset | null>(null);
  const [filterType, setFilterType] = useState<AssetType | 'all'>('all');

  const filteredAssets =
    filterType === 'all'
      ? mockDealAssets
      : mockDealAssets.filter((a) => a.assetType === filterType);

  const sortedAssets = [...filteredAssets].sort(
    (a, b) => b.usageCount - a.usageCount
  );

  // Get unique asset types
  const assetTypes = Array.from(
    new Set(mockDealAssets.map((a) => a.assetType))
  ) as AssetType[];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Deal Assets</h1>
          <p className="text-zinc-500 mt-1">
            {mockDealAssets.length} assets •{' '}
            {mockDealAssets.reduce((sum, a) => sum + a.usageCount, 0)} total uses
          </p>
        </div>
        <Button variant="primary">+ Upload Asset</Button>
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
        {assetTypes.map((type) => (
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
            {assetTypeIcons[type]} {assetTypeLabels[type]}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Grid */}
        <div className="lg:col-span-2">
          {sortedAssets.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <EmptyState
                  title="No assets found"
                  description="Upload your first asset to get started"
                />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedAssets.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;

                return (
                  <Card
                    key={asset.id}
                    hover
                    onClick={() => setSelectedAsset(asset)}
                    className={isSelected ? 'ring-2 ring-zinc-600' : ''}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {assetTypeIcons[asset.assetType]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-medium text-zinc-100 truncate">
                              {asset.name}
                            </h3>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${assetTypeColors[asset.assetType]}`}
                          >
                            {assetTypeLabels[asset.assetType]}
                          </span>
                          <p className="text-xs text-zinc-500 mt-2 line-clamp-2">
                            {asset.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                        <span>Used {asset.usageCount} times</span>
                        {asset.lastUsed && (
                          <span>Last: {formatRelativeDate(asset.lastUsed)}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Asset Detail Panel */}
        <div className="lg:col-span-1">
          {selectedAsset ? (
            <AssetDetailPanel asset={selectedAsset} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-500">Select an asset to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function AssetDetailPanel({ asset }: { asset: DealAsset }) {
  const linkedDeals = asset.linkedDealIds
    .map((id) => getDealById(id))
    .filter(Boolean);

  return (
    <div className="space-y-4 sticky top-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{assetTypeIcons[asset.assetType]}</span>
            <div>
              <CardTitle>{asset.name}</CardTitle>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${assetTypeColors[asset.assetType]}`}
              >
                {assetTypeLabels[asset.assetType]}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-zinc-500 mb-1">Description</p>
            <p className="text-sm text-zinc-300">{asset.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Usage Count</p>
              <p className="text-lg font-semibold text-zinc-200">
                {asset.usageCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Last Used</p>
              <p className="text-sm text-zinc-200">
                {asset.lastUsed
                  ? formatRelativeDate(asset.lastUsed)
                  : 'Never'}
              </p>
            </div>
          </div>

          {asset.fileUrl && (
            <div>
              <p className="text-xs text-zinc-500 mb-2">File</p>
              <a
                href={asset.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Open File
              </a>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="primary" size="sm">
              Use Asset
            </Button>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Content Preview for templates */}
      {asset.content && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Content Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono bg-zinc-800/50 p-3 rounded overflow-x-auto">
              {asset.content}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Linked Deals */}
      {linkedDeals.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Linked Deals</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-zinc-800">
              {linkedDeals.map((deal) => (
                <li key={deal!.id} className="px-5 py-3 hover:bg-zinc-800/50">
                  <p className="text-sm text-zinc-200">{deal!.dealName}</p>
                  <p className="text-xs text-zinc-500 mt-1 capitalize">
                    {deal!.status} • Momentum: {deal!.momentumScore}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
