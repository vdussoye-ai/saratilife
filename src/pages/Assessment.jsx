import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";
import FunnelNav from "../components/FunnelNav";

// ── Questions ───────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "career_satisfaction",
    capital: "career",
    text: "How satisfied are you with the direction of your career right now?",
    options: [
      { label: "Very dissatisfied — I feel stuck or lost", value: 1 },
      { label: "Somewhat dissatisfied — something feels off", value: 2 },
      { label: "Neutral — it's fine but not inspiring", value: 3 },
      { label: "Satisfied — generally on track", value: 4 },
      { label: "Very satisfied — I'm energized by my work", value: 5 },
    ],
  },
  {
    id: "ai_preparedness",
    capital: "career",
    text: "How prepared do you feel for AI's impact on your role?",
    options: [
      { label: "Not at all — I haven't thought about it", value: 1 },
      { label: "Slightly — I know it's coming but haven't acted", value: 2 },
      { label: "Somewhat — I've started exploring AI tools", value: 3 },
      { label: "Mostly — I actively use AI in my work", value: 4 },
      { label: "Fully — I'm leading AI adoption in my area", value: 5 },
    ],
  },
  {
    id: "financial_runway",
    capital: "financial",
    text: "If you left your job tomorrow, how long could you sustain your lifestyle?",
    options: [
      { label: "Less than 1 month", value: 1 },
      { label: "1–3 months", value: 2 },
      { label: "3–6 months", value: 3 },
      { label: "6–12 months", value: 4 },
      { label: "Over a year", value: 5 },
    ],
  },
  {
    id: "income_diversification",
    capital: "financial",
    text: "How diversified are your income sources?",
    options: [
      { label: "Single salary — no other income", value: 1 },
      { label: "Salary plus occasional side work", value: 2 },
      { label: "Salary plus one steady side stream", value: 3 },
      { label: "Multiple income streams, mostly active", value: 4 },
      { label: "Multiple streams including passive income", value: 5 },
    ],
  },
  {
    id: "energy_level",
    capital: "health",
    text: "How would you describe your typical energy level?",
    options: [
      { label: "Constantly exhausted — running on fumes", value: 1 },
      { label: "Low — I push through but crash often", value: 2 },
      { label: "Moderate — good days and bad days", value: 3 },
      { label: "Good — I have energy for most things", value: 4 },
      { label: "Excellent — I feel vital and energized daily", value: 5 },
    ],
  },
  {
    id: "stress_management",
    capital: "health",
    text: "How well do you manage stress?",
    options: [
      { label: "Poorly — stress controls my decisions", value: 1 },
      { label: "Somewhat — I cope but it takes a toll", value: 2 },
      { label: "Okay — I have some strategies that help", value: 3 },
      { label: "Well — I bounce back from setbacks quickly", value: 4 },
      { label: "Very well — I have reliable systems for resilience", value: 5 },
    ],
  },
  {
    id: "network_strength",
    capital: "social",
    text: "If you needed career advice or a warm introduction, how many people could you call?",
    options: [
      { label: "Zero — I don't have a professional network", value: 1 },
      { label: "1–2 people, but I rarely reach out", value: 2 },
      { label: "3–5 people I trust and speak with occasionally", value: 3 },
      { label: "5–10 active relationships across industries", value: 4 },
      { label: "10+ — I have a strong, diverse network", value: 5 },
    ],
  },
  {
    id: "relationships",
    capital: "social",
    text: "How supported do you feel by the people closest to you?",
    options: [
      { label: "Isolated — I face things mostly alone", value: 1 },
      { label: "Somewhat alone — support is inconsistent", value: 2 },
      { label: "Okay — I have some support but could use more", value: 3 },
      { label: "Supported — my inner circle has my back", value: 4 },
      { label: "Deeply supported — strong, reciprocal relationships", value: 5 },
    ],
  },
  {
    id: "purpose_clarity",
    capital: "inner",
    text: "How clear are you on what gives your life meaning beyond work?",
    options: [
      { label: "No idea — work is all I have", value: 1 },
      { label: "Vague sense — but can't articulate it", value: 2 },
      { label: "Some clarity — working on it", value: 3 },
      { label: "Fairly clear — I know what matters to me", value: 4 },
      { label: "Crystal clear — I live by it daily", value: 5 },
    ],
  },
  {
    id: "decision_confidence",
    capital: "inner",
    text: "When facing a major life or career decision, how do you feel?",
    options: [
      { label: "Paralyzed — I avoid decisions or agonize for weeks", value: 1 },
      { label: "Anxious — I second-guess myself constantly", value: 2 },
      { label: "Uncertain — I can decide, but it's stressful", value: 3 },
      { label: "Fairly confident — I trust my judgment most of the time", value: 4 },
      { label: "Very confident — I have a clear framework for decisions", value: 5 },
    ],
  },
  {
    id: "life_balance",
    capital: "inner",
    text: "How balanced does your life feel across career, health, money, relationships, and purpose?",
    options: [
      { label: "Completely off — one area dominates everything", value: 1 },
      { label: "Quite unbalanced — two or more areas are neglected", value: 2 },
      { label: "Somewhat balanced — a few areas need attention", value: 3 },
      { label: "Mostly balanced — I'm intentional about most areas", value: 4 },
      { label: "Well balanced — I actively nurture all five areas", value: 5 },
    ],
  },
  {
    id: "change_readiness",
    capital: "career",
    text: "If the right opportunity appeared today, how ready are you to make a bold move?",
    options: [
      { label: "Not ready — too many constraints", value: 1 },
      { label: "Slightly ready — I'd need months to prepare", value: 2 },
      { label: "Somewhat ready — a few things to sort out first", value: 3 },
      { label: "Mostly ready — I could act within weeks", value: 4 },
      { label: "Fully ready — I'm actively looking for the right move", value: 5 },
    ],
  },
];

