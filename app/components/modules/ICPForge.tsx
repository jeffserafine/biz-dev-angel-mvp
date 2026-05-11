'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Target,
  Plus,
  Check,
  AlertTriangle,
  ArrowRight,
  FileText,
} from 'lucide-react';

export default function ICPForge() {
  const { icpSessions, setCurrentModule } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(
    icpSessions[0]?.id ?? null
  );

  const selected = icpSessions.find(s => s.id === selectedId) ?? null;

  const truncate = (text: string, max = 90) =>
    text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">ICP Forge</h1>
          <p className="module-subtitle">
            Run a guided session. Walk out with an ICP deliverable, not a spreadsheet.
          </p>
        </div>
      </header>

      <div className="icp-forge-layout">
        {/* Left panel — Session List */}
        <aside className="icp-session-list">
          <div className="icp-session-list-header">
            <span className="icp-session-list-title">Sessions</span>
            <div className="coming-soon-wrap">
              <button
                type="button"
                className="btn-new-session"
                disabled
                aria-disabled="true"
              >
                <Plus size={14} />
                <span>New ICP Session</span>
              </button>
              <span className="coming-soon-tooltip" role="tooltip">
                Coming in BDA Pro
              </span>
            </div>
          </div>

          <div className="icp-session-cards">
            {icpSessions.length === 0 ? (
              <p className="empty-state">No ICP sessions yet</p>
            ) : (
              icpSessions.map(session => {
                const isActive = session.id === selectedId;
                return (
                  <Card
                    key={session.id}
                    onClick={() => setSelectedId(session.id)}
                    className={`icp-session-card ${
                      isActive ? 'icp-session-card--active' : ''
                    }`}
                  >
                    <CardContent>
                      <div className="icp-session-card-header">
                        <Target size={16} />
                        <h4 className="icp-session-card-segment">
                          {session.segment}
                        </h4>
                      </div>
                      <p className="icp-session-card-jtbd">
                        {truncate(session.jobToBeDone, 110)}
                      </p>
                      <div className="icp-session-card-footer">
                        <span className="icp-session-card-date">
                          {formatDate(session.createdAt)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </aside>

        {/* Right panel — Deliverable View */}
        <section className="icp-deliverable">
          {!selected ? (
            <div className="icp-deliverable--empty">
              <FileText size={32} />
              <p>Select a session to view its ICP deliverable.</p>
            </div>
          ) : (
            <Card className="icp-deliverable-card">
              <div className="icp-deliverable-header">
                <Badge variant="info">ICP Deliverable</Badge>
                <h2 className="icp-deliverable-title">{selected.segment}</h2>
                <p className="icp-deliverable-meta">
                  Created {formatDate(selected.createdAt)}
                </p>
              </div>

              <div className="icp-deliverable-body">
                {/* Job to Be Done */}
                <section className="icp-section">
                  <h3 className="icp-section-label">Job to Be Done</h3>
                  <p className="icp-jtbd-text">{selected.jobToBeDone}</p>
                </section>

                {/* Fit Signals */}
                <section className="icp-section">
                  <h3 className="icp-section-label">Fit Signals</h3>
                  <ul className="icp-fit-signals">
                    {selected.fitSignals.map((signal, idx) => (
                      <li key={idx} className="icp-fit-signal">
                        <span className="icp-fit-signal-icon">
                          <Check size={14} />
                        </span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Anti-ICP Flags */}
                <section className="icp-section icp-section--warning">
                  <h3 className="icp-section-label">
                    <AlertTriangle size={14} />
                    <span>Anti-ICP Flags</span>
                  </h3>
                  <ul className="icp-anti-flags">
                    {selected.antiICPFlags.map((flag, idx) => (
                      <li key={idx} className="icp-anti-flag">
                        {flag}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* First Target List */}
                <section className="icp-section">
                  <h3 className="icp-section-label">First Target List</h3>
                  <div className="icp-target-chips">
                    {selected.firstTargetList.map((target, idx) => (
                      <span key={idx} className="icp-target-chip">
                        {target}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <footer className="icp-deliverable-footer">
                <button
                  type="button"
                  className="btn-generate-narrative"
                  onClick={() => setCurrentModule('narrative-engine')}
                >
                  <span>Generate Narrative</span>
                  <ArrowRight size={16} />
                </button>
              </footer>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
