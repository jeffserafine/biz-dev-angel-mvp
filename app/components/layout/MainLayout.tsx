'use client';

import { useApp } from '@/lib/store';
import Sidebar from './Sidebar';
import Dashboard from '../modules/Dashboard';
import Accounts from '../modules/Accounts';
import ICPMatrix from '../modules/ICPMatrix';
import DealDesk from '../modules/DealDesk';
import Outreach from '../modules/Outreach';
import Meetings from '../modules/Meetings';
import Assets from '../modules/Assets';

export default function MainLayout() {
  const { currentModule } = useApp();

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <Accounts />;
      case 'icp-matrix':
        return <ICPMatrix />;
      case 'deal-desk':
        return <DealDesk />;
      case 'outreach':
        return <Outreach />;
      case 'meetings':
        return <Meetings />;
      case 'assets':
        return <Assets />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">{renderModule()}</main>
    </div>
  );
}