const CAPITALS = ["career", "financial", "health", "social", "inner"];

const CAPITAL_LABELS = {
  career: "Career",
  financial: "Financial",
  health: "Health",
  social: "Social",
  inner: "Inner",
};

const CAPITAL_COLORS = {
  career: "#e8890c",
  financial: "#27ae60",
  health: "#e74c3c",
  social: "#3498db",
  inner: "#8e44ad",
};

// ── Scoring ─────────────────────────────────────────────────────────────
function calculateScores(answers) {
  const capitalScores = {};
  const capitalCounts = {};

  CAPITALS.forEach((c) => {
    capitalScores[c] = 0;
    capitalCounts[c] = 0;
  });

  QUESTIONS.forEach((q) => {
    const val = answers[q.id];
    if (val !== undefined) {
      capitalScores[q.capital] += val;
      capitalCounts[q.capital]++;
    }
  });

  const scores = {};
  CAPITALS.forEach((c) => {
    scores[c] = capitalCounts[c] > 0
      ? Math.round((capitalScores[c] / (capitalCounts[c] * 5)) * 100)
      : 0;
  });

  const overall = Math.round(
    CAPITALS.reduce((sum, c) => sum + scores[c], 0) / CAPITALS.length
  );

  return { scores, overall };
}

function getProfile(overall) {
  if (overall >= 80) return { level: "thriving", label: "Thriving", color: "#27ae60" };
  if (overall >= 60) return { level: "growing", label: "Growing", color: "#e8890c" };
  if (overall >= 40) return { level: "seeking", label: "Seeking Clarity", color: "#e67e22" };
  return { level: "stuck", label: "At a Crossroads", color: "#c0392b" };
}

function needsCoaching(overall, scores) {
  if (overall < 55) return true;
  const lowCaps = CAPITALS.filter((c) => scores[c] < 40);
  if (lowCaps.length >= 2) return true;
  const vals = Object.values(scores);
  if (Math.max(...vals) - Math.min(...vals) > 40) return true;
  return false;
}

// ── Google Apps Script ──────────────────────────────────────────────────
const GSHEET_URL = "https://script.google.com/macros/s/AKfycbw03Keq_S7ooPfRcb7IhTZp1PLNFjVJdgs9NGEFX35dCfRCreGXzySKc-gIAHg3CeZEhg/exec";

