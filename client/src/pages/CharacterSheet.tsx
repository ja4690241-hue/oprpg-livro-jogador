import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  calculateModifier, 
  calculateMaxHealth, 
  calculateMaxPowerPoints, 
  calculateProficiencyBonus,
  Character
} from '@/lib/character-types';
import { 
  ArrowLeft, 
  Edit2, 
  Save, 
  Shield, 
  Heart, 
  Zap, 
  Sword, 
  Star, 
  Package,
  Skull,
  Dices,
  Flame,
  Target,
  BicepsFlexed
} from 'lucide-react';
import { toast } from 'sonner';

export default function CharacterSheet() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedChar, setEditedChar] = useState<Character | null>(null);

  const pathname = window.location.pathname;
  const characterId = pathname.split('/').pop();

  const { data: character, isLoading, refetch } = trpc.characters.getById.useQuery(
    { id: characterId || '' },
    { enabled: !!characterId }
  );

  const updateMutation = trpc.characters.update.useMutation({
    onSuccess: () => {
      toast.success('Ficha atualizada com sucesso!');
      setIsEditing(false);
      refetch();
    },
    onError: (e) => toast.error(`Erro ao salvar: ${e.message}`)
  });

  useEffect(() => {
    if (character) {
      setEditedChar(JSON.parse(JSON.stringify(character)));
    }
  }, [character]);

  // Cálculos dinâmicos baseados no PDF v1.5.7
  const stats = useMemo(() => {
    if (!editedChar) return null;
    return {
      maxHealth: calculateMaxHealth(editedChar),
      maxPP: calculateMaxPowerPoints(editedChar.level),
      profBonus: calculateProficiencyBonus(editedChar.level),
      ca: 10 + calculateModifier(editedChar.attributes.destreza) + (editedChar.combatStyle === 'ciborgue' ? 2 : 0),
      modifiers: {
        forca: calculateModifier(editedChar.attributes.forca),
        destreza: calculateModifier(editedChar.attributes.destreza),
        constituicao: calculateModifier(editedChar.attributes.constituicao),
        sabedoria: calculateModifier(editedChar.attributes.sabedoria),
        vontade: calculateModifier(editedChar.attributes.vontade),
        presenca: calculateModifier(editedChar.attributes.presenca),
      }
    };
  }, [editedChar]);

  if (isLoading || !editedChar || !stats) return (
    <div className="min-h-screen bg-[oklch(0.05_0.02_240)] flex items-center justify-center">
      <div className="animate-pulse text-orange-500 font-['Cinzel']">Carregando Ficha...</div>
    </div>
  );

  const rollDice = (name: string, mod: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    toast(`${name}: ${roll} ${mod >= 0 ? '+' : ''}${mod} = ${total}`, { 
      icon: <Dices className={roll === 20 ? "text-yellow-400 animate-bounce" : "text-orange-500"} />,
      description: roll === 20 ? "SUCESSO CRÍTICO!" : roll === 1 ? "FALHA CRÍTICA!" : ""
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.05_0.02_240)] text-[oklch(0.95_0.01_240)] pb-20">
      {/* Header Premium */}
      <div className="sticky top-0 z-20 bg-[oklch(0.08_0.03_240)]/95 backdrop-blur-md border-b border-orange-500/10 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Button onClick={() => navigate('/characters')} variant="ghost" className="text-white/40 hover:text-orange-400">
              <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
            </Button>
            <div className="flex flex-col">
              <h1 className="font-['Cinzel_Decorative'] text-2xl font-black text-white">
                {editedChar.name}
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-500">
                <Skull className="w-3 h-3" /> Nível {editedChar.level} {editedChar.combatStyle}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <Button onClick={() => updateMutation.mutate({ id: characterId!, ...editedChar })} className="bg-orange-600 hover:bg-orange-500">
                <Save className="w-4 h-4 mr-2" /> Salvar
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/10 hover:border-orange-500">
                <Edit2 className="w-4 h-4 mr-2" /> Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Wanted Poster & Status */}
        <div className="lg:col-span-4 space-y-8">
          {/* Wanted Poster Style */}
          <Card className="bg-[#d4c4a8] border-8 border-[#8b7355] p-6 shadow-2xl flex flex-col items-center text-[#4a3728] relative overflow-hidden">
            <div className="font-['Cinzel_Decorative'] text-5xl font-black mb-2">WANTED</div>
            <div className="font-['Cinzel'] text-[10px] font-bold uppercase tracking-widest mb-4">Dead or Alive</div>
            <div className="w-full aspect-square bg-[#4a3728]/10 rounded border-2 border-[#4a3728]/20 flex items-center justify-center mb-4 text-6xl">
              🏴‍☠️
            </div>
            <div className="text-center w-full">
              <div className="font-['Cinzel_Decorative'] text-3xl font-black mb-1 truncate">{editedChar.name}</div>
              <div className="font-['Cinzel'] text-sm font-bold border-t-2 border-[#4a3728]/40 pt-2">฿ {editedChar.bounty?.toLocaleString()}</div>
            </div>
          </Card>

          {/* Status Bars */}
          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-red-400"><Heart className="w-4 h-4" /> Pontos de Vida</div>
                <div className="font-mono text-xl font-bold">{editedChar.currentHealth} <span className="text-white/20">/ {stats.maxHealth}</span></div>
              </div>
              <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-500" style={{width: `${(editedChar.currentHealth/stats.maxHealth)*100}%`}} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-400"><Zap className="w-4 h-4" /> Pontos de Poder</div>
                <div className="font-mono text-xl font-bold">{editedChar.currentPowerPoints} <span className="text-white/20">/ {stats.maxPP}</span></div>
              </div>
              <div className="h-3 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500" style={{width: `${(editedChar.currentPowerPoints/stats.maxPP)*100}%`}} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                <div className="text-[10px] font-black uppercase text-white/30 mb-1">Defesa (CA)</div>
                <div className="text-3xl font-['Cinzel'] font-black text-blue-400">{stats.ca}</div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center">
                <div className="text-[10px] font-black uppercase text-white/30 mb-1">Proficiência</div>
                <div className="text-3xl font-['Cinzel'] font-black text-orange-500">+{stats.profBonus}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Lado Direito: Tabs */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="combat" className="w-full">
            <TabsList className="w-full bg-[oklch(0.10_0.03_240)] border border-white/5 h-14 p-1 mb-8">
              <TabsTrigger value="combat" className="flex-1 gap-2 data-[state=active]:bg-orange-600"><Sword className="w-4 h-4" /> Combate</TabsTrigger>
              <TabsTrigger value="skills" className="flex-1 gap-2 data-[state=active]:bg-orange-600"><Star className="w-4 h-4" /> Perícias</TabsTrigger>
              <TabsTrigger value="inventory" className="flex-1 gap-2 data-[state=active]:bg-orange-600"><Package className="w-4 h-4" /> Inventário</TabsTrigger>
            </TabsList>

            <TabsContent value="combat" className="space-y-8">
              {/* Atributos */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(editedChar.attributes).map(([attr, val]) => (
                  <button 
                    key={attr} 
                    onClick={() => !isEditing && rollDice(attr.toUpperCase(), (stats.modifiers as any)[attr])}
                    className="bg-[oklch(0.14_0.04_240)] border border-white/5 p-5 rounded-2xl hover:border-orange-500/50 transition-all group text-left"
                  >
                    <div className="text-[10px] font-black uppercase text-white/40 mb-1 tracking-widest">{attr}</div>
                    <div className="text-4xl font-['Cinzel'] font-black group-hover:scale-110 transition-transform">{val}</div>
                    <div className={`text-sm font-bold mt-1 ${(stats.modifiers as any)[attr] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(stats.modifiers as any)[attr] >= 0 ? '+' : ''}{(stats.modifiers as any)[attr]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Ataques Rápidos */}
              <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
                <h3 className="font-['Cinzel'] font-black text-xl mb-6 flex items-center gap-3 text-orange-500">
                  <Target className="w-6 h-6" /> Ataques Rápidos
                </h3>
                <div className="space-y-4">
                  {editedChar.weapons.map((weapon, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                      <div>
                        <div className="font-bold text-sm uppercase">{weapon.name}</div>
                        <div className="text-[10px] text-white/40 uppercase">{weapon.damageDice} + {(stats.modifiers as any)[weapon.attribute]}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => rollDice('ATAQUE', (stats.modifiers as any)[weapon.attribute] + stats.profBonus)}>Acerto</Button>
                        <Button size="sm" className="bg-orange-600" onClick={() => toast(`DANO: ${weapon.damageDice} + ${(stats.modifiers as any)[weapon.attribute]}`)}>Dano</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
               <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {Object.entries(editedChar.skills).map(([skill, val]) => {
                      const isProficient = editedChar.proficiencies.includes(skill);
                      const bonus = (val as number) + (isProficient ? stats.profBonus : 0);
                      return (
                        <div key={skill} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors group">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isProficient ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-white/10'}`} />
                            <span className="text-sm capitalize text-white/70">{skill}</span>
                          </div>
                          <span className="font-mono font-bold text-orange-500">{bonus >= 0 ? '+' : ''}{bonus}</span>
                        </div>
                      );
                    })}
                  </div>
               </Card>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
               <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-['Cinzel'] font-black text-xl text-orange-500 flex items-center gap-3">
                      <Package className="w-6 h-6" /> Itens de Aventura
                    </h3>
                    <div className="text-xl font-['Cinzel'] font-black text-yellow-500">฿ {editedChar.bellys?.toLocaleString()}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {editedChar.items.map((item, i) => (
                      <div key={i} className="p-4 bg-black/20 rounded-xl border border-white/5 flex justify-between items-center">
                        <span className="text-sm font-bold">{item.name}</span>
                        <span className="text-[10px] text-white/30 uppercase">{item.weight} KG</span>
                      </div>
                    ))}
                  </div>
               </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
