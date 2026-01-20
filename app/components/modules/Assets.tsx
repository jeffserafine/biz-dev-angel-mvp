'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { DealAsset } from '@/lib/types';
import {
  FolderOpen,
  FileText,
  Presentation,
  FileSpreadsheet,
  File,
  Search,
  ExternalLink,
  Calendar,
} from 'lucide-react';

export default function Assets() {
  const { assets, deals, getDealById } = useApp();
  const [selectedAsset, setSelectedAsset] = useState<DealAsset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<DealAsset['type'] | 'all'>('all');

  // Filter assets
  const filteredAssets = assets.filter(asset => {
    const matchesType = filterType === 'all' || asset.type === filterType;
    const matchesSearch =
      searchQuery === '' ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Get icon for asset type
  const getAssetIcon = (type: DealAsset['type']) => {
    switch (type) {
      case 'deck':
        return <Presentation size={20} />;
      case 'one-pager':
        return <FileText size={20} />;
      case 'case-study':
        return <FileText size={20} />;
      case 'proposal':
        return <FileSpreadsheet size={20} />;
      case 'contract':
        return <FileText size={20} />;
      default:
        return <File size={20} />;
    }
  };

  // Get linked deal names
  const getLinkedDealNames = (dealIds: string[]) =>
    dealIds
      .map(id => getDealById(id)?.dealName)
      .filter(Boolean)
      .join(', ');

  // Asset type options
  const typeOptions: (DealAsset['type'] | 'all')[] = [
    'all',
    'deck',
    'one-pager',
    'case-study',
    'proposal',
    'contract',
    'other',
  ];

  // Group assets by type for summary
  const assetsByType = typeOptions
    .filter(t => t !== 'all')
    .map(type => ({
      type,
      count: assets.filter(a => a.type === type).length,
    }))
    .filter(g => g.count > 0);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Deal Assets</h1>
          <p className="module-subtitle">
            Collateral and materials for your deals
          </p>
        </div>
      </header>

      {/* Asset Summary */}
      <div className="asset-summary">
        <Card>
          <CardContent>
            <div className="summary-grid">
              <div className="summary-item">
                <FolderOpen size={24} />
                <div className="summary-content">
                  <span className="summary-value">{assets.length}</span>
                  <span className="summary-label">Total Assets</span>
                </div>
              </div>
              {assetsByType.slice(0, 4).map(group => (
                <div key={group.type} className="summary-item">
                  {getAssetIcon(group.type as DealAsset['type'])}
                  <div className="summary-content">
                    <span className="summary-value">{group.count}</span>
                    <span className="summary-label">{group.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-chips">
          {typeOptions.map(type => (
            <button
              key={type}
              className={`filter-chip ${filterType === type ? 'filter-chip--active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>

      <div className="assets-layout">
        {/* Asset Grid */}
        <div className="asset-grid">
          {filteredAssets.map(asset => (
            <Card
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              variant={selectedAsset?.id === asset.id ? 'highlight' : 'default'}
              className="asset-card"
            >
              <CardContent>
                <div className="asset-icon">{getAssetIcon(asset.type)}</div>
                <h3 className="asset-name">{asset.name}</h3>
                <Badge variant="muted" size="sm">
                  {asset.type}
                </Badge>
                <p className="asset-deals">
                  {asset.linkedDealIds.length} linked deal
                  {asset.linkedDealIds.length !== 1 ? 's' : ''}
                </p>
                <span className="asset-updated">
                  <Calendar size={12} /> {asset.updatedAt}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Asset Detail Panel */}
        {selectedAsset ? (
          <div className="asset-detail">
            <Card>
              <CardHeader>
                <CardTitle subtitle={selectedAsset.type}>
                  {selectedAsset.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="asset-detail-icon">
                  {getAssetIcon(selectedAsset.type)}
                </div>

                {selectedAsset.url && (
                  <div className="detail-section">
                    <h4 className="detail-label">Location</h4>
                    <a href={selectedAsset.url} className="asset-link" target="_blank">
                      {selectedAsset.url}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                <div className="detail-section">
                  <h4 className="detail-label">Linked Deals</h4>
                  <div className="linked-deals">
                    {selectedAsset.linkedDealIds.map(id => {
                      const deal = getDealById(id);
                      if (!deal) return null;
                      return (
                        <div key={id} className="linked-deal-item">
                          <span className="linked-deal-name">{deal.dealName}</span>
                          <Badge variant={deal.status === 'active' ? 'success' : 'muted'} size="sm">
                            {deal.status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {selectedAsset.notes && (
                  <div className="detail-section">
                    <h4 className="detail-label">Notes</h4>
                    <p className="detail-text">{selectedAsset.notes}</p>
                  </div>
                )}

                <div className="detail-section">
                  <h4 className="detail-label">Timeline</h4>
                  <div className="asset-timeline">
                    <p>Created: {selectedAsset.createdAt}</p>
                    <p>Last Updated: {selectedAsset.updatedAt}</p>
                  </div>
                </div>

                <div className="asset-actions">
                  <button className="action-btn action-btn--primary">
                    <ExternalLink size={16} /> Open Asset
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="asset-detail asset-detail--empty">
            <FolderOpen size={48} />
            <p>Select an asset to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
