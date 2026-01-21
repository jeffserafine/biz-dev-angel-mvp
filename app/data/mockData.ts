import type {
  Account,
  Stakeholder,
  Deal,
  Action,
  ICPCriteria,
  Meeting,
  DealAsset,
  OutreachTemplate,
} from '@/lib/types';

// Mock Accounts - Strategic organizations in the network
export const mockAccounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Meridian Capital Partners',
    type: 'investor',
    strategicRelevance: 'Series A lead investor with fintech focus. Strong LP network.',
    relationshipStrength: 4,
    notes: 'Met at Fintech Summit 2024. Partner Sarah Chen is champion.',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
  },
  {
    id: 'acc-002',
    name: 'Atlas Industrial Holdings',
    type: 'client',
    strategicRelevance: 'Fortune 500 target. $2B revenue. Digital transformation mandate.',
    relationshipStrength: 2,
    notes: 'Warm intro via board member. Exploring automation solutions.',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-08',
  },
  {
    id: 'acc-003',
    name: 'Velocity AI',
    type: 'partner',
    strategicRelevance: 'Technical integration partner. Strong ML/AI capabilities.',
    relationshipStrength: 5,
    notes: 'Co-selling opportunity. Already integrated in two accounts.',
    createdAt: '2023-11-20',
    updatedAt: '2024-03-12',
  },
  {
    id: 'acc-004',
    name: 'Northstar Ventures',
    type: 'investor',
    strategicRelevance: 'Growth equity investor. Portfolio includes 3 strategic accounts.',
    relationshipStrength: 3,
    notes: 'Exploring co-investment opportunity. Warm relationship with GP.',
    createdAt: '2024-01-05',
    updatedAt: '2024-03-05',
  },
  {
    id: 'acc-005',
    name: 'Evergreen Logistics',
    type: 'client',
    strategicRelevance: 'Mid-market logistics company. High expansion potential.',
    relationshipStrength: 4,
    notes: 'Current pilot customer. Strong results. Upsell opportunity.',
    createdAt: '2023-12-10',
    updatedAt: '2024-03-11',
  },
  {
    id: 'acc-006',
    name: 'TechBridge Platform',
    type: 'platform',
    strategicRelevance: 'Distribution channel. 50k enterprise users.',
    relationshipStrength: 2,
    notes: 'Marketplace integration in discussion. Revenue share model.',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-07',
  },
];

// Mock Stakeholders - Key individuals within accounts
export const mockStakeholders: Stakeholder[] = [
  {
    id: 'stk-001',
    name: 'Sarah Chen',
    role: 'Managing Partner',
    associatedAccountId: 'acc-001',
    influenceLevel: 5,
    relationshipStatus: 'champion',
    email: 'schen@meridian.vc',
    linkedIn: 'linkedin.com/in/sarahchen',
    notes: 'Decision maker. Introduced us to 3 portfolio companies.',
    lastContactDate: '2024-03-08',
  },
  {
    id: 'stk-002',
    name: 'Marcus Thompson',
    role: 'Chief Digital Officer',
    associatedAccountId: 'acc-002',
    influenceLevel: 5,
    relationshipStatus: 'engaged',
    email: 'mthompson@atlasindustrial.com',
    notes: 'Executive sponsor. Budget authority for transformation initiatives.',
    lastContactDate: '2024-03-05',
  },
  {
    id: 'stk-003',
    name: 'David Park',
    role: 'VP Engineering',
    associatedAccountId: 'acc-002',
    influenceLevel: 4,
    relationshipStatus: 'warming',
    email: 'dpark@atlasindustrial.com',
    notes: 'Technical evaluator. Needs proof of scale.',
    lastContactDate: '2024-02-28',
  },
  {
    id: 'stk-004',
    name: 'Elena Rodriguez',
    role: 'CEO & Co-founder',
    associatedAccountId: 'acc-003',
    influenceLevel: 5,
    relationshipStatus: 'champion',
    email: 'elena@velocityai.com',
    linkedIn: 'linkedin.com/in/elenarodriguez',
    notes: 'Strategic partner. Aligned on go-to-market.',
    lastContactDate: '2024-03-10',
  },
  {
    id: 'stk-005',
    name: 'James Liu',
    role: 'Principal',
    associatedAccountId: 'acc-004',
    influenceLevel: 4,
    relationshipStatus: 'engaged',
    email: 'jliu@northstar.com',
    notes: 'Deal lead for growth investments. Interested in our space.',
    lastContactDate: '2024-03-01',
  },
  {
    id: 'stk-006',
    name: 'Amanda Foster',
    role: 'COO',
    associatedAccountId: 'acc-005',
    influenceLevel: 5,
    relationshipStatus: 'champion',
    email: 'afoster@evergreenlogistics.com',
    notes: 'Executive champion. Driving expansion internally.',
    lastContactDate: '2024-03-11',
  },
  {
    id: 'stk-007',
    name: 'Ryan Mitchell',
    role: 'Head of Partnerships',
    associatedAccountId: 'acc-006',
    influenceLevel: 4,
    relationshipStatus: 'warming',
    email: 'rmitchell@techbridge.io',
    notes: 'Gatekeeper for marketplace. Needs business case.',
    lastContactDate: '2024-02-20',
  },
];

