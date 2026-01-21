'use client';

import { useApp, ModuleView } from '@/lib/store';
import {
  LayoutDashboard,
  Building2,
  Target,
  Briefcase,
  Send,
  Calendar,
  FolderOpen,
} from 'lucide-react';

interface NavItem {
  id: ModuleView;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Today', icon: <LayoutDashboard size={20} /> },
  { id: 'accounts', label: 'Accounts', icon: <Building2 size={20} /> },
  { id: 'icp-matrix', label: 'ICP Matrix', icon: <Target size={20} /> },
  { id: 'deal-desk', label: 'Deal Desk', icon: <Briefcase size={20} /> },
  { id: 'outreach', label: 'Outreach', icon: <Send size={20} /> },
  { id: 'meetings', label: 'Meetings', icon: <Calendar size={20} /> },
  { id: 'assets', label: 'Assets', icon: <FolderOpen size={20} /> },
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
            className={`nav-item ${currentModule === item.id ? 'active' : ''}`}
            onClick={() => setCurrentModule(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
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
