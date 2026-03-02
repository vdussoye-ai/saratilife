import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SaratiLogo, LOGO_SRC } from "../components/Logo";

const CAPITALS = {
  financial: {
    label: "Financial Capital",
    icon: "◇",
    color: "#c48a2a",
    tagline: "Build your runway to freedom",
    description: "Master the financial architecture of a career transition — tax-optimized strategies, passive income pathways, runway calculations, and the math that turns 'someday' into a date on the calendar.",
    modules: [
      "Freedom Number Calculator — exactly how much runway you need",
      "Tax-optimized transition strategies (RRSP, TFSA, RSU planning)",
      "Passive income blueprint — build income before you leave",
      "Debt-to-freedom ratio analysis and acceleration plan",
    ],
  },
  human: {
    label: "Human Capital",
    icon: "◈",
    color: "#e8890c",
    tagline: "Skills that compound in the age of AI",
    description: "Close the AI fluency gap that separates the displaced from the indispensable. Prompt engineering, AI tool mastery, and strategic skill positioning — built for experienced professionals, not beginners.",
    modules: [
      "Prompt Engineering Masterclass — from zero to strategic",
      "AI Tool Stack — the 7 tools that replace a junior team",
      "Skill Positioning — making 20 years of experience AI-proof",
      "Learning Velocity System — acquire new skills 3x faster",
    ],
  },
  social: {
    label: "Social Capital",
    icon: "◉",
    color: "#a67c52",
    tagline: "Your network is your net worth",
    description: "Strategic relationship architecture for career transitions. Mentor mapping, community leverage, and the networking approach that works for introverts and senior professionals who hate 'networking.'",
    modules: [
      "Strategic Network Audit — map your real influence graph",
      "Mentor & Sponsor Acquisition Framework",
      "Community Leverage — finding your tribe without cringe",
      "Transition Announcement Strategy — how to exit gracefully",
    ],
  },
  health: {
    label: "Health Capital",
    icon: "○",
    color: "#8b7355",
    tagline: "Energy is the currency nobody manages",
    description: "Sustainable high-performance systems for professionals in transition. Because the best strategy in the world fails if you burn out executing it.",
    modules: [
      "Energy Audit — where your daily capacity actually goes",
      "Stress Protocol — managing transition anxiety without medication",
      "Performance Nutrition for cognitive demand (vegetarian-friendly)",
      "Sleep Architecture — the overlooked career accelerator",
    ],
  },
  spiritual: {
    label: "Spiritual Capital",
    icon: "☸",
    color: "#6b5c4c",
    tagline: "Purpose as compass",
    description: "Align your career transition with what actually matters. Purpose-driven decision frameworks, contemplative practices for clarity, and service-oriented career design for professionals seeking meaning beyond the paycheck.",
    modules: [
      "Purpose Alignment Audit — what you value vs. what you're doing",
      "Decision Framework — choosing between good options without regret",
      "Contemplative Practice for Strategic Clarity",
      "Service-Oriented Career Design — contribution as strategy",
    ],
  },
};

