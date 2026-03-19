/**
 * @param {{ insight: string, capital?: string, action?: string, className?: string }} props
 */
export default function InsightCard({
  insight,
  capital,
  action,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        border: '1px solid var(--light-gray)',
        borderLeft: '4px solid var(--saffron)',
      }}
    >
      {capital && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          color: 'var(--saffron)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: 'var(--space-sm)',
          display: 'block',
        }}>
          {capital}
        </span>
      )}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        color: 'var(--charcoal)',
        lineHeight: 'var(--line-height)',
        marginBottom: action ? 'var(--space-md)' : 0,
      }}>
        {insight}
      </p>
      {action && (
        <div style={{
          padding: 'var(--space-sm) var(--space-md)',
          background: 'var(--saffron-light)',
          borderRadius: 'var(--radius-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--saffron-dark)',
          }}>
            Action: {action}
          </span>
        </div>
      )}
    </div>
  );
}
