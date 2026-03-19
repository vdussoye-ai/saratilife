// ── Shared assessment questions, scoring, and constants ─────────────────

export const QUESTIONS = [
  { id: "career_satisfaction", capital: "career", text: "How satisfied are you with the direction of your career right now?", options: [
    { label: "Very dissatisfied — I feel stuck or lost", value: 1 }, { label: "Somewhat dissatisfied — something feels off", value: 2 },
    { label: "Neutral — it's fine but not inspiring", value: 3 }, { label: "Satisfied — generally on track", value: 4 },
    { label: "Very satisfied — I'm energized by my work", value: 5 },
  ]},
  { id: "ai_preparedness", capital: "career", text: "How prepared do you feel for AI's impact on your role?", options: [
    { label: "Not at all — I haven't thought about it", value: 1 }, { label: "Slightly — I know it's coming but haven't acted", value: 2 },
    { label: "Somewhat — I've started exploring AI tools", value: 3 }, { label: "Mostly — I actively use AI in my work", value: 4 },
    { label: "Fully — I'm leading AI adoption in my area", value: 5 },
  ]},
  { id: "financial_runway", capital: "financial", text: "If you left your job tomorrow, how long could you sustain your lifestyle?", options: [
    { label: "Less than 1 month", value: 1 }, { label: "1–3 months", value: 2 }, { label: "3–6 months", value: 3 },
    { label: "6–12 months", value: 4 }, { label: "Over a year", value: 5 },
  ]},
  { id: "income_diversification", capital: "financial", text: "How diversified are your income sources?", options: [
    { label: "Single salary — no other income", value: 1 }, { label: "Salary plus occasional side work", value: 2 },
    { label: "Salary plus one steady side stream", value: 3 }, { label: "Multiple income streams, mostly active", value: 4 },
    { label: "Multiple streams including passive income", value: 5 },
  ]},
  { id: "energy_level", capital: "health", text: "How would you describe your typical energy level?", options: [
    { label: "Constantly exhausted — running on fumes", value: 1 }, { label: "Low — I push through but crash often", value: 2 },
    { label: "Moderate — good days and bad days", value: 3 }, { label: "Good — I have energy for most things", value: 4 },
    { label: "Excellent — I feel vital and energized daily", value: 5 },
  ]},
  { id: "stress_management", capital: "health", text: "How well do you manage stress?", options: [
    { label: "Poorly — stress controls my decisions", value: 1 }, { label: "Somewhat — I cope but it takes a toll", value: 2 },
    { label: "Okay — I have some strategies that help", value: 3 }, { label: "Well — I bounce back from setbacks quickly", value: 4 },
    { label: "Very well — I have reliable systems for resilience", value: 5 },
  ]},
  { id: "network_strength", capital: "social", text: "If you needed career advice or a warm introduction, how many people could you call?", options: [
    { label: "Zero — I don't have a professional network", value: 1 }, { label: "1–2 people, but I rarely reach out", value: 2 },
    { label: "3–5 people I trust and speak with occasionally", value: 3 }, { label: "5–10 active relationships across industries", value: 4 },
    { label: "10+ — I have a strong, diverse network", value: 5 },
  ]},
  { id: "relationships", capital: "social", text: "How supported do you feel by the people closest to you?", options: [
    { label: "Isolated — I face things mostly alone", value: 1 }, { label: "Somewhat alone — support is inconsistent", value: 2 },
    { label: "Okay — I have some support but could use more", value: 3 }, { label: "Supported — my inner circle has my back", value: 4 },
    { label: "Deeply supported — strong, reciprocal relationships", value: 5 },
  ]},
  { id: "purpose_clarity", capital: "inner", text: "How clear are you on what gives your life meaning beyond work?", options: [
    { label: "No idea — work is all I have", value: 1 }, { label: "Vague sense — but can't articulate it", value: 2 },
    { label: "Some clarity — working on it", value: 3 }, { label: "Fairly clear — I know what matters to me", value: 4 },
    { label: "Crystal clear — I live by it daily", value: 5 },
  ]},
  { id: "decision_confidence", capital: "inner", text: "When facing a major life or career decision, how do you feel?", options: [
    { label: "Paralyzed — I avoid decisions or agonize for weeks", value: 1 }, { label: "Anxious — I second-guess myself constantly", value: 2 },
    { label: "Uncertain — I can decide, but it's stressful", value: 3 }, { label: "Fairly confident — I trust my judgment most of the time", value: 4 },
    { label: "Very confident — I have a clear framework for decisions", value: 5 },
  ]},
  { id: "life_balance", capital: "inner", text: "How balanced does your life feel across career, health, money, relationships, and purpose?", options: [
    { label: "Completely off — one area dominates everything", value: 1 }, { label: "Quite unbalanced — two or more areas are neglected", value: 2 },
    { label: "Somewhat balanced — a few areas need attention", value: 3 }, { label: "Mostly balanced — I'm intentional about most areas", value: 4 },
    { label: "Well balanced — I actively nurture all five areas", value: 5 },
  ]},
  { id: "change_readiness", capital: "career", text: "If the right opportunity appeared today, how ready are you to make a bold move?", options: [
    { label: "Not ready — too many constraints", value: 1 }, { label: "Slightly ready — I'd need months to prepare", value: 2 },
    { label: "Somewhat ready — a few things to sort out first", value: 3 }, { label: "Mostly ready — I could act within weeks", value: 4 },
    { label: "Fully ready — I'm actively looking for the right move", value: 5 },
  ]},
];

export const CAPITALS = ["career", "financial", "health", "social", "inner"];

export const CAPITAL_LABELS = {
  career: "Career", financial: "Financial", health: "Health", social: "Social", inner: "Inner",
};

export const CAPITAL_COLORS = {
  career: "var(--career)", financial: "var(--financial)", health: "var(--health)", social: "var(--social)", inner: "var(--inner)",
};

export const GSHEET_URL = "https://script.google.com/macros/s/AKfycbw03Keq_S7ooPfRcb7IhTZp1PLNFjVJdgs9NGEFX35dCfRCreGXzySKc-gIAHg3CeZEhg/exec";

export function calculateScores(answers) {
  const capitalScores = {};
  const capitalCounts = {};
  CAPITALS.forEach((c) => { capitalScores[c] = 0; capitalCounts[c] = 0; });
  QUESTIONS.forEach((q) => {
    const val = answers[q.id];
    if (val !== undefined) { capitalScores[q.capital] += val; capitalCounts[q.capital]++; }
  });
  const scores = {};
  CAPITALS.forEach((c) => {
    scores[c] = capitalCounts[c] > 0 ? Math.round((capitalScores[c] / (capitalCounts[c] * 5)) * 100) : 0;
  });
  const overall = Math.round(CAPITALS.reduce((sum, c) => sum + scores[c], 0) / CAPITALS.length);
  return { scores, overall };
}

export function getProfile(overall) {
  if (overall >= 80) return { level: "thriving", label: "Thriving", color: "#27ae60" };
  if (overall >= 60) return { level: "growing", label: "Growing", color: "#e8890c" };
  if (overall >= 40) return { level: "seeking", label: "Seeking Clarity", color: "#e67e22" };
  return { level: "stuck", label: "At a Crossroads", color: "#c0392b" };
}

export function needsCoaching(overall, scores) {
  if (overall < 55) return true;
  if (CAPITALS.filter((c) => scores[c] < 40).length >= 2) return true;
  const vals = Object.values(scores);
  if (Math.max(...vals) - Math.min(...vals) > 40) return true;
  return false;
}
