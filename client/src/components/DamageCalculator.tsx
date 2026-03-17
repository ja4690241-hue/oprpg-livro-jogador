import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface DamageResult {
  baseDamage: number;
  modifier: number;
  totalDamage: number;
  criticalHit: boolean;
  timestamp: Date;
}

export default function DamageCalculator() {
  const [baseDamage, setBaseDamage] = useState(6);
  const [modifier, setModifier] = useState(0);
  const [diceType, setDiceType] = useState('d6');
  const [results, setResults] = useState<DamageResult[]>([]);

  const calculateDamage = (isCritical: boolean = false) => {
    const roll = Math.floor(Math.random() * parseInt(diceType.slice(1))) + 1;
    const totalDamage = roll + modifier;
    const finalDamage = isCritical ? totalDamage * 2 : totalDamage;

    setResults([
      {
        baseDamage: roll,
        modifier,
        totalDamage: finalDamage,
        criticalHit: isCritical,
        timestamp: new Date(),
      },
      ...results.slice(0, 9),
    ]);
  };

  const diceOptions = ['d4', 'd6', 'd8', 'd10', 'd12'];

  return (
    <div className="space-y-4">
      <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-[oklch(0.55_0.22_25)]" />
          <h3 className="font-['Cinzel'] font-bold">Calculadora de Dano</h3>
        </div>

        <div className="space-y-4">
          {/* Tipo de Dado */}
          <div>
            <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Dado de Dano</label>
            <div className="grid grid-cols-5 gap-2">
              {diceOptions.map(dice => (
                <button
                  key={dice}
                  onClick={() => setDiceType(dice)}
                  className={`py-2 rounded text-sm font-['Cinzel'] transition-all ${
                    diceType === dice
                      ? 'bg-[oklch(0.55_0.22_25)] text-white'
                      : 'bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] hover:border-[oklch(0.55_0.22_25)]'
                  }`}
                >
                  {dice}
                </button>
              ))}
            </div>
          </div>

          {/* Modificador */}
          <div>
            <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Modificador</label>
            <div className="flex gap-2">
              <button
                onClick={() => setModifier(modifier - 1)}
                className="px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded hover:bg-[oklch(0.18_0.04_240)]"
              >
                −
              </button>
              <input
                type="number"
                value={modifier}
                onChange={e => setModifier(parseInt(e.target.value) || 0)}
                className="flex-1 px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded text-center"
              />
              <button
                onClick={() => setModifier(modifier + 1)}
                className="px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded hover:bg-[oklch(0.18_0.04_240)]"
              >
                +
              </button>
            </div>
          </div>

          {/* Botões de Cálculo */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => calculateDamage(false)}
              className="bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] font-['Cinzel']"
            >
              Ataque Normal
            </Button>
            <Button
              onClick={() => calculateDamage(true)}
              className="bg-[oklch(0.78_0.15_75)] hover:bg-[oklch(0.88_0.18_75)] font-['Cinzel']"
            >
              Crítico (2x)
            </Button>
          </div>
        </div>
      </Card>

      {/* Histórico de Danos */}
      {results.length > 0 && (
        <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4">
          <h4 className="font-['Cinzel'] font-bold mb-3">Últimos Danos</h4>
          <div className="space-y-2">
            {results.map((result, i) => (
              <div
                key={i}
                className={`p-3 rounded flex justify-between items-center ${
                  result.criticalHit
                    ? 'bg-[oklch(0.78_0.15_75)]/20 border border-[oklch(0.78_0.15_75)]/50'
                    : 'bg-[oklch(0.14_0.04_240)]'
                }`}
              >
                <div>
                  <div className="font-['Cinzel'] text-sm font-bold">
                    {diceType} {result.modifier >= 0 ? '+' : ''}{result.modifier}
                    {result.criticalHit && ' (CRÍTICO)'}
                  </div>
                  <div className="text-xs text-[oklch(0.50_0.02_240)]">
                    {result.baseDamage} {result.modifier >= 0 ? '+' : ''}{result.modifier} = {result.baseDamage + result.modifier}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-['Cinzel'] font-bold ${
                    result.criticalHit ? 'text-[oklch(0.78_0.15_75)]' : 'text-[oklch(0.55_0.22_25)]'
                  }`}>
                    {result.totalDamage}
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
