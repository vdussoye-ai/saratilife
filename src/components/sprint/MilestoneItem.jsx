/**
 * @param {{ title: string, completed?: boolean, onClick?: Function, className?: string }} props
 */
export default function MilestoneItem({
  title,
  completed = false,
  onClick,
  className = '',
}) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        padding: 'var(--space-md)',
        background: completed ? 'var(--saffron-light)' : 'var(--white)',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${completed ? 'var(--saffron)' : 'var(--light-gray)'}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        width: '22px',
        height: '22px',
        borderRadius: 'var(--radius-sm)',
        border: `2px solid ${completed ? 'var(--saffron)' : 'var(--light-gray)'}`,
        background: completed ? 'var(--saffron)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }}>
        {completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-base)',
        color: completed ? 'var(--slate)' : 'var(--charcoal)',
        textDecoration: completed ? 'line-through' : 'none',
        flex: 1,
      }}>
        {title}
      </span>
    </div>
  );
}
