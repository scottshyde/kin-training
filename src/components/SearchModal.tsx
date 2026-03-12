'use client';

import { useEffect, useState } from 'react';
import { Search, X, FileText } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  manualSlug: string;
  sectionSlug: string;
  manualTitle: string;
  sectionTitle: string;
}

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SearchModal({ isOpen: controlledOpen, onClose }: SearchModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const close = () => {
    if (onClose) onClose();
    else setInternalOpen(false);
    setQuery('');
    setResults([]);
  };

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (onClose) {
          // controlled mode — parent handles open
        } else {
          setInternalOpen(true);
        }
      }
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => {
          setResults([]);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={close}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pt-[15vh] px-4">
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
          style={{ border: '2px solid var(--color-kin-gold)' }}
        >
          {/* Search input */}
          <div className="flex items-center px-5 py-4" style={{ borderBottom: '1px solid #e5e1d8' }}>
            <Search size={20} className="text-kin-gold mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search articles, sections, manuals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-base text-gray-800 placeholder:text-gray-400"
              autoFocus
            />
            <button
              onClick={close}
              className="ml-3 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <Link
                    key={`${result.manualSlug}-${result.sectionSlug}-${result.slug}`}
                    href={`/${result.manualSlug}/${result.sectionSlug}/${result.slug}`}
                    onClick={close}
                    className="flex items-start gap-3 px-5 py-3 hover:bg-kin-cream transition"
                  >
                    <FileText size={16} className="text-kin-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-kin-black">
                        {result.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {result.manualTitle} &rsaquo; {result.sectionTitle}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                No results found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-400 text-sm">
                Start typing to search...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
