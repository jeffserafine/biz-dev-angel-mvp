/**
 * Biz Dev Angel OS - Mock Data
 *
 * Realistic sample data for MVP demonstration.
 * Simulates a fractional biz dev executive managing multiple strategic relationships.
 */

import type {
  Account,
  Stakeholder,
  Deal,
  Action,
  ICPTarget,
  Meeting,
  DealAsset,
  OutreachCampaign,
} from '@/types';

// Helper to create dates relative to today
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// ============================================================================
// ACCOUNTS
// ============================================================================
export const mockAccounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Meridian Ventures',
    type: 'investor',
    strategicRelevance: 'Series A lead investor with strong fintech portfolio. Can open doors to 15+ portfolio companies.',
    relationshipStrength: 4,
    notes: 'Met Sarah at TechCrunch Disrupt. Very aligned on AI thesis.',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(2),
  },
  {
    id: 'acc-002',
    name: 'Nexus Financial',
    type: 'client',
    strategicRelevance: 'Fortune 500 bank exploring embedded finance. $500K+ deal potential.',
    relationshipStrength: 3,
    notes: 'RFP process initiated. Need to navigate procurement.',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(1),
  },
  {
    id: 'acc-003',
    name: 'Catalyst Partners',
    type: 'partner',
    strategicRelevance: 'Top-tier consulting firm with enterprise client access. Co-sell opportunity.',
    relationshipStrength: 5,
    notes: 'Strong champion in Marcus. Joint webinar planned.',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(5),
  },
  {
    id: 'acc-004',
    name: 'TechForward Platform',
    type: 'platform',
    strategicRelevance: 'API marketplace with 50K+ developer users. Distribution channel play.',
    relationshipStrength: 2,
    notes: 'Early conversations. Need to build more trust.',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(7),
  },
  {
    id: 'acc-005',
    name: 'Horizon Health Systems',
    type: 'client',
    strategicRelevance: 'Healthcare vertical expansion opportunity. Reference customer potential.',
    relationshipStrength: 3,
    notes: 'HIPAA compliance is key concern. Working on SOC2 timing.',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(3),
  },
  {
    id: 'acc-006',
    name: 'Sterling Capital',
    type: 'investor',
    strategicRelevance: 'Growth equity firm. Bridge round or Series B lead potential.',
    relationshipStrength: 2,
    notes: 'Initial meeting went well. Need to share metrics deck.',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
];

// ============================================================================
// STAKEHOLDERS
// ============================================================================
export const mockStakeholders: Stakeholder[] = [
  {
    id: 'stk-001',
    name: 'Sarah Chen',
    role: 'Partner',
    email: 'sarah@meridianvc.com',
    linkedIn: 'linkedin.com/in/sarahchen',
    associatedAccountId: 'acc-001',
    influenceLevel: 'decision-maker',
    relationshipStatus: 'champion',
    notes: 'Former operator. Appreciates product depth over hype.',
    lastContactDate: daysAgo(2),
    createdAt: daysAgo(90),
    updatedAt: daysAgo(2),
  },
  {
    id: 'stk-002',
    name: 'Michael Torres',
    role: 'VP of Innovation',
    email: 'm.torres@nexusfinancial.com',
    associatedAccountId: 'acc-002',
    influenceLevel: 'influencer',
    relationshipStatus: 'engaged',
    notes: 'Internal champion but needs air cover from C-suite.',
    lastContactDate: daysAgo(5),
    createdAt: daysAgo(45),
    updatedAt: daysAgo(5),
  },
  {
    id: 'stk-003',
    name: 'Jennifer Walsh',
    role: 'Chief Digital Officer',
    email: 'jwalsh@nexusfinancial.com',
    associatedAccountId: 'acc-002',
    influenceLevel: 'decision-maker',
    relationshipStatus: 'new',
    notes: 'Michael reports to her. Key to unlocking budget.',
    lastContactDate: undefined,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20),
  },
  {
    id: 'stk-004',
    name: 'Marcus Williams',
    role: 'Managing Director',
    email: 'marcus@catalystpartners.com',
    linkedIn: 'linkedin.com/in/marcuswilliams',
    associatedAccountId: 'acc-003',
    influenceLevel: 'decision-maker',
    relationshipStatus: 'champion',
    notes: 'Long-term relationship. Referred 3 deals already.',
    lastContactDate: daysAgo(7),
    createdAt: daysAgo(120),
    updatedAt: daysAgo(7),
  },
  {
    id: 'stk-005',
    name: 'Alex Rivera',
    role: 'Head of Partnerships',
    email: 'alex.r@techforward.io',
    associatedAccountId: 'acc-004',
    influenceLevel: 'influencer',
    relationshipStatus: 'warming',
    notes: 'Enthusiastic but need to meet their CTO.',
    lastContactDate: daysAgo(10),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(10),
  },
  {
    id: 'stk-006',
    name: 'Dr. Lisa Park',
    role: 'Chief Medical Information Officer',
    email: 'lpark@horizonhealth.org',
    associatedAccountId: 'acc-005',
    influenceLevel: 'decision-maker',
    relationshipStatus: 'engaged',
    notes: 'Very detail-oriented. Wants to see security docs.',
    lastContactDate: daysAgo(3),
    createdAt: daysAgo(60),
    updatedAt: daysAgo(3),
  },
  {
    id: 'stk-007',
    name: 'David Kim',
    role: 'Principal',
    email: 'dkim@sterlingcap.com',
    associatedAccountId: 'acc-006',
    influenceLevel: 'decision-maker',
    relationshipStatus: 'warming',
    notes: 'Metrics-driven. Wants to see path to $10M ARR.',
    lastContactDate: daysAgo(1),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
];

