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
        <title>Decision Dashboard — SaratiLife</title>
        <meta name="description" content="Ongoing decision tool for strategic life choices." />
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
