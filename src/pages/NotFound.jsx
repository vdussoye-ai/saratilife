import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
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
      textAlign: 'center',
    }}>
      <Helmet>
        <title>{"Page Not Found — SaratiLife"}</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-3xl)',
        marginBottom: 'var(--space-md)',
      }}>
        Page not found
      </h1>
      <p style={{
        color: 'var(--slate)',
        fontSize: 'var(--font-size-md)',
        marginBottom: 'var(--space-xl)',
        maxWidth: '400px',
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'var(--saffron)',
          color: 'var(--white)',
          border: 'none',
          padding: '14px 36px',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--font-size-base)',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Back to Home
      </button>
    </div>
  );
}
