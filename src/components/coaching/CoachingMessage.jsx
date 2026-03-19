/**
 * @param {{ message: string, timestamp?: string|Date, className?: string }} props
 */
export default function CoachingMessage({
  message,
  timestamp,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        gap: 'var(--space-sm)',
        maxWidth: '85%',
        alignSelf: 'flex-start',
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--saffron-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: '14px',
        color: 'var(--saffron)',
      }}>
        S
      </div>
      <div>
        <div style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-md)',
          borderTopLeftRadius: 'var(--radius-sm)',
          padding: 'var(--space-md)',
          border: '1px solid var(--light-gray)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--charcoal)',
            lineHeight: 'var(--line-height)',
          }}>
            {message}
          </p>
        </div>
        {timestamp && (
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            color: 'var(--slate)',
            marginTop: 'var(--space-xs)',
            display: 'block',
          }}>
            {typeof timestamp === 'string' ? timestamp : timestamp.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
