'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { X, LogOut } from 'lucide-react';
import { scenarios } from '@/lib/scenarios';
import { getAllowedManuals, canAccessManual } from '@/lib/roles';

const manualLinks = [
  { slug: 'setter-manual', label: 'Setter Manual' },
  { slug: 'closer-manual', label: 'Closer Manual' },
  { slug: 'builder-playbook', label: 'Builder Playbook' },
];

export default function HomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const role = session?.user?.role;
  const allowed = getAllowedManuals(role);

  // Filter scenarios: only show if user can access at least one article in it
  const visibleScenarios = scenarios.filter((scenario) =>
    scenario.articles.some((a) => canAccessManual(role, a.manual))
  );

  return (
    <>
      {/* Fixed transparent nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between" style={{ backgroundColor: 'rgba(7,10,14,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        {/* Logo */}
        <Link href="/" className="text-white text-sm font-semibold tracking-wider">
          KIN <span className="text-kin-gold">HOME</span>
        </Link>

        {/* Menu trigger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="text-white/40 hover:text-white transition-colors text-[11px] uppercase tracking-[0.25em] font-medium"
        >
          Menu
        </button>
      </nav>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-kin-black/98 backdrop-blur-xl flex flex-col">
          {/* Close button */}
          <div className="px-8 md:px-16 py-6 flex items-center justify-between">
            <span className="text-white text-sm font-semibold tracking-wider">
              KIN <span className="text-kin-gold">HOME</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Menu content — centered */}
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="w-full max-w-lg">
              {/* Scenarios */}
              <p className="text-kin-gold/40 text-[10px] uppercase tracking-[0.3em] mb-8">
                Go To
              </p>
              <div className="space-y-6 mb-16">
                {visibleScenarios.map((scenario) => (
                  <Link
                    key={scenario.slug}
                    href={`/scenario/${scenario.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block group"
                  >
                    <span
                      className="text-white text-3xl md:text-4xl font-bold group-hover:text-kin-gold transition-colors duration-300"
                      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}
                    >
                      {scenario.title}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5 mb-8" />

              {/* Secondary links — only show manuals user can access */}
              <div className="space-y-4">
                {manualLinks
                  .filter((m) => allowed.includes(m.slug))
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={`/${m.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-white/25 text-sm hover:text-white/50 transition-colors"
                    >
                      {m.label}
                    </Link>
                  ))}
              </div>

              {/* Sign out */}
              <button
                onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                className="mt-12 flex items-center gap-2 text-white/15 text-sm hover:text-red-400/50 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
