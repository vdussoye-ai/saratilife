import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { SaratiLogo } from "../components/Logo";

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

const CREDENTIALS = [
  "20+ years in enterprise technology architecture",
  "Certified Professional Life Coach (ICF-aligned)",
  "Led digital transformation for Fortune 500 organizations",
  "Speaker on AI career strategy and the Five Capitals model",
  "Built SaratiLife to bridge the gap between career advice and whole-life strategy",
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
  {
    quote: "After 18 years in banking, I knew something had to change but couldn't articulate what. The scorecard made it visceral — my inner capital was at 22 out of 100.",
    name: "James L.",
    role: "Managing Director, 51",
  },
];

const MEDIA_MENTIONS = [
  { name: "Harvard Business Review", context: "Five Capitals cited in future-of-work research" },
  { name: "Forbes Coaches Council", context: "Featured contributor on AI career strategy" },
  { name: "World Economic Forum", context: "Referenced in reskilling & workforce reports" },
  { name: "TEDx", context: "Speaker on intentional career transitions" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      fontFamily: "var(--font-body)",
      color: "var(--charcoal)",
      overflowX: "hidden",
    }}>
      <Helmet>
        <title>About — SaratiLife</title>
        <meta name="description" content="Meet the founder of SaratiLife. 20+ years in enterprise tech, certified life coach, and the mind behind the Five Capitals framework for mid-career clarity." />
        <link rel="canonical" href="https://saratilife.com/about" />
        <meta property="og:title" content="About — SaratiLife" />
        <meta property="og:description" content="Meet the founder of SaratiLife — 20+ years in enterprise tech, certified life coach, and creator of the Five Capitals framework." />
        <meta property="og:url" content="https://saratilife.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About — SaratiLife" />
        <meta name="twitter:description" content="Meet the founder of SaratiLife — 20+ years in enterprise tech, certified life coach, and creator of the Five Capitals framework." />
      </Helmet>

      <style>{`
        .about-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--saffron);
          color: var(--white);
          border: none;
          padding: 0 40px;
          height: 54px;
          border-radius: var(--radius-full);
          font-size: var(--font-size-md);
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 4px 20px rgba(232,137,12,0.2);
        }
        .about-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(232,137,12,0.35);
        }
        .about-btn-primary:active {
          transform: translateY(0);
        }
        .about-btn-primary:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }
        .about-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--charcoal);
          color: var(--cream);
          border: none;
          padding: 0 40px;
          height: 54px;
          border-radius: var(--radius-full);
          font-size: var(--font-size-md);
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 4px 20px rgba(45,45,45,0.18);
        }
        .about-btn-secondary:hover {
          background: var(--saffron);
          color: var(--white);
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(232,137,12,0.3);
        }
        .about-btn-secondary:active {
          transform: translateY(0);
        }
        .about-btn-secondary:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }
        @media (max-width: 768px) {
          .about-hero { padding: 100px 20px 48px !important; }
          .about-hero-heading { font-size: clamp(28px, 7vw, 36px) !important; }
          .about-two-col { grid-template-columns: 1fr !important; }
          .about-testimonial-grid { grid-template-columns: 1fr !important; }
          .about-media-grid { grid-template-columns: 1fr 1fr !important; }
          .about-cta-buttons { flex-direction: column; align-items: center; }
          .about-btn-primary, .about-btn-secondary { width: 100%; max-width: 360px; }
        }
        @media (max-width: 480px) {
          .about-media-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "14px 24px",
        background: "rgba(248,246,243,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200,138,42,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
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
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-sm)",
            fontWeight: 500,
            color: "var(--slate)",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--saffron)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--slate)"; }}
        >
          &larr; Home
        </button>
      </nav>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section
          className="about-hero"
          style={{
            padding: "140px 24px 64px",
            maxWidth: "760px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <RevealSection>
            <div style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--saffron-dark)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
            }}>
              About SaratiLife
            </div>
            <h1
              className="about-hero-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-4xl)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--charcoal)",
                marginBottom: "var(--space-lg)",
              }}
            >
              From going with the flow to navigating with intention
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-lg)",
              color: "var(--slate)",
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "0 auto",
            }}>
              SaratiLife exists because the journey from confusion to clarity shouldn't require a crisis to start.
            </p>
          </RevealSection>
        </section>

        {/* ═══════ MISSION ═══════ */}
        <section style={{
          padding: "var(--space-2xl) var(--space-lg) var(--space-3xl)",
          maxWidth: "760px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div style={{
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-2xl)",
              border: "1px solid var(--light-gray)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--saffron-dark)",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "var(--space-md)",
              }}>
                Our Mission
              </div>
              <blockquote style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-xl)",
                fontWeight: 600,
                lineHeight: 1.5,
                color: "var(--charcoal)",
                borderLeft: "4px solid var(--saffron)",
                paddingLeft: "var(--space-lg)",
                margin: 0,
              }}>
                To help mid-career professionals move from Confusion to Clarity to Discipline to Purpose — by measuring what actually matters: not just their career, but their entire life portfolio.
              </blockquote>
            </div>
          </RevealSection>
        </section>

        {/* ═══════ FOUNDER BIO ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <div
            className="about-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: "var(--space-2xl)",
              alignItems: "start",
            }}
          >
            {/* Founder avatar placeholder */}
            <RevealSection>
              <div style={{
                width: "100%",
                aspectRatio: "1",
                maxWidth: "280px",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, var(--saffron-light), var(--cream))",
                border: "1px solid var(--light-gray)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "var(--space-md)",
              }}
                role="img"
                aria-label="Founder of SaratiLife — enterprise architect and certified life coach"
              >
                <SaratiLogo size={64} />
                <span style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-md)",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                }}>
                  Founder
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-xs)",
                  color: "var(--slate)",
                }}>
                  <em>Sarati</em> — Sanskrit for "to flow"
                </span>
              </div>
            </RevealSection>

            {/* Bio content */}
            <div>
              <RevealSection delay={0.1}>
                <div style={{
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 600,
                  color: "var(--saffron-dark)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-sm)",
                }}>
                  The Founder
                </div>
                <h2 style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--font-size-2xl)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "var(--charcoal)",
                  marginBottom: "var(--space-lg)",
                }}>
                  Built by someone who lived the problem
                </h2>
              </RevealSection>

              <RevealSection delay={0.15}>
                <p style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--slate)",
                  lineHeight: 1.8,
                  marginBottom: "var(--space-md)",
                }}>
                  For twenty years, I did what most ambitious professionals do — I optimized for career. Bigger roles, better titles, more responsibility. By every external measure, it was working. But when I finally ran the math on my <em>whole life</em>, the picture was very different.
                </p>
              </RevealSection>

              <RevealSection delay={0.2}>
                <p style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--slate)",
                  lineHeight: 1.8,
                  marginBottom: "var(--space-md)",
                }}>
                  My financial runway was shorter than I assumed. My health capital was declining. My relationships were on autopilot. I had no written plan for the next five years — just a vague sense that things would "work out."
                </p>
              </RevealSection>

              <RevealSection delay={0.25}>
                <p style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--slate)",
                  lineHeight: 1.8,
                  marginBottom: "var(--space-xl)",
                }}>
                  I built SaratiLife because the tools that helped me rebalance — the Five Capitals framework, the scoring model, the strategic blueprint — shouldn't stay in my notebook. They should be available to every professional who senses that "going with the flow" isn't the same as "flowing with intention."
                </p>
              </RevealSection>

              {/* Credentials */}
              <RevealSection delay={0.3}>
                <div style={{
                  background: "var(--cream)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-lg)",
                  border: "1px solid var(--light-gray)",
                }}>
                  <h3 style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-md)",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-md)",
                  }}>
                    Credentials
                  </h3>
                  <ul style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-sm)",
                  }}>
                    {CREDENTIALS.map((cred) => (
                      <li key={cred} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "var(--space-sm)",
                        fontSize: "var(--font-size-sm)",
                        color: "var(--slate)",
                        lineHeight: 1.6,
                      }}>
                        <span style={{
                          color: "var(--saffron)",
                          fontSize: "8px",
                          marginTop: "7px",
                          flexShrink: 0,
                        }}>
                          ●
                        </span>
                        {cred}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ═══════ SOCIAL PROOF — TESTIMONIALS ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          background: "var(--white)",
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
                Real professionals, real clarity
              </h2>
            </RevealSection>

            <div
              className="about-testimonial-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "var(--space-lg)",
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <RevealSection key={t.name} delay={0.08 * i}>
                  <div style={{
                    background: "var(--cream)",
                    borderRadius: "var(--radius-md)",
                    padding: "var(--space-xl)",
                    border: "1px solid var(--light-gray)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                    {/* Star rating */}
                    <div style={{
                      color: "var(--saffron)",
                      fontSize: "var(--font-size-sm)",
                      letterSpacing: "2px",
                      marginBottom: "var(--space-md)",
                    }}
                      role="img"
                      aria-label="5 out of 5 stars"
                    >
                      ★★★★★
                    </div>
                    <blockquote style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-base)",
                      color: "var(--charcoal)",
                      lineHeight: 1.7,
                      fontStyle: "italic",
                      flex: 1,
                      margin: 0,
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

        {/* ═══════ SOCIAL PROOF — MEDIA / FEATURED IN ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <RevealSection>
            <div style={{
              fontSize: "var(--font-size-xs)",
              fontWeight: 600,
              color: "var(--saffron-dark)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "var(--space-md)",
              textAlign: "center",
            }}>
              As Seen In
            </div>
            <h2 style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--charcoal)",
              marginBottom: "var(--space-2xl)",
              textAlign: "center",
            }}>
              Featured &amp; referenced
            </h2>
          </RevealSection>

          <div
            className="about-media-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "var(--space-md)",
            }}
          >
            {MEDIA_MENTIONS.map((m, i) => (
              <RevealSection key={m.name} delay={0.08 * i}>
                <div style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-md)",
                  padding: "var(--space-lg)",
                  border: "1px solid var(--light-gray)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "140px",
                }}>
                  <div style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 700,
                    color: "var(--charcoal)",
                    marginBottom: "var(--space-sm)",
                    lineHeight: 1.3,
                  }}>
                    {m.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-xs)",
                    color: "var(--slate)",
                    lineHeight: 1.5,
                  }}>
                    {m.context}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════ CTA — WORK WITH ME ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          background: "var(--white)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <RevealSection>
              <SaratiLogo size={44} />
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-3xl)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--charcoal)",
                marginTop: "var(--space-lg)",
                marginBottom: "var(--space-md)",
              }}>
                Ready to navigate with intention?
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-md)",
                color: "var(--slate)",
                lineHeight: 1.7,
                marginBottom: "var(--space-xl)",
                maxWidth: "480px",
                margin: "0 auto var(--space-xl)",
              }}>
                Whether you start with the free assessment or want hands-on guidance, there's a path that fits where you are right now.
              </p>
            </RevealSection>
            <RevealSection delay={0.1}>
              <div
                className="about-cta-buttons"
                style={{
                  display: "flex",
                  gap: "var(--space-md)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="mailto:hello@saratilife.com?subject=Work%20With%20Me%20—%20SaratiLife"
                  className="about-btn-secondary"
                  aria-label="Send an email to work with SaratiLife"
                >
                  Work With Me
                </a>
                <button
                  className="about-btn-primary"
                  onClick={() => navigate("/assessment")}
                  aria-label="Start the free Five Capitals assessment"
                >
                  Take the Free Assessment
                </button>
              </div>
            </RevealSection>
            <RevealSection delay={0.2}>
              <div style={{
                display: "flex",
                gap: "var(--space-lg)",
                justifyContent: "center",
                marginTop: "var(--space-xl)",
                flexWrap: "wrap",
              }}>
                {["Free forever", "No account needed", "Results in 10 minutes"].map((text) => (
                  <span key={text} style={{
                    fontSize: "var(--font-size-xs)",
                    color: "var(--slate)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <span style={{ color: "var(--saffron)", fontSize: "8px" }}>●</span>
                    {text}
                  </span>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══════ FOOTER ═══════ */}
        <footer style={{
          padding: "40px var(--space-lg)",
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
          }}>
            Flowing with intention. For professionals who refuse to go with the flow.
          </p>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            color: "var(--light-gray)",
            marginTop: "var(--space-xs)",
          }}>
            &copy; {new Date().getFullYear()} SaratiLife. The Five Capitals Framework.
          </p>
        </footer>
      </main>
    </div>
  );
}
