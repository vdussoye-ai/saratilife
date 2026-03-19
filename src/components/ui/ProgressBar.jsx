/**
 * @param {{ value: number, color?: string, label?: string, animated?: boolean, className?: string }} props
 */
export default function ProgressBar({
  value = 0,
  color = 'var(--saffron)',
  label,
  animated = true,
  className = '',
}) {
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className={className} style={{ width: '100%' }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-xs)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--slate)',
          }}>
            {label}
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            color: 'var(--charcoal)',
          }}>
            {Math.round(clamped)}%
          </span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: '6px',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${clamped}%`,
          height: '100%',
          background: color,
          borderRadius: 'var(--radius-full)',
          transition: animated ? 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }} />
      </div>
    </div>
  );
}
