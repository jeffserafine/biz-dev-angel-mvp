'use client';

import { useMemo, useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  MessageSquare,
  Plus,
  Copy,
  Check,
  FileText,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { Narrative } from '@/lib/types';

type PitchVariant = 'warm' | 'cold' | 'investor';

interface PitchTab {
  id: PitchVariant;
  label: string;
  description: string;
}

const PITCH_TABS: PitchTab[] = [
  { id: 'warm', label: 'Warm Intro', description: 'For a friendly intro path' },
  { id: 'cold', label: 'Cold Outreach', description: 'For first-touch prospecting' },
  { id: 'investor', label: 'Investor-Facing', description: 'For capital & strategic conversations' },
];

function getPitchText(narrative: Narrative, variant: PitchVariant): string {
  switch (variant) {
    case 'warm':
      return narrative.warmIntroPitch;
    case 'cold':
      return narrative.coldOutreachPitch;
    case 'investor':
      return narrative.investorFacingPitch;
  }
}

export default function NarrativeEngine() {
  const { narratives, icpSessions, getICPSessionById, setCurrentModule } = useApp();

  const [selectedId, setSelectedId] = useState<string | null>(
    narratives[0]?.id ?? null
  );
  const [activeVariant, setActiveVariant] = useState<PitchVariant>('warm');
  const [copied, setCopied] = useState<boolean>(false);

  const selected = useMemo(
    () => narratives.find(n => n.id === selectedId) ?? null,
    [narratives, selectedId]
  );

  const linkedICP = selected?.linkedICPId
    ? getICPSessionById(selected.linkedICPId)
    : undefined;

  const truncate = (text: string, max = 140) =>
    text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleSelectNarrative = (id: string) => {
    setSelectedId(id);
    setActiveVariant('warm');
    setCopied(false);
  };

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Narrative Engine</h1>
          <p className="module-subtitle">
            Pitch variants and talking points, ready to use. Built from your ICP.
          </p>
        </div>
      </header>

      <div className="narrative-engine-layout">
        {/* Left panel — Narrative List */}
        <aside className="narrative-list">
          <div className="narrative-list-header">
            <span className="narrative-list-title">Narratives</span>
            <div className="coming-soon-wrap">
              <button
                type="button"
                className="btn-new-session"
                disabled
                aria-disabled="true"
              >
                <Plus size={14} />
                <span>New Narrative Session</span>
              </button>
              <span className="coming-soon-tooltip" role="tooltip">
                Coming in BDA Pro
              </span>
            </div>
          </div>

          <div className="narrative-cards">
            {narratives.length === 0 ? (
              <p className="empty-state">No narratives yet</p>
            ) : (
              narratives.map(narrative => {
                const isActive = narrative.id === selectedId;
                const linked = narrative.linkedICPId
                  ? icpSessions.find(s => s.id === narrative.linkedICPId)
                  : undefined;
                return (
                  <Card
                    key={narrative.id}
                    onClick={() => handleSelectNarrative(narrative.id)}
                    className={`narrative-card ${
                      isActive ? 'narrative-card--active' : ''
                    }`}
                  >
                    <CardContent>
                      <div className="narrative-card-header">
                        <MessageSquare size={16} />
                        <span className="narrative-card-label">Positioning</span>
                      </div>
                      <p className="narrative-card-positioning">
                        {truncate(narrative.positioningStatement, 140)}
                      </p>
                      <div className="narrative-card-footer">
                        {linked ? (
                          <span className="narrative-card-icp">
                            ICP · {truncate(linked.segment, 40)}
                          </span>
                        ) : (
                          <span className="narrative-card-icp narrative-card-icp--muted">
                            No linked ICP
                          </span>
                        )}
                        <span className="narrative-card-date">
                          {formatDate(narrative.createdAt)}
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
        <section className="narrative-deliverable">
          {!selected ? (
            <div className="narrative-deliverable--empty">
              <FileText size={32} />
              <p>Select a narrative to view its pitch variants and talking points.</p>
            </div>
          ) : (
            <Card className="narrative-deliverable-card">
              <div className="narrative-deliverable-header">
                <Badge variant="info">Narrative Deliverable</Badge>
                <p className="narrative-deliverable-meta">
                  Created {formatDate(selected.createdAt)}
                </p>
              </div>

              <div className="narrative-deliverable-body">
                {/* Positioning Statement — the headline */}
                <section className="narrative-section">
                  <h3 className="narrative-section-label">
                    <Sparkles size={14} />
                    <span>Positioning Statement</span>
                  </h3>
                  <p className="narrative-positioning-text">
                    {selected.positioningStatement}
                  </p>
                </section>

                {/* Pitch Variants */}
                <section className="narrative-section">
                  <h3 className="narrative-section-label">Pitch Variants</h3>

                  <div
                    className="pitch-toggle"
                    role="tablist"
                    aria-label="Pitch variants"
                  >
                    {PITCH_TABS.map(tab => {
                      const isActive = activeVariant === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`pitch-toggle-btn pitch-toggle-btn--${tab.id} ${
                            isActive ? 'pitch-toggle-btn--active' : ''
                          }`}
                          onClick={() => {
                            setActiveVariant(tab.id);
                            setCopied(false);
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className={`pitch-block pitch-block--${activeVariant}`}>
                    <div className="pitch-block-header">
                      <span className="pitch-block-tag">
                        {PITCH_TABS.find(t => t.id === activeVariant)?.label}
                      </span>
                      <button
                        type="button"
                        className="copy-button"
                        onClick={() =>
                          handleCopy(getPitchText(selected, activeVariant))
                        }
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="pitch-block-text">
                      {getPitchText(selected, activeVariant)}
                    </p>
                  </div>
                </section>

                {/* Talking Points */}
                <section className="narrative-section">
                  <h3 className="narrative-section-label">Talking Points</h3>
                  <div className="talking-points">
                    {selected.talkingPoints.map((point, idx) => (
                      <span key={idx} className="talking-point-chip">
                        {point}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Linked ICP */}
                {linkedICP && (
                  <section className="narrative-section narrative-section--linked">
                    <h3 className="narrative-section-label">Linked ICP</h3>
                    <button
                      type="button"
                      className="linked-icp-link"
                      onClick={() => setCurrentModule('icp-forge')}
                    >
                      <span>Built from ICP: {linkedICP.segment}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </section>
                )}
              </div>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
