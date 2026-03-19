import { useId } from 'react';

/**
 * @param {{ type?: string, label?: string, value: string, onChange: Function, error?: string, placeholder?: string, className?: string }} props
 */
export default function Input({
  type = 'text',
  label,
  value,
  onChange,
  error,
  placeholder,
  className = '',
}) {
  const id = useId();

  return (
    <div className={className} style={{ width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            color: 'var(--charcoal)',
            marginBottom: 'var(--space-xs)',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-base)',
          color: 'var(--charcoal)',
          background: 'var(--white)',
          border: `1.5px solid ${error ? 'var(--health)' : 'var(--light-gray)'}`,
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--saffron)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--light-gray)';
        }}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--health)',
            marginTop: 'var(--space-xs)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
