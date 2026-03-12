'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-8 text-gray-600">
      <Link href="/" className="text-kin-green hover:text-kin-gold font-medium">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-kin-green hover:text-kin-gold font-medium">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
