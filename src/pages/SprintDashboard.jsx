import { Helmet } from 'react-helmet-async';

/**
 * Sprint Dashboard — Weekly focus + progress (paid feature)
 * TODO (Task 8): Gate behind Stripe, weekly milestones, capital trend lines, AI coaching
 */
export default function SprintDashboard() {
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
        <title>Sprint Dashboard — SaratiLife</title>
        <meta name="description" content="Your 90-day sprint dashboard with weekly focus and progress tracking." />
      </Helmet>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
        Sprint Dashboard
      </h1>
      <p style={{ color: 'var(--slate)', fontSize: 'var(--font-size-md)' }}>
        Weekly focus and progress tracking coming soon.
      </p>
    </div>
  );
}
