'use client';

import { useState, type ReactNode, Children, isValidElement } from 'react';

interface TabsProps {
  labels: string[];
  children: ReactNode;
}

export function Tabs({ labels, children }: TabsProps) {
  const [active, setActive] = useState(0);

  const panels = Children.toArray(children).filter(
    (child) => isValidElement(child)
  );

  return (
    <div className="my-6" suppressHydrationWarning>
      {/* Tab bar */}
      <div className="flex gap-0 overflow-x-auto" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap transition relative"
            style={{
              color: active === i ? '#C5A258' : 'rgba(255,255,255,0.3)',
              borderBottom: active === i ? '2px solid #C5A258' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Panels */}
      {panels.map((panel, i) => (
        <div key={i} style={{ display: active === i ? 'block' : 'none' }} className="pt-4" suppressHydrationWarning>
          {panel}
        </div>
      ))}
    </div>
  );
}

export function Tab({ children }: { children: ReactNode }) {
  return <div suppressHydrationWarning>{children}</div>;
}
