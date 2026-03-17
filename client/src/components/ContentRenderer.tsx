import { ContentBlock } from "@/lib/oprpg-data";
import { AlertTriangle, BookOpen, Star } from "lucide-react";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

function renderText(text: string): React.ReactNode {
  // Handle bold text with **
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-[oklch(0.92_0.01_240)] font-semibold">{part.slice(2, -2)}</strong>;
    }
    // Handle newlines
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div className="prose-oprpg space-y-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className="text-[oklch(0.82_0.01_240)] leading-relaxed">
                {renderText(block.content || '')}
              </p>
            );

          case 'heading':
            return (
              <h2 key={idx} className="font-['Cinzel'] text-2xl font-bold text-[oklch(0.92_0.01_240)] mt-8 mb-4 pb-2 border-b border-[oklch(0.22_0.05_240)]">
                {block.content}
              </h2>
            );

          case 'subheading':
            return (
              <h3 key={idx} className="font-['Cinzel'] text-lg font-semibold text-[oklch(0.78_0.15_75)] mt-6 mb-3">
                {block.content}
              </h3>
            );

          case 'rule-box':
            return (
              <div key={idx} className="rule-box my-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[oklch(0.55_0.22_25)] mt-1 shrink-0" />
                  <div className="text-sm text-[oklch(0.82_0.01_240)] leading-relaxed">
                    {renderText(block.content || '')}
                  </div>
                </div>
              </div>
            );

          case 'gold-box':
            return (
              <div key={idx} className="gold-rule-box my-4">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-[oklch(0.78_0.15_75)] mt-1 shrink-0" />
                  <div className="text-sm text-[oklch(0.82_0.01_240)] leading-relaxed">
                    {renderText(block.content || '')}
                  </div>
                </div>
              </div>
            );

          case 'warning':
            return (
              <div key={idx} className="my-4 bg-[oklch(0.20_0.08_25)] border border-[oklch(0.40_0.15_25)] border-l-4 border-l-[oklch(0.55_0.22_25)] rounded-r-md p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[oklch(0.65_0.22_25)] mt-0.5 shrink-0" />
                  <div className="text-sm text-[oklch(0.85_0.02_25)] leading-relaxed">
                    {renderText(block.content || '')}
                  </div>
                </div>
              </div>
            );

          case 'quote':
            return (
              <blockquote key={idx} className="quote-block my-6">
                <p className="text-base italic text-[oklch(0.78_0.02_240)]">
                  "{block.content}"
                </p>
                {block.author && (
                  <footer className="mt-2 text-sm font-['Cinzel'] text-[oklch(0.78_0.15_75)] not-italic">
                    — {block.author}
                  </footer>
                )}
              </blockquote>
            );

          case 'list':
            return (
              <ul key={idx} className="my-3 space-y-2">
                {(block.items || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[oklch(0.82_0.01_240)]">
                    <span className="text-[oklch(0.55_0.22_25)] mt-1 text-xs shrink-0">▸</span>
                    <span className="text-sm leading-relaxed">{renderText(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={idx} className="my-4 overflow-x-auto rounded-md border border-[oklch(0.22_0.05_240)]">
                <table className="stat-table">
                  {block.headers && (
                    <thead>
                      <tr>
                        {block.headers.map((h, i) => (
                          <th key={i}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {(block.rows || []).map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className={j === 0 ? 'font-medium text-[oklch(0.88_0.01_240)]' : ''}>
                            {renderText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'example':
            return (
              <div key={idx} className="my-4 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded-md p-4">
                <div className="text-xs font-['Cinzel'] text-[oklch(0.55_0.22_25)] uppercase tracking-widest mb-2">Exemplo</div>
                <div className="text-sm text-[oklch(0.78_0.02_240)] italic leading-relaxed">
                  {renderText(block.content || '')}
                </div>
              </div>
            );

          case 'stat-block':
            return (
              <div key={idx} className="my-4 bg-[oklch(0.14_0.04_240)] border-2 border-[oklch(0.30_0.08_75)] rounded-md p-4">
                <div className="text-sm text-[oklch(0.82_0.01_240)] font-['JetBrains_Mono']">
                  {renderText(block.content || '')}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
