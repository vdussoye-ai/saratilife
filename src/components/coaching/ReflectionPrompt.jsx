import { useState } from 'react';

/**
 * @param {{ prompt: string, capital?: string, onSubmit: Function, className?: string }} props
 */
export default function ReflectionPrompt({
  prompt,
  capital,
  onSubmit,
  className = '',
}) {
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit({ prompt, capital, response: response.trim() });
      setResponse('');
    }
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
      {capital && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          color: 'var(--saffron)',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: 'var(--space-sm)',
          display: 'block',
        }}>
          {capital}
        </span>
      )}
      <p style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
        color: 'var(--charcoal)',
        lineHeight: 1.4,
        marginBottom: 'var(--space-lg)',
      }}>
        {prompt}
      </p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Take a moment to reflect..."
        rows={4}
        style={{
          width: '100%',
          padding: 'var(--space-md)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-base)',
          color: 'var(--charcoal)',
          background: 'var(--cream)',
          border: '1.5px solid var(--light-gray)',
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          resize: 'vertical',
          lineHeight: 'var(--line-height)',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--saffron)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--light-gray)'; }}
      />
      <button
        onClick={handleSubmit}
        disabled={!response.trim()}
        style={{
          marginTop: 'var(--space-md)',
          padding: 'var(--space-sm) var(--space-xl)',
          background: response.trim() ? 'var(--saffron)' : 'var(--light-gray)',
          color: response.trim() ? 'var(--white)' : 'var(--slate)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          cursor: response.trim() ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s ease',
        }}
      >
        Submit Reflection
      </button>
    </div>
  );
}
