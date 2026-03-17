import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateModifier } from '@/lib/character-types';
import { 
  ArrowLeft, 
  Download, 
  Edit2, 
  Save, 
  X, 
  Shield, 
  Heart, 
  Zap, 
  Sword, 
  Scroll, 
  Coins, 
  User,
  Dices,
  Star,
  Package,
  Weight,
  Flame
} from 'lucide-react';
import { toast } from 'sonner';

export default function CharacterSheet() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedChar, setEditedChar] = useState<any>(null);

  const pathname = window.location.pathname;
  const characterId = pathname.split('/').pop();

  const { data: character, isLoading, refetch } = trpc.characters.getById.useQuery(
    { id: characterId || '' },
    { enabled: !!characterId }
  );

  const updateMutation = trpc.characters.update.useMutation({
    onSuccess: () => {
      toast.success('Ficha atualizada!');
      setIsEditing(false);
      refetch();
    },
    onError: (e) => toast.error(`Erro: ${e.message}`)
  });

  useEffect(() => {
    if (character) {
      const char = JSON.parse(JSON.stringify(character));
      // Inicializar campos novos se não existirem
      if (!char.experiencePoints) char.experiencePoints = 0;
      if (!char.weapons) char.weapons = [];
      if (!char.items) char.items = [];
      setEditedChar(char);
    }
  }, [character]);

  if (isLoading || !editedChar) return <div className="min-h-screen bg-[oklch(0.08_0.02_240)] flex items-center justify-center text-white">Carregando...</div>;

  const attributes = editedChar.attributes as Record<string, number>;
  const modifiers: any = {
    forca: calculateModifier(attributes.forca),
    destreza: calculateModifier(attributes.destreza),
    constituicao: calculateModifier(attributes.constituicao),
    sabedoria: calculateModifier(attributes.sabedoria),
    vontade: calculateModifier(attributes.vontade),
    presenca: calculateModifier(attributes.presenca),
  };

  // Cálculo de XP e Nível
  const xpNextLevel = editedChar.level * 1000;
  const xpProgress = (editedChar.experiencePoints / xpNextLevel) * 100;

  const rollDice = (name: string, mod: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    toast(`${name}: ${roll} + ${mod} = ${roll + mod}`, { icon: <Dices className="text-orange-500" /> });
  };

  const rollDamage = (weaponName: string, dice: string, mod: number) => {
    const [count, sides] = dice.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
    toast(`Dano (${weaponName}): ${total} + ${mod} = ${total + mod}`, { icon: <Flame className="text-red-500" /> });
  };

  const totalWeight = [...(editedChar.weapons || []), ...(editedChar.items || [])].reduce((acc, i) => acc + (i.weight || 0), 0);
  const maxWeight = attributes.forca * 5;

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.02_240)] text-[oklch(0.92_0.01_240)] pb-12">
      <div className="sticky top-0 z-10 bg-[oklch(0.10_0.03_240)]/90 backdrop-blur-sm border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate('/characters')} variant="ghost" size="sm" className="text-white/50 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            <h1 className="font-['Cinzel_Decorative'] text-lg font-bold">{editedChar.name}</h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <Button onClick={() => updateMutation.mutate({ id: characterId!, ...editedChar })} size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Save className="w-4 h-4 mr-2" /> Salvar
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="border-white/10">
                <Edit2 className="w-4 h-4 mr-2" /> Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Top Stats & XP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6 md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase"><Heart className="w-3 h-3" /> Vida</div>
                <div className="text-2xl font-bold">{editedChar.currentHealth} / {editedChar.maxHealth}</div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full transition-all" style={{ width: `${(editedChar.currentHealth/editedChar.maxHealth)*100}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase"><Zap className="w-3 h-3" /> Energia</div>
                <div className="text-2xl font-bold">{editedChar.currentPowerPoints} / {editedChar.maxPowerPoints}</div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full transition-all" style={{ width: `${(editedChar.currentPowerPoints/editedChar.maxPowerPoints)*100}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase"><Shield className="w-3 h-3" /> Defesa</div>
                <div className="text-2xl font-bold">{editedChar.armorClass}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase"><Star className="w-3 h-3" /> Nível</div>
                <div className="text-2xl font-bold">{editedChar.level}</div>
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase text-white/40">
                <span>Experiência (XP)</span>
                <span>{editedChar.experiencePoints} / {xpNextLevel}</span>
              </div>
              <div className="w-full bg-black/40 h-3 rounded-full overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-orange-600 to-yellow-500 h-full transition-all shadow-[0_0_15px_rgba(234,88,12,0.4)]" style={{ width: `${xpProgress}%` }} />
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <Input 
                    type="number" 
                    placeholder="Adicionar XP" 
                    className="bg-black/20 border-white/10 h-8 text-xs"
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        const val = parseInt(e.target.value);
                        setEditedChar({...editedChar, experiencePoints: editedChar.experiencePoints + val});
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6 flex flex-col justify-center items-center text-center">
            <div className="text-xs font-bold text-white/40 uppercase mb-2">Bellys (฿)</div>
            <div className="text-3xl font-mono font-bold text-yellow-500">฿ {editedChar.bellys?.toLocaleString()}</div>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
              <Weight className="w-3 h-3" />
              <span>Carga: {totalWeight.toFixed(1)} / {maxWeight}kg</span>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="combat" className="w-full">
          <TabsList className="w-full bg-[oklch(0.12_0.04_240)] border border-white/5 h-12">
            <TabsTrigger value="combat" className="flex-1">Combate</TabsTrigger>
            <TabsTrigger value="inventory" className="flex-1">Inventário</TabsTrigger>
            <TabsTrigger value="skills" className="flex-1">Perícias</TabsTrigger>
            <TabsTrigger value="haki" className="flex-1">Poderes</TabsTrigger>
          </TabsList>

          <TabsContent value="combat" className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Atributos */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(attributes).map(([attr, val]) => (
                <button 
                  key={attr} 
                  onClick={() => !isEditing && rollDice(attr.toUpperCase(), modifiers[attr])}
                  className="bg-[oklch(0.14_0.04_240)] border border-white/5 p-4 rounded-xl hover:border-orange-500/50 transition-all group"
                >
                  <div className="text-[10px] font-black uppercase text-white/40 mb-1">{attr}</div>
                  <div className="text-3xl font-['Cinzel'] font-black">{val}</div>
                  <div className={`text-sm font-bold ${modifiers[attr] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {modifiers[attr] >= 0 ? '+' : ''}{modifiers[attr]}
                  </div>
                </button>
              ))}
            </div>

            {/* Ataques com Calculadora */}
            <Card className="lg:col-span-2 bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
              <h3 className="font-['Cinzel'] font-bold text-lg mb-6 flex items-center gap-2 text-red-400"><Sword className="w-5 h-5" /> Ataques & Técnicas</h3>
              <div className="space-y-4">
                {/* Ataque Padrão */}
                <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center group">
                  <div className="flex-1">
                    <h4 className="font-bold">Ataque Desarmado</h4>
                    <p className="text-xs text-white/40">Modificador de Força</p>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={() => rollDice('ACERTO', modifiers.forca + editedChar.proficiencyBonus)} size="sm" variant="ghost" className="h-12 flex flex-col hover:bg-orange-500/10 border border-white/5">
                      <span className="text-[10px] uppercase text-white/40">Acerto</span>
                      <span className="font-bold text-orange-400">+{modifiers.forca + editedChar.proficiencyBonus}</span>
                    </Button>
                    <Button onClick={() => rollDamage('Desarmado', '1d4', modifiers.forca)} size="sm" variant="ghost" className="h-12 flex flex-col hover:bg-red-500/10 border border-white/5">
                      <span className="text-[10px] uppercase text-white/40">Dano</span>
                      <span className="font-bold text-red-400">1d4 + {modifiers.forca}</span>
                    </Button>
                  </div>
                </div>

                {/* Armas do Inventário */}
                {editedChar.weapons?.map((w: any, i: number) => (
                  <div key={i} className="p-4 rounded-lg bg-black/20 border border-white/5 flex justify-between items-center group">
                    <div className="flex-1">
                      <h4 className="font-bold">{w.name}</h4>
                      <p className="text-xs text-white/40 capitalize">{w.rarity} • {w.attribute}</p>
                    </div>
                    <div className="flex gap-4">
                      <Button onClick={() => rollDice('ACERTO', modifiers[w.attribute] + editedChar.proficiencyBonus + (w.bonus || 0))} size="sm" variant="ghost" className="h-12 flex flex-col hover:bg-orange-500/10 border border-white/5">
                        <span className="text-[10px] uppercase text-white/40">Acerto</span>
                        <span className="font-bold text-orange-400">+{modifiers[w.attribute] + editedChar.proficiencyBonus + (w.bonus || 0)}</span>
                      </Button>
                      <Button onClick={() => rollDamage(w.name, w.damageDice, modifiers[w.attribute] + (w.bonus || 0))} size="sm" variant="ghost" className="h-12 flex flex-col hover:bg-red-500/10 border border-white/5">
                        <span className="text-[10px] uppercase text-white/40">Dano</span>
                        <span className="font-bold text-red-400">{w.damageDice} + {modifiers[w.attribute] + (w.bonus || 0)}</span>
                      </Button>
                    </div>
                  </div>
                ))}
                
                {isEditing && (
                   <Button variant="ghost" className="w-full border-dashed border-white/10 text-white/30 text-xs">+ Adicionar Arma</Button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold uppercase text-white/40 mb-4 flex items-center gap-2"><Package className="w-3 h-3" /> Itens & Equipamentos</h3>
                  <div className="space-y-2">
                    {editedChar.items?.length > 0 ? editedChar.items.map((item: any, i: number) => (
                      <div key={i} className="p-3 rounded bg-black/20 border border-white/5 flex justify-between items-center">
                        <div>
                          <span className="text-sm font-bold">{item.name}</span>
                          <div className="flex gap-2 text-[10px] uppercase font-bold">
                            <span className={item.rarity === 'lendario' ? 'text-orange-500' : 'text-white/40'}>{item.rarity}</span>
                            <span className="text-white/20">•</span>
                            <span className="text-white/40">{item.weight}kg</span>
                          </div>
                        </div>
                        {isEditing && <Button size="sm" variant="ghost" className="text-red-400 h-6 w-6 p-0">×</Button>}
                      </div>
                    )) : <p className="text-sm text-white/20 italic">Mochila vazia.</p>}
                  </div>
                </div>
                
                <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                  <h3 className="text-xs font-bold uppercase text-white/40 mb-4">Resumo de Carga</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm">Peso Total</span>
                      <span className="text-xl font-bold">{totalWeight.toFixed(1)} <span className="text-xs text-white/40">/ {maxWeight}kg</span></span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${totalWeight > maxWeight ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${Math.min((totalWeight/maxWeight)*100, 100)}%` }} />
                    </div>
                    {totalWeight > maxWeight && <p className="text-[10px] text-red-400 font-bold uppercase">⚠️ Sobrecarga: Penalidade em Destreza!</p>}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-1">
                {Object.entries(editedChar.skills || {}).map(([skill, val]: [string, any]) => {
                  const bonus = val + (editedChar.proficiencies?.includes(skill) ? editedChar.proficiencyBonus : 0);
                  return (
                    <div key={skill} onClick={() => !isEditing && rollDice(skill.toUpperCase(), bonus)} className="flex justify-between items-center p-2 rounded hover:bg-white/5 cursor-pointer group">
                      <span className="text-sm capitalize text-white/60 group-hover:text-white">{skill}</span>
                      <span className={`text-sm font-bold ${bonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>{bonus >= 0 ? '+' : ''}{bonus}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="haki" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
              <h3 className="font-['Cinzel'] font-bold text-lg mb-4 text-purple-400">Haki</h3>
              <p className="text-sm text-white/40 italic">O poder da vontade ainda não foi despertado.</p>
            </Card>
            <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6">
              <h3 className="font-['Cinzel'] font-bold text-lg mb-4 text-orange-400">Akuma no Mi</h3>
              <p className="text-sm text-white/40 italic">Nenhum fruto consumido.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