// Mock Deals - The atomic units of value creation
export const mockDeals: Deal[] = [
  {
    id: 'deal-001',
    dealName: 'Atlas Digital Transformation Platform',
    associatedAccountIds: ['acc-002', 'acc-003'],
    dealThesis: 'Enterprise platform deal with Velocity AI integration. Pilot to enterprise-wide rollout.',
    status: 'active',
    momentumScore: 72,
    potentialValue: '$1.2M ARR',
    lastAction: 'Technical deep-dive with VP Engineering',
    lastActionDate: '2024-03-05',
    nextBestAction: 'Send ROI analysis to CDO',
    nextActionDueDate: '2024-03-15',
    notes: 'Strong technical fit confirmed. Need executive alignment on timeline.',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-10',
  },
  {
    id: 'deal-002',
    dealName: 'Meridian Series A Co-Investment',
    associatedAccountIds: ['acc-001', 'acc-004'],
    dealThesis: 'Strategic investment alongside Meridian. Board observer seat potential.',
    status: 'active',
    momentumScore: 58,
    potentialValue: '$500K investment + board seat',
    lastAction: 'Term sheet review call',
    lastActionDate: '2024-03-08',
    nextBestAction: 'Schedule partner meeting at Northstar',
    nextActionDueDate: '2024-03-18',
    notes: 'Syndicate forming. Need to move fast on commitment.',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-08',
  },
  {
    id: 'deal-003',
    dealName: 'Evergreen Logistics Expansion',
    associatedAccountIds: ['acc-005'],
    dealThesis: 'Expand pilot to full enterprise deployment. Land-and-expand model.',
    status: 'active',
    momentumScore: 85,
    potentialValue: '$400K ARR expansion',
    lastAction: 'Quarterly business review with COO',
    lastActionDate: '2024-03-11',
    nextBestAction: 'Draft expansion proposal',
    nextActionDueDate: '2024-03-14',
    notes: 'Champion pushing for Q2 expansion. High probability.',
    createdAt: '2023-12-15',
    updatedAt: '2024-03-11',
  },
  {
    id: 'deal-004',
    dealName: 'TechBridge Marketplace Integration',
    associatedAccountIds: ['acc-006'],
    dealThesis: 'Distribution partnership through marketplace. Access to 50k users.',
    status: 'stalled',
    momentumScore: 25,
    potentialValue: '$200K+ channel revenue',
    lastAction: 'Initial partnership discussion',
    lastActionDate: '2024-02-20',
    nextBestAction: 'Re-engage with updated business case',
    nextActionDueDate: '2024-03-20',
    notes: 'Lost momentum. Need fresh angle to restart conversation.',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-01',
  },
  {
    id: 'deal-005',
    dealName: 'Velocity AI Joint GTM',
    associatedAccountIds: ['acc-003'],
    dealThesis: 'Co-selling partnership with shared pipeline. Technical integration complete.',
    status: 'active',
    momentumScore: 90,
    potentialValue: '$800K pipeline contribution',
    lastAction: 'Joint customer meeting at Atlas',
    lastActionDate: '2024-03-05',
    nextBestAction: 'Finalize partnership agreement terms',
    nextActionDueDate: '2024-03-12',
    notes: 'Strong alignment. Ready to formalize.',
    createdAt: '2023-11-25',
    updatedAt: '2024-03-10',
  },
];

