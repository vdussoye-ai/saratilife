# CLAUDE.md — SaratiLife Full Project Update Prompt

> Save this file as `CLAUDE.md` in the root of the SaratiLife repo.
> Then open Claude Code (`claude` in terminal) and it will automatically read this as project context.

---

## Project Identity

**SaratiLife** is a life transformation platform for mid-career professionals (35-55).
It helps users go from **Confusion → Clarity → Discipline → Purpose** using the **Five Capitals** model (Career, Financial, Health, Social, Inner).

**Live site:** saratilife.com (Vercel)
**Stack:** Vite + React 18 + Tailwind CSS + Vercel Serverless + Claude API
**Design system:** Lora serif headings, DM Sans body (15px), saffron `#e8890c`, cream `#f8f6f3`, charcoal `#2d2d2d`

---

## Architecture Rules

1. **No monolithic files.** Every page is its own file in `src/pages/`. Every reusable element is in `src/components/`.
2. **Component props must be typed.** Use JSDoc or PropTypes for every component.
3. **CSS variables for all colors, spacing, and typography.** Defined in `src/styles/globals.css`.
4. **Mobile-first.** All layouts start at 375px and scale up.
5. **API keys are never client-side.** All API calls go through `/api/` serverless functions.
6. **State management:** React Context for global state. No Redux. Custom hooks for logic.
7. **File naming:** PascalCase for components (`CapitalCard.jsx`), camelCase for hooks (`useAssessment.js`), kebab-case for utils (`scoring-engine.js`).

---

## Design System (MUST follow exactly)

```css
/* src/styles/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  /* Typography */
  --font-heading: 'Lora', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 28px;
  --font-size-3xl: 36px;
  --font-size-4xl: 48px;
  --line-height: 1.65;
  --letter-spacing: -0.01em;

  /* Primary Colors */
  --saffron: #e8890c;
  --saffron-dark: #c47208;
  --saffron-light: #fdf0e0;
  --cream: #f8f6f3;
  --charcoal: #2d2d2d;
  --slate: #5a5a5a;
  --light-gray: #e8e8e8;
  --white: #ffffff;

  /* Capital Colors */
  --career: #1565C0;
  --financial: #2E7D32;
  --health: #D32F2F;
  --social: #E8890C;
  --inner: #6A1B9A;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
  color: var(--charcoal);
  background: var(--cream);
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 { font-family: var(--font-heading); letter-spacing: -0.02em; }
```

---

## Folder Structure (Create if missing)

