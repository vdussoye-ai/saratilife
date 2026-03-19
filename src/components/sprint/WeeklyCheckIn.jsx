import { useState } from 'react';

/**
 * @param {{ week: number, onSubmit: Function, capitals?: string[], className?: string }} props
 */
export default function WeeklyCheckIn({
  week,
  onSubmit,
  capitals = ['career', 'financial', 'health', 'social', 'inner'],
  className = '',
}) {
  const [responses, setResponses] = useState({});

  const handleChange = (capital, value) => {
    setResponses((prev) => ({ ...prev, [capital]: value }));
  };

  const handleSubmit = () => {
    onSubmit({ week, responses });
  };

  return (
    <div
      className={className}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-xl)',
        border: '1px solid var(--light-gray)',
      }}
    >
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
        color: 'var(--charcoal)',
        marginBottom: 'var(--space-xs)',
      }}>
        Week {week} Reflection
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--slate)',
        marginBottom: 'var(--space-lg)',
      }}>
        Rate your progress this week in each capital (1-10)
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
        {capitals.map((cap) => (
          <div key={cap} style={{
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
              textTransform: 'capitalize',
            }}>
              {cap}
            </span>
            <input
              type="range"
              min="1"
              max="10"
              value={responses[cap] || 5}
              onChange={(e) => handleChange(cap, Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--saffron)' }}
              aria-label={`${cap} progress`}
            />
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--charcoal)',
              minWidth: '24px',
              textAlign: 'right',
            }}>
              {responses[cap] || 5}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-md)',
          background: 'var(--saffron)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-base)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Submit Check-In
      </button>
    </div>
  );
}