export default function Capital() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const capital = CAPITALS[id];

  if (!capital) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f8f6f3", display: "flex",
        alignItems: "center", justifyContent: "center", flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧭</div>
        <h1 style={{ fontFamily: "'Lora', serif", fontSize: "24px", color: "#3d3429", marginBottom: "12px" }}>
          Capital not found
        </h1>
        <button onClick={() => navigate("/")} style={{
          background: "#3d3429", color: "#f8f6f3", border: "none", padding: "12px 32px",
          borderRadius: "8px", fontSize: "14px", fontWeight: 600, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      // TODO: Connect to email service (ConvertKit, Mailchimp, etc.)
      console.log(`Waitlist signup: ${email} for ${capital.label}`);
      setSubmitted(true);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f8f6f3",
      fontFamily: "'DM Sans', sans-serif", color: "#3d3429",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(232,137,12,0.2); }
      `}</style>

      {/* Nav */}
      <nav style={{
        padding: "14px 24px", borderBottom: "1px solid rgba(200,138,42,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(248,246,243,0.95)", backdropFilter: "blur(12px)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <SaratiLogo size={28} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 700, color: "#3d3429" }}>
            SaratiLife
          </span>
        </a>
        <a href="/assessment" style={{
          fontSize: "13px", color: "#6b5c4c", textDecoration: "none", fontWeight: 500,
        }}>
          ← Back to Assessment
        </a>
      </nav>

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", maxWidth: "640px", margin: "0 auto", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          padding: "8px 20px", borderRadius: "24px",
          background: `${capital.color}10`, border: `1px solid ${capital.color}30`,
          marginBottom: "28px",
        }}>
          <span style={{ fontSize: "18px" }}>{capital.icon}</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: capital.color, letterSpacing: "1px", textTransform: "uppercase" }}>
            {capital.label}
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Lora', serif", fontSize: "clamp(30px, 5vw, 44px)",
          fontWeight: 700, lineHeight: 1.2, color: "#3d3429", marginBottom: "16px",
        }}>
          {capital.tagline}
        </h1>

        <p style={{
          fontSize: "16px", color: "#6b5c4c", lineHeight: 1.75, maxWidth: "520px",
          margin: "0 auto 40px",
        }}>
          {capital.description}
        </p>
      </section>

      {/* What's Inside */}
      <section style={{ padding: "0 24px 60px", maxWidth: "640px", margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 600,
          color: "#3d3429", marginBottom: "20px",
        }}>
          What's inside
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {capital.modules.map((mod, i) => (
            <div key={i} style={{
              display: "flex", gap: "14px", alignItems: "flex-start",
              padding: "16px 18px", background: "#fff", borderRadius: "10px",
              border: "1px solid rgba(200,138,42,0.08)",
            }}>
              <span style={{
                fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 300,
                color: `${capital.color}50`, lineHeight: 1, minWidth: "28px",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: "14px", color: "#3d3429", lineHeight: 1.5 }}>{mod}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section style={{
        padding: "60px 24px 80px", maxWidth: "640px", margin: "0 auto",
      }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(61,52,41,0.95), rgba(61,52,41,0.88))",
          borderRadius: "16px", padding: "40px 32px", textAlign: "center",
        }}>
          {!submitted ? (
            <>
              <div style={{
                display: "inline-block", padding: "4px 14px", borderRadius: "12px",
                background: "rgba(232,137,12,0.15)", marginBottom: "16px",
              }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "#e8890c", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  Coming Soon
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Lora', serif", fontSize: "clamp(22px, 4vw, 28px)",
                fontWeight: 700, color: "#f8f6f3", lineHeight: 1.3, marginBottom: "12px",
              }}>
                Be first to access the<br />{capital.label} Accelerator
              </h2>

              <p style={{
                fontSize: "14px", color: "rgba(248,246,243,0.65)", lineHeight: 1.6,
                maxWidth: "400px", margin: "0 auto 28px",
              }}>
                We're building this right now. Early access members get founding-member pricing
                and direct input on what we build.
              </p>

              <div style={{ display: "flex", gap: "10px", maxWidth: "400px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  style={{
                    flex: 1, minWidth: "200px", padding: "14px 18px",
                    border: "1px solid rgba(232,137,12,0.3)", borderRadius: "8px",
                    background: "rgba(255,255,255,0.08)", color: "#f8f6f3",
                    fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    background: "#e8890c", color: "#fff", border: "none",
                    padding: "14px 28px", borderRadius: "8px", fontSize: "14px",
                    fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.3s ease", whiteSpace: "nowrap",
                  }}
                >
                  Join Waitlist
                </button>
              </div>

              <p style={{ fontSize: "11px", color: "rgba(248,246,243,0.35)", marginTop: "14px" }}>
                No spam. Unsubscribe anytime. We respect your inbox.
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✦</div>
              <h2 style={{
                fontFamily: "'Lora', serif", fontSize: "24px",
                fontWeight: 700, color: "#f8f6f3", marginBottom: "12px",
              }}>
                You're on the list
              </h2>
              <p style={{
                fontSize: "15px", color: "rgba(248,246,243,0.7)", lineHeight: 1.6,
                maxWidth: "380px", margin: "0 auto 24px",
              }}>
                We'll notify you when the {capital.label} Accelerator launches.
                Founding members get first access and preferential pricing.
              </p>
              <a href="/assessment" style={{
                display: "inline-block", padding: "12px 28px",
                border: "1px solid rgba(232,137,12,0.4)", borderRadius: "8px",
                color: "#e8890c", fontSize: "14px", fontWeight: 600,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              }}>
                ← Back to Your Report
              </a>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(200,138,42,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "6px" }}>
          <SaratiLogo size={16} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "13px", fontWeight: 600, color: "#3d3429" }}>SaratiLife</span>
        </div>
        <p style={{ fontSize: "11px", color: "#c8bfb3" }}>© 2026 SaratiLife. The Five Capitals Framework.</p>
      </footer>
    </div>
  );
}
