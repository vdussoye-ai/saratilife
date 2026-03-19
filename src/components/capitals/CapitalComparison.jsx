const CAPITAL_KEYS = ['career', 'financial', 'health', 'social', 'inner'];
const CAPITAL_LABELS = { career: 'Career', financial: 'Financial', health: 'Health', social: 'Social', inner: 'Inner' };
const CAPITAL_HEX = { career: '#1565C0', financial: '#2E7D32', health: '#D32F2F', social: '#E8890C', inner: '#6A1B9A' };

/**
 * @param {{ currentScores: Object, targetScores: Object, className?: string }} props
 */
export default function CapitalComparison({
  currentScores,
  targetScores,
  className = '',
}) {
  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
    }}>
      {CAPITAL_KEYS.map((key) => {
        const current = currentScores[key] || 0;
        const target = targetScores[key] || 0;
        const gap = target - current;

        return (
          <div key={key} style={{
            background: 'var(--white)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-md)',
            border: '1px solid var(--light-gray)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-sm)',
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 600,
                color: 'var(--charcoal)',
              }}>
                {CAPITAL_LABELS[key]}
              </span>
              {gap > 0 && (
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: 'var(--financial)',
                }}>
                  +{gap} to reach target
                </span>
              )}
            </div>

            <div style={{
              position: 'relative',
              height: '8px',
              background: 'var(--light-gray)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}>
              {/* Target (background) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${Math.min(target, 100)}%`,
                height: '100%',
                background: `${CAPITAL_HEX[key]}30`,
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.8s ease',
              }} />
              {/* Current (foreground) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${Math.min(current, 100)}%`,
                height: '100%',
                background: CAPITAL_HEX[key],
                borderRadius: 'var(--radius-full)',
                transition: 'width 0.8s ease',
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
                Now: {current}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--slate)',
              }}>
                Target: {target}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
