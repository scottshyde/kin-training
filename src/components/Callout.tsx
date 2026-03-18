'use client';

import { type ReactNode } from 'react';
import { Lightbulb, AlertTriangle, Star, Zap } from 'lucide-react';

type CalloutType = 'tip' | 'warning' | 'important' | 'insight';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutType, { icon: typeof Lightbulb; borderColor: string; bgFrom: string; bgTo: string; iconColor: string; titleColor: string }> = {
  tip: {
    icon: Lightbulb,
    borderColor: '#2E8B57',
    bgFrom: 'rgba(0, 96, 57, 0.12)',
    bgTo: 'rgba(0, 96, 57, 0.03)',
    iconColor: '#2E8B57',
    titleColor: '#2E8B57',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: '#C5A258',
    bgFrom: 'rgba(197, 162, 88, 0.12)',
    bgTo: 'rgba(197, 162, 88, 0.03)',
    iconColor: '#C5A258',
    titleColor: '#C5A258',
  },
  important: {
    icon: Star,
    borderColor: '#FFFFFF',
    bgFrom: 'rgba(255, 255, 255, 0.08)',
    bgTo: 'rgba(255, 255, 255, 0.02)',
    iconColor: '#FFFFFF',
    titleColor: '#FFFFFF',
  },
  insight: {
    icon: Zap,
    borderColor: '#2E8B57',
    bgFrom: 'rgba(0, 96, 57, 0.08)',
    bgTo: 'rgba(0, 96, 57, 0.02)',
    iconColor: '#4ADE80',
    titleColor: '#4ADE80',
  },
};

export default function Callout({ type = 'tip', title, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div
      style={{
        borderLeft: `3px solid ${c.borderColor}`,
        background: `linear-gradient(135deg, ${c.bgFrom} 0%, ${c.bgTo} 100%)`,
        borderRadius: '6px',
        padding: '1.5rem 1.75rem',
        margin: '2rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: title ? '0.75rem' : '0' }}>
        <Icon size={16} style={{ color: c.iconColor, flexShrink: 0 }} strokeWidth={2} />
        {title && (
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.6875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: c.titleColor,
          }}>
            {title}
          </span>
        )}
      </div>
      <div className="prose-dark" style={{ marginTop: title ? '0' : '0' }}>
        {children}
      </div>
    </div>
  );
}