// ============================================================================
// DEALS
// ============================================================================
export const mockDeals: Deal[] = [
  {
    id: 'deal-001',
    dealName: 'Nexus Enterprise Pilot',
    associatedAccountIds: ['acc-002', 'acc-003'],
    primaryAccountId: 'acc-002',
    dealThesis: 'Land $150K pilot with path to $500K+ enterprise contract. Catalyst Partners providing implementation support.',
    status: 'active',
    momentumScore: 72,
    estimatedValue: 150000,
    valueType: 'revenue',
    lastAction: null,
    nextBestAction: 'Schedule exec briefing with CDO Jennifer Walsh to secure budget approval',
    notes: 'Pilot scope defined. Legal review in progress.',
    targetCloseDate: daysFromNow(30),
    createdAt: daysAgo(45),
    updatedAt: daysAgo(1),
  },
  {
    id: 'deal-002',
    dealName: 'Meridian Series A Investment',
    associatedAccountIds: ['acc-001'],
    primaryAccountId: 'acc-001',
    dealThesis: 'Close $3M Series A round with Meridian as lead. Strategic value beyond capital: portfolio intros.',
    status: 'active',
    momentumScore: 85,
    estimatedValue: 3000000,
    valueType: 'equity',
    lastAction: null,
    nextBestAction: 'Send updated data room with Q4 metrics before partner meeting',
    notes: 'Term sheet discussions starting. Need to prep board deck.',
    targetCloseDate: daysFromNow(45),
    createdAt: daysAgo(60),
    updatedAt: daysAgo(2),
  },
  {
    id: 'deal-003',
    dealName: 'TechForward Integration Partnership',
    associatedAccountIds: ['acc-004'],
    primaryAccountId: 'acc-004',
    dealThesis: 'API integration into marketplace for distribution to 50K+ developers. Revenue share model.',
    status: 'active',
    momentumScore: 45,
    estimatedValue: 200000,
    valueType: 'strategic',
    lastAction: null,
    nextBestAction: 'Get warm intro to CTO through mutual connection at AWS',
    notes: 'Technical fit confirmed. Need business champion.',
    targetCloseDate: daysFromNow(60),
    createdAt: daysAgo(30),
    updatedAt: daysAgo(7),
  },
  {
    id: 'deal-004',
    dealName: 'Horizon Health Expansion',
    associatedAccountIds: ['acc-005'],
    primaryAccountId: 'acc-005',
    dealThesis: 'Healthcare vertical beachhead. $250K contract with case study rights. Opens 200+ hospital network.',
    status: 'active',
    momentumScore: 58,
    estimatedValue: 250000,
    valueType: 'revenue',
    lastAction: null,
    nextBestAction: 'Complete SOC2 Type II documentation and schedule security review call',
    notes: 'Champion engaged. Compliance is the gating factor.',
    targetCloseDate: daysFromNow(90),
    createdAt: daysAgo(60),
    updatedAt: daysAgo(3),
  },
  {
    id: 'deal-005',
    dealName: 'Sterling Growth Round',
    associatedAccountIds: ['acc-006', 'acc-001'],
    primaryAccountId: 'acc-006',
    dealThesis: 'Bridge or Series B option. $5-8M raise for growth. Meridian may co-invest.',
    status: 'idea',
    momentumScore: 25,
    estimatedValue: 6000000,
    valueType: 'equity',
    lastAction: null,
    nextBestAction: 'Build relationship before fundraise push. Share monthly investor update.',
    notes: 'Early stage. Not actively raising yet but building relationship.',
    targetCloseDate: daysFromNow(180),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(1),
  },
  {
    id: 'deal-006',
    dealName: 'Catalyst Co-Sell Program',
    associatedAccountIds: ['acc-003'],
    primaryAccountId: 'acc-003',
    dealThesis: 'Formalize co-sell partnership with revenue share. Access to 50+ enterprise clients.',
    status: 'stalled',
    momentumScore: 32,
    estimatedValue: 500000,
    valueType: 'hybrid',
    lastAction: null,
    nextBestAction: 'Restart conversation with Marcus - address legal concerns from last call',
    notes: 'Legal team had concerns about liability. Need creative solution.',
    targetCloseDate: daysFromNow(45),
    createdAt: daysAgo(90),
    updatedAt: daysAgo(30),
  },
];

