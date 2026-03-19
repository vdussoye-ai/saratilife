import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";
import FunnelNav from "../components/FunnelNav";
import { SaratiLogo } from "../components/Logo";

// ── Scroll-reveal hook ──────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
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

// ── Inline SVG icons ────────────────────────────────────────────────────
function ClipboardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="var(--saffron)" strokeWidth="1.5" />
      <path d="M9 3V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="var(--saffron)" strokeWidth="1.5" />
      <path d="M9 10h6M9 14h4" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="12" width="4" height="8" rx="1" fill="var(--career)" opacity="0.7" />
      <rect x="10" y="6" width="4" height="14" rx="1" fill="var(--saffron)" opacity="0.8" />
      <rect x="17" y="9" width="4" height="11" rx="1" fill="var(--financial)" opacity="0.7" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="var(--saffron)" strokeWidth="1.5" />
      <polygon points="12,6 14,14 12,12.5 10,14" fill="var(--saffron)" opacity="0.8" />
      <polygon points="12,18 10,10 12,11.5 14,10" fill="var(--saffron)" opacity="0.4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L4 6v5c0 5.25 3.4 10.15 8 11.25C16.6 21.15 20 16.25 20 11V6l-8-4z" stroke="var(--saffron)" strokeWidth="1.5" fill="none" />
      <path d="M9 12l2 2 4-4" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="var(--saffron)" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="var(--saffron)" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckmarkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--saffron)" opacity="0.12" />
      <path d="M8 12.5l2.5 2.5 5-5" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Flow arrow ──────────────────────────────────────────────────────────
function FlowArrow() {
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M2 8h24M22 3l6 5-6 5" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

// ── Data ────────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Take the Assessment",
    desc: "Answer 12 questions across five life dimensions. Fully automated, takes about 10 minutes.",
    Icon: ClipboardIcon,
  },
  {
    step: 2,
    title: "See Instant Results",
    desc: "Get your personalized Five Capitals scorecard with radar chart, strengths, and growth areas.",
    Icon: ChartIcon,
  },
  {
    step: 3,
    title: "Optional Coaching",
    desc: "Only if your results suggest it — and only if you choose to go deeper with guided support.",
    Icon: CompassIcon,
  },
];

const BENEFITS = [
  {
    Icon: LightbulbIcon,
    title: "Instant clarity on your path",
    desc: "See exactly where you stand across career, finances, health, relationships, and purpose.",
  },
  {
    Icon: LockIcon,
    title: "Fully automated and private",
    desc: "Your data stays on your device. No account required, no data shared with third parties.",
  },
  {
    Icon: ShieldIcon,
    title: "Coaching only if you want it",
    desc: "No pressure, no sales calls. You decide if deeper guidance is right for you.",
  },
];

