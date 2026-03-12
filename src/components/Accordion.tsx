'use client';

import { useState, type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="my-4 rounded-lg overflow-hidden"
      style={{ border: '1px solid #e5e1d8' }}
    >
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full flex items-center gap-3 px-5 py-4 text-left transition hover:bg-gray-50"
        style={{ background: open ? '#FAFAF7' : 'white' }}
      >
        <ChevronRight
          size={16}
          className="text-kin-gold flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
        <span
          className="font-semibold text-kin-black text-[15px]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-5 pt-1 text-sm leading-relaxed text-gray-700 prose-kin"
          style={{ borderTop: '1px solid #e5e1d8' }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
