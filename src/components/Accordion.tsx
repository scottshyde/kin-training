'use client';

import { useState, type ReactNode } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        marginTop: '0.5rem',
        borderTop: '1px solid rgba(197,162,88,0.12)',
      }}
      suppressHydrationWarning
    >
      <button
        onClick={() => setOpen(!open)}
        type="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: open ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
          transition: 'color 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.125rem',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            flex: 1,
            paddingRight: '1rem',
          }}
        >
          {title}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(197,162,88,0.25)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            backgroundColor: open ? 'rgba(197,162,88,0.1)' : 'transparent',
          }}
        >
          {open ? (
            <Minus size={12} style={{ color: 'rgba(197,162,88,0.7)' }} strokeWidth={1.5} />
          ) : (
            <Plus size={12} style={{ color: 'rgba(197,162,88,0.5)' }} strokeWidth={1.5} />
          )}
        </span>
      </button>
      <div
        className="prose-dark accordion-content"
        style={{
          display: open ? 'block' : 'none',
          paddingBottom: open ? '2rem' : '0',
          paddingLeft: '0',
          color: 'rgba(255,255,255,0.78)',
        }}
        suppressHydrationWarning
      >
        {children}
      </div>
    </div>
  );
}
