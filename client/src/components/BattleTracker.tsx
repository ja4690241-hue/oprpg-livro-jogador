import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sword, Skull, Plus, X, Play, RotateCcw, ChevronRight, User } from 'lucide-react';
import { toast } from 'sonner';

interface Combatant {
  id: string;
  name: string;
  initiative: number;
  hp: number;
  maxHp: number;
  isEnemy: boolean;
}

export default function BattleTracker() {
  const [combatants, setCombatants] = useState<Combatant[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [round, setRound] = useState(1);
  const [isBattleStarted, setIsBattleStarted] = useState(false);

  const addCombatant = (isEnemy: boolean) => {
    const name = isEnemy ? `Inimigo ${combatants.filter(c => c.isEnemy).length + 1}` : `Jogador ${combatants.filter(c => !c.isEnemy).length + 1}`;
    const newCombatant: Combatant = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      initiative: 0,
      hp: 10,
      maxHp: 10,
      isEnemy
    };
    setCombatants([...combatants, newCombatant]);
  };

  const removeCombatant = (id: string) => {
    setCombatants(combatants.filter(c => c.id !== id));
  };

  const startBattle = () => {
    if (combatants.length < 2) {
      toast.error("Adicione pelo menos 2 combatentes!");
      return;
    }
    const sorted = [...combatants].sort((a, b) => b.initiative - a.initiative);
    setCombatants(sorted);
    setIsBattleStarted(true);
    setCurrentTurn(0);
    setRound(1);
    toast.success("A Batalha Começou!");
  };

  const nextTurn = () => {
    if (currentTurn === combatants.length - 1) {
      setCurrentTurn(0);
      setRound(round + 1);
      toast(`Rodada ${round + 1}`, { icon: <RotateCcw className="w-4 h-4" /> });
    } else {
      setCurrentTurn(currentTurn + 1);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="font-['Cinzel_Decorative'] text-2xl font-black text-orange-500 flex items-center gap-3">
            <Sword className="w-6 h-6" /> Rastreador de Batalha
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Gerenciador de Iniciativa e Turnos</p>
        </div>
        <div className="flex gap-2">
          {!isBattleStarted ? (
            <Button onClick={startBattle} className="bg-orange-600 hover:bg-orange-500 font-bold uppercase text-xs tracking-widest px-6">
              <Play className="w-4 h-4 mr-2" /> Iniciar Combate
            </Button>
          ) : (
            <Button onClick={() => setIsBattleStarted(false)} variant="outline" className="border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30">
              <X className="w-4 h-4 mr-2" /> Encerrar
            </Button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Combatentes */}
        <div className="lg:col-span-8 space-y-4">
          {combatants.map((c, i) => (
            <div 
              key={c.id} 
              className={`relative overflow-hidden p-4 rounded-xl border transition-all duration-300 flex items-center justify-between
                ${isBattleStarted && currentTurn === i ? 'bg-orange-500/10 border-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.1)] scale-[1.02]' : 'bg-black/20 border-white/5'}
                ${c.isEnemy ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'}
              `}
            >
              {isBattleStarted && currentTurn === i && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 animate-pulse" />
              )}
              
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg
                  ${c.isEnemy ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {c.initiative || 0}
                </div>
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    {c.name}
                    {isBattleStarted && currentTurn === i && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded uppercase font-black">Turno Atual</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1 bg-black/40 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${c.isEnemy ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${(c.hp/c.maxHp)*100}%`}} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white/40">{c.hp}/{c.maxHp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-4">
                {!isBattleStarted && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-white/20">Ini</span>
                    <Input 
                      type="number" 
                      className="w-16 h-8 bg-black/40 border-white/5 text-center font-bold"
                      value={c.initiative}
                      onChange={(e) => {
                        const newC = [...combatants];
                        newC[i].initiative = parseInt(e.target.value) || 0;
                        setCombatants(newC);
                      }}
                    />
                  </div>
                )}
                <Button onClick={() => removeCombatant(c.id)} variant="ghost" size="icon" className="h-8 w-8 text-white/20 hover:text-red-400">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          {!isBattleStarted && (
            <div className="flex gap-4 pt-4">
              <Button onClick={() => addCombatant(false)} variant="outline" className="flex-1 border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                <Plus className="w-4 h-4 mr-2" /> Adicionar Jogador
              </Button>
              <Button onClick={() => addCombatant(true)} variant="outline" className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10">
                <Skull className="w-4 h-4 mr-2" /> Adicionar Inimigo
              </Button>
            </div>
          )}
        </div>

        {/* Painel de Controle */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Rodada Atual</div>
            <div className="text-6xl font-['Cinzel'] font-black text-orange-500">{round}</div>
            <div className="h-[1px] bg-white/5 my-6" />
            {isBattleStarted && (
              <Button onClick={nextTurn} className="w-full h-16 bg-orange-600 hover:bg-orange-500 text-lg font-black uppercase tracking-tighter">
                Próximo Turno <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            )}
          </Card>

          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
              <Plus className="w-3 h-3" /> Guia de Batalha
            </h3>
            <ul className="space-y-3 text-xs text-white/30">
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">1.</span>
                <span>Adicione todos os piratas e inimigos envolvidos.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">2.</span>
                <span>Insira os valores de Iniciativa rolados.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500 font-bold">3.</span>
                <span>Inicie o combate para organizar a ordem.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
