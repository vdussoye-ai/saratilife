import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

/**
 * Blueprint page — Personal strategy document (conversion point)
 * TODO (Task 6): Two-column comparison, AI-generated leverage moves, PDF export, email gate
 */
export default function Blueprint() {
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
        <title>Your Life Blueprint — SaratiLife</title>
        <meta name="description" content="Your personalized life strategy document based on the Five Capitals assessment. See where you are vs. where you could be." />
        <link rel="canonical" href="https://saratilife.com/blueprint" />
        <meta property="og:title" content="Your Life Blueprint — SaratiLife" />
        <meta property="og:description" content="Your personalized life strategy document based on the Five Capitals assessment." />
        <meta property="og:url" content="https://saratilife.com/blueprint" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Your Life Blueprint — SaratiLife" />
        <meta name="twitter:description" content="Your personalized life strategy document based on the Five Capitals assessment." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
        Your Life Blueprint
      </h1>
      <p style={{ color: 'var(--slate)', fontSize: 'var(--font-size-md)', marginBottom: 'var(--space-xl)' }}>
        Personal strategy document coming soon.
      </p>
      <button
        onClick={() => navigate('/sprint')}
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
        Start your 90-day sprint
      </button>
    </div>
  );
}
