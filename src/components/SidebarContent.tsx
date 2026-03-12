'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Manual, Section } from '@/lib/content';
import SearchModal from './SearchModal';

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={20} />,
  Hammer: <Hammer size={20} />,
  UserCheck: <UserCheck size={20} />,
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
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const handleManualClick = (slug: string) => {
    setExpandedManual(expandedManual === slug ? null : slug);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-50">
        <div className="text-kin-gold font-playfair text-xl font-bold">KIN</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-kin-black hover:text-kin-gold"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-kin-black text-white flex flex-col
          transition-transform duration-300 z-40
          md:relative md:translate-x-0 md:top-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700 hidden md:block">
          <div className="text-kin-gold font-playfair text-3xl font-bold">KIN</div>
          <div className="text-gray-400 text-sm mt-1">Sales Training</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 md:py-4 mt-16 md:mt-0">
          {manuals.map((manual) => {
            const sections = sectionsByManual[manual.slug] || [];
            return (
              <div key={manual.slug}>
                <button
                  onClick={() => handleManualClick(manual.slug)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2
                    ${isActive(`/${manual.slug}`)
                      ? 'bg-kin-green text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="text-kin-gold">
                    {iconMap[manual.icon] || <BookOpen size={20} />}
                  </span>
                  <span className="flex-1 text-left font-medium">{manual.title}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      expandedManual === manual.slug ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Sections */}
                {expandedManual === manual.slug && (
                  <div className="ml-4 space-y-1 mb-4">
                    {sections.map((section) => (
                      <Link
                        key={section.slug}
                        href={`/${manual.slug}/${section.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`
                          block px-4 py-2 rounded-lg text-sm transition
                          ${isActive(`/${manual.slug}/${section.slug}`)
                            ? 'bg-kin-gold text-kin-black font-medium'
                            : 'text-gray-400 hover:text-gray-200'
                          }
                        `}
                      >
                        {section.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Search button */}
        <div className="p-4 border-t border-gray-700 hidden md:block">
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition text-gray-300"
          >
            <Search size={18} className="text-kin-gold" />
            <span className="flex-1 text-left text-sm">Search</span>
            <kbd className="text-xs bg-gray-700 px-2 py-1 rounded">⌘K</kbd>
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-900 hover:bg-red-800 transition text-white"
          >
            <LogOut size={18} />
            <span className="flex-1 text-left font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <SearchModal />
    </>
  );
}
