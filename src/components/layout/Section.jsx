/**
 * @param {{ children: React.ReactNode, title?: string, subtitle?: string, padding?: string, className?: string }} props
 */
export default function Section({
  children,
  title,
  subtitle,
  padding = 'var(--space-3xl) 0',
  className = '',
}) {
  return (
    <section className={className} style={{ padding }}>
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 700,
          color: 'var(--charcoal)',
          marginBottom: subtitle ? 'var(--space-sm)' : 'var(--space-xl)',
        }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-md)',
          color: 'var(--slate)',
          lineHeight: 'var(--line-height)',
          marginBottom: 'var(--space-xl)',
          maxWidth: '560px',
        }}>
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}
