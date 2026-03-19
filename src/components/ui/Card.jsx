/**
 * @param {{ children: React.ReactNode, padding?: string, shadow?: 'sm'|'md'|'lg', onClick?: Function, className?: string }} props
 */
export default function Card({
  children,
  padding = 'var(--space-lg)',
  shadow = 'sm',
  onClick,
  className = '',
}) {
  const shadowMap = {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  };

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        padding,
        boxShadow: shadowMap[shadow],
        border: '1px solid var(--light-gray)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = shadowMap[shadow];
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {children}
    </div>
  );
}
