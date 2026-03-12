'use client';

import { useState, type ReactNode, Children } from 'react';

interface TabsProps {
  labels: string[];
  children: ReactNode;
}

export function Tabs({ labels, children }: TabsProps) {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);

  return (
    <div className="my-6">
      {/* Tab bar */}
      <div className="flex gap-0 overflow-x-auto" style={{ borderBottom: '2px solid #e5e1d8' }}>
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className="px-5 py-3 text-sm font-medium whitespace-nowrap transition relative"
            style={{
              color: active === i ? '#C5A258' : '#6B7280',
              borderBottom: active === i ? '2px solid #C5A258' : '2px solid transparent',
              marginBottom: '-2px',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {/* Active panel */}
      <div className="pt-4">
        {panels[active] ?? null}
      </div>
    </div>
  );
}

export function Tab({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
