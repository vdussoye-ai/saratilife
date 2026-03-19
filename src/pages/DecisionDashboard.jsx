import { Helmet } from 'react-helmet-async';

/**
 * Decision Dashboard — Ongoing decision tool (paid feature)
 */
export default function DecisionDashboard() {
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
        <title>{"Decision Dashboard — SaratiLife"}</title>
        <meta name="description" content="Ongoing decision tool for strategic life choices. Make purpose-driven decisions aligned with your Five Capitals." />
        <link rel="canonical" href="https://saratilife.com/decisions" />
        <meta property="og:title" content="Decision Dashboard — SaratiLife" />
        <meta property="og:description" content="Ongoing decision tool for strategic life choices." />
        <meta property="og:url" content="https://saratilife.com/decisions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Decision Dashboard — SaratiLife" />
        <meta name="twitter:description" content="Ongoing decision tool for strategic life choices." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
        Decision Dashboard
      </h1>
      <p style={{ color: 'var(--slate)', fontSize: 'var(--font-size-md)' }}>
        Decision tool coming soon.
      </p>
    </div>
  );
}
