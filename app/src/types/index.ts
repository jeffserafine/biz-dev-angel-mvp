/**
 * Biz Dev Angel OS - Core Data Types
 *
 * These types define the atomic units of the deal-centric operating system.
 * The DEAL is the atomic unit, not the lead.
 */

// Account Types - Organizations we interact with
export type AccountType = 'client' | 'partner' | 'investor' | 'platform' | 'other';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  strategicRelevance: string; // Why this account matters strategically
  relationshipStrength: 1 | 2 | 3 | 4 | 5; // 1 = cold, 5 = champion
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Stakeholder - Individual humans within accounts
export type RelationshipStatus = 'new' | 'warming' | 'engaged' | 'champion' | 'dormant';
export type InfluenceLevel = 'decision-maker' | 'influencer' | 'gatekeeper' | 'end-user' | 'unknown';

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  email?: string;
  linkedIn?: string;
  associatedAccountId: string;
  influenceLevel: InfluenceLevel;
  relationshipStatus: RelationshipStatus;
  notes: string;
  lastContactDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Deal - The atomic unit of value in Biz Dev Angel OS
export type DealStatus = 'idea' | 'active' | 'stalled' | 'closed-won' | 'closed-lost';

export interface Deal {
  id: string;
  dealName: string;
  associatedAccountIds: string[]; // Multiple accounts can be involved
  primaryAccountId: string; // The main account driving the deal
  dealThesis: string; // Why this deal matters and how it creates value
  status: DealStatus;
  momentumScore: number; // 0-100, calculated by invisible logic
  estimatedValue?: number; // Optional dollar value
  valueType: 'revenue' | 'equity' | 'strategic' | 'hybrid';
  lastAction: Action | null;
  nextBestAction: string; // AI-suggested next move
  notes: string;
  targetCloseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Action - Concrete steps to advance deals
export type ActionType =
  | 'email'
  | 'call'
  | 'meeting'
  | 'follow-up'
  | 'proposal'
  | 'contract'
  | 'intro-request'
  | 'research'
  | 'content-share'
  | 'other';

export type ActionPriority = 'critical' | 'high' | 'medium' | 'low';

export interface Action {
  id: string;
  actionType: ActionType;
  description: string;
  linkedDealId: string;
  linkedStakeholderId?: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  priority: ActionPriority;
  outcome?: string; // What happened when completed
  createdAt: Date;
  updatedAt: Date;
}

// ICP (Ideal Customer Profile) Target
export interface ICPTarget {
  id: string;
  companyName: string;
  industry: string;
  companySize: 'startup' | 'smb' | 'mid-market' | 'enterprise';
  icpScore: number; // 0-100 fit score
  status: 'identified' | 'researching' | 'approaching' | 'converted' | 'disqualified';
  notes: string;
  convertedToAccountId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Meeting - Scheduled interactions
export type MeetingType = 'intro' | 'discovery' | 'demo' | 'negotiation' | 'closing' | 'check-in' | 'other';

export interface Meeting {
  id: string;
  title: string;
  meetingType: MeetingType;
  linkedDealId?: string;
  linkedAccountId: string;
  attendeeIds: string[]; // Stakeholder IDs
  scheduledAt: Date;
  duration: number; // minutes
  location?: string;
  meetingLink?: string;
  agenda: string;
  prepNotes: string;
  postMeetingNotes?: string;
  actionItemsGenerated?: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Deal Asset - Supporting materials for deals
export type AssetType = 'deck' | 'one-pager' | 'case-study' | 'proposal' | 'contract' | 'email-template' | 'other';

export interface DealAsset {
  id: string;
  name: string;
  assetType: AssetType;
  description: string;
  linkedDealIds: string[]; // Can be used across multiple deals
  fileUrl?: string;
  content?: string; // For templates and text-based assets
  lastUsed?: Date;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Outreach Campaign - Coordinated outreach efforts
export type OutreachStatus = 'draft' | 'active' | 'paused' | 'completed';

export interface OutreachCampaign {
  id: string;
  name: string;
  description: string;
  status: OutreachStatus;
  linkedDealId?: string;
  targetStakeholderIds: string[];
  messageTemplate: string;
  sentCount: number;
  responseCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard metrics aggregation
export interface DashboardMetrics {
  totalActiveDeals: number;
  totalDealValue: number;
  avgMomentumScore: number;
  dealsAtRisk: number; // Momentum < 30
  actionsOverdue: number;
  actionsDueToday: number;
  meetingsThisWeek: number;
  hotDeals: Deal[]; // Top 5 by momentum
  stalledDeals: Deal[]; // Momentum dropped significantly
}

// Navigation item type for the sidebar
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}
