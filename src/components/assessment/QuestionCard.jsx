/**
 * @param {{ question: string, options?: Array<{label: string, value: any}>, onAnswer: Function, capitalType?: string, className?: string }} props
 */
export default function QuestionCard({
  question,
  options,
  onAnswer,
  capitalType,
  className = '',
}) {
  const capitalColorMap = {
    career: 'var(--career)',
    financial: 'var(--financial)',
    health: 'var(--health)',
    social: 'var(--social)',
    inner: 'var(--inner)',
  };

  const accentColor = capitalColorMap[capitalType] || 'var(--saffron)';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '560px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {capitalType && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: 'var(--space-md)',
        }}>
          {capitalType}
        </span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 600,
        color: 'var(--charcoal)',
        lineHeight: 1.35,
        marginBottom: 'var(--space-xl)',
      }}>
        {question}
      </h2>
      {options && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
          width: '100%',
        }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onAnswer(opt.value)}
              style={{
                background: 'var(--white)',
                border: '1.5px solid var(--light-gray)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md) var(--space-lg)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-md)',
                color: 'var(--charcoal)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.background = 'var(--saffron-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--light-gray)';
                e.currentTarget.style.background = 'var(--white)';
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
