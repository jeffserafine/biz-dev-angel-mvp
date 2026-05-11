'use client';

import { useApp, ModuleView } from '@/lib/store';
import {
  LayoutDashboard,
  Building2,
  Target,
  Briefcase,
  Send,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  id: ModuleView;
  label: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Today', icon: <LayoutDashboard size={20} /> },
  { id: 'accounts', label: 'Accounts', icon: <Building2 size={20} /> },
  { id: 'icp-forge', label: 'ICP Forge', icon: <Target size={20} /> },
  { id: 'deal-map', label: 'DealMap', icon: <Briefcase size={20} /> },
  { id: 'narrative-engine', label: 'Narrative Engine', icon: <Send size={20} /> },
  { id: 'bda-pro', label: 'BDA Pro', icon: <Sparkles size={20} />, comingSoon: true },
];

export default function Sidebar() {
  const { currentModule, setCurrentModule } = useApp();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Biz Dev Angel</h1>
        <span className="sidebar-subtitle">Command Center</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentModule === item.id ? 'active' : ''} ${item.comingSoon ? 'nav-item--gated' : ''}`}
            onClick={() => setCurrentModule(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.comingSoon && <span className="nav-badge">Coming Soon</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-context">
          <div className="user-avatar">JD</div>
          <div className="user-info">
            <span className="user-name">Deal Operator</span>
            <span className="user-role">Executive BD</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
