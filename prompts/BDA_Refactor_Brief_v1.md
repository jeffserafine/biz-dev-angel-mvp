# Biz Dev Angel — Claude Code Refactor Brief (v0.3)

> **Document Type:** Phased Refactor Brief for Claude Code
> **Source of Truth:** `BizDevAngel_BuildPrompt_v2.md` (see `/prompts` directory)
> **Existing Codebase:** `/app` directory — Next.js 14, React 18, TypeScript, CSS Modules
> **Goal:** Refactor v0.2 scaffold into v0.3 target architecture without full rebuild

---

## HOW TO USE THIS BRIEF

This brief is broken into **6 phases**. Run each phase as a **separate Claude Code session**.

At the start of each session:
1. Tell Claude Code: "We are doing Phase [N] of the BDA refactor. Read this brief and the files listed under 'Read First' before touching anything."
2. Paste only the relevant phase section, not the whole document.
3. When Claude Code completes the phase, verify it works before starting the next.

This approach keeps each session focused, prevents context bloat, and avoids Claude Code trying to do everything at once and losing coherence mid-build.

---

## WHAT TO PRESERVE (DO NOT REWRITE)

Tell Claude Code this at the start of every session:

> "Do not rewrite or replace the following unless the phase explicitly instructs it:
> - `app/components/ui/Card.tsx`
> - `app/components/ui/Badge.tsx`
> - `app/components/ui/MomentumMeter.tsx`
> - `app/components/ui/ActionItem.tsx`
> - `app/components/ui/RelationshipStrength.tsx`
> - `app/lib/store.tsx` (modify only, do not replace)
> - `app/styles/globals.css` (modify only, do not replace)
> - `app/lib/types.ts` (modify only, do not replace)"

---

## PHASE 1 — Foundation Cleanup

**Session goal:** Fix security vulnerability, update font, rename files to canonical module names.
**Estimated tokens:** Low. No logic changes.

### Read First
- `app/package.json`
- `app/package-lock.json`
- `app/app/layout.tsx`
- `app/styles/globals.css` (lines 1–60 only)

### Instructions

**1. Security fix**
Upgrade Next.js from `14.2.0` to the latest patched `14.x` release. Update `package.json` and run `npm install`. Do not upgrade to Next.js 15 — stay on 14.x.

**2. Font replacement**
In `app/app/layout.tsx`, remove the Inter Google Fonts import entirely.
Replace with:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
```
In `app/styles/globals.css`, update the font variables:
```css
--font-sans: 'DM Sans', -apple-system, sans-serif;
--font-mono: 'DM Mono', 'JetBrains Mono', monospace;
```

**3. Rename module files to canonical names**
Rename (do not rewrite content yet — just rename):
- `app/components/modules/ICPMatrix.tsx` → `ICPForge.tsx`
- `app/components/modules/DealDesk.tsx` → `DealMap.tsx`
- `app/components/modules/Outreach.tsx` → `NarrativeEngine.tsx`

Delete these files entirely:
- `app/components/modules/Meetings.tsx`
- `app/components/modules/Assets.tsx`

**4. Update MainLayout.tsx**
In `app/components/layout/MainLayout.tsx`, update imports and switch cases to match the new filenames. Remove references to `meetings` and `assets` modules. Do not change logic yet.

**5. Update Sidebar.tsx**
In `app/components/layout/Sidebar.tsx`, update nav items:
- Remove: Meetings, Assets
- Rename: `icp-matrix` → `icp-forge`, label "ICP Forge"
- Rename: `deal-desk` → `deal-map`, label "DealMap"
- Rename: `outreach` → `narrative-engine`, label "Narrative Engine"
- Add (gated, styled differently): `bda-pro`, label "BDA Pro", with a small "Coming Soon" badge next to it

**6. Update store.tsx**
Update the `ModuleView` type in `app/lib/store.tsx` to match the new module IDs. Remove `meetings` and `assets`. Add `bda-pro`.

### Definition of Done
App runs with no errors. Sidebar shows correct module names. DM Sans renders in browser. No Meetings or Assets routes exist. BDA Pro appears in nav with Coming Soon indicator.

---

## PHASE 2 — Data Model Refactor

**Session goal:** Update types and mock data to reflect the v0.3 architecture. Demote Accounts/Stakeholders. Add ICP and Narrative types.
**Estimated tokens:** Medium.

### Read First
- `app/lib/types.ts` (full file)
- `app/data/mockData.ts` (full file)
- `app/lib/store.tsx` (full file)

### Instructions

**1. Update `app/lib/types.ts`**

Keep: `Account`, `AccountType`, `Stakeholder`, `RelationshipStatus`, `Deal`, `DealStatus`, `Action`, `ActionType`

Remove: `Meeting`, `DealAsset`, `OutreachTemplate`, `ICPCriteria`

Add these new types:

```typescript
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
```

**2. Update `app/data/mockData.ts`**

Remove: `mockMeetings`, `mockDealAssets`, `mockOutreachTemplates`, `mockICPCriteria`

Add:
```typescript
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
```

**3. Update `app/lib/store.tsx`**

Remove state for: `meetings`, `assets`, `templates`, `icpCriteria`
Add state for: `icpSessions`, `narratives`
Remove lookup functions for removed entities.
Add: `getICPSessionById`, `getNarrativeById`

**4. Create `app/lib/coreEngine.ts`** (new file)

```typescript
/**
 * Core Engine — Methodology service layer
 * Surfaces signals, next-best-actions, and momentum logic.
 * This is the methodology moat made visible in code.
 */

