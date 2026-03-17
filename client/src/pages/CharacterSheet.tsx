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
  Dices
} from 'lucide-react';
import { toast } from 'sonner';

export default function CharacterSheet() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedChar, setEditedChar] = useState<any>(null);

  // Pegar ID da URL
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
    onError: (error) => {
      toast.error(`Erro ao atualizar: ${error.message}`);
    }
  });

  useEffect(() => {
    if (character) {
      setEditedChar(JSON.parse(JSON.stringify(character)));
    }
  }, [character]);

  if (isLoading || !editedChar) {
    return (
      <div className="min-h-screen bg-[oklch(0.10_0.03_240)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[oklch(0.55_0.22_25)] mx-auto mb-4"></div>
          <p className="text-[oklch(0.50_0.02_240)]">Carregando ficha do pirata...</p>
        </div>
      </div>
    );
  }

  const attributes = editedChar.attributes as Record<string, number>;
  const modifiers = {
    forca: calculateModifier(attributes.forca),
    destreza: calculateModifier(attributes.destreza),
    constituicao: calculateModifier(attributes.constituicao),
    sabedoria: calculateModifier(attributes.sabedoria),
    vontade: calculateModifier(attributes.vontade),
    presenca: calculateModifier(attributes.presenca),
  };

  const handleSave = () => {
    updateMutation.mutate({
      id: characterId!,
      ...editedChar
    });
  };

  const updateAttr = (attr: string, val: number) => {
    setEditedChar({
      ...editedChar,
      attributes: { ...editedChar.attributes, [attr]: val }
    });
  };

  const rollDice = (name: string, mod: number) => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const total = roll + mod;
    toast(`${name}: ${roll} + ${mod} = ${total}`, {
      icon: <Dices className="w-4 h-4 text-[oklch(0.55_0.22_25)]" />,
    });
  };

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.02_240)] text-[oklch(0.92_0.01_240)] pb-12">
      {/* Barra de Topo */}
      <div className="sticky top-0 z-10 bg-[oklch(0.10_0.03_240)]/80 backdrop-blur-md border-b border-[oklch(0.20_0.05_240)] px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/characters')}
              variant="ghost"
              size="sm"
              className="text-[oklch(0.50_0.02_240)] hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div className="h-6 w-[1px] bg-[oklch(0.20_0.05_240)]" />
            <h1 className="font-['Cinzel_Decorative'] text-lg font-bold hidden md:block">
              {editedChar.name}
            </h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditedChar(JSON.parse(JSON.stringify(character)));
                  }}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4 mr-2" /> Cancelar
                </Button>
                <Button 
                  onClick={handleSave}
                  size="sm"
                  className="bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
                  disabled={updateMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" /> Salvar
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  size="sm"
                  className="border-[oklch(0.20_0.05_240)]"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Editar
                </Button>
                <Button variant="outline" size="sm" className="border-[oklch(0.20_0.05_240)]">
                  <Download className="w-4 h-4 mr-2" /> PDF
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Info Básica */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-4 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-[oklch(0.15_0.05_240)] border-2 border-[oklch(0.55_0.22_25)] flex items-center justify-center mb-4 overflow-hidden">
              <User className="w-16 h-16 text-[oklch(0.30_0.05_240)]" />
            </div>
            {isEditing ? (
              <Input 
                value={editedChar.name} 
                onChange={e => setEditedChar({...editedChar, name: e.target.value})}
                className="text-center font-bold mb-2"
              />
            ) : (
              <h2 className="text-2xl font-['Cinzel_Decorative'] font-bold mb-1">{editedChar.name}</h2>
            )}
            <p className="text-[oklch(0.55_0.22_25)] font-bold text-sm uppercase tracking-widest">
              Nível {editedChar.level} {editedChar.combatStyle}
            </p>
          </Card>

          <Card className="md:col-span-3 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">
                  <Heart className="w-3 h-3 text-red-500" /> Vida
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{editedChar.currentHealth}</span>
                  <span className="text-[oklch(0.40_0.02_240)]">/ {editedChar.maxHealth}</span>
                </div>
                <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-500 h-full transition-all" 
                    style={{ width: `${(editedChar.currentHealth / editedChar.maxHealth) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">
                  <Zap className="w-3 h-3 text-yellow-500" /> Energia
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{editedChar.currentPowerPoints}</span>
                  <span className="text-[oklch(0.40_0.02_240)]">/ {editedChar.maxPowerPoints}</span>
                </div>
                <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-yellow-500 h-full transition-all" 
                    style={{ width: `${(editedChar.currentPowerPoints / editedChar.maxPowerPoints) * 100}%` }} 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">
                  <Shield className="w-3 h-3 text-blue-400" /> Defesa (CA)
                </div>
                <div className="text-3xl font-['Cinzel'] font-bold">{editedChar.armorClass}</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">
                  <Sword className="w-3 h-3 text-[oklch(0.55_0.22_25)]" /> Proficiência
                </div>
                <div className="text-3xl font-['Cinzel'] font-bold">+{editedChar.proficiencyBonus}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Principais */}
        <Tabs defaultValue="combat" className="w-full">
          <TabsList className="w-full bg-[oklch(0.12_0.04_240)] border border-[oklch(0.20_0.05_240)] h-12">
            <TabsTrigger value="combat" className="flex-1 data-[state=active]:bg-[oklch(0.18_0.06_240)]">Combate</TabsTrigger>
            <TabsTrigger value="haki" className="flex-1 data-[state=active]:bg-[oklch(0.18_0.06_240)]">Haki & Akuma</TabsTrigger>
            <TabsTrigger value="skills" className="flex-1 data-[state=active]:bg-[oklch(0.18_0.06_240)]">Perícias</TabsTrigger>
            <TabsTrigger value="bio" className="flex-1 data-[state=active]:bg-[oklch(0.18_0.06_240)]">Biografia</TabsTrigger>
            <TabsTrigger value="inventory" className="flex-1 data-[state=active]:bg-[oklch(0.18_0.06_240)]">Inventário</TabsTrigger>
          </TabsList>

          {/* ABA COMBATE */}
          <TabsContent value="combat" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Atributos */}
              <Card className="lg:col-span-1 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
                <h3 className="font-['Cinzel'] font-bold text-lg mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[oklch(0.55_0.22_25)]" /> Atributos
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(attributes).map(([attr, value]) => (
                    <button 
                      key={attr} 
                      onClick={() => !isEditing && rollDice(attr.toUpperCase(), modifiers[attr as keyof typeof modifiers])}
                      className={`group relative p-4 rounded-xl border transition-all text-center ${
                        isEditing 
                        ? 'bg-[oklch(0.15_0.05_240)] border-[oklch(0.25_0.06_240)] cursor-default' 
                        : 'bg-[oklch(0.14_0.04_240)] border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.16_0.05_240)]'
                      }`}
                    >
                      <div className="text-[10px] text-[oklch(0.50_0.02_240)] uppercase font-black mb-1 tracking-tighter">
                        {attr}
                      </div>
                      {isEditing ? (
                        <input 
                          type="number" 
                          value={value} 
                          onChange={e => updateAttr(attr, parseInt(e.target.value))}
                          className="w-full bg-transparent text-2xl font-bold text-center focus:outline-none"
                        />
                      ) : (
                        <div className="text-3xl font-['Cinzel'] font-black">{value}</div>
                      )}
                      <div className={`text-sm font-bold mt-1 ${modifiers[attr as keyof typeof modifiers] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {modifiers[attr as keyof typeof modifiers] >= 0 ? '+' : ''}{modifiers[attr as keyof typeof modifiers]}
                      </div>
                      {!isEditing && (
                        <div className="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Dices className="w-3 h-3 text-[oklch(0.55_0.22_25)]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Ataques & Ações */}
              <Card className="lg:col-span-2 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-['Cinzel'] font-bold text-lg flex items-center gap-2">
                    <Sword className="w-5 h-5 text-[oklch(0.55_0.22_25)]" /> Ataques & Técnicas
                  </h3>
                  <Button variant="outline" size="sm" className="h-8 border-[oklch(0.20_0.05_240)]">+ Adicionar</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[oklch(0.14_0.04_240)] border border-[oklch(0.20_0.05_240)] flex justify-between items-center group hover:border-[oklch(0.55_0.22_25)] transition-colors cursor-pointer">
                    <div>
                      <h4 className="font-bold">Ataque Desarmado</h4>
                      <p className="text-xs text-[oklch(0.50_0.02_240)]">Corpo-a-corpo • Força</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="text-center">
                        <div className="text-[10px] text-[oklch(0.50_0.02_240)] uppercase">Acerto</div>
                        <div className="font-bold text-[oklch(0.55_0.22_25)]">+{modifiers.forca + editedChar.proficiencyBonus}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-[oklch(0.50_0.02_240)] uppercase">Dano</div>
                        <div className="font-bold">1d4 + {modifiers.forca}</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-sm text-[oklch(0.40_0.02_240)] py-4 italic">
                    Nenhuma outra técnica registrada.
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ABA HAKI & AKUMA */}
          <TabsContent value="haki" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] font-bold text-lg mb-6 text-purple-400">Haki</h3>
              <div className="space-y-4">
                <div className="p-4 rounded bg-black/20 border border-purple-900/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">Pontos de Ambição</span>
                    <span className="text-purple-400 font-bold">{editedChar.ambitionPoints} / {editedChar.maxAmbitionPoints}</span>
                  </div>
                  <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${(editedChar.ambitionPoints / (editedChar.maxAmbitionPoints || 1)) * 100}%` }} />
                  </div>
                </div>
                
                {editedChar.haki && editedChar.haki.length > 0 ? (
                  editedChar.haki.map((h: any, i: number) => (
                    <div key={i} className="p-3 rounded bg-[oklch(0.14_0.04_240)] border border-[oklch(0.20_0.05_240)]">
                      <div className="flex justify-between font-bold capitalize">
                        <span>{h.type}</span>
                        <span className="text-purple-400">{h.level}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[oklch(0.50_0.02_240)] italic text-center py-4">
                    Este pirata ainda não despertou seu Haki.
                  </p>
                )}
              </div>
            </Card>

            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] font-bold text-lg mb-6 text-orange-400">Akuma no Mi</h3>
              {editedChar.akumaNoMi ? (
                <div className="space-y-4">
                  <div className="text-center p-4 rounded bg-orange-900/10 border border-orange-900/30">
                    <h4 className="text-xl font-['Cinzel'] font-bold text-orange-400">{editedChar.akumaNoMi.name}</h4>
                    <p className="text-xs text-orange-300/60 uppercase font-bold">{editedChar.akumaNoMi.type}</p>
                  </div>
                  <p className="text-sm text-[oklch(0.70_0.02_240)]">{editedChar.akumaNoMi.description}</p>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-orange-900/10 rounded-full flex items-center justify-center mx-auto border border-orange-900/20">
                    <Zap className="w-8 h-8 text-orange-900/30" />
                  </div>
                  <p className="text-sm text-[oklch(0.50_0.02_240)] italic">
                    Nenhum fruto do diabo consumido.
                  </p>
                  <Button variant="outline" size="sm" className="border-orange-900/30 text-orange-400 hover:bg-orange-900/20">Adicionar Fruto</Button>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* ABA PERÍCIAS */}
          <TabsContent value="skills" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                {Object.entries(editedChar.skills || {}).map(([skill, value]: [string, any]) => {
                  const isProficient = editedChar.proficiencies?.includes(skill);
                  const bonus = (value as number) + (isProficient ? editedChar.proficiencyBonus : 0);
                  return (
                    <div 
                      key={skill} 
                      onClick={() => !isEditing && rollDice(skill.toUpperCase(), bonus)}
                      className="flex items-center justify-between p-2 rounded hover:bg-white/5 cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${isProficient ? 'bg-[oklch(0.55_0.22_25)] shadow-[0_0_8px_oklch(0.55_0.22_25)]' : 'bg-transparent border border-[oklch(0.30_0.05_240)]'}`} />
                        <span className="text-sm capitalize group-hover:text-white transition-colors">{skill.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <span className={`text-sm font-mono font-bold ${bonus >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {bonus >= 0 ? '+' : ''}{bonus}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* ABA BIO */}
          <TabsContent value="bio" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
                <h3 className="font-['Cinzel'] font-bold text-lg mb-4 flex items-center gap-2">
                  <Scroll className="w-5 h-5 text-[oklch(0.55_0.22_25)]" /> História & Sonho
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">Sonho</Label>
                    {isEditing ? (
                      <textarea 
                        className="w-full bg-[oklch(0.15_0.05_240)] border-[oklch(0.20_0.05_240)] rounded p-2 mt-1 text-sm h-20"
                        value={editedChar.dream}
                        onChange={e => setEditedChar({...editedChar, dream: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm mt-1">{editedChar.dream || 'Não definido.'}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">Antecedente</Label>
                    {isEditing ? (
                      <textarea 
                        className="w-full bg-[oklch(0.15_0.05_240)] border-[oklch(0.20_0.05_240)] rounded p-2 mt-1 text-sm h-32"
                        value={editedChar.background}
                        onChange={e => setEditedChar({...editedChar, background: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm mt-1">{editedChar.background || 'Não definido.'}</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
                <h3 className="font-['Cinzel'] font-bold text-lg mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[oklch(0.55_0.22_25)]" /> Características
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">Espécie</Label>
                      <p className="text-sm font-bold capitalize">{editedChar.species}</p>
                    </div>
                    <div>
                      <Label className="text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">Profissão</Label>
                      <p className="text-sm font-bold capitalize">{editedChar.profession || 'Nenhuma'}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-[oklch(0.50_0.02_240)] text-xs uppercase font-bold">Aparência</Label>
                    {isEditing ? (
                      <textarea 
                        className="w-full bg-[oklch(0.15_0.05_240)] border-[oklch(0.20_0.05_240)] rounded p-2 mt-1 text-sm h-20"
                        value={editedChar.appearance}
                        onChange={e => setEditedChar({...editedChar, appearance: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm mt-1">{editedChar.appearance || 'Não definido.'}</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ABA INVENTÁRIO */}
          <TabsContent value="inventory" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-['Cinzel'] font-bold text-lg flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" /> Tesouros & Bellys
                </h3>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full border border-yellow-500/20">
                  <span className="text-yellow-500 font-bold">฿</span>
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={editedChar.bellys} 
                      onChange={e => setEditedChar({...editedChar, bellys: parseInt(e.target.value)})}
                      className="bg-transparent w-24 font-mono font-bold focus:outline-none"
                    />
                  ) : (
                    <span className="font-mono font-bold">{editedChar.bellys.toLocaleString()}</span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-[oklch(0.50_0.02_240)] mb-3">Armas & Armaduras</h4>
                  <div className="space-y-2">
                    {editedChar.weapons?.map((w: string, i: number) => (
                      <div key={i} className="p-2 bg-white/5 rounded text-sm border border-white/5">{w}</div>
                    ))}
                    {editedChar.armor && <div className="p-2 bg-white/5 rounded text-sm border border-white/5">{editedChar.armor}</div>}
                    <Button variant="ghost" size="sm" className="w-full border border-dashed border-[oklch(0.20_0.05_240)] text-[oklch(0.40_0.02_240)]">+ Adicionar Item</Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[oklch(0.50_0.02_240)] mb-3">Outros Itens</h4>
                  <div className="space-y-2">
                    {editedChar.items?.map((item: string, i: number) => (
                      <div key={i} className="p-2 bg-white/5 rounded text-sm border border-white/5">{item}</div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full border border-dashed border-[oklch(0.20_0.05_240)] text-[oklch(0.40_0.02_240)]">+ Adicionar Item</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
