import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";
import { QUESTIONS, CAPITALS, CAPITAL_LABELS } from "../lib/assessment-data";
import FunnelNav from "../components/FunnelNav";

export default function Assessment() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(-1); // -1 = welcome screen
  const [answers, setAnswers] = useState({});
  const [fadeIn, setFadeIn] = useState(true);
  const containerRef = useRef(null);

  const totalQ = QUESTIONS.length;
  const progress = currentQ >= 0 ? ((currentQ + 1) / totalQ) * 100 : 0;

  const transitionTo = (nextQ) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentQ(nextQ);
      setFadeIn(true);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }, 200);
  };

  const selectAnswer = (qId, value) => {
    const next = { ...answers, [qId]: value };
    setAnswers(next);
    trackEvent("assessment_answer", { question: qId, value });

    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        transitionTo(currentQ + 1);
      } else {
        // Save to sessionStorage as fallback for page refresh
        sessionStorage.setItem("saratilife_answers", JSON.stringify(next));
        trackEvent("assessment_complete", { questions_answered: Object.keys(next).length });
        navigate("/scorecard", { state: { answers: next } });
      }
    }, 350);
  };

  // ── Welcome screen ──────────────────────────────────────────────
  if (currentQ === -1) {
    return (
      <div style={pageStyle}>
        <Helmet>
          <title>{"Career & Life Clarity Assessment — SaratiLife"}</title>
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
              marginBottom: "var(--space-md)",
            }}>
              Answer honestly for best results — takes just 10 minutes.
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--slate)",
              opacity: 0.65,
              marginBottom: "var(--space-2xl)",
            }}>
              Your responses are private and secure.
            </p>
            <button
              className="sl-cta"
              onClick={() => {
                trackEvent("assessment_start");
                transitionTo(0);
              }}
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

  // ── Question screen ─────────────────────────────────────────────
  const q = QUESTIONS[currentQ];

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>{`Assessment — Question ${currentQ + 1} of ${totalQ} — SaratiLife`}</title>
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

          {/* Capital badge */}
          <div style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: "var(--radius-full)",
            background: "rgba(232,137,12,0.08)",
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            color: "var(--saffron-dark)",
            marginBottom: "var(--space-md)",
          }}>
            {CAPITAL_LABELS[q.capital]}
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
