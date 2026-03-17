import { chapters } from "@/lib/oprpg-data";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

interface SidebarProps {
  activeChapterId: string;
  activeSectionId: string;
  onNavigate: (chapterId: string, sectionId?: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ activeChapterId, activeSectionId, onNavigate, isOpen, onToggle }: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([activeChapterId])
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  const handleChapterClick = (chapterId: string) => {
    toggleChapter(chapterId);
    onNavigate(chapterId);
  };

  const handleSectionClick = (chapterId: string, sectionId: string) => {
    onNavigate(chapterId, sectionId);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 w-72 flex flex-col
          bg-[oklch(0.08_0.03_240)] border-r border-[oklch(0.18_0.05_240)]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663445843311/n8yY3j3vhhZeQGJXLgjp55/oprpg-sidebar-bg-WLzjHuT7moRcfT85vGBkMo.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[oklch(0.06_0.03_240)]/90" />

        {/* Content */}
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[oklch(0.20_0.05_240)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-['Cinzel_Decorative'] text-lg font-bold text-[oklch(0.78_0.15_75)] leading-tight">
                  OP RPG
                </div>
                <div className="text-xs text-[oklch(0.55_0.22_25)] font-['Cinzel'] tracking-widest uppercase mt-0.5">
                  Livro do Jogador
                </div>
                <div className="text-xs text-[oklch(0.45_0.02_240)] mt-0.5">v1.5.7</div>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden text-[oklch(0.55_0.02_240)] hover:text-[oklch(0.88_0.01_240)] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-2">
            {/* Home link */}
            <button
              onClick={() => onNavigate('home')}
              className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150 flex items-center gap-2
                ${activeChapterId === 'home'
                  ? 'bg-[oklch(0.18_0.06_240)] border-l-2 border-[oklch(0.55_0.22_25)] text-[oklch(0.92_0.01_240)]'
                  : 'text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.88_0.01_240)] hover:bg-[oklch(0.14_0.04_240)]'
                }`}
            >
              <span className="text-base">🏠</span>
              <span className="font-['Cinzel'] text-xs tracking-wide">Início</span>
            </button>

            {/* Campaign link */}
            <button
              onClick={() => onNavigate('campaign')}
              className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-150 flex items-center gap-2
                ${activeChapterId === 'campaign'
                  ? 'bg-[oklch(0.18_0.06_240)] border-l-2 border-[oklch(0.55_0.22_25)] text-[oklch(0.92_0.01_240)]'
                  : 'text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.88_0.01_240)] hover:bg-[oklch(0.14_0.04_240)]'
                }`}
            >
              <span className="text-base">📜</span>
              <span className="font-['Cinzel'] text-xs tracking-wide">Campanha</span>
            </button>

            <div className="px-4 py-2">
              <div className="text-xs font-['Cinzel'] text-[oklch(0.40_0.02_240)] uppercase tracking-widest">
                Capítulos
              </div>
            </div>

            {chapters.map((chapter) => {
              const isExpanded = expandedChapters.has(chapter.id);
              const isActive = activeChapterId === chapter.id;

              return (
                <div key={chapter.id}>
                  {/* Chapter button */}
                  <button
                    onClick={() => handleChapterClick(chapter.id)}
                    className={`w-full text-left px-4 py-2.5 transition-all duration-150 flex items-center gap-2
                      ${isActive
                        ? 'bg-[oklch(0.18_0.06_240)] border-l-2 border-[oklch(0.55_0.22_25)] text-[oklch(0.92_0.01_240)]'
                        : 'text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.88_0.01_240)] hover:bg-[oklch(0.14_0.04_240)]'
                      }`}
                  >
                    <span className="text-base shrink-0">{chapter.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-['Cinzel'] tracking-wide truncate">
                        Cap. {chapter.number} — {chapter.title}
                      </div>
                    </div>
                    {isExpanded
                      ? <ChevronDown className="w-3 h-3 shrink-0 text-[oklch(0.45_0.02_240)]" />
                      : <ChevronRight className="w-3 h-3 shrink-0 text-[oklch(0.45_0.02_240)]" />
                    }
                  </button>

                  {/* Sections */}
                  {isExpanded && (
                    <div className="bg-[oklch(0.06_0.02_240)]/50">
                      {chapter.sections.map((section) => {
                        const isSectionActive = isActive && activeSectionId === section.id;
                        return (
                          <button
                            key={section.id}
                            onClick={() => handleSectionClick(chapter.id, section.id)}
                            className={`w-full text-left pl-10 pr-4 py-2 text-xs transition-all duration-150
                              ${isSectionActive
                                ? 'text-[oklch(0.78_0.15_75)] bg-[oklch(0.14_0.04_240)]'
                                : 'text-[oklch(0.52_0.02_240)] hover:text-[oklch(0.78_0.02_240)] hover:bg-[oklch(0.12_0.03_240)]'
                              }`}
                          >
                            <span className="line-clamp-2 leading-relaxed">{section.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[oklch(0.18_0.05_240)]">
            <div className="text-xs text-[oklch(0.38_0.02_240)] text-center">
              <div>Criado por Brendo Neves</div>
              <div className="mt-1">Atualizado em 12/02/2025</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-30 lg:hidden w-12 h-12 rounded-full bg-[oklch(0.55_0.22_25)] text-white shadow-lg flex items-center justify-center hover:bg-[oklch(0.65_0.25_25)] transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
