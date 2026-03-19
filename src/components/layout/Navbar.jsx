import { useNavigate } from 'react-router-dom';
import { SaratiLogo } from '../Logo';

/**
 * @param {{ currentStage?: string, showBack?: boolean, className?: string }} props
 */
export default function Navbar({
  currentStage,
  showBack = false,
  className = '',
}) {
  const navigate = useNavigate();

  return (
    <nav
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '14px var(--space-lg)',
        background: 'rgba(248, 246, 243, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200, 138, 42, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate('/'); }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          textDecoration: 'none',
        }}
      >
        <SaratiLogo size={28} />
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 700,
          color: 'var(--charcoal)',
        }}>
          SaratiLife
        </span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {currentStage && (
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--slate)',
            textTransform: 'capitalize',
          }}>
            {currentStage}
          </span>
        )}
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              color: 'var(--slate)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--saffron)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--slate)'; }}
          >
            &larr; Back
          </button>
        )}
      </div>
    </nav>
  );
}
