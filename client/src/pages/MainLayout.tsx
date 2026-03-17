import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import ContentRenderer from "@/components/ContentRenderer";
import HomePage from "@/pages/Home";
import CampaignPage from "@/pages/Campaign";
import { chapters, getChapterById } from "@/lib/oprpg-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MainLayout() {
  const [activeChapterId, setActiveChapterId] = useState<string>('home');
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeChapter = getChapterById(activeChapterId);

  const navigate = (chapterId: string, sectionId?: string) => {
    setActiveChapterId(chapterId);
    if (sectionId) {
      setActiveSectionId(sectionId);
      // Scroll to section after state update
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (contentRef.current) {
          contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      setActiveSectionId(activeChapter?.sections[0]?.id || '');
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Navigate to previous/next chapter
  const chapterIndex = chapters.findIndex(c => c.id === activeChapterId);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  // Track active section on scroll
  useEffect(() => {
    if (!activeChapter) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    activeChapter.sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeChapter]);

  return (
    <div className="flex h-screen bg-[oklch(0.10_0.03_240)] overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeChapterId={activeChapterId}
        activeSectionId={activeSectionId}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 bg-[oklch(0.10_0.03_240)] border-b border-[oklch(0.18_0.05_240)] px-4 py-3 flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[oklch(0.55_0.02_240)] hover:text-[oklch(0.88_0.01_240)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1 text-xs text-[oklch(0.45_0.02_240)] font-['Cinzel'] shrink-0">
            <button onClick={() => navigate('home')} className="hover:text-[oklch(0.78_0.15_75)] transition-colors">
              OP RPG
            </button>
            {activeChapter && (
              <>
                <span>/</span>
                <span className="text-[oklch(0.65_0.02_240)]">
                  Cap. {activeChapter.number} — {activeChapter.title}
                </span>
              </>
            )}
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-end">
            <SearchBar onNavigate={navigate} />
          </div>
        </header>

        {/* Content area */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto"
        >
          {activeChapterId === 'home' ? (
            <HomePage onNavigate={navigate} />
          ) : activeChapterId === 'campaign' ? (
            <CampaignPage />
          ) : activeChapter ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
              {/* Chapter header */}
              <div className="mb-8 pb-6 border-b border-[oklch(0.20_0.05_240)]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{activeChapter.icon}</span>
                  <div>
                    <div className="text-xs font-['Cinzel'] text-[oklch(0.45_0.02_240)] uppercase tracking-widest">
                      Capítulo {activeChapter.number}
                    </div>
                    <h1 className="font-['Cinzel'] text-2xl md:text-3xl font-bold text-[oklch(0.92_0.01_240)]">
                      {activeChapter.title}
                    </h1>
                  </div>
                </div>
                {activeChapter.badge && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full border border-[oklch(0.30_0.06_240)] text-[oklch(0.60_0.02_240)] font-['Cinzel'] tracking-wide">
                    {activeChapter.badge}
                  </span>
                )}
              </div>

              {/* Table of contents for this chapter */}
              {activeChapter.sections.length > 1 && (
                <div className="mb-8 bg-[oklch(0.13_0.04_240)] border border-[oklch(0.20_0.05_240)] rounded-lg p-4">
                  <div className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-widest mb-3">
                    Neste Capítulo
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {activeChapter.sections.map((section, i) => (
                      <button
                        key={section.id}
                        onClick={() => navigate(activeChapterId, section.id)}
                        className="text-left text-sm text-[oklch(0.65_0.02_240)] hover:text-[oklch(0.78_0.15_75)] transition-colors py-1 flex items-center gap-2"
                      >
                        <span className="text-[oklch(0.35_0.08_25)] text-xs">{i + 1}.</span>
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}
              {activeChapter.sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="content-section mb-12"
                >
                  <h2 className="font-['Cinzel'] text-xl font-bold text-[oklch(0.92_0.01_240)] mb-6 pb-3 border-b border-[oklch(0.20_0.05_240)] section-title">
                    {section.title}
                  </h2>
                  <ContentRenderer blocks={section.content} />
                </div>
              ))}

              {/* Chapter navigation */}
              <div className="mt-12 pt-6 border-t border-[oklch(0.20_0.05_240)] flex items-center justify-between gap-4">
                {prevChapter ? (
                  <button
                    onClick={() => navigate(prevChapter.id)}
                    className="flex items-center gap-2 text-sm text-[oklch(0.60_0.02_240)] hover:text-[oklch(0.88_0.01_240)] transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-[oklch(0.40_0.02_240)] font-['Cinzel']">Anterior</div>
                      <div>{prevChapter.icon} {prevChapter.title}</div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('home')}
                    className="flex items-center gap-2 text-sm text-[oklch(0.60_0.02_240)] hover:text-[oklch(0.88_0.01_240)] transition-colors group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-[oklch(0.40_0.02_240)] font-['Cinzel']">Voltar</div>
                      <div>🏠 Início</div>
                    </div>
                  </button>
                )}

                {nextChapter && (
                  <button
                    onClick={() => navigate(nextChapter.id)}
                    className="flex items-center gap-2 text-sm text-[oklch(0.60_0.02_240)] hover:text-[oklch(0.88_0.01_240)] transition-colors group text-right"
                  >
                    <div>
                      <div className="text-xs text-[oklch(0.40_0.02_240)] font-['Cinzel']">Próximo</div>
                      <div>{nextChapter.icon} {nextChapter.title}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-[oklch(0.45_0.02_240)]">
              Capítulo não encontrado
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
