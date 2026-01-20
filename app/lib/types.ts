// Core data models for Biz Dev Angel OS
// These types define the atomic units of the deal-centric operating system

/**
 * Account Types - Organizations the operator engages with
 */
export type AccountType = 'client' | 'partner' | 'investor' | 'platform' | 'other';

/**
 * Account - An organization in the operator's network
 * Not a lead. A strategic entity with relationship context.
 */
export interface Account {
  id: string;
  name: string;
  type: AccountType;
  strategicRelevance: string;
  relationshipStrength: 1 | 2 | 3 | 4 | 5;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Relationship Status - Current state of stakeholder relationship
 */
export type RelationshipStatus = 'cold' | 'warming' | 'engaged' | 'champion' | 'dormant';

/**
 * Stakeholder - An individual within an Account
 * The human connection point for deals and relationships
 */
export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  associatedAccountId: string;
  influenceLevel: 1 | 2 | 3 | 4 | 5;
  relationshipStatus: RelationshipStatus;
  email?: string;
  linkedIn?: string;
  notes: string;
  lastContactDate?: string;
}

/**
 * Deal Status - Lifecycle stage of a deal
 */
export type DealStatus = 'idea' | 'active' | 'stalled' | 'closed-won' | 'closed-lost';

/**
 * Deal - The atomic unit of the system
 * A strategic opportunity being advanced by the operator
 */
export interface Deal {
  id: string;
  dealName: string;
  associatedAccountIds: string[];
  dealThesis: string;
  status: DealStatus;
  momentumScore: number; // 0-100
  potentialValue?: string;
  lastAction: string;
  lastActionDate: string;
  nextBestAction: string;
  nextActionDueDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Action Types - Categories of actions the operator can take
 */
export type ActionType =
  | 'email'
  | 'call'
  | 'meeting'
  | 'linkedin'
  | 'intro-request'
  | 'proposal'
  | 'follow-up'
  | 'research'
  | 'internal'
  | 'other';

/**
 * Action - A discrete activity tied to a deal
 * The unit of forward progress
 */
export interface Action {
  id: string;
  actionType: ActionType;
  description: string;
  linkedDealId: string;
  linkedStakeholderId?: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
  outcome?: string;
  createdAt: string;
}

/**
 * ICP (Ideal Customer Profile) Criteria
 * Defines the target matrix for opportunity prioritization
 */
export interface ICPCriteria {
  id: string;
  dimension: string;
  weight: number; // 1-10
  description: string;
}

/**
 * Meeting - Scheduled interaction with stakeholders
 */
export interface Meeting {
  id: string;
  title: string;
  linkedDealId?: string;
  stakeholderIds: string[];
  scheduledDate: string;
  duration: number; // minutes
  meetingType: 'intro' | 'discovery' | 'proposal' | 'negotiation' | 'check-in' | 'other';
  agenda?: string;
  notes?: string;
  outcome?: string;
  completed: boolean;
}

/**
 * Asset - Deal collateral and materials
 */
export interface DealAsset {
  id: string;
  name: string;
  type: 'deck' | 'one-pager' | 'case-study' | 'proposal' | 'contract' | 'other';
  linkedDealIds: string[];
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Outreach Template - Reusable message templates
 */
export interface OutreachTemplate {
  id: string;
  name: string;
  channel: 'email' | 'linkedin' | 'other';
  subject?: string;
  body: string;
  tags: string[];
  useCount: number;
  lastUsed?: string;
}
