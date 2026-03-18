'use client';

import { type ReactNode } from 'react';

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      padding: '1.5rem 0',
      borderBottom: '1px solid rgba(46, 139, 87, 0.08)',
    }}>
      {/* Step number */}
      <div style={{
        flexShrink: 0,
        width: '3rem',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: '1px solid rgba(46, 139, 87, 0.3)',
        background: 'rgba(0, 96, 57, 0.08)',
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#2E8B57',
        }}>
          {number}
        </span>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.125rem',
          fontWeight: 600,
          color: '#FFFFFF',
          marginBottom: '0.5rem',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h4>
        <div className="prose-dark" style={{ fontSize: '1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export default function Steps({ children }: StepsProps) {
  return (
    <div style={{ margin: '2rem 0' }}>
      {children}
    </div>
  );
}