// ============================================================================
// ACTIONS
// ============================================================================
export const mockActions: Action[] = [
  {
    id: 'act-001',
    actionType: 'meeting',
    description: 'Schedule exec briefing with Jennifer Walsh (CDO)',
    linkedDealId: 'deal-001',
    linkedStakeholderId: 'stk-003',
    dueDate: daysFromNow(2),
    completed: false,
    priority: 'critical',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
  },
  {
    id: 'act-002',
    actionType: 'email',
    description: 'Send updated data room link to Sarah Chen',
    linkedDealId: 'deal-002',
    linkedStakeholderId: 'stk-001',
    dueDate: daysFromNow(1),
    completed: false,
    priority: 'high',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
  },
  {
    id: 'act-003',
    actionType: 'intro-request',
    description: 'Ask Marcus for warm intro to TechForward CTO',
    linkedDealId: 'deal-003',
    linkedStakeholderId: 'stk-004',
    dueDate: daysFromNow(3),
    completed: false,
    priority: 'high',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
  },
  {
    id: 'act-004',
    actionType: 'research',
    description: 'Complete SOC2 documentation package',
    linkedDealId: 'deal-004',
    linkedStakeholderId: undefined,
    dueDate: daysFromNow(7),
    completed: false,
    priority: 'medium',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(3),
  },
  {
    id: 'act-005',
    actionType: 'follow-up',
    description: 'Send monthly investor update to David Kim',
    linkedDealId: 'deal-005',
    linkedStakeholderId: 'stk-007',
    dueDate: daysFromNow(5),
    completed: false,
    priority: 'medium',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: 'act-006',
    actionType: 'call',
    description: 'Call Marcus to restart co-sell discussion',
    linkedDealId: 'deal-006',
    linkedStakeholderId: 'stk-004',
    dueDate: daysAgo(2), // Overdue
    completed: false,
    priority: 'high',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: 'act-007',
    actionType: 'proposal',
    description: 'Draft pilot proposal for Michael Torres review',
    linkedDealId: 'deal-001',
    linkedStakeholderId: 'stk-002',
    dueDate: daysAgo(1), // Overdue
    completed: false,
    priority: 'critical',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(1),
  },
  {
    id: 'act-008',
    actionType: 'meeting',
    description: 'Prep board deck for Meridian partner meeting',
    linkedDealId: 'deal-002',
    linkedStakeholderId: undefined,
    dueDate: daysFromNow(10),
    completed: false,
    priority: 'high',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
  },
];

// ============================================================================
// ICP TARGETS
// ============================================================================
export const mockICPTargets: ICPTarget[] = [
  {
    id: 'icp-001',
    companyName: 'Alpine Insurance Group',
    industry: 'Insurance',
    companySize: 'enterprise',
    icpScore: 92,
    status: 'researching',
    notes: 'Perfect ICP fit. CTO spoke at InsureTech conference.',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(2),
  },
  {
    id: 'icp-002',
    companyName: 'Velocity Credit Union',
    industry: 'Financial Services',
    companySize: 'mid-market',
    icpScore: 85,
    status: 'approaching',
    notes: 'Reached out via LinkedIn. Awaiting response.',
    createdAt: daysAgo(14),
    updatedAt: daysAgo(5),
  },
  {
    id: 'icp-003',
    companyName: 'Greenfield Logistics',
    industry: 'Supply Chain',
    companySize: 'mid-market',
    icpScore: 78,
    status: 'identified',
    notes: 'Adjacent industry opportunity. Need to validate use case.',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'icp-004',
    companyName: 'Nexus Financial',
    industry: 'Banking',
    companySize: 'enterprise',
    icpScore: 95,
    status: 'converted',
    notes: 'Converted to active account.',
    convertedToAccountId: 'acc-002',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(45),
  },
  {
    id: 'icp-005',
    companyName: 'Pinecone Retail',
    industry: 'Retail',
    companySize: 'smb',
    icpScore: 45,
    status: 'disqualified',
    notes: 'Too small. No budget for enterprise solution.',
    createdAt: daysAgo(20),
    updatedAt: daysAgo(15),
  },
];

