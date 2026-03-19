/**
 * @param {{ message: string, timestamp?: string|Date, className?: string }} props
 */
export default function UserMessage({
  message,
  timestamp,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        maxWidth: '85%',
        alignSelf: 'flex-end',
      }}
    >
      <div style={{
        background: 'var(--saffron)',
        borderRadius: 'var(--radius-md)',
        borderTopRightRadius: 'var(--radius-sm)',
        padding: 'var(--space-md)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-base)',
          color: 'var(--white)',
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
        }}>
          {typeof timestamp === 'string' ? timestamp : timestamp.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
