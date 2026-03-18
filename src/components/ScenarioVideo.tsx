'use client';

import Link from 'next/link';

interface ScenarioVideoProps {
  src: string;
  href: string;
}

export default function ScenarioVideo({ src, href }: ScenarioVideoProps) {
  return (
    <Link
      href={href}
      className="block relative overflow-hidden rounded-lg group"
      style={{ width: '100%', maxWidth: '400px', aspectRatio: '3/4' }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        className="transition-transform duration-700 group-hover:scale-105"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Subtle overlay that lifts on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
        style={{ background: 'linear-gradient(to top, rgba(13,17,23,0.4) 0%, transparent 40%)' }}
      />
    </Link>
  );
}
