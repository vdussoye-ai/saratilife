/**
 * @param {{ name: string, score: number, maxScore?: number, color: string, className?: string }} props
 */
export default function CapitalScoreBar({
  name,
  score,
  maxScore = 100,
  color,
  className = '',
}) {
  const pct = Math.min((score / maxScore) * 100, 100);

  return (
    <div className={className} style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
    }}>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 500,
        color: 'var(--charcoal)',
        minWidth: '80px',
      }}>
        {name}
      </span>

      <div style={{
        flex: 1,
        height: '8px',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        color: 'var(--charcoal)',
        minWidth: '40px',
        textAlign: 'right',
      }}>
        {score}/{maxScore}
      </span>
    </div>
  );
}
