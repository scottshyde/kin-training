'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Menu,
  X,
  LogOut,
  Search,
  ChevronDown,
  DoorOpen,
  Handshake,
  HardHat,
  Crown,
  BookOpen,
  Hammer,
  UserCheck,
} from 'lucide-react';
import { Manual, Section } from '@/lib/content';
import { scenarios } from '@/lib/scenarios';
import SearchModal from './SearchModal';

const scenarioIcons: Record<string, React.ReactNode> = {
  DoorOpen: <DoorOpen size={16} strokeWidth={1.5} />,
  Handshake: <Handshake size={16} strokeWidth={1.5} />,
  HardHat: <HardHat size={16} strokeWidth={1.5} />,
  Crown: <Crown size={16} strokeWidth={1.5} />,
};

const manualIcons: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={16} strokeWidth={1.5} />,
  Hammer: <Hammer size={16} strokeWidth={1.5} />,
  UserCheck: <UserCheck size={16} strokeWidth={1.5} />,
};

interface SidebarContentProps {
  manuals: Manual[];
  sectionsByManual: Record<string, Section[]>;
}

export default function SidebarContent({
  manuals,
  sectionsByManual,
}: SidebarContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedManual, setExpandedManual] = useState<string | null>(null);
  const [showManuals, setShowManuals] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  // Auto-expand the active manual
  useEffect(() => {
    for (const manual of manuals) {
      if (isActive(`/${manual.slug}`)) {
        setExpandedManual(manual.slug);
        setShowManuals(true);
        break;
      }
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0B0F14] border-b border-white/5 px-5 py-3.5 flex items-center justify-between z-50">
        <span className="text-white text-sm font-semibold tracking-wide">
          KIN <span className="text-kin-gold">HOME</span>
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white/40 hover:text-kin-gold transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[260px] sidebar-editorial text-white flex flex-col
          transition-transform duration-300 z-40
          md:relative md:translate-x-0 md:top-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-6 py-6 hidden md:block" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="block">
            <span className="text-[15px] font-semibold tracking-wider text-white">
              KIN <span className="text-kin-gold">HOME</span>
            </span>
            <span className="block text-[10px] text-white/30 uppercase tracking-[0.15em] mt-0.5">
              Training Portal
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 pt-5 pb-3 hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/30 hover:text-white/50 transition"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Search size={14} />
            <span className="flex-1 text-left text-[13px]">Search...</span>
            <kbd className="text-[10px] text-white/20 px-1.5 py-0.5 rounded border border-white/8">⌘K</kbd>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-4 mt-2">
          {/* Scenarios */}
          <div className="mb-1">
            <span className="block px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
              Scenarios
            </span>
          </div>

          {scenarios.map((scenario) => (
            <Link
              key={scenario.slug}
              href={`/scenario/${scenario.slug}`}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-[13px] mb-0.5 transition-colors
                ${isActive(`/scenario/${scenario.slug}`)
                  ? 'text-kin-gold bg-white/5'
                  : 'text-white/45 hover:text-white/70 hover:bg-white/3'
                }
              `}
            >
              <span className="text-kin-gold/60">{scenarioIcons[scenario.icon] || <Crown size={16} />}</span>
              {scenario.title}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-white/5" />

          {/* Manuals toggle */}
          <button
            onClick={() => setShowManuals(!showManuals)}
            className="w-full flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium hover:text-white/40 transition-colors"
          >
            <span className="flex-1 text-left">By Manual</span>
            <ChevronDown
              size={12}
              className={`transition-transform duration-200 ${showManuals ? 'rotate-180' : ''}`}
            />
          </button>

          {showManuals && manuals.map((manual) => {
            const sections = sectionsByManual[manual.slug] || [];
            const manualActive = isActive(`/${manual.slug}`);
            return (
              <div key={manual.slug} className="mb-0.5">
                <button
                  onClick={() => setExpandedManual(expandedManual === manual.slug ? null : manual.slug)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-[13px]
                    ${manualActive
                      ? 'text-white/80 bg-white/5'
                      : 'text-white/35 hover:text-white/55 hover:bg-white/3'
                    }
                  `}
                >
                  <span className="text-kin-gold/50">
                    {manualIcons[manual.icon] || <BookOpen size={16} />}
                  </span>
                  <span className="flex-1 text-left">{manual.title}</span>
                  <ChevronDown
                    size={12}
                    className={`text-white/20 transition-transform duration-200 ${
                      expandedManual === manual.slug ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedManual === manual.slug && (
                  <div className="ml-5 mt-0.5 mb-2 space-y-px" style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                    {sections.map((section) => {
                      const sectionActive = isActive(`/${manual.slug}/${section.slug}`);
                      return (
                        <Link
                          key={section.slug}
                          href={`/${manual.slug}/${section.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={`
                            block pl-4 pr-3 py-1.5 text-[12px] transition-colors rounded-r-md
                            ${sectionActive
                              ? 'text-kin-gold bg-white/3'
                              : 'text-white/30 hover:text-white/50'
                            }
                          `}
                        >
                          {section.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/25 hover:text-red-400/70 transition-colors text-[13px]"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
