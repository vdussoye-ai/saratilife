/**
 * @param {{ label: string, value: any, selected?: boolean, onClick: Function, className?: string }} props
 */
export default function AnswerOption({
  label,
  value,
  selected = false,
  onClick,
  className = '',
}) {
  return (
    <button
      className={className}
      onClick={() => onClick(value)}
      style={{
        display: 'block',
        width: '100%',
        padding: 'var(--space-md) var(--space-lg)',
        background: selected ? 'var(--saffron-light)' : 'var(--white)',
        border: `1.5px solid ${selected ? 'var(--saffron)' : 'var(--light-gray)'}`,
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-md)',
        color: 'var(--charcoal)',
        fontWeight: selected ? 600 : 400,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--saffron)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--light-gray)';
        }
      }}
    >
      {label}
    </button>
  );
}