// ── Component ───────────────────────────────────────────────────────────
export default function Landing() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaClick = (location) => {
    trackEvent("cta_click", { location });
    navigate("/assessment");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      fontFamily: "var(--font-body)",
      color: "var(--charcoal)",
      overflowX: "hidden",
    }}>
      <Helmet>
        <title>{"SaratiLife — Discover Where You Stand in Career and Life"}</title>
        <meta name="description" content="Discover where you stand in your career and life in just 10 minutes. Complete the Five Capitals assessment, get instant insights, and see if deeper coaching is right for you." />
        <link rel="canonical" href="https://saratilife.com/" />
        <meta property="og:title" content="SaratiLife — Discover Where You Stand in Career and Life" />
        <meta property="og:description" content="Complete the Five Capitals assessment in 10 minutes, get instant insights, and see if deeper coaching is right for you." />
        <meta property="og:url" content="https://saratilife.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaratiLife — Discover Where You Stand in Career and Life" />
        <meta name="twitter:description" content="Complete the Five Capitals assessment in 10 minutes, get instant insights, and see if deeper coaching is right for you." />
        <meta name="twitter:image" content="https://saratilife.com/logo-512.png" />
      </Helmet>

      <style>{landingCSS}</style>
      <FunnelNav />

      <main>
        {/* ═══════════════════════════════════════════════════════════════
            1. HERO — Above the fold
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="landing-hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "120px 24px 60px",
            position: "relative",
          }}
        >
          {/* Decorative circle */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: "1px solid rgba(232,137,12,0.06)",
            pointerEvents: "none",
            opacity: heroVisible ? 0.6 : 0,
            transition: "opacity 2s ease 0.5s",
          }} />

          <div style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <h1
              className="landing-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-4xl)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--charcoal)",
                maxWidth: "700px",
                marginBottom: "var(--space-lg)",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
              }}
            >
              Discover where you stand in your career and life in just 10 minutes
            </h1>

            <p
              className="landing-subtitle"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-lg)",
                color: "var(--slate)",
                maxWidth: "560px",
                lineHeight: 1.7,
                marginBottom: "var(--space-2xl)",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
              }}
            >
              Complete our automated assessment, get instant insights, and only go deeper if you choose coaching.
            </p>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
            }}>
              <button
                className="sl-cta"
                onClick={() => ctaClick("landing_hero")}
                aria-label="Start the free 10-minute assessment"
              >
                Start Your Assessment
              </button>
            </div>

            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-xs)",
              color: "var(--slate)",
              marginTop: "var(--space-md)",
              opacity: heroVisible ? 0.7 : 0,
              transition: "opacity 1s ease 1s",
            }}>
              Free · 10 minutes · No account required
            </p>

            {/* ── Flow illustration ── */}
            <div
              className="hero-flow"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginTop: "var(--space-2xl)",
                opacity: heroVisible ? 1 : 0,
                transition: "opacity 1.2s ease 1.2s",
              }}
            >
              {[
                { label: "Assessment", color: "var(--career)" },
                { label: "Results", color: "var(--saffron)" },
                { label: "Coaching", color: "var(--inner)", optional: true },
              ].map((item, i) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {i > 0 && <FlowArrow />}
                  <div style={{
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    border: `1.5px solid ${item.color}`,
                    background: `${item.color}08`,
                    fontSize: "var(--font-size-xs)",
                    fontWeight: 600,
                    color: item.color,
                    whiteSpace: "nowrap",
                    position: "relative",
                  }}>
                    {item.label}
                    {item.optional && (
                      <span style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-4px",
                        fontSize: "9px",
                        fontWeight: 700,
                        color: "var(--slate)",
                        background: "var(--cream)",
                        padding: "0 4px",
                        borderRadius: "var(--radius-full)",
                      }}>
                        optional
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            2. HOW IT WORKS
        ═══════════════════════════════════════════════════════════════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "880px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                color: "var(--charcoal)",
                marginBottom: "var(--space-sm)",
              }}>
                How It Works
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-md)",
                color: "var(--slate)",
                maxWidth: "480px",
                margin: "0 auto",
              }}>
                Three simple steps. Fully automated. No human interaction is required unless you opt in.
              </p>
            </div>
          </RevealSection>

          <div className="hiw-grid">
            {HOW_IT_WORKS.map((item, i) => (
              <RevealSection key={item.step} delay={i * 0.12}>
                <div style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--light-gray)",
                  padding: "var(--space-xl) var(--space-lg)",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  height: "100%",
                }}>
                  {/* Step number */}
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--saffron)",
                    color: "var(--white)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-md)",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "var(--space-md)",
                  }}>
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "var(--space-md)",
                  }}>
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--saffron-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <item.Icon />
                    </div>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-lg)",
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-sm)",
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--slate)",
                    lineHeight: 1.65,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            3. BENEFITS / VALUE HIGHLIGHTS
        ═══════════════════════════════════════════════════════════════ */}
        <section style={{
          padding: "var(--space-2xl) var(--space-lg) var(--space-3xl)",
          maxWidth: "740px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                color: "var(--charcoal)",
                marginBottom: "var(--space-sm)",
              }}>
                Why This Assessment Helps
              </h2>
            </div>
          </RevealSection>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            {BENEFITS.map((b, i) => (
              <RevealSection key={b.title} delay={i * 0.1}>
                <div className="benefit-card" style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "var(--space-lg)",
                  background: "var(--white)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--light-gray)",
                  padding: "var(--space-xl)",
                  boxShadow: "var(--shadow-sm)",
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--saffron-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <b.Icon />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "var(--font-size-md)",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      marginBottom: "var(--space-xs)",
                    }}>
                      {b.title}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--slate)",
                      lineHeight: 1.65,
                    }}>
                      {b.desc}
                    </p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            4. TRUST & FLOW CUES
        ═══════════════════════════════════════════════════════════════ */}
        <section style={{
          padding: "var(--space-2xl) var(--space-lg) var(--space-3xl)",
          maxWidth: "680px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--light-gray)",
              padding: "var(--space-2xl) var(--space-xl)",
              textAlign: "center",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--saffron-dark)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "var(--space-lg)",
              }}>
                Trusted Process
              </div>

              {/* Mini progress bar illustration */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "var(--space-xl)",
              }}>
                {["Start", "Answer", "Score", "Insights"].map((label, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {i > 0 && (
                      <div style={{
                        width: "24px",
                        height: "2px",
                        background: "var(--saffron)",
                        opacity: 0.3,
                      }} />
                    )}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "var(--saffron)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M3 6.5l2 2 4-4" stroke="var(--white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "var(--slate)",
                        whiteSpace: "nowrap",
                      }}>
                        {label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
                alignItems: "center",
              }}>
                {[
                  "Early users have gained clarity in minutes.",
                  "No forms, no contact required — just your answers.",
                  "Built by a 20-year enterprise architect & certified life coach.",
                ].map((text) => (
                  <div key={text} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                  }}>
                    <CheckmarkIcon />
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-sm)",
                      color: "var(--slate)",
                      lineHeight: 1.5,
                    }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Second CTA */}
          <RevealSection delay={0.15}>
            <div style={{
              textAlign: "center",
              marginTop: "var(--space-2xl)",
            }}>
              <button
                className="sl-cta"
                onClick={() => ctaClick("landing_trust")}
                aria-label="Start the assessment"
              >
                Start Your Assessment
              </button>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-xs)",
                color: "var(--slate)",
                marginTop: "var(--space-md)",
                opacity: 0.6,
              }}>
                No human interaction required unless you choose to go deeper.
              </p>
            </div>
          </RevealSection>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          5. FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer style={{
        padding: "var(--space-2xl) var(--space-lg)",
        borderTop: "1px solid rgba(200,138,42,0.08)",
        textAlign: "center",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-sm)",
        }}>
          <SaratiLogo size={18} />
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--charcoal)",
          }}>
            SaratiLife
          </span>
        </div>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--font-size-xs)",
          color: "var(--slate)",
          marginBottom: "var(--space-md)",
        }}>
          Flowing with intention. For professionals who refuse to go with the flow.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "var(--space-lg)",
          marginBottom: "var(--space-sm)",
        }}>
          <a href="/privacy" style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "var(--slate)",
            textDecoration: "none",
            opacity: 0.7,
          }}>
            Privacy Policy
          </a>
          <a href="/terms" style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "var(--slate)",
            textDecoration: "none",
            opacity: 0.7,
          }}>
            Terms of Use
          </a>
        </div>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "11px",
          color: "var(--light-gray)",
        }}>
          &copy; {new Date().getFullYear()} SaratiLife. The Five Capitals Framework.
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════
          STICKY MOBILE CTA
      ═══════════════════════════════════════════════════════════════ */}
      <div
        className="sticky-mobile-cta"
        style={{
          display: "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 98,
          padding: "12px 16px",
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
          background: "rgba(248,246,243,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(200,138,42,0.1)",
          justifyContent: "center",
          opacity: scrollY > 300 ? 1 : 0,
          transform: scrollY > 300 ? "translateY(0)" : "translateY(100%)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: scrollY > 300 ? "auto" : "none",
        }}
      >
        <button
          className="sl-cta"
          onClick={() => ctaClick("landing_sticky_mobile")}
          aria-label="Start the free 10-minute assessment"
          style={{ width: "100%", maxWidth: "360px" }}
        >
          Start Your Assessment
        </button>
      </div>
    </div>
  );
}

// ── Landing-specific CSS ────────────────────────────────────────────────
const landingCSS = `
  .hiw-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }
  @media (max-width: 768px) {
    .landing-hero { padding: 120px 20px 60px !important; min-height: 100svh !important; }
    .landing-heading { font-size: clamp(28px, 8vw, 36px) !important; }
    .landing-subtitle { font-size: var(--font-size-md) !important; }
    .hiw-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
    .hero-flow { flex-wrap: wrap; }
    .benefit-card { flex-direction: column; align-items: center !important; text-align: center; }
    .sticky-mobile-cta { display: flex !important; }
  }
`;
