import type {
  Account,
  Stakeholder,
  Deal,
  Action,
  ICPSession,
  Narrative,
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

// Mock ICP Sessions — Output of ICP Forge sessions
export const mockICPSessions: ICPSession[] = [
  {
    id: 'icp-001',
    segment: 'Early-stage SaaS founders post-product, pre-revenue',
    jobToBeDone: 'Validate go-to-market angle before burning runway on the wrong ICP',
    fitSignals: ['Has a working product', 'No dedicated BD hire', 'Founder-led sales', 'Under $500K raised'],
    antiICPFlags: ['Seeking investor intros only', 'Pre-product', 'Already has BD team'],
    firstTargetList: ['Founder communities (YC, Indie Hackers)', 'No-code builder audiences', 'Accelerator cohort members'],
    createdAt: '2025-03-01',
  },
  {
    id: 'icp-002',
    segment: 'Creator economy platforms seeking brand partnership revenue',
    jobToBeDone: 'Build a repeatable BD motion to convert inbound interest into structured deals',
    fitSignals: ['100K+ creator base', 'Brand partnership inquiries coming in unstructured', 'No dedicated partnerships function'],
    antiICPFlags: ['Enterprise media companies', 'No creator community', 'Ad-only revenue model'],
    firstTargetList: ['Mid-size creator platforms', 'Newsletter networks', 'Podcast networks with brand deals'],
    createdAt: '2025-03-15',
  },
];

// Mock Narratives — Output of Narrative Engine sessions
export const mockNarratives: Narrative[] = [
  {
    id: 'narr-001',
    linkedICPId: 'icp-001',
    positioningStatement: 'NextWave helps vibe-coded founders build a BD motion before they hire one — so the first BD hire has something to inherit, not build from scratch.',
    warmIntroPitch: 'Happy to connect — we work with founders who have product-market fit intuition but need a structured way to convert conversations into deals. If that resonates with where [Name] is, worth a quick call.',
    coldOutreachPitch: "I work with early-stage founders who are closing deals personally but don't yet have a repeatable motion. Most don't need a BD hire yet — they need a methodology. We built one. Would it be useful to pressure-test your current approach?",
    investorFacingPitch: 'We provide fractional BD infrastructure to post-product, pre-scale founders — specifically the ICP clarity, narrative, and pipeline architecture that makes the first BD hire 3x more effective.',
    talkingPoints: ['Methodology over tooling', 'Human-in-the-loop always', 'ICP first, outreach second', 'Deal as atomic unit'],
    createdAt: '2025-03-20',
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