```
src/
├── main.jsx
├── App.jsx                     # Router only — no UI here
├── pages/
│   ├── Landing.jsx             # Full-screen "How future-proof is your life?"
│   ├── Assessment.jsx          # Conversational one-question-at-a-time
│   ├── Scorecard.jsx           # Five Capitals radar + AI narrative
│   ├── Blueprint.jsx           # Personal strategy doc (conversion point)
│   ├── SprintDashboard.jsx     # Weekly focus + progress (paid)
│   ├── CheckIn.jsx             # Weekly reflection (paid)
│   ├── DecisionDashboard.jsx   # Ongoing decision tool (paid)
│   └── NotFound.jsx
├── components/
│   ├── ui/
│   │   ├── Button.jsx          # Props: variant (primary|secondary|ghost), size (sm|md|lg), children, onClick, disabled, loading
│   │   ├── Card.jsx            # Props: children, padding, shadow, onClick, className
│   │   ├── ProgressBar.jsx     # Props: value (0-100), color, label, animated
│   │   ├── Badge.jsx           # Props: label, color, size
│   │   ├── Input.jsx           # Props: type, label, value, onChange, error, placeholder
│   │   └── Modal.jsx           # Props: isOpen, onClose, title, children
│   ├── layout/
│   │   ├── Navbar.jsx          # Props: currentStage, showBack
│   │   ├── Footer.jsx          # No props — static
│   │   ├── PageShell.jsx       # Props: children, maxWidth, className
│   │   └── Section.jsx         # Props: children, title, subtitle, padding
│   ├── capitals/
│   │   ├── CapitalCard.jsx     # Props: name, score, color, icon, description
│   │   ├── CapitalRadar.jsx    # Props: scores ({career, financial, health, social, inner})
│   │   ├── CapitalScoreBar.jsx # Props: name, score, maxScore, color
│   │   └── CapitalComparison.jsx # Props: currentScores, targetScores
│   ├── assessment/
│   │   ├── QuestionCard.jsx    # Props: question, options, onAnswer, capitalType
│   │   ├── AnswerOption.jsx    # Props: label, value, selected, onClick
│   │   ├── ProgressIndicator.jsx # Props: current, total, capitalColors
│   │   └── AssessmentNav.jsx   # Props: onBack, onNext, canGoBack, canGoNext
│   ├── sprint/
│   │   ├── SprintCard.jsx      # Props: sprint, onStartCheckIn
│   │   ├── WeeklyCheckIn.jsx   # Props: week, onSubmit, capitals
│   │   ├── MilestoneItem.jsx   # Props: title, completed, onClick
│   │   └── ProgressRing.jsx    # Props: percentage, size, color, label
│   └── coaching/
│       ├── CoachingMessage.jsx  # Props: message, timestamp
│       ├── UserMessage.jsx      # Props: message, timestamp
│       ├── ReflectionPrompt.jsx # Props: prompt, capital, onSubmit
│       └── InsightCard.jsx      # Props: insight, capital, action
├── hooks/
│   ├── useAssessment.js        # Returns: { questions, currentQuestion, answer, scores, progress, reset }
│   ├── useSprint.js            # Returns: { activeSprint, milestones, checkIn, complete }
│   ├── useCoaching.js          # Returns: { messages, sendMessage, loading, insights }
│   ├── useAuth.js              # Returns: { user, login, logout, isAuthenticated }
│   └── useCapitals.js          # Returns: { scores, updateScore, getLowest, getHighest, comparison }
├── context/
│   ├── AuthContext.jsx
│   ├── AssessmentContext.jsx
│   └── SprintContext.jsx
├── lib/
│   ├── api.js                  # fetchCoaching(), fetchBlueprint(), saveAssessment()
│   ├── scoring.js              # calculateCapitalScores(answers) → { career, financial, health, social, inner }
│   ├── storage.js              # getLocal(), setLocal(), clearLocal() — localStorage wrapper
│   ├── constants.js            # CAPITALS, QUESTIONS, STAGES, PRICING
│   └── utils.js                # formatDate(), clamp(), capitalize()
├── styles/
│   ├── globals.css             # CSS variables, reset, base typography
│   └── animations.css          # @keyframes for fadeIn, slideUp, scaleIn, drawRadar
└── assets/
    └── icons/                  # career.svg, financial.svg, health.svg, social.svg, inner.svg
```

---

## Implementation Tasks (Execute in order)

### TASK 1: Restructure project
- Create the folder structure above
- Move existing assessment logic into `pages/Assessment.jsx`
- Move existing landing content into `pages/Landing.jsx`
- Set up React Router in `App.jsx`:
  ```jsx
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  // Routes: / → Landing, /assessment → Assessment, /scorecard → Scorecard,
  //         /blueprint → Blueprint, /sprint → SprintDashboard, /checkin → CheckIn
  ```
- Extract all CSS variables into `globals.css`

### TASK 2: Build shared UI components
Build these with the exact props listed above. Each component should:
- Use CSS variables exclusively (no hardcoded colors)
- Have a default export
- Support className prop for overrides
- Use `var(--font-heading)` for headings, `var(--font-body)` for body

### TASK 3: Rebuild Landing Page
```
Layout:
- Full viewport height hero
- Centered text: "How future-proof is your life?" (Lora, 48px, charcoal)
- Subtitle: "Most professionals are optimizing their week while drifting off course in their life." (DM Sans, 18px, slate)
- CTA Button: "Find out in 7 minutes" (saffron background, white text, 16px, rounded-full, 56px height)
- Below fold: 3 stat cards (# assessments taken, avg score, % who changed their plan)
- Credibility bar: "Built by a 20-year enterprise architect & certified life coach"
- NO navigation bar on this page
- NO feature list
- NO pricing
```

