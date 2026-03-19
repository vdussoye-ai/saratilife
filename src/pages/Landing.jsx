import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SaratiLogo } from "../components/Logo";
import { trackEvent } from "../lib/analytics";

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

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
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
        <title>SaratiLife — Achieve Clarity in Your Career and Life</title>
        <meta name="description" content="Achieve clarity in your career and life in just 10 minutes a day. The Five Capitals assessment maps your career, finances, health, relationships, and purpose." />
        <link rel="canonical" href="https://saratilife.com/" />
        <meta property="og:title" content="SaratiLife — Achieve Clarity in Your Career and Life" />
        <meta property="og:description" content="The Five Capitals assessment maps your career, finances, health, relationships, and purpose — so you stop drifting and start navigating." />
        <meta property="og:url" content="https://saratilife.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SaratiLife — Achieve Clarity in Your Career and Life" />
        <meta name="twitter:description" content="The Five Capitals assessment maps your career, finances, health, relationships, and purpose — so you stop drifting and start navigating." />
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
          .landing-hero { padding: 60px 20px !important; min-height: 100svh !important; }
          .landing-heading { font-size: clamp(28px, 8vw, 36px) !important; }
          .landing-subtitle { font-size: var(--font-size-md) !important; }
          .landing-cta { width: 100%; max-width: 360px; padding: 0 24px; }
          .landing-stats { flex-direction: column; gap: 16px !important; }
          .landing-stat-card { width: 100% !important; }
        }
      `}</style>

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
            padding: "80px 24px",
            position: "relative",
          }}
        >
          {/* Subtle decorative ring */}
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
            {/* Logo mark */}
            <div style={{
              marginBottom: "var(--space-xl)",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1s ease 0.2s",
            }}>
              <SaratiLogo size={48} />
            </div>

            {/* Heading */}
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
              Achieve clarity in your career and life in just 10 minutes a day
            </h1>

            {/* Subtitle */}
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
              The Five Capitals assessment maps your career, finances, health, relationships, and purpose — so you stop drifting and start navigating.
            </p>

            {/* CTA */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
            }}>
              <button className="landing-cta" onClick={ctaClick} aria-label="Start the free 10-minute clarity session">
                Start Your 10-Min Clarity Session Today
              </button>
            </div>
          </div>
        </section>

        {/* ═══════ STAT CARDS — Below fold ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "720px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div
              className="landing-stats"
              style={{
                display: "flex",
                gap: "var(--space-lg)",
                justifyContent: "center",
              }}
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
    </div>
  );
}
