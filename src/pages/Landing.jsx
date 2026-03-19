import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";
import FunnelNav from "../components/FunnelNav";

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

const STATS = [
  { value: "2,400+", label: "Assessments taken" },
  { value: "58", label: "Avg. score out of 100" },
  { value: "73%", label: "Changed their plan" },
];

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

  const ctaClick = () => {
    trackEvent("cta_click", { location: "landing_hero" });
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

      <style>{`
        .landing-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--charcoal);
          color: var(--cream);
          border: none;
          padding: 0 44px;
          height: 58px;
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
        .landing-cta:hover {
          background: var(--saffron);
          color: var(--white);
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(232,137,12,0.3);
        }
        .landing-cta:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(232,137,12,0.2);
        }
        .landing-cta:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .landing-hero { padding: 120px 20px 60px !important; min-height: 100svh !important; }
          .landing-heading { font-size: clamp(28px, 8vw, 36px) !important; }
          .landing-subtitle { font-size: var(--font-size-md) !important; }
          .landing-cta { width: 100%; max-width: 360px; padding: 0 24px; }
          .landing-stats { flex-direction: column; gap: 16px !important; }
          .landing-stat-card { width: 100% !important; }
          .sticky-mobile-cta {
            display: flex !important;
          }
        }
      `}</style>

      <FunnelNav />

      <main>
        {/* ═══════ HERO — Full viewport ═══════ */}
        <section
          className="landing-hero"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "120px 24px 80px",
            position: "relative",
          }}
        >
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
                maxWidth: "540px",
                lineHeight: 1.7,
                marginBottom: "var(--space-2xl)",
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
              }}
            >
              Complete the assessment, get instant insights, and see if deeper coaching is right for you.
            </p>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
            }}>
              <button className="landing-cta" onClick={ctaClick} aria-label="Start the free 10-minute assessment">
                Start Your Assessment
              </button>
            </div>
          </div>
        </section>

        {/* ═══════ STAT CARDS ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "720px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div
              className="landing-stats"
              style={{ display: "flex", gap: "var(--space-lg)", justifyContent: "center" }}
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="landing-stat-card"
                  style={{
                    flex: 1,
                    background: "var(--white)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-xl) var(--space-lg)",
                    textAlign: "center",
                    border: "1px solid var(--light-gray)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-2xl)",
                    fontWeight: 700,
                    color: "var(--saffron)",
                    marginBottom: "var(--space-xs)",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--slate)",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ═══════ CREDIBILITY BAR ═══════ */}
        <section style={{
          padding: "var(--space-2xl) var(--space-lg) var(--space-3xl)",
          textAlign: "center",
        }}>
          <RevealSection delay={0.1}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-sm)",
              color: "var(--slate)",
              letterSpacing: "0.02em",
            }}>
              Built by a 20-year enterprise architect &amp; certified life coach
            </p>
          </RevealSection>
        </section>
      </main>

      {/* ═══════ STICKY MOBILE CTA ═══════ */}
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
          className="landing-cta"
          onClick={ctaClick}
          aria-label="Start the free 10-minute assessment"
          style={{ width: "100%", maxWidth: "360px" }}
        >
          Start Your Assessment
        </button>
      </div>
    </div>
  );
}
