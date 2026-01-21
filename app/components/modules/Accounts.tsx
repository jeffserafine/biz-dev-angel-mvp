'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AccountTypeBadge, RelationshipBadge } from '../ui/Badge';
import { RelationshipStrength } from '../ui/RelationshipStrength';
import type { Account, AccountType } from '@/lib/types';
import { Building2, Users, Filter, Search } from 'lucide-react';

export default function Accounts() {
  const { accounts, stakeholders, deals, getStakeholdersByAccount } = useApp();
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [filterType, setFilterType] = useState<AccountType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesType = filterType === 'all' || account.type === filterType;
    const matchesSearch =
      searchQuery === '' ||
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.strategicRelevance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get associated deals for an account
  const getDealsForAccount = (accountId: string) =>
    deals.filter(d => d.associatedAccountIds.includes(accountId));

  const accountTypes: (AccountType | 'all')[] = [
    'all',
    'client',
    'partner',
    'investor',
    'platform',
    'other',
  ];

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Accounts</h1>
          <p className="module-subtitle">
            Strategic organizations in your network
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-chips">
          <Filter size={16} />
          {accountTypes.map(type => (
            <button
              key={type}
              className={`filter-chip ${filterType === type ? 'filter-chip--active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type === 'all' ? 'All' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="accounts-layout">
        {/* Account List */}
        <div className="accounts-list">
          {filteredAccounts.map(account => {
            const stakeholderCount = getStakeholdersByAccount(account.id).length;
            const dealCount = getDealsForAccount(account.id).length;

            return (
              <Card
                key={account.id}
                onClick={() => setSelectedAccount(account)}
                variant={selectedAccount?.id === account.id ? 'highlight' : 'default'}
                className="account-card"
              >
                <CardContent>
                  <div className="account-card-header">
                    <div className="account-icon">
                      <Building2 size={24} />
                    </div>
                    <div className="account-info">
                      <h3 className="account-name">{account.name}</h3>
                      <AccountTypeBadge type={account.type} />
                    </div>
                  </div>
                  <p className="account-relevance">{account.strategicRelevance}</p>
                  <div className="account-meta">
                    <RelationshipStrength strength={account.relationshipStrength} />
                    <span className="account-stats">
                      <Users size={14} /> {stakeholderCount} contacts
                    </span>
                    <span className="account-stats">
                      {dealCount} deal{dealCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Detail Panel */}
        {selectedAccount ? (
          <div className="account-detail">
            <Card>
              <CardHeader>
                <CardTitle subtitle={selectedAccount.type}>
                  {selectedAccount.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="detail-section">
                  <h4 className="detail-label">Strategic Relevance</h4>
                  <p className="detail-text">{selectedAccount.strategicRelevance}</p>
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">Relationship Strength</h4>
                  <RelationshipStrength
                    strength={selectedAccount.relationshipStrength}
                    showLabel
                  />
                </div>

                <div className="detail-section">
                  <h4 className="detail-label">Notes</h4>
                  <p className="detail-text">{selectedAccount.notes}</p>
                </div>

                {/* Stakeholders */}
                <div className="detail-section">
                  <h4 className="detail-label">Key Stakeholders</h4>
                  <div className="stakeholder-list">
                    {getStakeholdersByAccount(selectedAccount.id).map(stakeholder => (
                      <div key={stakeholder.id} className="stakeholder-item">
                        <div className="stakeholder-header">
                          <span className="stakeholder-name">{stakeholder.name}</span>
                          <RelationshipBadge status={stakeholder.relationshipStatus} />
                        </div>
                        <span className="stakeholder-role">{stakeholder.role}</span>
                        {stakeholder.email && (
                          <span className="stakeholder-email">{stakeholder.email}</span>
                        )}
                      </div>
                    ))}
                    {getStakeholdersByAccount(selectedAccount.id).length === 0 && (
                      <p className="empty-state">No stakeholders mapped</p>
                    )}
                  </div>
                </div>

                {/* Associated Deals */}
                <div className="detail-section">
                  <h4 className="detail-label">Associated Deals</h4>
                  <div className="deal-list">
                    {getDealsForAccount(selectedAccount.id).map(deal => (
                      <div key={deal.id} className="deal-mini">
                        <span className="deal-mini-name">{deal.dealName}</span>
                        <span className={`deal-mini-status status--${deal.status}`}>
                          {deal.status}
                        </span>
                      </div>
                    ))}
                    {getDealsForAccount(selectedAccount.id).length === 0 && (
                      <p className="empty-state">No associated deals</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="account-detail account-detail--empty">
            <p>Select an account to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
