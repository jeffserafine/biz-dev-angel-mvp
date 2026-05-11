'use client';

import { Card, CardContent } from '../ui/Card';
import { Sparkles, Briefcase, Handshake, Target, Send } from 'lucide-react';

interface FeaturePreview {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeaturePreview[] = [
  {
    icon: <Briefcase size={20} />,
    title: 'Full DealMap with stakeholder mapping',
    description:
      'Multi-stakeholder deal graphs, influence mapping, and Core Engine signal routing across complex accounts.',
  },
  {
    icon: <Handshake size={20} />,
    title: 'Handshake Protocol',
    description:
      'Agent-to-agent deal workflow. Five-stage probe-and-escalate exchange that surfaces fit before a human ever picks up the phone.',
  },
  {
    icon: <Target size={20} />,
    title: 'Advanced ICP Forge with target enrichment',
    description:
      'Live target list enrichment, fit scoring, and anti-ICP gating tied directly to your DealMap.',
  },
  {
    icon: <Send size={20} />,
    title: 'Narrative Engine with variant testing',
    description:
      'A/B narrative variants, outcome tracking, and positioning iteration tied back to closed-won and closed-lost signals.',
  },
];

export default function BDAPro() {
  return (
    <div className="module-container">
      <header className="module-header bda-pro-header">
        <div className="bda-pro-title-row">
          <Sparkles size={28} className="bda-pro-sparkle" />
          <h1 className="module-title">BDA Pro</h1>
        </div>
        <p className="module-subtitle">
          The full practitioner suite — built for senior BD operators and fractional BD heads.
        </p>
      </header>

      <div className="bda-pro-features">
        {features.map(feature => (
          <Card key={feature.title} className="bda-pro-feature-card">
            <CardContent>
              <div className="bda-pro-feature-icon">{feature.icon}</div>
              <h3 className="bda-pro-feature-title">{feature.title}</h3>
              <p className="bda-pro-feature-description">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bda-pro-cta">
        <button type="button" className="bda-pro-cta-button" disabled>
          Join the waitlist
        </button>
        <p className="bda-pro-cta-note">Launching 60–90 days post-BDA release</p>
      </div>
    </div>
  );
}
