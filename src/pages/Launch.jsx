import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { SaratiLogo, SaratiMark } from "../components/Logo";
import { trackEvent } from "../lib/analytics";




// ── Hooks & Utilities ──────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function RevealSection({ children, delay = 0 }) {
  const [ref, visible] = useReveal(0.12);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── Five Capitals Diagram ──────────────────────────────────────────────
function CapitalsDiagram() {
  const [ref, visible] = useReveal(0.2);
  const capitals = [
    { name: "Financial", icon: "◇", desc: "Runway to freedom", color: "#c48a2a" },
    { name: "Human", icon: "◈", desc: "Skills that compound", color: "#e8890c" },
    { name: "Social", icon: "◉", desc: "Network as safety net", color: "#a67c52" },
    { name: "Health", icon: "○", desc: "Energy as currency", color: "#8b7355" },
    { name: "Spiritual", icon: "☸", desc: "Purpose as compass", color: "#6b5c4c" },
  ];
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
      {capitals.map((cap, i) => (
        <div key={cap.name} style={{
          display: "flex", alignItems: "center", gap: "20px",
          padding: "16px 0",
          borderBottom: i < 4 ? "1px solid rgba(200,138,42,0.1)" : "none",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-20px)",
          transition: `all 0.7s ease ${0.1 * i}s`
        }}>
          <span style={{ fontSize: "22px", color: cap.color, width: "32px", textAlign: "center" }}>{cap.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: "16px", fontWeight: 600, color: "#3d3429" }}>{cap.name}</div>
            <div style={{ fontSize: "13px", color: "#9a8b7a", marginTop: "2px" }}>{cap.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Landing Page ──────────────────────────────────────────────────
export default function SaratiLifeLaunch() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 200);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ctaClick = (location) => {
    trackEvent("cta_click", { location });
    window.location.href = "/assessment";
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f8f6f3",
      fontFamily: "'DM Sans', sans-serif", color: "#3d3429", overflowX: "hidden",
    }}>
      <Helmet>
        <title>SaratiLife — Flowing with Intention</title>
        <meta name="description" content="Find your AI displacement risk, map the five capitals that determine your future, and get a strategic career pivot plan in 10 minutes. Free assessment for mid-career professionals." />
        <link rel="canonical" href="https://saratilife.com/" />
        <meta property="og:title" content="SaratiLife — The Career Math Nobody's Doing" />
        <meta property="og:description" content="AI displacement risk score, Five Capitals mapping, and a strategic pivot plan — in 10 minutes. Free." />
        <meta property="og:url" content="https://saratilife.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaratiLife — Flowing with Intention" />
        <meta name="twitter:description" content="Your AI displacement risk + Five Capitals career strategy in 10 minutes." />
        <meta name="twitter:image" content="https://saratilife.com/logo-512.png" />
      </Helmet>

      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(232,137,12,0.2); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        .cta-primary {
          background: #3d3429; color: #f8f6f3; border: none; padding: 16px 40px;
          border-radius: 8px; font-size: 15px; font-family: 'DM Sans', sans-serif;
          font-weight: 600; cursor: pointer; letter-spacing: 0.3px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 2px 16px rgba(61,52,41,0.12);
        }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(61,52,41,0.2); }
        .nav-link {
          font-size: 13px; color: #6b5c4c; text-decoration: none;
          font-weight: 500; transition: color 0.3s ease; cursor: pointer;
        }
        .nav-link:hover { color: #e8890c; }
        .nav-links-desktop { display: flex; align-items: center; gap: 28px; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .mobile-menu { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex !important; flex-direction: column; gap: 5px; }
          .hamburger span { display: block; width: 22px; height: 2px; background: #3d3429; border-radius: 1px; transition: all 0.3s ease; }
          .mobile-menu {
            display: flex; flex-direction: column;
            position: fixed; top: 56px; left: 0; right: 0; bottom: 0;
            background: rgba(248,246,243,0.98); backdrop-filter: blur(16px);
            padding: 32px 24px; z-index: 99;
          }
          .mobile-menu .nav-link { font-size: 18px; padding: 16px 0; border-bottom: 1px solid rgba(200,138,42,0.08); display: block; }
          .mobile-menu .cta-primary { margin-top: 24px; text-align: center; }
          .features-grid { grid-template-columns: 1fr !important; }
          .hero-section { padding: 100px 20px 48px !important; }
          .hero-stats { gap: 16px !important; margin-top: 28px !important; }
          .hero-quote { font-size: 17px !important; }
          .section-framework, .section-how { padding: 48px 20px !important; }
          .final-cta { padding: 60px 20px !important; }
          .founder-card { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .founder-card blockquote { border-left: none !important; padding-left: 0 !important; border-top: 3px solid #e8890c; padding-top: 16px !important; }
          .founder-meta { justify-content: center !important; }
        }
      `}</style>

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 24px",
        background: scrollY > 50 || mobileMenuOpen ? "rgba(248,246,243,0.95)" : "transparent",
        backdropFilter: scrollY > 50 || mobileMenuOpen ? "blur(12px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(200,138,42,0.08)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <SaratiLogo size={28} animate={!mobileMenuOpen} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 700, color: "#3d3429" }}>
            SaratiLife
          </span>
        </a>
        <div className="nav-links-desktop">
          <span className="nav-link" onClick={() => document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" })}>Framework</span>
          <span className="nav-link" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>How It Works</span>
          <button className="cta-primary" onClick={() => ctaClick("nav")} style={{ padding: "10px 24px", fontSize: "13px" }}>
            Take the Assessment
          </button>
        </div>
        <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          <span style={{ transform: mobileMenuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
          <span style={{ transform: mobileMenuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <span className="nav-link" onClick={() => { setMobileMenuOpen(false); document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" }); }}>Framework</span>
          <span className="nav-link" onClick={() => { setMobileMenuOpen(false); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}>How It Works</span>
          <button className="cta-primary" onClick={() => { setMobileMenuOpen(false); ctaClick("mobile_menu"); }} style={{ padding: "14px 32px", fontSize: "15px", width: "100%" }}>
            Take the Assessment
          </button>
        </div>
      )}

      <main>
      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section className="hero-section" style={{
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "140px 24px 64px", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "15%", right: "8%",
          width: "160px", height: "160px", borderRadius: "50%",
          border: "1px solid rgba(232,137,12,0.07)",
          opacity: heroVisible ? 0.5 : 0, transition: "opacity 2s ease 0.5s",
        }} />

        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
          <div style={{
            display: "inline-block", padding: "6px 18px", borderRadius: "20px",
            border: "1px solid rgba(232,137,12,0.2)", background: "rgba(232,137,12,0.04)",
            fontSize: "12px", fontWeight: 600, color: "#c48a2a",
            letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "28px",
          }}>
            Free · 10 Minutes · The Career Math Nobody's Doing
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Lora', serif", fontSize: "clamp(34px, 5.5vw, 62px)",
          fontWeight: 700, lineHeight: 1.15, color: "#3d3429", maxWidth: "740px",
          marginBottom: "24px",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
          The most dangerous career strategy in 2026?
          <br />
          <span style={{ color: "#e8890c" }}>No strategy at all.</span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 18px)", color: "#6b5c4c", maxWidth: "500px",
          lineHeight: 1.7, marginBottom: "36px",
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
          Find out your AI displacement risk, map the five capitals that 
          actually determine your future, and get a strategic pivot plan — in 10 minutes.
        </p>

        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.9s",
        }}>
          <button className="cta-primary" onClick={() => ctaClick("hero")} style={{ fontSize: "16px", padding: "18px 48px" }}>
            Start Free Assessment<SaratiMark />
          </button>
        </div>

        <div className="hero-stats" style={{
          display: "flex", gap: "28px", marginTop: "40px", flexWrap: "wrap", justifyContent: "center",
          opacity: heroVisible ? 1 : 0, transition: "opacity 1.2s ease 1.2s",
        }}>
          {[["44%", "of skills disrupted by 2030"], ["5 capitals", "most people manage only 1"], ["10 min", "to see your real position"]].map(([big, small]) => (
            <div key={big} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Lora', serif", fontSize: "20px", fontWeight: 700, color: "#3d3429" }}>{big}</div>
              <div style={{ fontSize: "12px", color: "#9a8b7a", marginTop: "2px" }}>{small}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SECTION 2: THE PROBLEM (Tight) ═══════ */}
      <section style={{ padding: "48px 24px 80px", maxWidth: "680px", margin: "0 auto" }}>
        <RevealSection>
          <h2 style={{
            fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 700, lineHeight: 1.25, color: "#3d3429", marginBottom: "24px",
          }}>
            You didn't get this far by being passive.
            <span style={{ color: "#9a8b7a" }}> So why is "wait and see" your AI strategy?</span>
          </h2>
        </RevealSection>

        <RevealSection delay={0.1}>
          <p style={{ fontSize: "16px", color: "#6b5c4c", lineHeight: 1.8, marginBottom: "16px" }}>
            The largest and most vulnerable group of professionals right now aren't the 
            ones panicking about AI. They're the ones <em>going with the flow</em> — 
            smart, experienced people who assume their track record is enough. Who plan 
            to "adapt when they need to" — without realizing the window for low-cost 
            adaptation is closing.
          </p>
        </RevealSection>

        <RevealSection delay={0.2}>
          <blockquote className="hero-quote" style={{
            fontFamily: "'Lora', serif", fontSize: "20px", fontStyle: "italic",
            color: "#3d3429", lineHeight: 1.6,
            padding: "20px 0 20px 24px", borderLeft: "3px solid #e8890c",
            margin: "24px 0",
          }}>
            "The most expensive career mistake isn't making the wrong move. 
            It's making no move at all — and calling it stability."
          </blockquote>
        </RevealSection>

        <RevealSection delay={0.3}>
          <p style={{ fontSize: "16px", color: "#6b5c4c", lineHeight: 1.8, marginBottom: "16px" }}>
            And the standard advice doesn't help. "Learn to prompt." "Take an AI course." 
            Every LinkedIn guru treats you like a job description that needs updating.
          </p>
          <p style={{ fontSize: "16px", color: "#6b5c4c", lineHeight: 1.8 }}>
            But you're not a job description. You're a person with a mortgage, a family, 
            a sense of purpose that matters, and 20 years of hard-won wisdom that no AI 
            can replicate — <em>if you know how to position it</em>.
          </p>
        </RevealSection>

        <RevealSection delay={0.35}>
          <div style={{
            marginTop: "32px", padding: "20px 24px",
            background: "rgba(232,137,12,0.04)", borderRadius: "10px",
            border: "1px solid rgba(232,137,12,0.1)",
            display: "flex", gap: "12px", alignItems: "center",
          }}>
            <span style={{ fontSize: "20px" }}>📊</span>
            <div>
              <span style={{ fontSize: "14px", color: "#3d3429", fontWeight: 600 }}>
                Want the full picture?
              </span>
              <span style={{ fontSize: "14px", color: "#6b5c4c" }}>
                {" "}Read our deep dive: <a href="/article/ai-career-disruption-2026" style={{ color: "#e8890c", cursor: "pointer", textDecoration: "none", fontStyle: "italic" }}>The State of AI Career Disruption, 2026</a> —
                industry-by-industry analysis of what's already changed.
              </span>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════ SECTION 3: THE FRAMEWORK ═══════ */}
      <section id="framework" className="section-framework" style={{
        padding: "80px 24px",
        background: "linear-gradient(180deg, transparent 0%, rgba(232,137,12,0.02) 50%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <RevealSection>
            <div style={{
              fontSize: "12px", fontWeight: 600, color: "#c48a2a",
              letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px",
            }}>
              The antidote
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <h2 style={{
              fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 700, lineHeight: 1.25, color: "#3d3429", marginBottom: "14px",
            }}>
              Your career is one asset in a portfolio of five.
            </h2>
          </RevealSection>

          <RevealSection delay={0.15}>
            <p style={{ fontSize: "16px", color: "#6b5c4c", lineHeight: 1.8, marginBottom: "36px", maxWidth: "540px" }}>
              "Upskill" isn't a strategy. A strategy accounts for your financial runway, 
              your relationships, your energy, your purpose — not just your resume. All five 
              working together create what we call
              <strong style={{ color: "#3d3429" }}> earned freedom</strong>.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <CapitalsDiagram />
          </RevealSection>
        </div>
      </section>

      {/* ═══════ SECTION 4: HOW IT WORKS + WHAT YOU GET ═══════ */}
      <section id="how-it-works" className="section-how" style={{ padding: "80px 24px", maxWidth: "680px", margin: "0 auto" }}>
        <RevealSection>
          <div style={{
            fontSize: "12px", fontWeight: 600, color: "#c48a2a",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px",
          }}>
            How it works
          </div>
        </RevealSection>

        <RevealSection delay={0.1}>
          <h2 style={{
            fontFamily: "'Lora', serif", fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 700, lineHeight: 1.25, color: "#3d3429", marginBottom: "36px",
          }}>
            Ten minutes. Four steps. Full clarity.
          </h2>
        </RevealSection>

        {[
          { num: "01", title: "Map your position", desc: "Your role, industry, experience, and skills — each analyzed for AI exposure." },
          { num: "02", title: "Assess your runway", desc: "Financial position, debt, passive income — how bold can you afford to be?" },
          { num: "03", title: "Score your whole life", desc: "All five capitals — financial, human, social, health, spiritual — because career decisions don't exist in isolation." },
          { num: "04", title: "Get your strategy", desc: "AI Risk Score, Five Capitals radar chart, personalized recommendations, and your freedom timeline." },
        ].map((step, i) => (
          <RevealSection key={step.num} delay={0.1 + i * 0.08}>
            <div style={{
              display: "flex", gap: "20px", alignItems: "flex-start",
              padding: "22px 0",
              borderBottom: i < 3 ? "1px solid rgba(200,138,42,0.08)" : "none",
            }}>
              <span style={{
                fontFamily: "'Lora', serif", fontSize: "28px", fontWeight: 300,
                color: "rgba(232,137,12,0.25)", lineHeight: 1, minWidth: "40px",
              }}>{step.num}</span>
              <div>
                <h3 style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 600, color: "#3d3429", marginBottom: "4px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#6b5c4c", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </div>
          </RevealSection>
        ))}

        {/* What you get — compact grid */}
        <RevealSection delay={0.5}>
          <div style={{ marginTop: "48px" }}>
            <h3 style={{
              fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600,
              color: "#3d3429", marginBottom: "20px",
            }}>
              Your report includes:
            </h3>
            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { icon: "◎", title: "AI Risk Score", desc: "Displacement risk at 2, 5, 10 year horizons" },
                { icon: "◈", title: "Five Capitals Map", desc: "Radar chart of your life portfolio balance" },
                { icon: "△", title: "Pivot Pathways", desc: "Career moves ranked by feasibility & values" },
                { icon: "⏱", title: "Freedom Timeline", desc: "Projected years to financial independence" },
                { icon: "◇", title: "Skill Audit", desc: "Each skill color-coded by AI exposure" },
                { icon: "◆", title: "90-Day Priorities", desc: "Three actions ranked by impact" },
              ].map((item) => (
                <div key={item.title} style={{
                  padding: "16px",
                  background: "rgba(61,52,41,0.02)", borderRadius: "10px",
                  border: "1px solid rgba(200,138,42,0.06)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "16px", color: "#e8890c" }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: "14px", fontWeight: 600, color: "#3d3429" }}>{item.title}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#9a8b7a", lineHeight: 1.5, paddingLeft: "26px" }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════ SECTION 5: FOUNDER (Short) ═══════ */}
      <section style={{
        padding: "32px 24px",
        background: "linear-gradient(180deg, transparent 0%, rgba(232,137,12,0.015) 50%, transparent 100%)",
      }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <RevealSection>
            <div className="founder-card" style={{
              display: "flex", gap: "16px", alignItems: "flex-start",
              padding: "28px 24px",
              background: "rgba(61,52,41,0.02)", borderRadius: "12px",
              border: "1px solid rgba(200,138,42,0.08)",
            }}>
              <SaratiLogo size={36} />
              <div>
                <p style={{ fontFamily: "'Lora', serif", fontSize: "15px", fontStyle: "italic", color: "#3d3429", lineHeight: 1.7, marginBottom: "12px" }}>
                  "I'm a technology leader with 20+ years in enterprise tech. For a long
                  time, my strategy was 'keep doing good work.' Then I ran the math — not
                  just the financial math, the <em>whole life</em> math. I built SaratiLife
                  because the journey from 'going with the flow' to 'navigating with
                  intention' shouldn't require a crisis to start."
                </p>
                <div className="founder-meta" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#3d3429" }}>Founder, SaratiLife</div>
                  <span style={{ fontSize: "11px", color: "#9a8b7a" }}>·</span>
                  <div style={{ fontSize: "12px", color: "#9a8b7a" }}>
                    <em>Sarati</em> — Sanskrit for "to flow, to move"
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════ SECTION 6: FINAL CTA ═══════ */}
      <section id="assessment-cta" className="final-cta" style={{
        padding: "100px 24px", textAlign: "center", position: "relative",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "320px", height: "320px", borderRadius: "50%",
          border: "1px solid rgba(232,137,12,0.05)", pointerEvents: "none",
        }} />

        <RevealSection>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ display: "block", marginBottom: "20px" }}><SaratiLogo size={40} /></span>
            <h2 style={{
              fontFamily: "'Lora', serif", fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 700, lineHeight: 1.2, color: "#3d3429", marginBottom: "14px",
            }}>
              A year from now, you'll wish<br />you started today.
            </h2>
            <p style={{
              fontSize: "16px", color: "#6b5c4c", maxWidth: "420px",
              margin: "0 auto 32px", lineHeight: 1.7,
            }}>
              The free assessment takes 10 minutes. The clarity lasts. 
              Find out where you actually stand.
            </p>
            <button className="cta-primary" onClick={() => ctaClick("final_cta")} style={{ fontSize: "16px", padding: "18px 52px" }}>
              Begin Your Assessment<SaratiMark />
            </button>
            <div style={{
              display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap",
            }}>
              {["Free forever", "No account needed", "Private — data stays in your browser"].map(text => (
                <span key={text} style={{ fontSize: "12px", color: "#9a8b7a", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color: "#e8890c", fontSize: "8px" }}>●</span> {text}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ padding: "40px 24px", borderTop: "1px solid rgba(200,138,42,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
          <SaratiLogo size={18} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "14px", fontWeight: 600, color: "#3d3429" }}>SaratiLife</span>
        </div>
        <p style={{ fontSize: "12px", color: "#b3a698" }}>
          Flowing with intention. For professionals who refuse to go with the flow.
        </p>
        <p style={{ fontSize: "11px", color: "#c8bfb3", marginTop: "4px" }}>© 2026 SaratiLife. The Five Capitals Framework.</p>
      </footer>
    </div>
  );
}
