import { Helmet } from 'react-helmet-async';

/**
 * CheckIn page — Weekly reflection (paid feature)
 * TODO (Task 8): Structured reflection form, AI coaching response
 */
export default function CheckIn() {
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
        <title>{"Weekly Check-In — SaratiLife"}</title>
        <meta name="description" content="Weekly reflection and check-in for your 90-day sprint. Track progress across all Five Capitals." />
        <link rel="canonical" href="https://saratilife.com/checkin" />
        <meta property="og:title" content="Weekly Check-In — SaratiLife" />
        <meta property="og:description" content="Weekly reflection and check-in for your 90-day sprint." />
        <meta property="og:url" content="https://saratilife.com/checkin" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://saratilife.com/logo-512.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Weekly Check-In — SaratiLife" />
        <meta name="twitter:description" content="Weekly reflection and check-in for your 90-day sprint." />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
        Weekly Check-In
      </h1>
      <p style={{ color: 'var(--slate)', fontSize: 'var(--font-size-md)' }}>
        Weekly reflection coming soon.
      </p>
    </div>
  );
}
