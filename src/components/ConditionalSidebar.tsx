'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

// Pages that should NOT have a sidebar — they're full-bleed immersive
const FULL_BLEED_PATHS = ['/', '/scenario'];

export default function ConditionalSidebar({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isFullBleed = FULL_BLEED_PATHS.some(
    (p) => pathname === p || (p !== '/' && pathname.startsWith(p))
  );

  if (isFullBleed) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      {sidebar}
      <main className="flex-1 md:ml-0">
        <div className="h-16 md:h-0" />
        {children}
      </main>
    </div>
  );
}
