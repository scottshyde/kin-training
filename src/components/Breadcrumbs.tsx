'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  dark?: boolean;
}

export default function Breadcrumbs({ items, dark = false }: BreadcrumbsProps) {
  const baseText = dark ? 'text-gray-400' : 'text-gray-500';
  const linkText = dark ? 'text-kin-gold/70 hover:text-kin-gold' : 'text-kin-green hover:text-kin-gold';
  const activeText = dark ? 'text-gray-300' : 'text-gray-700';
  const chevronColor = dark ? 'text-gray-600' : 'text-gray-400';

  return (
    <nav className={`flex items-center gap-2 text-sm mb-6 ${baseText}`}>
      <Link href="/" className={`${linkText} transition`}>
        <Home size={14} />
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight size={14} className={chevronColor} />
          {index === items.length - 1 ? (
            <span className={`font-medium ${activeText}`}>{item.label}</span>
          ) : (
            <Link href={item.href} className={`${linkText} font-medium transition`}>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
