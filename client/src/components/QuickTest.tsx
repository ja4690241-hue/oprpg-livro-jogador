import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickTestProps {
  attributes: Record<string, number>;
  onAddAction: (action: string) => void;
}

const ATTRIBUTE_NAMES: Record<string, string> = {
  forca: 'Força',
  destreza: 'Destreza',
  constituicao: 'Constituição',
  sabedoria: 'Sabedoria',
  vontade: 'Vontade',
  presenca: 'Presença',
};

export default function QuickTest({ attributes, onAddAction }: QuickTestProps) {
  const [selectedAttr, setSelectedAttr] = useState('destreza');
  const [lastResult, setLastResult] = useState<{ roll: number; modifier: number; total: number } | null>(null);

  const rollTest = () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const attrValue = attributes[selectedAttr];
    const modifier = Math.floor((attrValue - 10) / 2);
    const total = roll + modifier;
    
    setLastResult({ roll, modifier, total });
    onAddAction(`Teste de ${ATTRIBUTE_NAMES[selectedAttr]}: ${roll} + ${modifier} = ${total}`);
  };

  return (
    <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
      <h3 className="font-['Cinzel'] font-bold mb-3">Teste Rápido</h3>
      
      <div className="space-y-3">
        <select
          value={selectedAttr}
          onChange={e => setSelectedAttr(e.target.value)}
          className="w-full px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded text-sm"
        >
          {Object.entries(ATTRIBUTE_NAMES).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>

        <Button
          onClick={rollTest}
          className="w-full bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] font-['Cinzel']"
        >
          Rolar Teste
        </Button>

        {lastResult && (
          <div className="bg-[oklch(0.14_0.04_240)] p-3 rounded text-center">
            <div className="text-xs text-[oklch(0.50_0.02_240)] mb-1">Resultado</div>
            <div className="text-2xl font-['Cinzel'] font-bold text-[oklch(0.55_0.22_25)]">
              {lastResult.total}
            </div>
            <div className="text-xs text-[oklch(0.50_0.02_240)]">
              {lastResult.roll} + {lastResult.modifier >= 0 ? '+' : ''}{lastResult.modifier}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
