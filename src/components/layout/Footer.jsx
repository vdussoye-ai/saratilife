import { SaratiLogo } from '../Logo';

/**
 * Static footer — no props
 */
export default function Footer({ className = '' }) {
  return (
    <footer
      className={className}
      style={{
        padding: '40px var(--space-lg)',
        borderTop: '1px solid rgba(200, 138, 42, 0.08)',
        textAlign: 'center',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-sm)',
      }}>
        <SaratiLogo size={18} />
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--charcoal)',
        }}>
          SaratiLife
        </span>
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--slate)',
      }}>
        Flowing with intention. For professionals who refuse to go with the flow.
      </p>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        color: 'var(--light-gray)',
        marginTop: 'var(--space-xs)',
      }}>
        &copy; {new Date().getFullYear()} SaratiLife. The Five Capitals Framework.
      </p>
    </footer>
  );
}
