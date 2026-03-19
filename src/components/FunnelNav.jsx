import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { SaratiLogo } from "./Logo";

const FUNNEL_STEPS = [
  { label: "Home", path: "/" },
  { label: "Assessment", path: "/assessment" },
  { label: "Results", path: "/scorecard" },
];

export default function FunnelNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPath = location.pathname;
  const currentIndex = FUNNEL_STEPS.findIndex((s) => s.path === currentPath);
  // Treat any path beyond scorecard (blueprint, sprint, etc.) as step 2 (Results)
  const activeIndex = currentIndex >= 0 ? currentIndex : currentPath === "/blueprint" ? 2 : -1;
  const scrolled = scrollY > 50;

  return (
    <>
      <style>{`
        .funnel-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.4s ease;
        }
        .funnel-progress-bar {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .funnel-step {
          display: flex;
          align-items: center;
          gap: 0;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: var(--font-body);
        }
        .funnel-step:focus-visible {
          outline: 2px solid var(--saffron);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .funnel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--light-gray);
          background: var(--white);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .funnel-dot--active {
          border-color: var(--saffron);
          background: var(--saffron);
          box-shadow: 0 0 0 3px rgba(232,137,12,0.15);
        }
        .funnel-dot--done {
          border-color: var(--saffron);
          background: var(--saffron);
        }
        .funnel-step-label {
          font-size: var(--font-size-xs);
          font-weight: 600;
          color: var(--slate);
          margin-left: 6px;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .funnel-step-label--active {
          color: var(--charcoal);
        }
        .funnel-connector {
          width: 32px;
          height: 2px;
          background: var(--light-gray);
          margin: 0 6px;
          flex-shrink: 0;
          transition: background 0.3s ease;
        }
        .funnel-connector--done {
          background: var(--saffron);
        }
        @media (max-width: 768px) {
          .funnel-step-label { display: none; }
          .funnel-connector { width: 24px; margin: 0 4px; }
          .funnel-nav { padding: 12px 16px; }
        }
      `}</style>
      <nav
        className="funnel-nav"
        style={{
          background: scrolled ? "rgba(248,246,243,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,138,42,0.08)" : "1px solid transparent",
        }}
        aria-label="Funnel progress"
      >
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

        <div className="funnel-progress-bar" role="list" aria-label="Assessment progress">
          {FUNNEL_STEPS.map((step, i) => {
            const isDone = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <div key={step.label} style={{ display: "flex", alignItems: "center" }} role="listitem">
                {i > 0 && (
                  <div className={`funnel-connector${isDone ? " funnel-connector--done" : ""}`} />
                )}
                <button
                  className="funnel-step"
                  onClick={() => {
                    if (isDone || isActive) navigate(step.path);
                  }}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`${step.label}${isDone ? " (completed)" : isActive ? " (current)" : ""}`}
                  style={{ cursor: isDone || isActive ? "pointer" : "default" }}
                >
                  <div className={`funnel-dot${isActive ? " funnel-dot--active" : isDone ? " funnel-dot--done" : ""}`} />
                  <span className={`funnel-step-label${isActive ? " funnel-step-label--active" : ""}`}>
                    {step.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
