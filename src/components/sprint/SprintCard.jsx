/**
 * @param {{ sprint: { week: number, totalWeeks: number, capitalFocus: string, title: string }, onStartCheckIn?: Function, className?: string }} props
 */
export default function SprintCard({
  sprint,
  onStartCheckIn,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-xl)',
        border: '1px solid var(--light-gray)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-md)',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          color: 'var(--saffron)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
        }}>
          Week {sprint.week} of {sprint.totalWeeks}
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--slate)',
        }}>
          Focus: {sprint.capitalFocus}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
        color: 'var(--charcoal)',
        marginBottom: 'var(--space-md)',
      }}>
        {sprint.title}
      </h3>

      {/* Week progress bar */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'var(--light-gray)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: 'var(--space-lg)',
      }}>
        <div style={{
          width: `${(sprint.week / sprint.totalWeeks) * 100}%`,
          height: '100%',
          background: 'var(--saffron)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.6s ease',
        }} />
      </div>

      {onStartCheckIn && (
        <button
          onClick={onStartCheckIn}
          style={{
            width: '100%',
            padding: 'var(--space-md)',
            background: 'var(--saffron)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Check in this week
        </button>
      )}
    </div>
  );
}
