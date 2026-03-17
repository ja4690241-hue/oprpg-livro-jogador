import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dices } from 'lucide-react';

interface DiceResult {
  dice: string;
  rolls: number[];
  total: number;
  timestamp: Date;
}

const DICE_TYPES = [
  { value: 4, label: 'd4' },
  { value: 6, label: 'd6' },
  { value: 8, label: 'd8' },
  { value: 10, label: 'd10' },
  { value: 12, label: 'd12' },
  { value: 20, label: 'd20' },
  { value: 100, label: 'd100' },
];

export default function DiceRoller() {
  const [selectedDice, setSelectedDice] = useState(20);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<DiceResult[]>([]);

  const rollDice = () => {
    const rolls: number[] = [];
    for (let i = 0; i < quantity; i++) {
      rolls.push(Math.floor(Math.random() * selectedDice) + 1);
    }
    const total = rolls.reduce((a, b) => a + b, 0);
    
    setResults([
      {
        dice: `${quantity}d${selectedDice}`,
        rolls,
        total,
        timestamp: new Date(),
      },
      ...results.slice(0, 9),
    ]);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Dices className="w-5 h-5 text-[oklch(0.55_0.22_25)]" />
          <h3 className="font-['Cinzel'] font-bold">Rolador de Dados</h3>
        </div>

        <div className="space-y-4">
          {/* Quantidade */}
          <div>
            <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Quantidade</label>
            <div className="flex gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded hover:bg-[oklch(0.18_0.04_240)]"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="20"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded text-center"
              />
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded hover:bg-[oklch(0.18_0.04_240)]"
              >
                +
              </button>
            </div>
          </div>

          {/* Tipo de Dado */}
          <div>
            <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Tipo de Dado</label>
            <div className="grid grid-cols-4 gap-2">
              {DICE_TYPES.map(dice => (
                <button
                  key={dice.value}
                  onClick={() => setSelectedDice(dice.value)}
                  className={`py-2 rounded text-sm font-['Cinzel'] transition-all ${
                    selectedDice === dice.value
                      ? 'bg-[oklch(0.55_0.22_25)] text-white'
                      : 'bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] hover:border-[oklch(0.55_0.22_25)]'
                  }`}
                >
                  {dice.label}
                </button>
              ))}
            </div>
          </div>

          {/* Botão Rolar */}
          <Button
            onClick={rollDice}
            className="w-full bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] font-['Cinzel']"
          >
            Rolar {quantity}d{selectedDice}
          </Button>
        </div>
      </Card>

      {/* Histórico de Rolagens */}
      {results.length > 0 && (
        <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
          <h4 className="font-['Cinzel'] font-bold mb-3">Últimas Rolagens</h4>
          <div className="space-y-2">
            {results.map((result, i) => (
              <div
                key={i}
                className="bg-[oklch(0.14_0.04_240)] p-3 rounded flex justify-between items-center"
              >
                <div>
                  <div className="font-['Cinzel'] text-sm font-bold">{result.dice}</div>
                  <div className="text-xs text-[oklch(0.50_0.02_240)]">
                    {result.rolls.join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-['Cinzel'] font-bold text-[oklch(0.55_0.22_25)]">
                    {result.total}
                  </div>
                  <div className="text-xs text-[oklch(0.50_0.02_240)]">
                    {result.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
