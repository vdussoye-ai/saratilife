/**
 * @param {{ onBack?: Function, onNext?: Function, canGoBack?: boolean, canGoNext?: boolean, className?: string }} props
 */
export default function AssessmentNav({
  onBack,
  onNext,
  canGoBack = true,
  canGoNext = true,
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--space-lg) 0',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      <button
        onClick={onBack}
        disabled={!canGoBack}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 500,
          color: canGoBack ? 'var(--slate)' : 'var(--light-gray)',
          cursor: canGoBack ? 'pointer' : 'not-allowed',
          padding: 'var(--space-sm) var(--space-md)',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (canGoBack) e.currentTarget.style.color = 'var(--saffron)';
        }}
        onMouseLeave={(e) => {
          if (canGoBack) e.currentTarget.style.color = 'var(--slate)';
        }}
      >
        &larr; Back
      </button>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        style={{
          background: canGoNext ? 'var(--saffron)' : 'var(--light-gray)',
          color: canGoNext ? 'var(--white)' : 'var(--slate)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          padding: 'var(--space-sm) var(--space-xl)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          cursor: canGoNext ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
        }}
      >
        Next &rarr;
      </button>
    </div>
  );
}
