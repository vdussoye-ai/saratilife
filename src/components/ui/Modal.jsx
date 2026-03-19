import { useEffect, useRef } from 'react';

/**
 * @param {{ isOpen: boolean, onClose: Function, title?: string, children: React.ReactNode, className?: string }} props
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        padding: 'var(--space-lg)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        className={className}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          background: 'var(--white)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-xl)',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-lg)',
          animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {title && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-lg)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 700,
              color: 'var(--charcoal)',
            }}>
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'var(--slate)',
                padding: 'var(--space-xs)',
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
