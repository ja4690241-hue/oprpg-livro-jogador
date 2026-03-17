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
  Flame,
  Skull
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
      toast.success('Ficha salva no Log de Bordo!');
      setIsEditing(false);
      refetch();
    },
    onError: (e) => toast.error(`Falha na comunicação: ${e.message}`)
  });

  useEffect(() => {
    if (character) {
      setEditedChar(JSON.parse(JSON.stringify(character)));
    }
  }, [character]);

  if (isLoading || !editedChar) return (
    <div className="min-h-screen bg-[oklch(0.05_0.02_240)] flex items-center justify-center">
      <div className="animate-pulse text-orange-500 font-['Cinzel']">Zarpando...</div>
    </div>
  );

  const attributes = editedChar.attributes as Record<string, number>;
  const modifiers: any = {
    forca: calculateModifier(attributes.forca),
    destreza: calculateModifier(attributes.destreza),
    constituicao: calculateModifier(attributes.constituicao),
    sabedoria: calculateModifier(attributes.sabedoria),
    vontade: calculateModifier(attributes.vontade),
    presenca: calculateModifier(attributes.presenca),
  };

  // Automação de Status
  const autoMaxHealth = 10 + (modifiers.constituicao * editedChar.level) + (editedChar.combatStyle === 'lutador' ? 5 : 0);
  const autoMaxPower = 5 + (modifiers.vontade * 2);
  const autoCA = 10 + modifiers.destreza + (editedChar.combatStyle === 'ciborgue' ? 2 : 0);

  const rollDice = (name: string, mod: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    toast(`${name}: ${roll} + ${mod} = ${total}`, { 
      icon: <Dices className={roll === 20 ? "text-yellow-400 animate-bounce" : "text-orange-500"} />,
      description: roll === 20 ? "CRÍTICO!" : roll === 1 ? "FALHA CRÍTICA!" : ""
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.05_0.02_240)] text-[oklch(0.95_0.01_240)] pb-20 selection:bg-orange-500/30">
      {/* Header Premium */}
      <div className="sticky top-0 z-20 bg-[oklch(0.08_0.03_240)]/95 backdrop-blur-md border-b border-orange-500/10 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Button onClick={() => navigate('/characters')} variant="ghost" className="text-white/40 hover:text-orange-400 hover:bg-orange-400/5 transition-all">
              <ArrowLeft className="w-5 h-5 mr-2" /> Voltar
            </Button>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-col">
              <h1 className="font-['Cinzel_Decorative'] text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {editedChar.name}
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-orange-500/80">
                <Skull className="w-3 h-3" /> Nível {editedChar.level} {editedChar.combatStyle}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <Button onClick={() => updateMutation.mutate({ id: characterId!, ...editedChar })} className="bg-orange-600 hover:bg-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.3)] px-6">
                <Save className="w-4 h-4 mr-2" /> Salvar Ficha
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/10 hover:border-orange-500/50 hover:bg-orange-500/5">
                <Edit2 className="w-4 h-4 mr-2" /> Modificar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lado Esquerdo: Wanted Poster & Status */}
        <div className="lg:col-span-4 space-y-8">
          {/* Wanted Poster */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-b from-orange-900/20 to-transparent rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <Card className="relative bg-[#d4c4a8] border-8 border-[#8b7355] p-6 shadow-2xl overflow-hidden aspect-[3/4] flex flex-col items-center justify-between text-[#4a3728]">
              <div className="font-['Cinzel_Decorative'] text-5xl font-black tracking-tighter mb-2">WANTED</div>
              <div className="font-['Cinzel'] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Dead or Alive</div>
              <div className="flex-1 w-full bg-[#4a3728]/10 rounded border-2 border-[#4a3728]/20 flex items-center justify-center mb-4">
                <User className="w-32 h-32 text-[#4a3728]/30" />
              </div>
              <div className="text-center w-full">
                <div className="font-['Cinzel_Decorative'] text-3xl font-black mb-1 truncate px-2">{editedChar.name}</div>
                <div className="font-['Cinzel'] text-sm font-bold border-t-2 border-[#4a3728]/40 pt-2 mb-1">฿ {editedChar.bounty?.toLocaleString()} —</div>
                <div className="font-serif italic text-[10px] opacity-60 uppercase tracking-widest">Marine Headquarter</div>
              </div>
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-paper.png)'}} />
            </Card>
          </div>

          {/* Status Bars Premium */}
          <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-red-400"><Heart className="w-4 h-4" /> Vitalidade</div>
                <div className="font-mono text-xl font-bold">{editedChar.currentHealth} <span className="text-white/20">/ {autoMaxHealth}</span></div>
              </div>
              <div className="h-4 bg-black/40 rounded-full overflow-hidden p-1 border border-white/5">
                <div className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]" style={{width: `${(editedChar.currentHealth/autoMaxHealth)*100}%`}} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-yellow-400"><Zap className="w-4 h-4" /> Energia</div>
                <div className="font-mono text-xl font-bold">{editedChar.currentPowerPoints} <span className="text-white/20">/ {autoMaxPower}</span></div>
              </div>
              <div className="h-4 bg-black/40 rounded-full overflow-hidden p-1 border border-white/5">
                <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" style={{width: `${(editedChar.currentPowerPoints/autoMaxPower)*100}%`}} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center group hover:border-blue-400/30 transition-colors">
                <div className="text-[10px] font-black uppercase text-white/30 mb-1">Defesa (CA)</div>
                <div className="text-3xl font-['Cinzel'] font-black text-blue-400">{autoCA}</div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-center group hover:border-orange-500/30 transition-colors">
                <div className="text-[10px] font-black uppercase text-white/30 mb-1">Proficiência</div>
                <div className="text-3xl font-['Cinzel'] font-black text-orange-500">+{editedChar.proficiencyBonus}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Lado Direito: Tabs de Jogo */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="combat" className="w-full">
            <TabsList className="w-full bg-[oklch(0.10_0.03_240)] border border-white/5 h-14 p-1 mb-8">
              <TabsTrigger value="combat" className="flex-1 gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"><Sword className="w-4 h-4" /> Combate</TabsTrigger>
              <TabsTrigger value="skills" className="flex-1 gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"><Star className="w-4 h-4" /> Perícias</TabsTrigger>
              <TabsTrigger value="powers" className="flex-1 gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"><Flame className="w-4 h-4" /> Poderes</TabsTrigger>
              <TabsTrigger value="cargo" className="flex-1 gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all"><Package className="w-4 h-4" /> Carga</TabsTrigger>
            </TabsList>

            <TabsContent value="combat" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Atributos Estilizados */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(attributes).map(([attr, val]) => (
                  <button 
                    key={attr} 
                    onClick={() => !isEditing && rollDice(attr.toUpperCase(), modifiers[attr])}
                    className="relative overflow-hidden bg-[oklch(0.14_0.04_240)] border border-white/5 p-5 rounded-2xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                  >
                    <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Skull className="w-16 h-16" />
                    </div>
                    <div className="text-[10px] font-black uppercase text-white/40 mb-1 tracking-widest">{attr}</div>
                    <div className="text-4xl font-['Cinzel'] font-black group-hover:scale-110 transition-transform duration-300">{val}</div>
                    <div className={`text-sm font-bold mt-1 ${modifiers[attr] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {modifiers[attr] >= 0 ? '+' : ''}{modifiers[attr]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Técnicas e Ataques */}
              <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-['Cinzel'] font-black text-xl flex items-center gap-3 text-orange-500">
                    <Sword className="w-6 h-6" /> Arsenal de Combate
                  </h3>
                  <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">+ Nova Técnica</Button>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-black/30 border border-white/5 flex justify-between items-center group hover:border-orange-500/30 transition-all">
                    <div>
                      <h4 className="font-black text-lg">Ataque Desarmado</h4>
                      <p className="text-xs text-white/30 uppercase font-bold">Estilo de Luta • Força</p>
                    </div>
                    <div className="flex gap-4">
                      <Button onClick={() => rollDice('ACERTO', modifiers.forca + editedChar.proficiencyBonus)} variant="ghost" className="h-14 flex flex-col border border-white/5 hover:bg-orange-500/10 hover:border-orange-500/30">
                        <span className="text-[10px] font-black text-white/40 uppercase">Acerto</span>
                        <span className="text-xl font-black text-orange-500">+{modifiers.forca + editedChar.proficiencyBonus}</span>
                      </Button>
                      <Button variant="ghost" className="h-14 flex flex-col border border-white/5 hover:bg-red-500/10 hover:border-red-500/30">
                        <span className="text-[10px] font-black text-white/40 uppercase">Dano</span>
                        <span className="text-xl font-black text-red-500">1d4+{modifiers.forca}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="animate-in fade-in duration-500">
              <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-2">
                  {Object.entries(editedChar.skills || {}).map(([skill, val]: [string, any]) => {
                    const bonus = val + (editedChar.proficiencies?.includes(skill) ? editedChar.proficiencyBonus : 0);
                    return (
                      <div key={skill} onClick={() => !isEditing && rollDice(skill.toUpperCase(), bonus)} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-all">
                        <span className="text-sm capitalize text-white/50 group-hover:text-white font-medium">{skill.replace(/([A-Z])/g, ' $1')}</span>
                        <span className={`text-sm font-black font-mono ${bonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {bonus >= 0 ? '+' : ''}{bonus}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="cargo" className="animate-in fade-in duration-500">
               <Card className="bg-[oklch(0.12_0.04_240)] border-white/5 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
                  <Package className="w-16 h-16 text-white/10 mb-4" />
                  <h3 className="font-['Cinzel'] font-bold text-white/40">Inventário de Carga</h3>
                  <p className="text-sm text-white/20 mt-2">Nenhum item pesado registrado no porão do navio.</p>
               </Card>
            </TabsContent>

            <TabsContent value="powers" className="animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-purple-900/5 border-purple-500/10 p-8 text-center border-dashed">
                    <h3 className="font-['Cinzel'] font-black text-purple-400 mb-2">Haki</h3>
                    <p className="text-xs text-purple-400/40 uppercase font-bold tracking-widest">Poder Adormecido</p>
                  </Card>
                  <Card className="bg-orange-900/5 border-orange-500/10 p-8 text-center border-dashed">
                    <h3 className="font-['Cinzel'] font-black text-orange-400 mb-2">Akuma no Mi</h3>
                    <p className="text-xs text-orange-400/40 uppercase font-bold tracking-widest">Fruto do Diabo</p>
                  </Card>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer Status Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 flex justify-around md:hidden z-30">
        <div className="flex flex-col items-center"><Heart className="w-5 h-5 text-red-500" /><span className="text-[10px] font-bold mt-1">{editedChar.currentHealth}</span></div>
        <div className="flex flex-col items-center"><Zap className="w-5 h-5 text-yellow-500" /><span className="text-[10px] font-bold mt-1">{editedChar.currentPowerPoints}</span></div>
        <div className="flex flex-col items-center"><Shield className="w-5 h-5 text-blue-400" /><span className="text-[10px] font-bold mt-1">{autoCA}</span></div>
        <div className="flex flex-col items-center"><Coins className="w-5 h-5 text-yellow-600" /><span className="text-[10px] font-bold mt-1">{editedChar.bellys?.toLocaleString()}</span></div>
      </div>
    </div>
  );
}
