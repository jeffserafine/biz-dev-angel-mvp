'use client';

import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AccountTypeBadge } from '../ui/Badge';
import { RelationshipStrength } from '../ui/RelationshipStrength';
import { Target, ChevronRight } from 'lucide-react';

export default function ICPMatrix() {
  const { accounts, icpCriteria, deals, setCurrentModule } = useApp();

  // Calculate ICP score for each account based on criteria
  const calculateICPScore = (accountId: string): number => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return 0;

    // Simplified scoring based on account attributes and activity
    const hasActiveDeals = deals.some(
      d => d.associatedAccountIds.includes(accountId) && d.status === 'active'
    );
    const dealCount = deals.filter(d =>
      d.associatedAccountIds.includes(accountId)
    ).length;

    // Base score from relationship strength
    let score = account.relationshipStrength * 15;

    // Bonus for active deals
    if (hasActiveDeals) score += 20;
    score += dealCount * 5;

    // Cap at 100
    return Math.min(score, 100);
  };

  // Sort accounts by ICP score
  const rankedAccounts = accounts
    .map(account => ({
      ...account,
      icpScore: calculateICPScore(account.id),
      dealCount: deals.filter(d => d.associatedAccountIds.includes(account.id)).length,
    }))
    .sort((a, b) => b.icpScore - a.icpScore);

  // Split into tiers
  const tier1 = rankedAccounts.filter(a => a.icpScore >= 70);
  const tier2 = rankedAccounts.filter(a => a.icpScore >= 40 && a.icpScore < 70);
  const tier3 = rankedAccounts.filter(a => a.icpScore < 40);

  const getTierColor = (score: number) => {
    if (score >= 70) return 'tier--high';
    if (score >= 40) return 'tier--medium';
    return 'tier--low';
  };

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">ICP & Target Matrix</h1>
          <p className="module-subtitle">
            Prioritize opportunities based on ideal customer fit
          </p>
        </div>
      </header>

      {/* ICP Criteria */}
      <Card className="icp-criteria-card">
        <CardHeader>
          <CardTitle>
            <Target size={18} /> ICP Scoring Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="criteria-grid">
            {icpCriteria.map(criteria => (
              <div key={criteria.id} className="criteria-item">
                <div className="criteria-header">
                  <span className="criteria-dimension">{criteria.dimension}</span>
                  <span className="criteria-weight">Weight: {criteria.weight}/10</span>
                </div>
                <p className="criteria-description">{criteria.description}</p>
                <div className="criteria-bar">
                  <div
                    className="criteria-bar-fill"
                    style={{ width: `${criteria.weight * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Matrix */}
      <div className="matrix-container">
        {/* Tier 1 - High Priority */}
        <div className="tier-section">
          <h3 className="tier-header tier-header--high">
            <span className="tier-badge tier-badge--high">Tier 1</span>
            High Priority Targets
            <span className="tier-count">{tier1.length}</span>
          </h3>
          <div className="tier-accounts">
            {tier1.length === 0 ? (
              <p className="empty-state">No tier 1 accounts</p>
            ) : (
              tier1.map(account => (
                <Card
                  key={account.id}
                  className={`matrix-account-card ${getTierColor(account.icpScore)}`}
                >
                  <CardContent>
                    <div className="matrix-account-header">
                      <h4 className="matrix-account-name">{account.name}</h4>
                      <span className="icp-score icp-score--high">
                        {account.icpScore}
                      </span>
                    </div>
                    <div className="matrix-account-meta">
                      <AccountTypeBadge type={account.type} />
                      <RelationshipStrength strength={account.relationshipStrength} />
                    </div>
                    <p className="matrix-account-relevance">
                      {account.strategicRelevance}
                    </p>
                    <div className="matrix-account-footer">
                      <span>{account.dealCount} active deal{account.dealCount !== 1 ? 's' : ''}</span>
                      <button
                        className="link-button"
                        onClick={() => setCurrentModule('accounts')}
                      >
                        View <ChevronRight size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Tier 2 - Medium Priority */}
        <div className="tier-section">
          <h3 className="tier-header tier-header--medium">
            <span className="tier-badge tier-badge--medium">Tier 2</span>
            Development Targets
            <span className="tier-count">{tier2.length}</span>
          </h3>
          <div className="tier-accounts">
            {tier2.length === 0 ? (
              <p className="empty-state">No tier 2 accounts</p>
            ) : (
              tier2.map(account => (
                <Card
                  key={account.id}
                  className={`matrix-account-card ${getTierColor(account.icpScore)}`}
                >
                  <CardContent>
                    <div className="matrix-account-header">
                      <h4 className="matrix-account-name">{account.name}</h4>
                      <span className="icp-score icp-score--medium">
                        {account.icpScore}
                      </span>
                    </div>
                    <div className="matrix-account-meta">
                      <AccountTypeBadge type={account.type} />
                      <RelationshipStrength strength={account.relationshipStrength} />
                    </div>
                    <p className="matrix-account-relevance">
                      {account.strategicRelevance}
                    </p>
                    <div className="matrix-account-footer">
                      <span>{account.dealCount} deal{account.dealCount !== 1 ? 's' : ''}</span>
                      <button
                        className="link-button"
                        onClick={() => setCurrentModule('accounts')}
                      >
                        View <ChevronRight size={14} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Tier 3 - Low Priority */}
        <div className="tier-section">
          <h3 className="tier-header tier-header--low">
            <span className="tier-badge tier-badge--low">Tier 3</span>
            Monitor & Nurture
            <span className="tier-count">{tier3.length}</span>
          </h3>
          <div className="tier-accounts">
            {tier3.length === 0 ? (
              <p className="empty-state">No tier 3 accounts</p>
            ) : (
              tier3.map(account => (
                <Card
                  key={account.id}
                  className={`matrix-account-card ${getTierColor(account.icpScore)}`}
                >
                  <CardContent>
                    <div className="matrix-account-header">
                      <h4 className="matrix-account-name">{account.name}</h4>
                      <span className="icp-score icp-score--low">
                        {account.icpScore}
                      </span>
                    </div>
                    <div className="matrix-account-meta">
                      <AccountTypeBadge type={account.type} />
                      <RelationshipStrength strength={account.relationshipStrength} />
                    </div>
                    <p className="matrix-account-relevance">
                      {account.strategicRelevance}
                    </p>
                    <div className="matrix-account-footer">
                      <span>{account.dealCount} deal{account.dealCount !== 1 ? 's' : ''}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