// Mock Actions - Discrete activities driving deals forward
export const mockActions: Action[] = [
  {
    id: 'act-001',
    actionType: 'email',
    description: 'Send ROI analysis to Marcus Thompson',
    linkedDealId: 'deal-001',
    linkedStakeholderId: 'stk-002',
    dueDate: '2024-03-15',
    completed: false,
    createdAt: '2024-03-10',
  },
  {
    id: 'act-002',
    actionType: 'meeting',
    description: 'Schedule partner meeting with James Liu at Northstar',
    linkedDealId: 'deal-002',
    linkedStakeholderId: 'stk-005',
    dueDate: '2024-03-18',
    completed: false,
    createdAt: '2024-03-08',
  },
  {
    id: 'act-003',
    actionType: 'proposal',
    description: 'Draft expansion proposal for Evergreen',
    linkedDealId: 'deal-003',
    linkedStakeholderId: 'stk-006',
    dueDate: '2024-03-14',
    completed: false,
    createdAt: '2024-03-11',
  },
  {
    id: 'act-004',
    actionType: 'research',
    description: 'Prepare updated business case for TechBridge',
    linkedDealId: 'deal-004',
    linkedStakeholderId: 'stk-007',
    dueDate: '2024-03-20',
    completed: false,
    createdAt: '2024-03-01',
  },
  {
    id: 'act-005',
    actionType: 'follow-up',
    description: 'Review and comment on partnership agreement',
    linkedDealId: 'deal-005',
    linkedStakeholderId: 'stk-004',
    dueDate: '2024-03-12',
    completed: false,
    createdAt: '2024-03-10',
  },
  {
    id: 'act-006',
    actionType: 'call',
    description: 'Weekly sync with Sarah Chen',
    linkedDealId: 'deal-002',
    linkedStakeholderId: 'stk-001',
    dueDate: '2024-03-13',
    completed: false,
    createdAt: '2024-03-06',
  },
  {
    id: 'act-007',
    actionType: 'intro-request',
    description: 'Ask Elena for intro to TechBridge leadership',
    linkedDealId: 'deal-004',
    linkedStakeholderId: 'stk-004',
    dueDate: '2024-03-16',
    completed: false,
    createdAt: '2024-03-10',
  },
];

// Mock ICP Criteria - Target matrix dimensions
export const mockICPCriteria: ICPCriteria[] = [
  {
    id: 'icp-001',
    dimension: 'Revenue Scale',
    weight: 9,
    description: 'Annual revenue > $100M preferred',
  },
  {
    id: 'icp-002',
    dimension: 'Digital Maturity',
    weight: 8,
    description: 'Active digital transformation initiative',
  },
  {
    id: 'icp-003',
    dimension: 'Decision Speed',
    weight: 7,
    description: 'Can make purchasing decisions < 90 days',
  },
  {
    id: 'icp-004',
    dimension: 'Strategic Alignment',
    weight: 10,
    description: 'Clear use case fit with our core offering',
  },
  {
    id: 'icp-005',
    dimension: 'Relationship Access',
    weight: 8,
    description: 'Warm path to economic buyer',
  },
  {
    id: 'icp-006',
    dimension: 'Expansion Potential',
    weight: 7,
    description: 'Multiple business units or geographies',
  },
];

// Mock Meetings - Scheduled interactions
export const mockMeetings: Meeting[] = [
  {
    id: 'mtg-001',
    title: 'Atlas Technical Architecture Review',
    linkedDealId: 'deal-001',
    stakeholderIds: ['stk-002', 'stk-003'],
    scheduledDate: '2024-03-18T14:00:00',
    duration: 60,
    meetingType: 'discovery',
    agenda: '1. Review technical requirements\n2. Discuss integration timeline\n3. Address security concerns',
    completed: false,
  },
  {
    id: 'mtg-002',
    title: 'Northstar Partner Discussion',
    linkedDealId: 'deal-002',
    stakeholderIds: ['stk-005'],
    scheduledDate: '2024-03-19T10:00:00',
    duration: 45,
    meetingType: 'intro',
    agenda: '1. Portfolio overview\n2. Co-investment thesis\n3. Next steps',
    completed: false,
  },
  {
    id: 'mtg-003',
    title: 'Evergreen Expansion Planning',
    linkedDealId: 'deal-003',
    stakeholderIds: ['stk-006'],
    scheduledDate: '2024-03-15T11:00:00',
    duration: 30,
    meetingType: 'proposal',
    agenda: '1. Review pilot results\n2. Present expansion proposal\n3. Discuss timeline',
    completed: false,
  },
  {
    id: 'mtg-004',
    title: 'Velocity AI Partnership Sync',
    linkedDealId: 'deal-005',
    stakeholderIds: ['stk-004'],
    scheduledDate: '2024-03-14T15:00:00',
    duration: 45,
    meetingType: 'negotiation',
    agenda: '1. Review agreement terms\n2. Align on revenue share\n3. Plan joint announcements',
    completed: false,
  },
];

