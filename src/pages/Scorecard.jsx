import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";
import {
  QUESTIONS, CAPITALS, CAPITAL_LABELS, CAPITAL_COLORS,
  GSHEET_URL, calculateScores, getProfile, needsCoaching,
} from "../lib/assessment-data";
import FunnelNav from "../components/FunnelNav";
import CapitalRadar from "../components/capitals/CapitalRadar";

export default function Scorecard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get answers from navigation state or sessionStorage fallback
  const [answers] = useState(() => {
    if (location.state?.answers) {
      sessionStorage.setItem("saratilife_answers", JSON.stringify(location.state.answers));
      return location.state.answers;
    }
    try {
      const stored = sessionStorage.getItem("saratilife_answers");
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 100);
    trackEvent("scorecard_view");
    return () => clearTimeout(t);
  }, []);

  // Redirect if no answers
  if (!answers || Object.keys(answers).length === 0) {
    return (
      <div style={pageStyle}>
        <Helmet>
          <title>{"Your Results — SaratiLife"}</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <FunnelNav />
        <main style={{ ...mainStyle, textAlign: "center" }}>
          <h1 style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-2xl)",
            fontWeight: 700,
            color: "var(--charcoal)",
            marginBottom: "var(--space-md)",
          }}>
            No results found
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-md)",
            color: "var(--slate)",
            marginBottom: "var(--space-xl)",
          }}>
            Take the assessment first to see your scorecard.
          </p>
          <button className="sl-cta" onClick={() => navigate("/assessment")}>
            Start Assessment
          </button>
        </main>
      </div>
    );
  }

  const { scores, overall } = calculateScores(answers);
  const profile = getProfile(overall);
  const showCoaching = needsCoaching(overall, scores);
  const weakest = CAPITALS.reduce((a, b) => (scores[a] < scores[b] ? a : b));
  const strongest = CAPITALS.reduce((a, b) => (scores[a] > scores[b] ? a : b));

  const handleEmailSubmit = () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
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
    trackEvent("email_capture", { location: "scorecard" });
    setSubmitted(true);
  };

  const handlePrint = () => {
    trackEvent("pdf_export", { overall, profile: profile.level });
    window.print();
  };

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>{"Your Results — SaratiLife"}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <FunnelNav />
      <style>{scorecardCSS}</style>

      <main style={{ ...mainStyle, paddingBottom: "120px" }}>
        <div style={{
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          {/* ═══════ PROFILE HEADER ═══════ */}
          <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <div style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--saffron-dark)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}>
              Instant insights provided automatically
            </div>
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
            <h1 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-3xl)",
              fontWeight: 700,
              color: "var(--charcoal)",
              lineHeight: 1.2,
              marginBottom: "var(--space-sm)",
            }}>
              Your Clarity Score
            </h1>
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

          {/* ═══════ RADAR CHART ═══════ */}
          <div style={{
            background: "var(--white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--light-gray)",
            padding: "var(--space-xl) var(--space-md)",
            marginBottom: "var(--space-lg)",
            textAlign: "center",
          }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-md)",
              fontWeight: 600,
              color: "var(--charcoal)",
              marginBottom: "var(--space-lg)",
            }}>
              Five Capitals Overview
            </h2>
            <CapitalRadar scores={scores} />
          </div>

          {/* ═══════ CAPITAL SCORE BARS ═══════ */}
          <div style={{
            background: "var(--white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--light-gray)",
            padding: "var(--space-xl)",
            marginBottom: "var(--space-lg)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-md)",
              fontWeight: 600,
              color: "var(--charcoal)",
              marginBottom: "var(--space-lg)",
            }}>
              Score Breakdown
            </h2>
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
                    <div
                      className="score-bar-fill"
                      style={{
                        height: "100%",
                        width: fadeIn ? `${scores[cap]}%` : "0%",
                        background: CAPITAL_COLORS[cap],
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ TEXT SUMMARY ═══════ */}
          <div style={{
            background: "var(--white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--light-gray)",
            padding: "var(--space-xl)",
            marginBottom: "var(--space-lg)",
          }}>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-md)",
              fontWeight: 600,
              color: "var(--charcoal)",
              marginBottom: "var(--space-md)",
            }}>
              Your Snapshot
            </h2>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-base)",
              color: "var(--slate)",
              lineHeight: 1.7,
              marginBottom: "var(--space-md)",
            }}>
              Your strongest area is{" "}
              <strong style={{ color: CAPITAL_COLORS[strongest] }}>
                {CAPITAL_LABELS[strongest]}
              </strong>{" "}
              ({scores[strongest]}/100), while{" "}
              <strong style={{ color: CAPITAL_COLORS[weakest] }}>
                {CAPITAL_LABELS[weakest]}
              </strong>{" "}
              ({scores[weakest]}/100) has the most room for growth.
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

          {/* ═══════ COACHING CTA — CONDITIONAL ═══════ */}
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
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-xs)",
                color: "rgba(248,246,243,0.4)",
                marginBottom: "var(--space-md)",
              }}>
                No human interaction required unless you choose to go deeper.
              </p>
              <a
                href="mailto:hello@saratilife.com?subject=Coaching inquiry from assessment"
                className="sl-cta"
                style={{
                  display: "inline-flex",
                  background: "var(--saffron)",
                  color: "var(--white)",
                }}
                onClick={() => trackEvent("coaching_cta_click", { overall, profile: profile.level })}
              >
                Explore Deeper Coaching
              </a>
            </div>
          )}

          {/* ═══════ EMAIL CAPTURE ═══════ */}
          {!submitted ? (
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--light-gray)",
              padding: "var(--space-xl)",
              textAlign: "center",
              marginBottom: "var(--space-lg)",
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
                  className="sl-cta"
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
              marginBottom: "var(--space-lg)",
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

          {/* ═══════ ACTIONS: PDF + RETAKE ═══════ */}
          <div className="no-print" style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--space-lg)",
            flexWrap: "wrap",
          }}>
            <button
              onClick={handlePrint}
              style={{
                background: "none",
                border: "1.5px solid var(--light-gray)",
                borderRadius: "var(--radius-full)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                color: "var(--charcoal)",
                padding: "10px 24px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--saffron)";
                e.currentTarget.style.color = "var(--saffron)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--light-gray)";
                e.currentTarget.style.color = "var(--charcoal)";
              }}
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem("saratilife_answers");
                trackEvent("retake_assessment");
                navigate("/assessment");
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
};

const scorecardCSS = `
  .score-bar-fill {
    transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
  }
`;
