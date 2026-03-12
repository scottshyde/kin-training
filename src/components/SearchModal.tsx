'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
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

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      // Call the search API
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

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border-2 border-kin-gold">
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <Search size={20} className="text-kin-gold mr-3" />
              <input
                type="text"
                placeholder="Search articles, sections, manuals..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="ml-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                <div className="py-4">
                  {results.map((result) => (
                    <Link
                      key={`${result.manualSlug}-${result.sectionSlug}-${result.slug}`}
                      href={`/${result.manualSlug}/${result.sectionSlug}/${result.slug}`}
                      onClick={handleResultClick}
                      className="block px-6 py-3 hover:bg-kin-cream transition"
                    >
                      <div className="font-playfair text-lg text-kin-black hover:text-kin-gold">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {result.manualTitle} {`>`} {result.sectionTitle}
                      </div>
                      {result.description && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {result.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  Start typing to search...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
