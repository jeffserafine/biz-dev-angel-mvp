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
 * ICP Session — Output of an ICP Forge session
 */
export interface ICPSession {
  id: string;
  segment: string;
  jobToBeDone: string;
  fitSignals: string[];
  antiICPFlags: string[];
  firstTargetList: string[];
  createdAt: string;
}

/**
 * Narrative — Output of a Narrative Engine session
 */
export interface Narrative {
  id: string;
  linkedICPId?: string;
  positioningStatement: string;
  warmIntroPitch: string;
  coldOutreachPitch: string;
  investorFacingPitch: string;
  talkingPoints: string[];
  createdAt: string;
}

/**
 * CoreEngineSignal — Surfaced by Core Engine service layer
 */
export interface CoreEngineSignal {
  dealId: string;
  signalType: 'momentum_drop' | 'overdue_action' | 'stalled' | 'high_momentum';
  message: string;
  priority: 1 | 2 | 3;
}