import type { Deal, Action, CoreEngineSignal } from './types';

export function computeMomentumScore(deal: Deal, actions: Action[]): number {
  const daysSinceLastAction = Math.floor(
    (Date.now() - new Date(deal.lastActionDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const pendingActions = actions.filter(a => a.linkedDealId === deal.id && !a.completed).length;
  const overdueActions = actions.filter(
    a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
  ).length;

  let score = deal.momentumScore;
  if (daysSinceLastAction > 14) score -= 20;
  else if (daysSinceLastAction > 7) score -= 10;
  if (overdueActions > 0) score -= overdueActions * 15;
  if (pendingActions > 0) score += 5;

  return Math.max(0, Math.min(100, score));
}

export function surfaceSignals(deals: Deal[], actions: Action[]): CoreEngineSignal[] {
  const signals: CoreEngineSignal[] = [];

  deals.forEach(deal => {
    if (deal.status !== 'active') return;

    const overdue = actions.filter(
      a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
    );
    if (overdue.length > 0) {
      signals.push({
        dealId: deal.id,
        signalType: 'overdue_action',
        message: `${overdue.length} overdue action${overdue.length > 1 ? 's' : ''} on ${deal.dealName}`,
        priority: 1,
      });
    }

    if (deal.momentumScore < 30) {
      signals.push({
        dealId: deal.id,
        signalType: 'momentum_drop',
        message: `${deal.dealName} momentum is critical — consider re-engaging or reassessing`,
        priority: 1,
      });
    }

    if (deal.status === 'stalled') {
      signals.push({
        dealId: deal.id,
        signalType: 'stalled',
        message: `${deal.dealName} is stalled — needs a fresh angle or explicit close/no-close decision`,
        priority: 2,
      });
    }

    if (deal.momentumScore >= 80) {
      signals.push({
        dealId: deal.id,
        signalType: 'high_momentum',
        message: `${deal.dealName} is high momentum — prioritize advancing this week`,
        priority: 3,
      });
    }
  });

  return signals.sort((a, b) => a.priority - b.priority);
}

export function getNextBestAction(deal: Deal, actions: Action[]): string {
  const overdue = actions.filter(
    a => a.linkedDealId === deal.id && !a.completed && new Date(a.dueDate) < new Date()
  );
  if (overdue.length > 0) return `Complete overdue action: ${overdue[0].description}`;
  if (deal.momentumScore < 40) return 'Re-engage primary stakeholder with new value hook';
  if (deal.status === 'stalled') return 'Schedule a direct conversation to assess deal viability';
  return deal.nextBestAction;
}
```

### Definition of Done
`npm run build` passes. No TypeScript errors. Store loads with new data shapes. Core Engine file exists and exports correctly.

---

## PHASE 3 — ICP Forge Module

**Session goal:** Rebuild ICPForge.tsx as a guided session module with a structured deliverable output. This replaces the old ICP Matrix scoring view.
**Estimated tokens:** Medium-high. This is a new surface.

### Read First
- `app/components/modules/ICPForge.tsx` (current renamed file)
- `app/data/mockData.ts` (mockICPSessions only)
- `app/lib/types.ts` (ICPSession type)
- `app/components/ui/Card.tsx`
- `app/components/ui/Badge.tsx`

### Instructions

Rewrite `ICPForge.tsx` completely. The old ICP Matrix scoring logic is replaced by this new surface.

**ICP Forge is a two-panel module:**

**Left panel — Session List**
- Shows existing ICP sessions as cards (from `mockICPSessions`)
- Each card shows: segment name, job-to-be-done (truncated), date created
- "New ICP Session" button at top (non-functional in v0.3 — renders a "Coming in BDA Pro" tooltip)
- Active session highlighted with accent border

**Right panel — ICP Deliverable View**
When a session is selected, show the full structured output:
- Section header: "ICP Deliverable" with the segment name as title
- **Job to Be Done** — full text, styled prominently
- **Fit Signals** — rendered as a checklist (visual only, not interactive)
- **Anti-ICP Flags** — rendered as a list with a warning-colored left border
- **First Target List** — rendered as tagged chips
- Footer: "Generate Narrative" button — non-functional in v0.3, styles as a CTA that links to Narrative Engine module via `setCurrentModule('narrative-engine')`

**Design notes:**
- The deliverable panel should feel like a finished document, not a form
- Use the existing Card and Badge components
- Anti-ICP section uses `--color-warning` left border treatment (same pattern as `deal-item--warning` in globals.css)
- Fit Signals use a subtle checkmark icon from lucide-react

### Definition of Done
ICP Forge renders both panels. Session selection works. Deliverable view displays all sections. "Generate Narrative" button navigates to Narrative Engine. No console errors.

---

## PHASE 4 — Narrative Engine Module

**Session goal:** Build NarrativeEngine.tsx as a deliverable-output module showing pitch variants and talking points.
**Estimated tokens:** Medium-high.

### Read First
- `app/components/modules/NarrativeEngine.tsx` (current renamed Outreach file)
- `app/data/mockData.ts` (mockNarratives only)
- `app/lib/types.ts` (Narrative type)
- `app/components/ui/Card.tsx`
- `app/components/ui/Badge.tsx`

### Instructions

Rewrite `NarrativeEngine.tsx` completely. The old Outreach template browser is replaced.

**Narrative Engine is a two-panel module:**

**Left panel — Narrative List**
- Shows existing narratives as cards (from `mockNarratives`)
- Each card shows: positioning statement (truncated to 2 lines), linked ICP segment name if available, date created
- "New Narrative Session" button — non-functional in v0.3, renders "Coming in BDA Pro" tooltip

**Right panel — Narrative Deliverable View**
When a narrative is selected, show:
- **Positioning Statement** — large, prominent text block. This is the headline.
- **Pitch Variants** — three tabs or sections (use a simple toggle, not a tab library):
  - Warm Intro
  - Cold Outreach
  - Investor-Facing
  - Each pitch rendered in a styled text block with a copy-to-clipboard button (use the existing copy pattern from the old Outreach component)
- **Talking Points** — bulleted list styled as chips or inline tags
- **Linked ICP** — if `linkedICPId` exists, show a "Built from ICP: [segment name]" link that navigates to ICP Forge

**Design notes:**
- Pitch variant blocks should feel like ready-to-use message drafts, not form fields
- Copy button uses the same `copied` state pattern already in the codebase
- The three pitch types should be clearly differentiated visually (subtle background tint or label color difference)

### Definition of Done
Narrative Engine renders both panels. Pitch variants switch correctly. Copy buttons work. Linked ICP navigation works. No console errors.

---

## PHASE 5 — DealMap Module

**Session goal:** Refactor DealMap.tsx to reflect the correct architecture — deals as atomic units, Core Engine signals surfaced, Accounts/Stakeholders as associated context (not primary navigation).
**Estimated tokens:** Medium. Mostly structural changes to existing DealDesk logic.

### Read First
- `app/components/modules/DealMap.tsx` (renamed DealDesk)
- `app/lib/coreEngine.ts` (Phase 2 output)
- `app/lib/types.ts`
- `app/data/mockData.ts`

### Instructions

**1. Import and use Core Engine**
At the top of DealMap.tsx, import `surfaceSignals` and `getNextBestAction` from `@/lib/coreEngine`.
Use `surfaceSignals(deals, actions)` to compute signals on mount. Surface the top 2 signals as a banner above the deal list — styled as a subtle alert strip, not a modal.

**2. Replace `nextBestAction` static text with Core Engine output**
In the deal detail panel, replace the static `deal.nextBestAction` display with the output of `getNextBestAction(deal, actions)` from the Core Engine.

**3. Rename "Deal Desk" to "DealMap" throughout**
Update all labels, titles, and subtitles.

**4. Deal status update**
Add `'closed-won'` and `'closed-lost'` as distinct visual states in the deal card (currently only `'closed'` exists in some places). Use success/danger badge colors respectively.

**5. Remove meeting references**
The deal detail panel currently shows associated actions. Remove any meeting-related logic that references the now-deleted meetings module.

**6. Add a "Deal Thesis" prominence**
In the deal detail panel, move `dealThesis` to render immediately after the deal name — it should be the most prominent text block in the detail view, not buried under status indicators.

### Definition of Done
DealMap renders with Core Engine signals banner. Deal detail shows Core Engine next-best-action. DealThesis is prominent. No broken imports. No console errors.

---

## PHASE 6 — BDA Pro Gating + Dashboard Cleanup

**Session goal:** Add BDA Pro route with Coming Soon view, scaffold Handshake data model, clean up Dashboard to remove dead module references.
**Estimated tokens:** Low-medium.

### Read First
- `app/app/page.tsx`
- `app/components/layout/MainLayout.tsx`
- `app/components/layout/Sidebar.tsx`
- `app/components/modules/Dashboard.tsx`
- `app/lib/types.ts`

### Instructions

**1. Create BDA Pro Coming Soon view**
Create new file: `app/components/modules/BDAPro.tsx`

Simple layout:
- Header: "BDA Pro"
- Subtitle: "The full practitioner suite — built for senior BD operators and fractional BD heads."
- Feature preview list (styled cards, not a bulleted list):
  - Full DealMap with stakeholder mapping
  - Handshake Protocol — agent-to-agent deal workflow
  - Advanced ICP Forge with target enrichment
  - Narrative Engine with variant testing
- CTA: "Join the waitlist" — non-functional button, styled as primary action
- Estimated availability note: "Launching 60–90 days post-BDA release"

**2. Add Handshake type to types.ts**
```typescript
/**
 * Handshake Protocol — BDA Pro only
 * Five-stage agent-to-agent deal workflow
 */
export type HandshakeStage =
  | 'signal_exchange'
  | 'fit_assessment'
  | 'probe_conversation'
  | 'escalation_report'
  | 'human_handoff';

export interface HandshakeSession {
  id: string;
  linkedDealId: string;
  stage: HandshakeStage;
  probeExchangeCount: number; // max 5
  fitScore?: number;
  escalationSummary?: string;
  recommendedNextAction?: string;
  createdAt: string;
  updatedAt: string;
}
```

**3. Wire BDA Pro route in MainLayout**
Add case `'bda-pro'` to the module switch that renders `<BDAPro />`.

**4. Clean up Dashboard.tsx**
- Remove all references to `meetings` and `assets` from imports and render logic
- Remove the "Upcoming Meetings" card from the dashboard grid
- Replace it with a "Core Engine Signals" card that imports `surfaceSignals` from `@/lib/coreEngine` and renders the top 3 signals as actionable items
- Update the "What should I do next?" section to pull from Core Engine signals when urgent actions are empty

**5. Final README update**
Update `README.md` to reflect v0.3 architecture:
- Four active modules: Dashboard, ICP Forge, Narrative Engine, DealMap
- BDA Pro gated
- Core Engine as service layer
- Note the Handshake type is scaffolded for Pro

### Definition of Done
BDA Pro route renders Coming Soon view. HandshakeSession type exists in types.ts. Dashboard shows Core Engine Signals card. No dead references to meetings or assets anywhere. `npm run build` passes clean.

---

## CROSS-SESSION RULES FOR CLAUDE CODE

Paste these at the top of every session:

```
Rules for this session:
1. Do not rewrite files not listed under "Read First" for this phase unless the instructions explicitly target them.
2. Do not install new npm packages unless the phase instructs it.
3. If you encounter a TypeScript error in a file outside this phase's scope, flag it and skip — do not fix adjacent files unprompted.
4. After completing each instruction, confirm what was changed before moving to the next.
5. When done, run `npm run build` and report any errors without auto-fixing them.
```

---

## TOKEN EFFICIENCY NOTES

- Each phase is scoped to 3–6 files maximum. Claude Code performs best when it isn't loading the entire repo into context.
- The "Read First" file list for each phase is intentional — only load what that phase needs.
- Phases 1 and 2 are the most critical to get right before proceeding. If either produces TypeScript errors, resolve them before Phase 3.
- Phases 3 and 4 can technically run in parallel if you have two Claude Code sessions open, since they touch different files.
- Phase 6 is the lightest and can be done in the same session as Phase 5 if token budget allows.

---

## FINAL STATE (v0.3 TARGET)

```
/app
  /app
    layout.tsx          — DM Sans, clean
    page.tsx            — unchanged
  /components
    /layout
      MainLayout.tsx    — 6 routes (5 active + BDA Pro)
      Sidebar.tsx       — canonical nav with Coming Soon badge
    /modules
      Dashboard.tsx     — Core Engine signals card
      ICPForge.tsx      — deliverable session view
      NarrativeEngine.tsx — pitch variant deliverable view
      DealMap.tsx       — Core Engine integrated
      BDAPro.tsx        — Coming Soon gated view
    /ui
      Card.tsx          — unchanged
      Badge.tsx         — unchanged
      MomentumMeter.tsx — unchanged
      ActionItem.tsx    — unchanged
      RelationshipStrength.tsx — unchanged
  /data
    mockData.ts         — ICPSessions + Narratives
  /lib
    types.ts            — updated + Handshake scaffold
    store.tsx           — updated
    coreEngine.ts       — new service layer
  /styles
    globals.css         — DM Sans, minor updates
```
