'use client';

/**
 * Outreach Studio
 *
 * Manage outreach campaigns and email templates.
 * Track response rates and campaign performance.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockOutreachCampaigns, mockDealAssets, getDealById } from '@/data/mockData';
import { formatRelativeDate } from '@/lib/dealLogic';
import type { OutreachCampaign, OutreachStatus, DealAsset } from '@/types';

const statusLabels: Record<OutreachStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
};

const statusColors: Record<OutreachStatus, string> = {
  draft: 'bg-zinc-700 text-zinc-300',
  active: 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  paused: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  completed: 'bg-blue-900/50 text-blue-400 border border-blue-800',
};

export default function OutreachPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<OutreachCampaign | null>(null);

  // Get email templates from deal assets
  const emailTemplates = mockDealAssets.filter(
    (a) => a.assetType === 'email-template'
  );

  // Calculate stats
  const totalSent = mockOutreachCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalResponses = mockOutreachCampaigns.reduce((sum, c) => sum + c.responseCount, 0);
  const avgResponseRate = totalSent > 0 ? ((totalResponses / totalSent) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Outreach Studio</h1>
          <p className="text-zinc-500 mt-1">
            {mockOutreachCampaigns.length} campaigns • {avgResponseRate}% avg response rate
          </p>
        </div>
        <Button variant="primary">+ New Campaign</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-semibold text-zinc-100">
              {mockOutreachCampaigns.filter((c) => c.status === 'active').length}
            </p>
            <p className="text-sm text-zinc-500 mt-1">Active Campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-semibold text-zinc-100">{totalSent}</p>
            <p className="text-sm text-zinc-500 mt-1">Messages Sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-semibold text-zinc-100">{totalResponses}</p>
            <p className="text-sm text-zinc-500 mt-1">Responses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-semibold text-emerald-400">{avgResponseRate}%</p>
            <p className="text-sm text-zinc-500 mt-1">Response Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-medium text-zinc-200">Campaigns</h2>
          {mockOutreachCampaigns.map((campaign) => {
            const linkedDeal = campaign.linkedDealId
              ? getDealById(campaign.linkedDealId)
              : null;
            const responseRate =
              campaign.sentCount > 0
                ? ((campaign.responseCount / campaign.sentCount) * 100).toFixed(1)
                : '0';
            const isSelected = selectedCampaign?.id === campaign.id;

            return (
              <Card
                key={campaign.id}
                hover
                onClick={() => setSelectedCampaign(campaign)}
                className={isSelected ? 'ring-2 ring-zinc-600' : ''}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-medium text-zinc-100">
                          {campaign.name}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[campaign.status]}`}
                        >
                          {statusLabels[campaign.status]}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        {campaign.description}
                      </p>
                      {linkedDeal && (
                        <p className="text-xs text-zinc-500 mt-2">
                          Linked to: {linkedDeal.dealName}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-semibold text-zinc-200">
                        {responseRate}%
                      </p>
                      <p className="text-xs text-zinc-500">response rate</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                    <span>{campaign.sentCount} sent</span>
                    <span>{campaign.responseCount} responses</span>
                    <span>Updated {formatRelativeDate(campaign.updatedAt)}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Templates & Detail Panel */}
        <div className="lg:col-span-1 space-y-4">
          {selectedCampaign ? (
            <CampaignDetailPanel campaign={selectedCampaign} />
          ) : (
            <>
              <h2 className="text-lg font-medium text-zinc-200">Email Templates</h2>
              {emailTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CampaignDetailPanel({ campaign }: { campaign: OutreachCampaign }) {
  return (
    <div className="space-y-4 sticky top-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>{campaign.name}</CardTitle>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[campaign.status]}`}
            >
              {statusLabels[campaign.status]}
            </span>
          </div>
          <CardDescription>{campaign.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Sent</p>
              <p className="text-lg font-semibold text-zinc-200">
                {campaign.sentCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Responses</p>
              <p className="text-lg font-semibold text-zinc-200">
                {campaign.responseCount}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-1">Response Rate</p>
            <p className="text-2xl font-semibold text-emerald-400">
              {campaign.sentCount > 0
                ? ((campaign.responseCount / campaign.sentCount) * 100).toFixed(1)
                : '0'}
              %
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500 mb-2">Message Template</p>
            <p className="text-sm text-zinc-400 bg-zinc-800/50 p-3 rounded">
              {campaign.messageTemplate}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            {campaign.status === 'draft' && (
              <Button variant="primary" size="sm">
                Launch Campaign
              </Button>
            )}
            {campaign.status === 'active' && (
              <Button variant="secondary" size="sm">
                Pause Campaign
              </Button>
            )}
            {campaign.status === 'paused' && (
              <Button variant="secondary" size="sm">
                Resume Campaign
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TemplateCard({ template }: { template: DealAsset }) {
  return (
    <Card hover>
      <CardContent className="py-4">
        <h3 className="text-sm font-medium text-zinc-200">{template.name}</h3>
        <p className="text-xs text-zinc-500 mt-1">{template.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
          <span>Used {template.usageCount} times</span>
          {template.lastUsed && (
            <span>Last: {formatRelativeDate(template.lastUsed)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
