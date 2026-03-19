import { useState, useEffect, useRef, useCallback } from "react";
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

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: "2,400+", label: "Assessments taken" },
  { value: "58", label: "Avg. score out of 100" },
  { value: "73%", label: "Changed their plan" },
];

const TESTIMONIALS = [
  {
    quote: "SaratiLife showed me I was over-investing in career capital and completely ignoring my health and relationships. The blueprint gave me a concrete plan to rebalance.",
    name: "Priya M.",
    role: "VP of Engineering, 42",
  },
  {
    quote: "I'd been 'meaning to figure things out' for three years. The assessment took 10 minutes and gave me more clarity than a year of thinking about it.",
    name: "David R.",
    role: "Senior Consultant, 48",
  },
  {
    quote: "The Five Capitals framework finally gave me language for what I'd been feeling — that success on paper wasn't translating to fulfilment in practice.",
    name: "Amara K.",
    role: "Finance Director, 39",
  },
];

const RESOURCES = [
  {
    title: "The State of AI Career Disruption, 2026",
    desc: "Industry-by-industry analysis of what's already changed and what's coming next.",
    href: "/article/ai-career-disruption-2026",
  },
  {
    title: "Five Capitals Framework — Explained",
    desc: "Why your career is only one asset in a portfolio of five, and how to measure all of them.",
    href: "#about",
  },
  {
    title: "The Free Assessment",
    desc: "Map your career, finances, health, relationships, and purpose in 10 minutes.",
    href: "/assessment",
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  }, [navigate]);

  const ctaClick = () => {
    trackEvent("cta_click", { location: "landing_hero" });
    navigate("/assessment");
  };

  const navScrolled = scrollY > 50 || menuOpen;

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
        .nav-link {
          font-size: var(--font-size-sm);
          color: var(--slate);
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
          background: none;
          border: none;
          font-family: var(--font-body);
          padding: 0;
        }
        .nav-link:hover, .nav-link:focus-visible { color: var(--saffron); }
        .nav-links-desktop { display: flex; align-items: center; gap: 28px; }
        .nav-cta-sm {
          font-size: var(--font-size-sm);
          padding: 0 20px;
          height: 38px;
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-direction: column;
          gap: 5px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--charcoal);
          border-radius: 1px;
          transition: all 0.3s ease;
        }
        .mobile-overlay { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-overlay {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 56px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(248,246,243,0.98);
            backdrop-filter: blur(16px);
            padding: 32px 24px;
            z-index: 99;
            gap: 0;
          }
          .mobile-overlay .nav-link {
            font-size: var(--font-size-lg);
            padding: 18px 0;
            border-bottom: 1px solid rgba(200,138,42,0.08);
            display: block;
            text-align: left;
          }
          .mobile-overlay .landing-cta {
            margin-top: 28px;
            width: 100%;
            max-width: none;
          }
          .landing-hero { padding: 120px 20px 60px !important; min-height: 100svh !important; }
          .landing-heading { font-size: clamp(28px, 8vw, 36px) !important; }
          .landing-subtitle { font-size: var(--font-size-md) !important; }
          .landing-cta { width: 100%; max-width: 360px; padding: 0 24px; }
          .landing-stats { flex-direction: column; gap: 16px !important; }
          .landing-stat-card { width: 100% !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .resources-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════ NAVIGATION ═══════ */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 24px",
        background: navScrolled ? "rgba(248,246,243,0.95)" : "transparent",
        backdropFilter: navScrolled ? "blur(12px)" : "none",
        borderBottom: navScrolled ? "1px solid rgba(200,138,42,0.08)" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
        >
          <SaratiLogo size={28} />
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-lg)",
            fontWeight: 700,
            color: "var(--charcoal)",
          }}>
            SaratiLife
          </span>
        </a>

        <div className="nav-links-desktop">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className="nav-link"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
          <button
            className="landing-cta nav-cta-sm"
            onClick={ctaClick}
          >
            Take Assessment
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </nav>

      {/* ═══════ MOBILE MENU ═══════ */}
      {menuOpen && (
        <div className="mobile-overlay">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className="nav-link"
              onClick={() => scrollTo(link.href)}
            >
              {link.label}
            </button>
          ))}
          <button
            className="landing-cta"
            onClick={() => { setMenuOpen(false); ctaClick(); }}
          >
            Take Assessment
          </button>
        </div>
      )}

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
            <div style={{
              marginBottom: "var(--space-xl)",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1s ease 0.2s",
            }}>
              <SaratiLogo size={48} />
            </div>

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

        {/* ═══════ ABOUT ═══════ */}
        <section id="about" style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "720px",
          margin: "0 auto",
          scrollMarginTop: "80px",
        }}>
          <RevealSection>
            <div style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--saffron-dark)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}>
              About
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-3xl)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--charcoal)",
              marginBottom: "var(--space-lg)",
            }}>
              Your career is one asset in a portfolio of five
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p style={{
              fontSize: "var(--font-size-md)",
              color: "var(--slate)",
              lineHeight: 1.8,
              marginBottom: "var(--space-md)",
            }}>
              SaratiLife is a life-clarity platform for mid-career professionals (35–55) who sense that optimizing their job title isn't the same as optimizing their life. We use the <strong style={{ color: "var(--charcoal)" }}>Five Capitals</strong> model — Career, Financial, Health, Social, and Inner — to give you a complete picture of where you stand and where you're headed.
            </p>
            <p style={{
              fontSize: "var(--font-size-md)",
              color: "var(--slate)",
              lineHeight: 1.8,
              marginBottom: "var(--space-lg)",
            }}>
              Built by a 20-year enterprise architect and certified life coach, the platform combines strategic frameworks with AI-powered insight — so you get a personalized plan, not generic advice.
            </p>
          </RevealSection>
          <RevealSection delay={0.2}>
            <div style={{
              display: "flex",
              gap: "var(--space-md)",
              flexWrap: "wrap",
            }}>
              {["Career", "Financial", "Health", "Social", "Inner"].map((cap) => (
                <span key={cap} style={{
                  padding: "var(--space-sm) var(--space-md)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--white)",
                  border: "1px solid var(--light-gray)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                }}>
                  {cap}
                </span>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <section id="testimonials" style={{
          padding: "var(--space-3xl) var(--space-lg)",
          background: "var(--white)",
          scrollMarginTop: "80px",
        }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <RevealSection>
              <div style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--saffron-dark)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "var(--space-md)",
              }}>
                Testimonials
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--charcoal)",
                marginBottom: "var(--space-2xl)",
              }}>
                What professionals are saying
              </h2>
            </RevealSection>

            <div
              className="testimonial-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "var(--space-lg)",
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <RevealSection key={t.name} delay={0.1 * i}>
                  <div style={{
                    background: "var(--cream)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-xl)",
                    border: "1px solid var(--light-gray)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                    <blockquote style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-base)",
                      color: "var(--charcoal)",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      flex: 1,
                      marginBottom: "var(--space-lg)",
                    }}>
                      "{t.quote}"
                    </blockquote>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-base)",
                        fontWeight: 600,
                        color: "var(--charcoal)",
                      }}>
                        {t.name}
                      </div>
                      <div style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--font-size-sm)",
                        color: "var(--slate)",
                        marginTop: "2px",
                      }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ RESOURCES ═══════ */}
        <section id="resources" style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "900px",
          margin: "0 auto",
          scrollMarginTop: "80px",
        }}>
          <RevealSection>
            <div style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--saffron-dark)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}>
              Resources
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-3xl)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--charcoal)",
              marginBottom: "var(--space-2xl)",
            }}>
              Go deeper
            </h2>
          </RevealSection>

          <div
            className="resources-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "var(--space-lg)",
            }}
          >
            {RESOURCES.map((r, i) => (
              <RevealSection key={r.title} delay={0.1 * i}>
                <a
                  href={r.href}
                  onClick={(e) => {
                    if (r.href.startsWith("#")) {
                      e.preventDefault();
                      scrollTo(r.href);
                    }
                  }}
                  style={{
                    display: "block",
                    background: "var(--white)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-xl)",
                    border: "1px solid var(--light-gray)",
                    textDecoration: "none",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <h3 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-md)",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    lineHeight: 1.35,
                    marginBottom: "var(--space-sm)",
                  }}>
                    {r.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    color: "var(--slate)",
                    lineHeight: 1.6,
                  }}>
                    {r.desc}
                  </p>
                </a>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════ CONTACT ═══════ */}
        <section id="contact" style={{
          padding: "var(--space-3xl) var(--space-lg)",
          background: "var(--white)",
          scrollMarginTop: "80px",
        }}>
          <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
            <RevealSection>
              <div style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--saffron-dark)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "var(--space-md)",
              }}>
                Contact
              </div>
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--charcoal)",
                marginBottom: "var(--space-md)",
              }}>
                Let's connect
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-md)",
                color: "var(--slate)",
                lineHeight: 1.7,
                marginBottom: "var(--space-xl)",
              }}>
                Have a question, feedback, or partnership idea? We'd love to hear from you.
              </p>
              <a
                href="mailto:hello@saratilife.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--charcoal)",
                  color: "var(--cream)",
                  border: "none",
                  padding: "0 36px",
                  height: "50px",
                  borderRadius: "var(--radius-full)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: "0 4px 20px rgba(45,45,45,0.18)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--saffron)";
                  e.currentTarget.style.color = "var(--white)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--charcoal)";
                  e.currentTarget.style.color = "var(--cream)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                hello@saratilife.com
              </a>
            </RevealSection>
          </div>
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
