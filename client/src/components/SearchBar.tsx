import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { searchContent, Chapter, Section } from "@/lib/oprpg-data";

interface SearchResult {
  chapter: Chapter;
  section: Section;
  preview: string;
}

interface SearchBarProps {
  onNavigate: (chapterId: string, sectionId: string) => void;
}

export default function SearchBar({ onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const found = searchContent(query.trim());
      setResults(found.slice(0, 8));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (chapterId: string, sectionId: string) => {
    onNavigate(chapterId, sectionId);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.45_0.02_240)]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar regras, espécies, técnicas..."
          className="w-full pl-9 pr-8 py-2 text-sm bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded-md text-[oklch(0.88_0.01_240)] placeholder-[oklch(0.42_0.02_240)] focus:outline-none focus:border-[oklch(0.55_0.22_25)] focus:ring-1 focus:ring-[oklch(0.55_0.22_25)]/30 transition-colors"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[oklch(0.45_0.02_240)] hover:text-[oklch(0.70_0.02_240)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[oklch(0.14_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded-md shadow-2xl z-50 overflow-hidden">
          {results.map((result, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(result.chapter.id, result.section.id)}
              className="w-full text-left px-4 py-3 hover:bg-[oklch(0.20_0.05_240)] transition-colors border-b border-[oklch(0.18_0.04_240)] last:border-0"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{result.chapter.icon}</span>
                <span className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-wide">
                  Cap. {result.chapter.number} — {result.chapter.title}
                </span>
              </div>
              <div className="text-sm text-[oklch(0.85_0.01_240)] font-medium mb-0.5">
                {result.section.title}
              </div>
              <div className="text-xs text-[oklch(0.55_0.02_240)] line-clamp-2 leading-relaxed">
                {result.preview}
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <div className="px-4 py-3 text-sm text-[oklch(0.50_0.02_240)] text-center">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}

      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[oklch(0.14_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded-md shadow-2xl z-50 px-4 py-3 text-sm text-[oklch(0.50_0.02_240)] text-center">
          Nenhum resultado para "{query}"
        </div>
      )}
    </div>
  );
}
