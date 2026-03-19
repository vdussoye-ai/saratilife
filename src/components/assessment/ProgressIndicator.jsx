/**
 * @param {{ current: number, total: number, capitalColors?: Record<string, string>, className?: string }} props
 */
export default function ProgressIndicator({
  current,
  total,
  capitalColors,
  className = '',
}) {
  const pct = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={className} style={{
      width: '100%',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: '3px',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'var(--saffron)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.3s ease',
        }} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'var(--space-xs)',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--slate)',
        }}>
          {current} of {total}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--slate)',
        }}>
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}
