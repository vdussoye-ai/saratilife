import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

/**
 * Scorecard page — Five Capitals radar chart + AI narrative
 * TODO (Task 5): Build animated radar chart, capital score bars, AI narrative
 */
export default function Scorecard() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      color: 'var(--charcoal)',
      background: 'var(--cream)',
      padding: 'var(--space-lg)',
    }}>
      <Helmet>
        <title>Your Five Capitals Scorecard — SaratiLife</title>
        <meta name="description" content="See your Five Capitals radar chart and AI-generated narrative." />
      </Helmet>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
        Your Scorecard
      </h1>
      <p style={{ color: 'var(--slate)', fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-xl)' }}>
        Five Capitals radar chart and AI narrative coming soon.
      </p>
      <button
        onClick={() => navigate('/blueprint')}
        style={{
          background: 'var(--saffron)',
          color: 'var(--white)',
          border: 'none',
          padding: '16px 40px',
          borderRadius: 'var(--radius-full)',
          fontSize: 'var(--font-size-md)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        See your Life Blueprint
      </button>
    </div>
  );
}
