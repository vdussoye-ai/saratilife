import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SaratiLogo } from "../components/Logo";
import { trackEvent } from "../lib/analytics";

/* ── Post data ──────────────────────────────────────────────────────── */

const POSTS = [
  {
    slug: "ai-career-disruption-2026",
    title: "The State of AI Career Disruption, 2026",
    excerpt:
      "Industry-by-industry analysis of what's already changed and what's coming next. Understand your displacement risk before it's too late to act.",
    category: "Research",
    date: "2026-02-10",
    readMin: 12,
    thumbnail: { bg: "var(--career)", icon: "◎" },
  },
  {
    slug: null,
    title: "Five Capitals Framework — The Complete Guide",
    excerpt:
      "Your career is one asset in a portfolio of five. Learn how Career, Financial, Health, Social, and Inner capital work together to create earned freedom.",
    category: "Framework",
    date: "2026-02-24",
    readMin: 9,
    thumbnail: { bg: "var(--saffron)", icon: "◈" },
  },
  {
    slug: null,
    title: "Why 'Upskill' Is Not a Strategy",
    excerpt:
      "Every LinkedIn guru says learn AI. But reskilling without a life-portfolio plan is like redecorating a house with no foundation. Here's what to do instead.",
    category: "Career Strategy",
    date: "2026-03-03",
    readMin: 7,
    thumbnail: { bg: "var(--health)", icon: "△" },
  },
  {
    slug: null,
    title: "The Freedom Number: How Much Runway Do You Actually Need?",
    excerpt:
      "Most professionals overestimate how much money they need and underestimate how much time they have. A clear-eyed look at the math of career transitions.",
    category: "Financial Capital",
    date: "2026-03-08",
    readMin: 8,
    thumbnail: { bg: "var(--financial)", icon: "◇" },
  },
  {
    slug: null,
    title: "Energy Is the Currency Nobody Manages",
    excerpt:
      "The best strategy in the world fails if you burn out executing it. How to audit where your daily capacity actually goes — and reclaim it.",
    category: "Health Capital",
    date: "2026-03-12",
    readMin: 6,
    thumbnail: { bg: "var(--health)", icon: "○" },
  },
  {
    slug: null,
    title: "Strategic Networking for People Who Hate Networking",
    excerpt:
      "Relationship architecture for career transitions — a framework that works for introverts and senior professionals who cringe at 'networking events.'",
    category: "Social Capital",
    date: "2026-03-15",
    readMin: 7,
    thumbnail: { bg: "var(--social)", icon: "◉" },
  },
  {
    slug: null,
    title: "How to Make Decisions Without Regret",
    excerpt:
      "When every option looks good on paper, how do you choose? A purpose-driven decision framework built for professionals navigating mid-career crossroads.",
    category: "Inner Capital",
    date: "2026-03-18",
    readMin: 8,
    thumbnail: { bg: "var(--inner)", icon: "☸" },
  },
];

const POSTS_PER_PAGE = 4;
const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map((p) => p.category)))];

