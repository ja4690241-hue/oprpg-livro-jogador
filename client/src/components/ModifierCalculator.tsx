import { Card } from '@/components/ui/card';
import { calculateModifier } from '@/lib/character-types';

interface ModifierCalculatorProps {
  attributes: Record<string, number>;
}

export default function ModifierCalculator({ attributes }: ModifierCalculatorProps) {
  const attributeNames = {
    forca: 'Força',
    destreza: 'Destreza',
    constituicao: 'Constituição',
    sabedoria: 'Sabedoria',
    vontade: 'Vontade',
    presenca: 'Presença',
  };

  return (
    <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
      <h3 className="font-['Cinzel'] font-bold mb-3">Calculadora de Modificadores</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(attributes).map(([attr, value]) => {
          const modifier = calculateModifier(value);
          return (
            <div key={attr} className="bg-[oklch(0.14_0.04_240)] p-2 rounded text-center text-sm">
              <div className="text-xs text-[oklch(0.50_0.02_240)] mb-1">
                {attributeNames[attr as keyof typeof attributeNames]}
              </div>
              <div className="font-['Cinzel'] font-bold">
                {value} → {modifier >= 0 ? '+' : ''}{modifier}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