// ============================================================================
// MEETINGS
// ============================================================================
export const mockMeetings: Meeting[] = [
  {
    id: 'mtg-001',
    title: 'Nexus Pilot Kickoff',
    meetingType: 'discovery',
    linkedDealId: 'deal-001',
    linkedAccountId: 'acc-002',
    attendeeIds: ['stk-002'],
    scheduledAt: daysFromNow(3),
    duration: 60,
    meetingLink: 'https://zoom.us/j/123456789',
    agenda: '1. Review pilot scope\n2. Timeline alignment\n3. Success metrics\n4. Next steps',
    prepNotes: 'Bring updated pricing. Michael needs CFO talking points.',
    completed: false,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(1),
  },
  {
    id: 'mtg-002',
    title: 'Meridian Partner Meeting',
    meetingType: 'negotiation',
    linkedDealId: 'deal-002',
    linkedAccountId: 'acc-001',
    attendeeIds: ['stk-001'],
    scheduledAt: daysFromNow(14),
    duration: 90,
    location: 'Meridian VC Office, SF',
    agenda: '1. Business update\n2. Q4 metrics review\n3. Term sheet discussion\n4. Timeline to close',
    prepNotes: 'Prepare: growth metrics, competitive landscape, use of funds, board composition.',
    completed: false,
    createdAt: daysAgo(10),
    updatedAt: daysAgo(2),
  },
  {
    id: 'mtg-003',
    title: 'Horizon Security Review',
    meetingType: 'demo',
    linkedDealId: 'deal-004',
    linkedAccountId: 'acc-005',
    attendeeIds: ['stk-006'],
    scheduledAt: daysFromNow(7),
    duration: 45,
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/abc',
    agenda: '1. SOC2 walkthrough\n2. HIPAA compliance\n3. Data handling\n4. Q&A',
    prepNotes: 'Dr. Park is technical. Have engineering on standby for deep questions.',
    completed: false,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'mtg-004',
    title: 'Sterling Intro Call',
    meetingType: 'intro',
    linkedDealId: 'deal-005',
    linkedAccountId: 'acc-006',
    attendeeIds: ['stk-007'],
    scheduledAt: daysAgo(1),
    duration: 30,
    meetingLink: 'https://zoom.us/j/987654321',
    agenda: '1. Company overview\n2. Market opportunity\n3. Next steps',
    prepNotes: 'Keep high level. This is relationship building, not fundraise.',
    postMeetingNotes: 'Great initial chemistry. David wants monthly updates. Interested in Series B timing.',
    actionItemsGenerated: ['Send monthly investor update', 'Share metrics deck in Q1'],
    completed: true,
    createdAt: daysAgo(7),
    updatedAt: daysAgo(1),
  },
];