/* ── Helpers ─────────────────────────────────────────────────────────── */

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
  const [ref, visible] = useReveal(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function Resources() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const filterParam = searchParams.get("category") || "All";

  const [category, setCategory] = useState(filterParam);
  const page = Math.max(1, pageParam);

  const filtered = category === "All" ? POSTS : POSTS.filter((p) => p.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategory = (cat) => {
    setCategory(cat);
    setSearchParams(cat === "All" ? {} : { category: cat });
  };

  const handlePage = (p) => {
    const params = {};
    if (category !== "All") params.category = category;
    if (p > 1) params.page = String(p);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReadMore = (post) => {
    if (post.slug) {
      navigate(`/article/${post.slug}`);
    }
  };

  const ctaClick = () => {
    trackEvent("cta_click", { location: "resources_post" });
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
        <title>{"Resources & Guides — SaratiLife"}</title>
        <meta name="description" content="Articles, frameworks, and guides on career strategy, the Five Capitals model, AI disruption, and building a life with intention. Free resources for mid-career professionals." />
        <link rel="canonical" href="https://saratilife.com/resources" />
        <meta property="og:title" content="Resources & Guides — SaratiLife" />
        <meta property="og:description" content="Articles, frameworks, and guides on career strategy, the Five Capitals model, and building a life with intention." />
        <meta property="og:url" content="https://saratilife.com/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Resources & Guides — SaratiLife" />
        <meta name="twitter:description" content="Articles, frameworks, and guides on career strategy, the Five Capitals model, and building a life with intention." />
      </Helmet>

      <style>{`
        .res-card {
          background: var(--white);
          border-radius: var(--radius-md);
          border: 1px solid var(--light-gray);
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .res-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .res-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--saffron);
          color: var(--white);
          border: none;
          padding: 0 28px;
          height: 42px;
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-family: var(--font-body);
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .res-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(232,137,12,0.25);
        }
        .res-cta:focus-visible {
          outline: 3px solid var(--saffron);
          outline-offset: 3px;
        }
        .res-page-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--light-gray);
          background: var(--white);
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: 600;
          color: var(--charcoal);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .res-page-btn:hover { border-color: var(--saffron); color: var(--saffron); }
        .res-page-btn[data-active="true"] {
          background: var(--saffron);
          border-color: var(--saffron);
          color: var(--white);
        }
        .res-page-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .res-filter-btn {
          padding: 6px 16px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--light-gray);
          background: var(--white);
          font-family: var(--font-body);
          font-size: var(--font-size-sm);
          font-weight: 500;
          color: var(--slate);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .res-filter-btn:hover { border-color: var(--saffron); color: var(--saffron); }
        .res-filter-btn[data-active="true"] {
          background: var(--saffron);
          border-color: var(--saffron);
          color: var(--white);
        }
        .res-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-lg);
        }
        @media (max-width: 768px) {
          .res-grid { grid-template-columns: 1fr !important; }
          .res-hero { padding: 100px 20px 40px !important; }
          .res-hero-heading { font-size: clamp(28px, 7vw, 36px) !important; }
          .res-filters { overflow-x: auto; padding-bottom: var(--space-sm); }
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
          className="res-hero"
          style={{
            padding: "140px 24px 48px",
            maxWidth: "900px",
            margin: "0 auto",
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
              Resources &amp; Guides
            </div>
            <h1
              className="res-hero-heading"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-4xl)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--charcoal)",
                marginBottom: "var(--space-md)",
              }}
            >
              Insights for intentional professionals
            </h1>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-lg)",
              color: "var(--slate)",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}>
              Career strategy, the Five Capitals model, AI disruption research, and practical guides for navigating mid-career with clarity.
            </p>
          </RevealSection>
        </section>

        {/* ═══════ FILTERS ═══════ */}
        <section style={{
          padding: "0 24px var(--space-xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          <RevealSection delay={0.05}>
            <div
              className="res-filters"
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                flexWrap: "wrap",
              }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className="res-filter-btn"
                  data-active={cat === category}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ═══════ POST GRID ═══════ */}
        <section style={{
          padding: "0 24px var(--space-3xl)",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {paginated.length === 0 ? (
            <p style={{
              textAlign: "center",
              color: "var(--slate)",
              fontSize: "var(--font-size-md)",
              padding: "var(--space-3xl) 0",
            }}>
              No posts found in this category.
            </p>
          ) : (
            <div className="res-grid">
              {paginated.map((post, i) => (
                <RevealSection key={post.title} delay={0.06 * i}>
                  <article className="res-card">
                    {/* Thumbnail */}
                    <div
                      style={{
                        height: "160px",
                        background: `linear-gradient(135deg, ${post.thumbnail.bg}, ${post.thumbnail.bg}cc)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                      role="img"
                      aria-label={`Thumbnail for ${post.title}`}
                    >
                      <span style={{
                        fontSize: "48px",
                        opacity: 0.25,
                        color: "var(--white)",
                      }}>
                        {post.thumbnail.icon}
                      </span>
                      <span style={{
                        position: "absolute",
                        top: "var(--space-md)",
                        left: "var(--space-md)",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-full)",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(8px)",
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--white)",
                        letterSpacing: "0.5px",
                      }}>
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: "var(--space-lg)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}>
                      <div style={{
                        display: "flex",
                        gap: "var(--space-sm)",
                        fontSize: "var(--font-size-xs)",
                        color: "var(--slate)",
                        marginBottom: "var(--space-sm)",
                      }}>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span>&middot;</span>
                        <span>{post.readMin} min read</span>
                      </div>

                      <h2 style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "var(--font-size-lg)",
                        fontWeight: 700,
                        lineHeight: 1.3,
                        color: "var(--charcoal)",
                        marginBottom: "var(--space-sm)",
                      }}>
                        {post.title}
                      </h2>

                      <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--font-size-sm)",
                        color: "var(--slate)",
                        lineHeight: 1.65,
                        flex: 1,
                        marginBottom: "var(--space-lg)",
                      }}>
                        {post.excerpt}
                      </p>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "var(--space-sm)",
                        flexWrap: "wrap",
                      }}>
                        {post.slug ? (
                          <button
                            onClick={() => handleReadMore(post)}
                            style={{
                              background: "none",
                              border: "none",
                              fontFamily: "var(--font-body)",
                              fontSize: "var(--font-size-sm)",
                              fontWeight: 600,
                              color: "var(--saffron)",
                              cursor: "pointer",
                              padding: 0,
                              transition: "opacity 0.2s ease",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                          >
                            Read more &rarr;
                          </button>
                        ) : (
                          <span style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--font-size-xs)",
                            fontWeight: 600,
                            color: "var(--slate)",
                            padding: "3px 10px",
                            borderRadius: "var(--radius-full)",
                            background: "var(--cream)",
                            border: "1px solid var(--light-gray)",
                          }}>
                            Coming soon
                          </span>
                        )}
                        <button
                          className="res-cta"
                          onClick={ctaClick}
                          aria-label="Start your clarity session"
                        >
                          Start Your Clarity Session
                        </button>
                      </div>
                    </div>
                  </article>
                </RevealSection>
              ))}
            </div>
          )}

          {/* ═══════ PAGINATION ═══════ */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginTop: "var(--space-2xl)",
              }}
            >
              <button
                className="res-page-btn"
                disabled={currentPage <= 1}
                onClick={() => handlePage(currentPage - 1)}
                aria-label="Previous page"
              >
                &lsaquo;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className="res-page-btn"
                  data-active={p === currentPage}
                  onClick={() => handlePage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </button>
              ))}

              <button
                className="res-page-btn"
                disabled={currentPage >= totalPages}
                onClick={() => handlePage(currentPage + 1)}
                aria-label="Next page"
              >
                &rsaquo;
              </button>
            </nav>
          )}
        </section>

        {/* ═══════ BOTTOM CTA ═══════ */}
        <section style={{
          padding: "var(--space-3xl) var(--space-lg)",
          background: "var(--white)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <RevealSection>
              <SaratiLogo size={40} />
              <h2 style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--font-size-2xl)",
                fontWeight: 700,
                lineHeight: 1.25,
                color: "var(--charcoal)",
                marginTop: "var(--space-lg)",
                marginBottom: "var(--space-md)",
              }}>
                Reading is great. Knowing where you stand is better.
              </h2>
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-md)",
                color: "var(--slate)",
                lineHeight: 1.7,
                marginBottom: "var(--space-xl)",
              }}>
                The free assessment maps all five capitals in 10 minutes — so you can move from insight to action.
              </p>
              <button
                className="res-cta"
                onClick={ctaClick}
                style={{ height: "54px", padding: "0 40px", fontSize: "var(--font-size-md)" }}
                aria-label="Start your 10-minute clarity session today"
              >
                Start Your Clarity Session Today
              </button>
              <div style={{
                display: "flex",
                gap: "var(--space-lg)",
                justifyContent: "center",
                marginTop: "var(--space-lg)",
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
