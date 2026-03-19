/**
 * @param {{ variant?: 'primary'|'secondary'|'ghost', size?: 'sm'|'md'|'lg', children: React.ReactNode, onClick?: Function, disabled?: boolean, loading?: boolean, className?: string }} props
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
}) {
  const sizeStyles = {
    sm: { padding: '8px 20px', fontSize: 'var(--font-size-sm)', height: '36px' },
    md: { padding: '12px 32px', fontSize: 'var(--font-size-base)', height: '44px' },
    lg: { padding: '16px 40px', fontSize: 'var(--font-size-md)', height: '56px' },
  };

  const variantStyles = {
    primary: {
      background: 'var(--saffron)',
      color: 'var(--white)',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--saffron)',
      border: '1.5px solid var(--saffron)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--charcoal)',
      border: 'none',
    },
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-sm)',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    whiteSpace: 'nowrap',
    letterSpacing: '0.01em',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      className={className}
      style={baseStyle}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {loading && (
        <span style={{
          width: size === 'sm' ? '14px' : '18px',
          height: size === 'sm' ? '14px' : '18px',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      )}
      {children}
    </button>
  );
}