// Mock Deal Assets - Collateral and materials
export const mockDealAssets: DealAsset[] = [
  {
    id: 'asset-001',
    name: 'Enterprise Platform Overview Deck',
    type: 'deck',
    linkedDealIds: ['deal-001', 'deal-003'],
    url: '/assets/enterprise-deck-v3.pdf',
    notes: 'Updated March 2024. Includes new case studies.',
    createdAt: '2024-01-10',
    updatedAt: '2024-03-01',
  },
  {
    id: 'asset-002',
    name: 'ROI Calculator Model',
    type: 'other',
    linkedDealIds: ['deal-001'],
    url: '/assets/roi-calculator.xlsx',
    notes: 'Customizable for enterprise deals. Use with CDO conversations.',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-05',
  },
  {
    id: 'asset-003',
    name: 'Logistics Industry Case Study',
    type: 'case-study',
    linkedDealIds: ['deal-003', 'deal-004'],
    url: '/assets/logistics-case-study.pdf',
    notes: 'Evergreen pilot results. Strong metrics.',
    createdAt: '2024-02-28',
    updatedAt: '2024-02-28',
  },
  {
    id: 'asset-004',
    name: 'Partnership One-Pager',
    type: 'one-pager',
    linkedDealIds: ['deal-005', 'deal-006'],
    url: '/assets/partnership-onepager.pdf',
    notes: 'For partner and platform discussions.',
    createdAt: '2024-01-20',
    updatedAt: '2024-02-10',
  },
  {
    id: 'asset-005',
    name: 'Security & Compliance Overview',
    type: 'other',
    linkedDealIds: ['deal-001'],
    url: '/assets/security-overview.pdf',
    notes: 'SOC2, GDPR, enterprise security requirements.',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
  },
];

// Mock Outreach Templates
export const mockOutreachTemplates: OutreachTemplate[] = [
  {
    id: 'tmpl-001',
    name: 'Executive Intro - Cold',
    channel: 'email',
    subject: 'Quick question about [Company] strategy',
    body: `Hi [Name],

I've been following [Company]'s work in [area] and noticed [specific observation].

We've helped companies like [reference] achieve [outcome]. I'd love to share a few insights that might be relevant to your [initiative].

Would you have 15 minutes this week or next?

Best,
[Signature]`,
    tags: ['cold', 'executive', 'intro'],
    useCount: 23,
    lastUsed: '2024-03-08',
  },
  {
    id: 'tmpl-002',
    name: 'Warm Intro Follow-up',
    channel: 'email',
    subject: 'Following up on [Referrer]\'s introduction',
    body: `Hi [Name],

[Referrer] suggested we connect regarding [topic]. They mentioned you're exploring [area] and thought our experience with [relevant work] might be valuable.

I'd love to hear more about what you're working on. Would you have time for a brief call this week?

Best,
[Signature]`,
    tags: ['warm', 'intro', 'referral'],
    useCount: 45,
    lastUsed: '2024-03-10',
  },
  {
    id: 'tmpl-003',
    name: 'LinkedIn Connection Request',
    channel: 'linkedin',
    body: `Hi [Name], I came across your work at [Company] and was impressed by [specific detail]. I'm working on similar challenges in [area] and would value connecting. Looking forward to staying in touch.`,
    tags: ['linkedin', 'connection', 'networking'],
    useCount: 67,
    lastUsed: '2024-03-11',
  },
  {
    id: 'tmpl-004',
    name: 'Meeting Follow-up',
    channel: 'email',
    subject: 'Great connecting - next steps',
    body: `Hi [Name],

Thank you for taking the time to meet today. I really enjoyed our conversation about [topic].

As discussed, here are the next steps:
1. [Action item 1]
2. [Action item 2]

I'll [your action] by [date]. Looking forward to continuing the conversation.

Best,
[Signature]`,
    tags: ['follow-up', 'meeting', 'next-steps'],
    useCount: 89,
    lastUsed: '2024-03-11',
  },
];

// Helper function to calculate deal health indicators
export function getDealHealthIndicators(deal: Deal) {
  const momentum = deal.momentumScore;
  let health: 'healthy' | 'at-risk' | 'critical';
  let recommendation: string;

  if (momentum >= 70) {
    health = 'healthy';
    recommendation = 'Maintain momentum. Focus on advancing to next stage.';
  } else if (momentum >= 40) {
    health = 'at-risk';
    recommendation = 'Needs attention. Re-engage key stakeholders.';
  } else {
    health = 'critical';
    recommendation = 'Urgent action required. Consider deal viability.';
  }

  return { health, recommendation, momentum };
}

// Helper function to get next actions for today
export function getTodayActions(actions: Action[]): Action[] {
  const today = new Date().toISOString().split('T')[0];
  return actions.filter(a => !a.completed && a.dueDate <= today);
}

// Helper function to get upcoming actions
export function getUpcomingActions(actions: Action[], days: number = 7): Action[] {
  const today = new Date();
  const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
  const todayStr = today.toISOString().split('T')[0];
  const futureStr = futureDate.toISOString().split('T')[0];

  return actions.filter(a => !a.completed && a.dueDate > todayStr && a.dueDate <= futureStr);
}
