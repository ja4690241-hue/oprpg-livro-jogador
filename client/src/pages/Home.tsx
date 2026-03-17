import { chapters } from "@/lib/oprpg-data";
import { Anchor, BookOpen, Compass, Skull } from "lucide-react";

interface HomePageProps {
  onNavigate: (chapterId: string, sectionId?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { icon: BookOpen, label: "Capítulos", value: "14" },
    { icon: Compass, label: "Espécies", value: "8+" },
    { icon: Skull, label: "Estilos de Combate", value: "10" },
    { icon: Anchor, label: "Versão", value: "1.5.7" },
  ];

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, oklch(0.08 0.04 240), oklch(0.10 0.03 240))`,
          minHeight: '420px',
        }}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.55 0.22 25) 0%, transparent 50%), 
                              radial-gradient(circle at 80% 20%, oklch(0.78 0.15 75) 0%, transparent 40%)`,
          }}
        />

        {/* Animated wave lines */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-[oklch(0.78_0.15_75)]"
              style={{ top: `${i * 14}%`, transform: `skewY(${i % 2 === 0 ? -1 : 1}deg)` }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.55_0.22_25)]/40 bg-[oklch(0.55_0.22_25)]/10 mb-6">
            <span className="text-[oklch(0.55_0.22_25)] text-xs font-['Cinzel'] uppercase tracking-widest">Sistema de RPG</span>
          </div>

          {/* Title */}
          <h1 className="font-['Cinzel_Decorative'] text-4xl md:text-6xl font-bold mb-3 leading-tight">
            <span className="text-[oklch(0.92_0.01_240)]">OP</span>
            <span className="text-[oklch(0.55_0.22_25)]"> RPG</span>
          </h1>
          <h2 className="font-['Cinzel'] text-xl md:text-2xl text-[oklch(0.78_0.15_75)] mb-4 tracking-widest uppercase">
            Livro do Jogador
          </h2>
          <div className="text-[oklch(0.45_0.02_240)] font-['Cinzel'] text-sm tracking-wide mb-6">
            Versão 1.5.7 — Atualizado em 12/02/2025
          </div>

          <p className="text-[oklch(0.70_0.02_240)] max-w-2xl mx-auto leading-relaxed text-base mb-8">
            Um sistema de RPG de mesa ambientado no universo de One Piece. Explore os Sete Mares,
            forme sua tripulação, conquiste Akuma no Mi e domine o Haki em busca do One Piece.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('regras-gerais')}
              className="px-6 py-2.5 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] text-white font-['Cinzel'] text-sm tracking-wide rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-[oklch(0.55_0.22_25)]/30"
            >
              Começar a Ler
            </button>
            <button
              onClick={() => onNavigate('akuma-no-mi')}
              className="px-6 py-2.5 border border-[oklch(0.78_0.15_75)]/50 hover:border-[oklch(0.78_0.15_75)] text-[oklch(0.78_0.15_75)] font-['Cinzel'] text-sm tracking-wide rounded-md transition-all duration-200 hover:bg-[oklch(0.78_0.15_75)]/10"
            >
              Akuma no Mi
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[oklch(0.12_0.04_240)] border-y border-[oklch(0.20_0.05_240)]">
        <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[oklch(0.55_0.22_25)]/15 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-[oklch(0.55_0.22_25)]" />
              </div>
              <div>
                <div className="text-lg font-['Cinzel'] font-bold text-[oklch(0.92_0.01_240)]">{stat.value}</div>
                <div className="text-xs text-[oklch(0.50_0.02_240)]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="font-['Cinzel'] text-xl font-bold text-[oklch(0.92_0.01_240)] mb-2 section-title">
          Conteúdo do Livro
        </h2>
        <p className="text-[oklch(0.55_0.02_240)] text-sm mb-8 mt-4">
          Navegue pelos capítulos do Livro do Jogador
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onNavigate(chapter.id)}
              className="chapter-card text-left p-5 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">{chapter.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-['Cinzel'] text-[oklch(0.45_0.02_240)] uppercase tracking-widest mb-0.5">
                    Capítulo {chapter.number}
                  </div>
                  <h3 className={`font-['Cinzel'] text-sm font-semibold ${chapter.color} group-hover:text-[oklch(0.92_0.01_240)] transition-colors`}>
                    {chapter.title}
                  </h3>
                </div>
                {chapter.badge && (
                  <span className="text-xs px-2 py-0.5 rounded bg-[oklch(0.20_0.05_240)] text-[oklch(0.55_0.02_240)] font-['Cinzel'] shrink-0">
                    {chapter.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-[oklch(0.48_0.02_240)] leading-relaxed">
                {chapter.sections.length} seção{chapter.sections.length !== 1 ? 'ões' : ''}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {chapter.sections.slice(0, 3).map(s => (
                  <span key={s.id} className="text-xs px-2 py-0.5 rounded-sm bg-[oklch(0.18_0.04_240)] text-[oklch(0.50_0.02_240)]">
                    {s.title.split('–').pop()?.trim().split(' ').slice(0, 3).join(' ') || s.title}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-[oklch(0.12_0.04_240)] border border-[oklch(0.20_0.05_240)] rounded-lg p-6">
          <h3 className="font-['Cinzel'] text-base font-bold text-[oklch(0.78_0.15_75)] mb-4">
            Referência Rápida
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-wide mb-2">Dados</div>
              <div className="space-y-1 text-[oklch(0.65_0.02_240)]">
                <div>d4, d6, d8, d10, d12, d20</div>
                <div>d100 = 2×d10</div>
                <div>Nat. 20 = Crítico</div>
                <div>Nat. 1 = Falha Crítica</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-wide mb-2">Atributos</div>
              <div className="space-y-1 text-[oklch(0.65_0.02_240)]">
                <div>FOR, DES, CON</div>
                <div>SAB, VON, PRE</div>
                <div>Mod = (valor - 10) / 2</div>
                <div>Máximo: 20 (base)</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-wide mb-2">Haki</div>
              <div className="space-y-1 text-[oklch(0.65_0.02_240)]">
                <div>Desperta no nível 8</div>
                <div>Observação, Armamento</div>
                <div>Rei (raro)</div>
                <div>PA = Pontos de Ambição</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