### TASK 4: Rebuild Assessment as Conversational UI
```
Layout:
- One question per screen, centered
- Question text: Lora, 24px
- Answer options: Cards (DM Sans, 16px), click to select
- Progress: thin bar at top, colored by current capital being assessed
- Transition: 300ms slide-left between questions
- 25-30 questions total (5 per capital)
- Each question tagged with its capital type
- On completion: auto-navigate to /scorecard

Question types:
- Scale (1-10 slider): "How confident are you in your career trajectory?"
- Multiple choice cards: "Which describes your financial situation best?"
- Yes/No toggle: "Do you have a written plan for the next 5 years?"
```

### TASK 5: Build Five Capitals Scorecard
```
Layout:
- Animated radar chart (SVG) drawing itself on load (1.5s)
- Each capital listed below with: icon, name, score/100, color bar, one-line description
- Color coding: 0-30 red, 31-60 amber, 61-100 green
- AI-generated narrative below: "You are strong in [X] but critically underinvested in [Y]..."
- Call AI via /api/chat.js to generate the narrative based on scores
- CTA: "See your Life Blueprint" (saffron button)
```

### TASK 6: Build Blueprint Generator
```
Layout:
- Single-page visual strategy document
- Header: "Your Life Blueprint" + user name + date
- Two-column comparison: "Where you are" vs. "Where you could be" for each capital
- "Your 3 Highest-Leverage Moves" section — AI-generated based on lowest capitals
- Share button (copies shareable link or generates image)
- Download as PDF button (use html2canvas + jsPDF)
- CTA: "Start your 90-day sprint — $49/quarter" (conversion point)
- Email capture gate: User must enter email to see full blueprint
```

### TASK 7: Wire up API and State
```
- Create /api/chat.js serverless function (Vercel)
- Create React Contexts for Assessment, Sprint, Auth
- Persist assessment results to localStorage on completion
- When Supabase is added (Phase 2): migrate to database persistence
- All AI calls go through serverless proxy — NEVER expose API key client-side
```

### TASK 8: Sprint Dashboard (Paid feature)
```
- Gate behind Stripe payment ($49/quarter)
- Show: current week of 13, primary capital focus, secondary capital
- Weekly milestones as checkable items
- Capital trend lines (small sparkline charts)
- "Check in this week" CTA button
- AI coaching: weekly structured reflection
```

---

## Key Principles (Follow these always)

1. **Transformation, not information.** Every screen should move the user forward, not just display data.
2. **One path, not many options.** The user journey is linear: Landing → Assessment → Scorecard → Blueprint → Sprint.
3. **Mobile-first, always.** Test every component at 375px before wider breakpoints.
4. **Warm, not clinical.** Use saffron accent generously. Round corners. Soft shadows. The app should feel like a trusted advisor, not a dashboard.
5. **AI generates narrative, not just numbers.** Every output (scorecard, blueprint, check-in response) should include a personal story.
6. **Performance matters.** Lazy-load pages. Code-split at route level. Target <3s first contentful paint.
7. **Accessibility is non-negotiable.** WCAG AA contrast. Keyboard navigation. Screen reader labels.

---

## Dependencies to Install

```bash
npm install react-router-dom
npm install @supabase/supabase-js    # Phase 2
npm install stripe @stripe/stripe-js  # Phase 2
npm install html2canvas jspdf        # Blueprint PDF export
npm install framer-motion            # Animations
npm install recharts                 # Charts (radar, sparklines)
npm install resend                   # Email (Phase 3)
```

---

## Environment Variables (Vercel)

```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxx.supabase.co       # Phase 2
SUPABASE_ANON_KEY=eyJ...                    # Phase 2
STRIPE_SECRET_KEY=sk_live_...               # Phase 2
STRIPE_PUBLISHABLE_KEY=pk_live_...          # Phase 2
```

---

## Quality Checks Before Deploying

- [ ] All pages render correctly at 375px, 768px, 1024px, 1440px
- [ ] Assessment completes without errors and produces valid scores
- [ ] Scorecard radar chart animates correctly
- [ ] API proxy does not expose API key in client bundle
- [ ] CTA buttons have hover/active/disabled states
- [ ] All text passes WCAG AA contrast check
- [ ] Lighthouse score: Performance > 90, Accessibility > 95
- [ ] No console errors in production build
- [ ] Social sharing meta tags render correctly (OG image, title, description)
