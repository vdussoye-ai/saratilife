/**
 * @param {{ name: string, score: number, color: string, icon?: string, description?: string, className?: string }} props
 */
export default function CapitalCard({
  name,
  score,
  color,
  icon,
  description,
  className = '',
}) {
  const scoreColor = score <= 30 ? 'var(--health)' : score <= 60 ? 'var(--social)' : 'var(--financial)';

  return (
    <div
      className={className}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-lg)',
        border: '1px solid var(--light-gray)',
        borderLeft: `4px solid ${color}`,
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-sm)',
      }}>
        {icon && (
          <span style={{ fontSize: 'var(--font-size-xl)', color }}>{icon}</span>
        )}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--font-size-md)',
          fontWeight: 600,
          color: 'var(--charcoal)',
          flex: 1,
        }}>
          {name}
        </h3>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 700,
          color: scoreColor,
        }}>
          {score}
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '4px',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: description ? 'var(--space-sm)' : 0,
      }}>
        <div style={{
          width: `${Math.min(score, 100)}%`,
          height: '100%',
          background: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>

      {description && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--slate)',
          lineHeight: 'var(--line-height)',
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
