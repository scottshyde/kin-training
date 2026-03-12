'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Menu,
  X,
  BookOpen,
  Hammer,
  UserCheck,
  LogOut,
  Search,
  ChevronDown,
  Crown,
} from 'lucide-react';
import { Manual, Section } from '@/lib/content';
import SearchModal from './SearchModal';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={18} />,
  Hammer: <Hammer size={18} />,
  UserCheck: <UserCheck size={18} />,
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
        break;
      }
    }
  }, [pathname]);

  const handleManualClick = (slug: string) => {
    setExpandedManual(expandedManual === slug ? null : slug);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-kin-black border-b border-kin-gold/20 px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-kin-gold/20 flex items-center justify-center">
            <Crown size={16} className="text-kin-gold" />
          </div>
          <span className="text-white font-semibold">KIN <span className="text-kin-gold">HOME</span></span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-kin-gold"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
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
          fixed top-0 left-0 h-screen w-[272px] sidebar-gradient text-white flex flex-col
          transition-transform duration-300 z-40
          md:relative md:translate-x-0 md:top-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ borderRight: '1px solid rgba(197, 162, 88, 0.12)' }}
      >
        {/* Logo */}
        <div className="p-6 hidden md:block" style={{ borderBottom: '1px solid rgba(197, 162, 88, 0.12)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-kin-gold/20 flex items-center justify-center">
              <Crown size={20} className="text-kin-gold" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wide">
                KIN <span className="text-kin-gold">HOME</span>
              </div>
              <div className="text-xs text-gray-500">Sales Training</div>
            </div>
          </div>
        </div>

        {/* Search button */}
        <div className="px-4 pt-4 pb-2 hidden md:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-gray-400 hover:text-gray-200"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Search size={16} className="text-kin-gold" />
            <span className="flex-1 text-left text-sm">Search...</span>
            <kbd className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">⌘K</kbd>
          </button>
        </div>

        {/* MANUALS label */}
        <div className="px-6 pt-6 pb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">Manuals</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 mt-0 md:mt-0">
          {manuals.map((manual) => {
            const sections = sectionsByManual[manual.slug] || [];
            const manualActive = isActive(`/${manual.slug}`);
            return (
              <div key={manual.slug} className="mb-1">
                <button
                  onClick={() => handleManualClick(manual.slug)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition
                    ${manualActive
                      ? 'bg-kin-green/20 text-white'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }
                  `}
                >
                  <span className="text-kin-gold">
                    {iconMap[manual.icon] || <BookOpen size={18} />}
                  </span>
                  <span className="flex-1 text-left text-sm font-medium">{manual.title}</span>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-200 ${
                      expandedManual === manual.slug ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Sections */}
                {expandedManual === manual.slug && (
                  <div className="ml-5 mt-1 space-y-0.5 mb-2" style={{ borderLeft: '1px solid rgba(197, 162, 88, 0.15)' }}>
                    {sections.map((section) => {
                      const sectionActive = isActive(`/${manual.slug}/${section.slug}`);
                      return (
                        <Link
                          key={section.slug}
                          href={`/${manual.slug}/${section.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={`
                            block pl-4 pr-3 py-2 text-[13px] transition rounded-r-lg
                            ${sectionActive
                              ? 'text-kin-gold font-medium bg-kin-gold/5'
                              : 'text-gray-500 hover:text-gray-300'
                            }
                          `}
                          style={sectionActive ? { borderLeft: '2px solid var(--color-kin-gold)', marginLeft: '-1px' } : {}}
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
        <div className="p-4" style={{ borderTop: '1px solid rgba(197, 162, 88, 0.08)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-gray-500 hover:text-red-400"
          >
            <LogOut size={16} />
            <span className="text-sm">Sign out</span>
          </button>
        </div>
      </aside>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
