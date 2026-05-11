// Simple state management for Biz Dev Angel OS
// Uses React Context for MVP - production would use Zustand or similar

import { createContext, useContext, useState, ReactNode } from 'react';
import type {
  Account,
  Stakeholder,
  Deal,
  Action,
  Meeting,
  DealAsset,
  OutreachTemplate,
  ICPCriteria,
} from './types';
import {
  mockAccounts,
  mockStakeholders,
  mockDeals,
  mockActions,
  mockMeetings,
  mockDealAssets,
  mockOutreachTemplates,
  mockICPCriteria,
} from '@/data/mockData';

// Navigation state
export type ModuleView =
  | 'dashboard'
  | 'accounts'
  | 'icp-forge'
  | 'deal-map'
  | 'narrative-engine'
  | 'bda-pro';

interface AppState {
  // Current view
  currentModule: ModuleView;
  setCurrentModule: (module: ModuleView) => void;

  // Data
  accounts: Account[];
  stakeholders: Stakeholder[];
  deals: Deal[];
  actions: Action[];
  meetings: Meeting[];
  assets: DealAsset[];
  templates: OutreachTemplate[];
  icpCriteria: ICPCriteria[];

  // Actions
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  updateAction: (id: string, updates: Partial<Action>) => void;
  addAction: (action: Action) => void;
  completeAction: (id: string) => void;

  // Lookups
  getAccountById: (id: string) => Account | undefined;
  getStakeholderById: (id: string) => Stakeholder | undefined;
  getDealById: (id: string) => Deal | undefined;
  getStakeholdersByAccount: (accountId: string) => Stakeholder[];
  getActionsByDeal: (dealId: string) => Action[];
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentModule, setCurrentModule] = useState<ModuleView>('dashboard');
  const [accounts] = useState<Account[]>(mockAccounts);
  const [stakeholders] = useState<Stakeholder[]>(mockStakeholders);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [assets] = useState<DealAsset[]>(mockDealAssets);
  const [templates] = useState<OutreachTemplate[]>(mockOutreachTemplates);
  const [icpCriteria] = useState<ICPCriteria[]>(mockICPCriteria);

  // Lookup functions
  const getAccountById = (id: string) => accounts.find(a => a.id === id);
  const getStakeholderById = (id: string) => stakeholders.find(s => s.id === id);
  const getDealById = (id: string) => deals.find(d => d.id === id);
  const getStakeholdersByAccount = (accountId: string) =>
    stakeholders.filter(s => s.associatedAccountId === accountId);
  const getActionsByDeal = (dealId: string) =>
    actions.filter(a => a.linkedDealId === dealId);

  // Update functions
  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d))
    );
  };

  const updateAction = (id: string, updates: Partial<Action>) => {
    setActions(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const addAction = (action: Action) => {
    setActions(prev => [...prev, action]);
  };

  const completeAction = (id: string) => {
    setActions(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, completed: true, completedDate: new Date().toISOString().split('T')[0] }
          : a
      )
    );
  };

  const value: AppState = {
    currentModule,
    setCurrentModule,
    accounts,
    stakeholders,
    deals,
    actions,
    meetings,
    assets,
    templates,
    icpCriteria,
    updateDeal,
    updateAction,
    addAction,
    completeAction,
    getAccountById,
    getStakeholderById,
    getDealById,
    getStakeholdersByAccount,
    getActionsByDeal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
