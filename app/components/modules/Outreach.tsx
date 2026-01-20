'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { OutreachTemplate } from '@/lib/types';
import { Send, Mail, Linkedin, Copy, Check, Search } from 'lucide-react';

export default function Outreach() {
  const { templates, stakeholders } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChannel, setFilterChannel] = useState<'all' | 'email' | 'linkedin'>('all');
  const [copied, setCopied] = useState(false);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesChannel = filterChannel === 'all' || template.channel === filterChannel;
    const matchesSearch =
      searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChannel && matchesSearch;
  });

  const handleCopyTemplate = (template: OutreachTemplate) => {
    const content = template.subject
      ? `Subject: ${template.subject}\n\n${template.body}`
      : template.body;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail size={16} />;
      case 'linkedin':
        return <Linkedin size={16} />;
      default:
        return <Send size={16} />;
    }
  };

  // Get stakeholders for quick outreach
  const recentStakeholders = stakeholders
    .filter(s => s.lastContactDate)
    .sort((a, b) => (b.lastContactDate || '').localeCompare(a.lastContactDate || ''))
    .slice(0, 5);

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Outreach Studio</h1>
          <p className="module-subtitle">Templates and tools for strategic communication</p>
        </div>
      </header>

      <div className="outreach-layout">
        {/* Templates Section */}
        <div className="templates-section">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="template-filters">
                <div className="search-input-wrapper">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="channel-filters">
                  <button
                    className={`filter-chip ${filterChannel === 'all' ? 'filter-chip--active' : ''}`}
                    onClick={() => setFilterChannel('all')}
                  >
                    All
                  </button>
                  <button
                    className={`filter-chip ${filterChannel === 'email' ? 'filter-chip--active' : ''}`}
                    onClick={() => setFilterChannel('email')}
                  >
                    <Mail size={14} /> Email
                  </button>
                  <button
                    className={`filter-chip ${filterChannel === 'linkedin' ? 'filter-chip--active' : ''}`}
                    onClick={() => setFilterChannel('linkedin')}
                  >
                    <Linkedin size={14} /> LinkedIn
                  </button>
                </div>
              </div>

              {/* Template List */}
              <div className="template-list">
                {filteredTemplates.map(template => (
                  <div
                    key={template.id}
                    className={`template-item ${selectedTemplate?.id === template.id ? 'template-item--selected' : ''}`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="template-item-header">
                      {getChannelIcon(template.channel)}
                      <span className="template-name">{template.name}</span>
                    </div>
                    <div className="template-tags">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="muted" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="template-meta">
                      <span>Used {template.useCount} times</span>
                      {template.lastUsed && <span>Last: {template.lastUsed}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Preview / Editor */}
        <div className="template-preview">
          {selectedTemplate ? (
            <Card>
              <CardHeader
                action={
                  <button
                    className="copy-button"
                    onClick={() => handleCopyTemplate(selectedTemplate)}
                  >
                    {copied ? (
                      <>
                        <Check size={16} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} /> Copy
                      </>
                    )}
                  </button>
                }
              >
                <CardTitle subtitle={selectedTemplate.channel}>
                  {selectedTemplate.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTemplate.subject && (
                  <div className="template-field">
                    <label className="template-field-label">Subject</label>
                    <div className="template-field-value">{selectedTemplate.subject}</div>
                  </div>
                )}

                <div className="template-field">
                  <label className="template-field-label">Message</label>
                  <pre className="template-body">{selectedTemplate.body}</pre>
                </div>

                <div className="template-placeholders">
                  <h4>Placeholders to customize:</h4>
                  <ul>
                    <li><code>[Name]</code> - Recipient name</li>
                    <li><code>[Company]</code> - Company name</li>
                    <li><code>[Referrer]</code> - Referrer name</li>
                    <li><code>[Signature]</code> - Your signature</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="template-preview--empty">
              <CardContent>
                <Send size={48} />
                <p>Select a template to preview</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Contacts */}
        <div className="quick-contacts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="contact-list">
                {recentStakeholders.map(stakeholder => (
                  <div key={stakeholder.id} className="contact-item">
                    <div className="contact-avatar">
                      {stakeholder.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="contact-info">
                      <span className="contact-name">{stakeholder.name}</span>
                      <span className="contact-role">{stakeholder.role}</span>
                    </div>
                    <div className="contact-actions">
                      {stakeholder.email && (
                        <button className="contact-action" title="Send email">
                          <Mail size={14} />
                        </button>
                      )}
                      {stakeholder.linkedIn && (
                        <button className="contact-action" title="LinkedIn">
                          <Linkedin size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
