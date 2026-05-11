'use client';

import { useApp } from '@/lib/store';
import Sidebar from './Sidebar';
import Dashboard from '../modules/Dashboard';
import Accounts from '../modules/Accounts';
import ICPForge from '../modules/ICPForge';
import DealMap from '../modules/DealMap';
import NarrativeEngine from '../modules/NarrativeEngine';
import BDAPro from '../modules/BDAPro';

export default function MainLayout() {
  const { currentModule } = useApp();

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounts':
        return <Accounts />;
      case 'icp-forge':
        return <ICPForge />;
      case 'deal-map':
        return <DealMap />;
      case 'narrative-engine':
        return <NarrativeEngine />;
      case 'bda-pro':
        return <BDAPro />;
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