// ============================================================================
// DEAL ASSETS
// ============================================================================
export const mockDealAssets: DealAsset[] = [
  {
    id: 'asset-001',
    name: 'Enterprise Sales Deck',
    assetType: 'deck',
    description: 'Main sales presentation for enterprise prospects.',
    linkedDealIds: ['deal-001', 'deal-004'],
    fileUrl: '/assets/enterprise-deck.pdf',
    lastUsed: daysAgo(3),
    usageCount: 12,
    createdAt: daysAgo(90),
    updatedAt: daysAgo(10),
  },
  {
    id: 'asset-002',
    name: 'Series A Data Room',
    assetType: 'other',
    description: 'Complete investor data room with financials and metrics.',
    linkedDealIds: ['deal-002', 'deal-005'],
    fileUrl: 'https://dataroom.company.com/series-a',
    lastUsed: daysAgo(2),
    usageCount: 8,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(2),
  },
  {
    id: 'asset-003',
    name: 'Healthcare Case Study',
    assetType: 'case-study',
    description: 'Success story from pilot with regional health system.',
    linkedDealIds: ['deal-004'],
    fileUrl: '/assets/healthcare-case-study.pdf',
    lastUsed: daysAgo(10),
    usageCount: 5,
    createdAt: daysAgo(45),
    updatedAt: daysAgo(30),
  },
  {
    id: 'asset-004',
    name: 'Partnership Proposal Template',
    assetType: 'proposal',
    description: 'Template for co-sell and integration partnerships.',
    linkedDealIds: ['deal-003', 'deal-006'],
    content: `# Strategic Partnership Proposal

## Executive Summary
[Insert summary]

## Partnership Structure
- Revenue share model
- Joint go-to-market
- Technical integration

## Terms
[Customize per partner]

## Next Steps
1. Align on scope
2. Legal review
3. Pilot program`,
    lastUsed: daysAgo(30),
    usageCount: 3,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(30),
  },
  {
    id: 'asset-005',
    name: 'Intro Email Template',
    assetType: 'email-template',
    description: 'Cold outreach template for warm intros.',
    linkedDealIds: [],
    content: `Subject: Quick intro - [Mutual Connection] suggested we connect

Hi [Name],

[Mutual Connection] mentioned you might be interested in [value prop].

We've helped companies like [Customer] achieve [result].

Would you have 15 minutes this week for a quick call?

Best,
[Signature]`,
    lastUsed: daysAgo(1),
    usageCount: 25,
    createdAt: daysAgo(120),
    updatedAt: daysAgo(30),
  },
];

// ============================================================================
// OUTREACH CAMPAIGNS
// ============================================================================
export const mockOutreachCampaigns: OutreachCampaign[] = [
  {
    id: 'out-001',
    name: 'Q1 Enterprise Fintech Push',
    description: 'Targeted outreach to fintech innovation leads at F500 banks.',
    status: 'active',
    linkedDealId: undefined,
    targetStakeholderIds: [],
    messageTemplate: 'Personalized approach highlighting embedded finance use case.',
    sentCount: 15,
    responseCount: 4,
    createdAt: daysAgo(21),
    updatedAt: daysAgo(3),
  },
  {
    id: 'out-002',
    name: 'Healthcare Vertical Expansion',
    description: 'Outreach to health systems based on Horizon success.',
    status: 'draft',
    linkedDealId: 'deal-004',
    targetStakeholderIds: [],
    messageTemplate: 'Lead with compliance story and reference customer.',
    sentCount: 0,
    responseCount: 0,
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
  },
  {
    id: 'out-003',
    name: 'Investor Monthly Update',
    description: 'Regular touchpoint with investor relationships.',
    status: 'active',
    linkedDealId: undefined,
    targetStakeholderIds: ['stk-001', 'stk-007'],
    messageTemplate: 'Monthly metrics + 1 key win + 1 ask',
    sentCount: 6,
    responseCount: 4,
    createdAt: daysAgo(90),
    updatedAt: daysAgo(30),
  },
];

// ============================================================================
// HELPER FUNCTIONS FOR DATA ACCESS
// ============================================================================

export const getAccountById = (id: string): Account | undefined =>
  mockAccounts.find((a) => a.id === id);

export const getStakeholderById = (id: string): Stakeholder | undefined =>
  mockStakeholders.find((s) => s.id === id);

export const getDealById = (id: string): Deal | undefined =>
  mockDeals.find((d) => d.id === id);

export const getStakeholdersByAccount = (accountId: string): Stakeholder[] =>
  mockStakeholders.filter((s) => s.associatedAccountId === accountId);

export const getActionsByDeal = (dealId: string): Action[] =>
  mockActions.filter((a) => a.linkedDealId === dealId);

export const getMeetingsByDeal = (dealId: string): Meeting[] =>
  mockMeetings.filter((m) => m.linkedDealId === dealId);

export const getAssetsByDeal = (dealId: string): DealAsset[] =>
  mockDealAssets.filter((a) => a.linkedDealIds.includes(dealId));

export const getOverdueActions = (): Action[] => {
  const now = new Date();
  return mockActions.filter((a) => !a.completed && a.dueDate < now);
};

export const getActionsDueToday = (): Action[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return mockActions.filter(
    (a) => !a.completed && a.dueDate >= today && a.dueDate < tomorrow
  );
};

export const getUpcomingMeetings = (days: number = 7): Meeting[] => {
  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + days);

  return mockMeetings
    .filter((m) => !m.completed && m.scheduledAt >= now && m.scheduledAt <= future)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
};
