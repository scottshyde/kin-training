'use client';

import { type ReactNode } from 'react';

interface KeyTermProps {
  term: string;
  children: ReactNode;
}

/** Highlighted term + definition — for vocabulary that reps need to learn */
export default function KeyTerm({ term, children }: KeyTermProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.25rem',
      alignItems: 'baseline',
      padding: '1.25rem 0',
      borderBottom: '1px solid rgba(46, 139, 87, 0.12)',
    }}>
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.125rem',
        fontWeight: 700,
        color: '#C5A258',
        flexShrink: 0,
        minWidth: '8rem',
      }}>
        {term}
      </span>
      <span style={{
        color: '#9BBFAB',
        fontSize: '1rem',
        lineHeight: 1.7,
        fontWeight: 300,
      }}>
        {children}
      </span>
    </div>
  );
}
