/**
 * @param {{ label: string, color?: string, size?: 'sm'|'md', className?: string }} props
 */
export default function Badge({
  label,
  color = 'var(--saffron)',
  size = 'md',
  className = '',
}) {
  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: 'var(--font-size-xs)' },
    md: { padding: '4px 12px', fontSize: 'var(--font-size-sm)' },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'var(--radius-full)',
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        color,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
      }}
    >
      {label}
    </span>
  );
}
