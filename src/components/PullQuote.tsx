'use client';

import { type ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

/** Large centered quote that breaks the vertical flow — visual landmark */
export default function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      margin: '3rem 0',
      position: 'relative',
    }}>
      {/* Top rule */}
      <div style={{
        width: '2.5rem',
        height: '2px',
        background: '#2E8B57',
        margin: '0 auto 2rem',
      }} />

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)',
        fontWeight: 400,
        fontStyle: 'italic',
        color: '#FFFFFF',
        lineHeight: 1.6,
        maxWidth: '36rem',
        margin: '0 auto',
        letterSpacing: '-0.01em',
      }}>
        {children}
      </p>

      {attribution && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.6875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#C5A258',
          marginTop: '1.5rem',
        }}>
          {attribution}
        </p>
      )}

      {/* Bottom rule */}
      <div style={{
        width: '2.5rem',
        height: '2px',
        background: '#2E8B57',
        margin: '2rem auto 0',
      }} />
    </div>
  );
}