// ── Component ───────────────────────────────────────────────────────────
export default function Assessment() {
  const [currentQ, setCurrentQ] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const containerRef = useRef(null);

  const totalQ = QUESTIONS.length;
  const progress = currentQ >= 0 ? ((currentQ + 1) / totalQ) * 100 : 0;
  // Transition helper
  const transitionTo = (nextQ) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentQ(nextQ);
      setFadeIn(true);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }, 200);
  };

  const selectAnswer = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    trackEvent("assessment_answer", { question: qId, value });
    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        transitionTo(currentQ + 1);
      } else {
        transitionTo(totalQ); // results
      }
    }, 350);
  };

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    const { scores, overall } = calculateScores(answers);
    const payload = {
      email,
      overall,
      career: scores.career,
      financial: scores.financial,
      health: scores.health,
      social: scores.social,
      inner: scores.inner,
    };
    fetch(GSHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    trackEvent("email_capture", { location: "assessment_results" });
    setSubmitted(true);
  };

  // ── Welcome screen ──────────────────────────────────────────────
  if (currentQ === -1) {
    return (
      <div style={pageStyle}>
        <Helmet>
          <title>Career &amp; Life Clarity Assessment — SaratiLife</title>
          <meta name="description" content="Discover where you stand across career, finances, health, relationships, and purpose in just 10 minutes. Free assessment with instant results." />
          <link rel="canonical" href="https://saratilife.com/assessment" />
          <meta property="og:title" content="Career & Life Clarity Assessment — SaratiLife" />
          <meta property="og:description" content="Discover where you stand across the Five Capitals in just 10 minutes." />
          <meta property="og:url" content="https://saratilife.com/assessment" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://saratilife.com/logo-512.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Career & Life Clarity Assessment — SaratiLife" />
          <meta name="twitter:description" content="Discover where you stand across the Five Capitals in just 10 minutes." />
        </Helmet>
        <FunnelNav />
        <style>{globalCSS}</style>
        <main style={mainStyle}>
          <div style={{
            textAlign: "center",
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}>
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-3xl)",
              fontWeight: 700,
              color: "var(--charcoal)",
              lineHeight: 1.2,
              marginBottom: "var(--space-md)",
            }}>
              Career &amp; Life Clarity Assessment
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-md)",
              color: "var(--slate)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto var(--space-lg)",
            }}>
              12 questions across five dimensions of your life. Get instant insights into where you're thriving and where you need attention.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--saffron-dark)",
              fontWeight: 500,
              marginBottom: "var(--space-2xl)",
            }}>
              Answer honestly for best results — takes just 10 minutes.
            </p>
            <button
              className="assess-cta"
              onClick={() => transitionTo(0)}
              aria-label="Begin the assessment"
            >
              Start Assessment
            </button>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--slate)",
              marginTop: "var(--space-md)",
              opacity: 0.7,
            }}>
              Free · No account required · Results are instant
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── Results screen ──────────────────────────────────────────────
  if (currentQ >= totalQ) {
    const { scores, overall } = calculateScores(answers);
    const profile = getProfile(overall);
    const showCoaching = needsCoaching(overall, scores);
    const weakest = CAPITALS.reduce((a, b) => (scores[a] < scores[b] ? a : b));
    const strongest = CAPITALS.reduce((a, b) => (scores[a] > scores[b] ? a : b));

    return (
      <div style={pageStyle}>
        <Helmet>
          <title>Your Results — SaratiLife</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <FunnelNav />
        <style>{globalCSS}</style>
        <main style={{ ...mainStyle, paddingBottom: "120px" }}>
          <div style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>
            {/* Profile header */}
            <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
              <div style={{
                display: "inline-block",
                padding: "6px 20px",
                borderRadius: "var(--radius-full)",
                background: `${profile.color}15`,
                border: `1.5px solid ${profile.color}30`,
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                color: profile.color,
                marginBottom: "var(--space-md)",
              }}>
                {profile.label}
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                color: "var(--charcoal)",
                lineHeight: 1.2,
                marginBottom: "var(--space-sm)",
              }}>
                Your Clarity Score
              </h2>
              <div style={{
                fontFamily: "var(--font-heading)",
                fontSize: "64px",
                fontWeight: 700,
                color: profile.color,
                lineHeight: 1,
                marginBottom: "var(--space-sm)",
              }}>
                {overall}
              </div>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-sm)",
                color: "var(--slate)",
              }}>
                out of 100
              </p>
            </div>

            {/* Capital breakdown */}
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--light-gray)",
              padding: "var(--space-xl)",
              marginBottom: "var(--space-lg)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-md)",
                fontWeight: 600,
                color: "var(--charcoal)",
                marginBottom: "var(--space-lg)",
              }}>
                Five Capitals Breakdown
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {CAPITALS.map((cap) => (
                  <div key={cap}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--font-size-sm)",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                      }}>
                        {CAPITAL_LABELS[cap]}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-sm)",
                        fontWeight: 700,
                        color: CAPITAL_COLORS[cap],
                      }}>
                        {scores[cap]}
                      </span>
                    </div>
                    <div style={{
                      height: "8px",
                      background: "var(--light-gray)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${scores[cap]}%`,
                        background: CAPITAL_COLORS[cap],
                        borderRadius: "4px",
                        transition: "width 1s ease-out",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* General feedback */}
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--light-gray)",
              padding: "var(--space-xl)",
              marginBottom: "var(--space-lg)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-md)",
                fontWeight: 600,
                color: "var(--charcoal)",
                marginBottom: "var(--space-md)",
              }}>
                Your Snapshot
              </h3>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-base)",
                color: "var(--slate)",
                lineHeight: 1.7,
                marginBottom: "var(--space-md)",
              }}>
                Your strongest area is <strong style={{ color: CAPITAL_COLORS[strongest] }}>{CAPITAL_LABELS[strongest]}</strong> ({scores[strongest]}/100),
                while <strong style={{ color: CAPITAL_COLORS[weakest] }}>{CAPITAL_LABELS[weakest]}</strong> ({scores[weakest]}/100) has the most room for growth.
              </p>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-base)",
                color: "var(--slate)",
                lineHeight: 1.7,
              }}>
                {overall >= 80
                  ? "You're in a strong position across all five capitals. Focus on maintaining your momentum and helping others do the same."
                  : overall >= 60
                  ? "You have a solid foundation with clear areas to strengthen. Strategic focus on your weakest capital will have an outsized impact on your overall clarity."
                  : overall >= 40
                  ? "You're at a pivotal moment. Several areas need attention, and addressing them now will prevent small gaps from becoming major obstacles."
                  : "You're at a crossroads, but that's not a bad thing — it means you're ready for change. The gap between where you are and where you want to be is bridgeable with the right guidance."
                }
              </p>
            </div>

            {/* Coaching CTA — conditional */}
            {showCoaching && (
              <div style={{
                background: "linear-gradient(135deg, var(--charcoal), #1a1a1a)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-xl)",
                marginBottom: "var(--space-lg)",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 600,
                  color: "var(--saffron)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-sm)",
                }}>
                  Recommended for you
                </div>
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-lg)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  lineHeight: 1.3,
                  marginBottom: "var(--space-sm)",
                }}>
                  Your results suggest deeper coaching could help
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  color: "rgba(248,246,243,0.65)",
                  lineHeight: 1.6,
                  maxWidth: "400px",
                  margin: "0 auto var(--space-lg)",
                }}>
                  {CAPITALS.filter((c) => scores[c] < 40).length >= 2
                    ? "Multiple capitals scored below 40 — a structured coaching program can help you build a clear, prioritized action plan."
                    : Math.max(...Object.values(scores)) - Math.min(...Object.values(scores)) > 40
                    ? "There's a significant imbalance across your capitals. Coaching can help you rebalance without sacrificing your strengths."
                    : "Your overall score indicates you'd benefit from guided support to break through your current plateau."
                  }
                </p>
                <a
                  href="mailto:hello@saratilife.com?subject=Coaching inquiry from assessment"
                  className="assess-cta"
                  style={{
                    display: "inline-flex",
                    textDecoration: "none",
                    background: "var(--saffron)",
                    color: "var(--white)",
                  }}
                  onClick={() => trackEvent("coaching_cta_click", { overall, profile: profile.level })}
                >
                  Explore Coaching Options
                </a>
              </div>
            )}

            {/* Email capture */}
            {!submitted ? (
              <div style={{
                background: "var(--white)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--light-gray)",
                padding: "var(--space-xl)",
                textAlign: "center",
              }}>
                <h3 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  marginBottom: "var(--space-sm)",
                }}>
                  Save your results
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--slate)",
                  marginBottom: "var(--space-lg)",
                }}>
                  Enter your email to receive a detailed breakdown and personalized recommendations.
                </p>
                <div style={{ maxWidth: "380px", margin: "0 auto" }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    aria-label="Email address"
                    aria-invalid={!!emailError}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "var(--radius-md)",
                      border: emailError ? "1.5px solid #c0392b" : "1.5px solid var(--light-gray)",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-base)",
                      color: "var(--charcoal)",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.3s ease",
                    }}
                  />
                  {emailError && (
                    <p role="alert" style={{
                      fontSize: "var(--font-size-xs)",
                      color: "#c0392b",
                      marginTop: "6px",
                      textAlign: "left",
                    }}>
                      {emailError}
                    </p>
                  )}
                  <button
                    className="assess-cta"
                    onClick={handleEmailSubmit}
                    style={{ width: "100%", marginTop: "12px" }}
                  >
                    Send My Results
                  </button>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--slate)",
                  marginTop: "var(--space-sm)",
                  opacity: 0.6,
                }}>
                  No spam — just your report and relevant updates.
                </p>
              </div>
            ) : (
              <div style={{
                background: "rgba(39,174,96,0.06)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(39,174,96,0.2)",
                padding: "var(--space-xl)",
                textAlign: "center",
              }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 600,
                  color: "#27ae60",
                }}>
                  Results saved! Check your inbox for your detailed breakdown.
                </p>
              </div>
            )}

            {/* Retake */}
            <div style={{ textAlign: "center", marginTop: "var(--space-xl)" }}>
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setEmail("");
                  transitionTo(-1);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--slate)",
                  cursor: "pointer",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Retake assessment
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────
  const q = QUESTIONS[currentQ];

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>Assessment — Question {currentQ + 1} of {totalQ} — SaratiLife</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <FunnelNav />
      <style>{globalCSS}</style>

      {/* Progress bar */}
      <div style={{
        position: "fixed",
        top: "56px",
        left: 0,
        right: 0,
        height: "3px",
        background: "var(--light-gray)",
        zIndex: 99,
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--saffron)",
          transition: "width 0.4s ease",
          borderRadius: "0 2px 2px 0",
        }} />
      </div>

      <main ref={containerRef} style={mainStyle}>
        <div style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.3s ease",
        }}>
          {/* Question counter */}
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            color: "var(--saffron-dark)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "var(--space-md)",
          }}>
            Question {currentQ + 1} of {totalQ}
          </div>

          {/* Question text */}
          <h2 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(20px, 5vw, 26px)",
            fontWeight: 700,
            color: "var(--charcoal)",
            lineHeight: 1.3,
            marginBottom: "var(--space-2xl)",
          }}>
            {q.text}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {q.options.map((opt) => {
              const isSelected = answers[q.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  className="assess-option"
                  onClick={() => selectAnswer(q.id, opt.value)}
                  aria-pressed={isSelected}
                  style={{
                    borderColor: isSelected ? "var(--saffron)" : "var(--light-gray)",
                    background: isSelected ? "rgba(232,137,12,0.06)" : "var(--white)",
                    color: isSelected ? "var(--charcoal)" : "var(--slate)",
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  <span style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    border: isSelected ? "6px solid var(--saffron)" : "2px solid var(--light-gray)",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }} />
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Back button */}
          {currentQ > 0 && (
            <button
              onClick={() => transitionTo(currentQ - 1)}
              style={{
                marginTop: "var(--space-xl)",
                background: "none",
                border: "none",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-sm)",
                color: "var(--slate)",
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────
const pageStyle = {
  minHeight: "100vh",
  background: "var(--cream)",
  fontFamily: "var(--font-body)",
  color: "var(--charcoal)",
};

const mainStyle = {
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
  padding: "88px 24px 60px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh",
};

const globalCSS = `
  .assess-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--charcoal);
    color: var(--cream);
    border: none;
    padding: 0 44px;
    height: 56px;
    border-radius: var(--radius-full);
    font-size: var(--font-size-md);
    font-family: var(--font-body);
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    box-shadow: 0 4px 20px rgba(45,45,45,0.18);
    min-height: 48px;
  }
  .assess-cta:hover {
    background: var(--saffron);
    color: var(--white);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(232,137,12,0.3);
  }
  .assess-cta:active {
    transform: translateY(0);
  }
  .assess-cta:focus-visible {
    outline: 3px solid var(--saffron);
    outline-offset: 3px;
  }
  .assess-option {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 18px 20px;
    border-radius: var(--radius-md);
    border: 1.5px solid var(--light-gray);
    font-family: var(--font-body);
    font-size: var(--font-size-base);
    line-height: 1.5;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 56px;
  }
  .assess-option:hover {
    border-color: var(--saffron);
    background: rgba(232,137,12,0.03);
  }
  .assess-option:focus-visible {
    outline: 3px solid var(--saffron);
    outline-offset: 2px;
  }
  @media (max-width: 768px) {
    .assess-option {
      padding: 16px 16px;
      font-size: var(--font-size-sm);
      min-height: 52px;
    }
  }
`;
