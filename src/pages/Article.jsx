import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { SaratiLogo } from "../components/Logo";

const ARTICLE_META = {
  "ai-career-disruption-2026": {
    title: "The State of AI Career Disruption, 2026 — SaratiLife",
    description: "Industry-by-industry analysis of AI career disruption in 2026. Understand your displacement risk and plan your strategic pivot.",
  },
};

export default function Article() {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const meta = ARTICLE_META[slug] || {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} — SaratiLife`,
    description: "Read this article on SaratiLife — career strategy insights for mid-career professionals navigating AI disruption.",
  };

  useEffect(() => {
    fetch(`/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8f6f3",
      fontFamily: "'DM Sans', sans-serif",
      color: "#3d3429",
    }}>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://saratilife.com/article/${slug}`} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={`https://saratilife.com/article/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content="https://saratilife.com/logo-512.png" />
      </Helmet>

      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(232,137,12,0.2); }

        .article-body h1 {
          font-family: 'Lora', serif;
          font-size: 36px;
          font-weight: 700;
          color: #3d3429;
          line-height: 1.3;
          margin-bottom: 16px;
        }
        .article-body h2 {
          font-family: 'Lora', serif;
          font-size: 26px;
          font-weight: 600;
          color: #3d3429;
          line-height: 1.35;
          margin-top: 48px;
          margin-bottom: 16px;
        }
        .article-body h3 {
          font-family: 'Lora', serif;
          font-size: 20px;
          font-weight: 600;
          color: #3d3429;
          line-height: 1.4;
          margin-top: 36px;
          margin-bottom: 12px;
        }
        .article-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 16.5px;
          line-height: 1.75;
          color: #6b5c4c;
          margin-bottom: 20px;
        }
        .article-body strong {
          color: #3d3429;
          font-weight: 600;
        }
        .article-body em {
          color: #9a8b7a;
        }
        .article-body a {
          color: #e8890c;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s ease;
        }
        .article-body a:hover {
          opacity: 0.8;
        }
        .article-body hr {
          border: none;
          border-top: 1px solid rgba(200,138,42,0.15);
          margin: 40px 0;
        }
        .article-body ul, .article-body ol {
          font-family: 'DM Sans', sans-serif;
          font-size: 16.5px;
          line-height: 1.75;
          color: #6b5c4c;
          margin-bottom: 20px;
          padding-left: 24px;
        }
        .article-body li {
          margin-bottom: 8px;
        }
        .article-body blockquote {
          border-left: 3px solid #e8890c;
          padding-left: 20px;
          margin: 24px 0;
          font-style: italic;
          color: #9a8b7a;
        }

        @media (max-width: 768px) {
          .article-body h1 { font-size: 28px; }
          .article-body h2 { font-size: 22px; margin-top: 36px; }
          .article-body h3 { font-size: 18px; margin-top: 28px; }
          .article-body p, .article-body ul, .article-body ol { font-size: 15.5px; }
          .article-nav { padding: 14px 16px !important; }
          .article-content { padding: 100px 20px 60px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav className="article-nav" style={{
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
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <SaratiLogo size={28} />
          <span style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 700, color: "#3d3429" }}>
            SaratiLife
          </span>
        </a>
        <a
          href="/"
          style={{
            fontSize: "13px",
            color: "#6b5c4c",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#e8890c")}
          onMouseLeave={(e) => (e.target.style.color = "#6b5c4c")}
        >
          Back to Home
        </a>
      </nav>

      {/* Content */}
      <main className="article-content" style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "120px 24px 80px",
      }}>
        {loading && (
          <p style={{ textAlign: "center", color: "#9a8b7a", fontSize: "16px", marginTop: "80px" }}>
            Loading article...
          </p>
        )}

        {error && (
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <p style={{ color: "#3d3429", fontSize: "20px", fontFamily: "'Lora', serif", fontWeight: 600, marginBottom: "12px" }}>
              Article not found
            </p>
            <p style={{ color: "#9a8b7a", fontSize: "15px", marginBottom: "24px" }}>
              The article you're looking for doesn't exist.
            </p>
            <a href="/" style={{ color: "#e8890c", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
              Go back home
            </a>
          </div>
        )}

        {!loading && !error && (
          <article className="article-body">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        )}
      </main>
    </div>
  );
}
