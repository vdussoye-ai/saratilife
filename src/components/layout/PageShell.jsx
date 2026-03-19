/**
 * @param {{ children: React.ReactNode, maxWidth?: string, className?: string }} props
 */
export default function PageShell({
  children,
  maxWidth = '720px',
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        minHeight: '100vh',
        fontFamily: 'var(--font-body)',
        color: 'var(--charcoal)',
        background: 'var(--cream)',
      }}
    >
      <div style={{
        maxWidth,
        margin: '0 auto',
        padding: '0 var(--space-lg)',
      }}>
        {children}
      </div>
    </div>
  );
}
