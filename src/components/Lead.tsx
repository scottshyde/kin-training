'use client';

import { type ReactNode } from 'react';

interface LeadProps {
  children: ReactNode;
}

/** Large opening paragraph — sets the tone before the body text begins */
export default function Lead({ children }: LeadProps) {
  return (
    <p style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.375rem',
      lineHeight: 1.7,
      color: '#FFFFFF',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      marginBottom: '2.5rem',
      maxWidth: '42rem',
    }}>
      {children}
    </p>
  );
}
