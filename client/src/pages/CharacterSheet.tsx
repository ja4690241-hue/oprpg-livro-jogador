import { useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateModifier } from '@/lib/character-types';
import { ArrowLeft, Download, Edit2, Save, X } from 'lucide-react';

export default function CharacterSheet() {
  const [, navigate] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [actionLog, setActionLog] = useState<string[]>([]);

  // Pegar ID da URL
  const pathname = window.location.pathname;
  const characterId = pathname.split('/').pop();

  const { data: character, isLoading } = trpc.characters.getById.useQuery(
    { id: characterId || '' },
    { enabled: !!characterId }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[oklch(0.10_0.03_240)] flex items-center justify-center">
        <p className="text-[oklch(0.50_0.02_240)]">Carregando ficha...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-[oklch(0.10_0.03_240)] flex items-center justify-center">
        <p className="text-[oklch(0.50_0.02_240)]">Personagem não encontrado</p>
      </div>
    );
  }

  const attributes = character.attributes as Record<string, number>;
  const modifiers = {
    forca: calculateModifier(attributes.forca),
    destreza: calculateModifier(attributes.destreza),
    constituicao: calculateModifier(attributes.constituicao),
    sabedoria: calculateModifier(attributes.sabedoria),
    vontade: calculateModifier(attributes.vontade),
    presenca: calculateModifier(attributes.presenca),
  };

  const addAction = (action: string) => {
    setActionLog([
      `[${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}] ${action}`,
      ...actionLog.slice(0, 19),
    ]);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/characters')}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold">{character.name}</h1>
              <p className="text-[oklch(0.55_0.02_240)]">
                Nível {character.level} • {character.species} • {character.combatStyle}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              PDF
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[oklch(0.12_0.04_240)] border border-[oklch(0.20_0.05_240)]">
            <TabsTrigger value="stats">Atributos</TabsTrigger>
            <TabsTrigger value="health">Saúde</TabsTrigger>
            <TabsTrigger value="haki">Haki</TabsTrigger>
            <TabsTrigger value="equipment">Equipamento</TabsTrigger>
            <TabsTrigger value="log">Histórico</TabsTrigger>
          </TabsList>

          {/* Atributos */}
          <TabsContent value="stats" className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Atributos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(attributes).map(([attr, value]) => (
                  <div key={attr} className="bg-[oklch(0.14_0.04_240)] p-4 rounded text-center">
                    <div className="text-xs text-[oklch(0.50_0.02_240)] uppercase mb-1">
                      {attr.slice(0, 3)}
                    </div>
                    <div className="text-2xl font-['Cinzel'] font-bold mb-1">{value}</div>
                    <div className="text-[oklch(0.55_0.22_25)] font-bold">
                      {`${modifiers[attr as keyof typeof modifiers] >= 0 ? '+' : ''}${modifiers[attr as keyof typeof modifiers]}`}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] font-bold mb-4">Resumo</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[oklch(0.50_0.02_240)]">Proficiência</p>
                  <p className="font-['Cinzel'] font-bold">+{character.proficiencyBonus}</p>
                </div>
                <div>
                  <p className="text-[oklch(0.50_0.02_240)]">CR</p>
                  <p className="font-['Cinzel'] font-bold">{character.armorClass}</p>
                </div>
                <div>
                  <p className="text-[oklch(0.50_0.02_240)]">Recompensa</p>
                  <p className="font-['Cinzel'] font-bold">{character.bounty}</p>
                </div>
                {character.crewName && (
                  <div>
                    <p className="text-[oklch(0.50_0.02_240)]">Tripulação</p>
                    <p className="font-['Cinzel'] font-bold">{character.crewName}</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Saúde */}
          <TabsContent value="health" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-6">Saúde e Energia</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PV */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-['Cinzel'] font-bold">Pontos de Vida</label>
                    <span className="text-[oklch(0.55_0.22_25)]">
                      {character.currentHealth}/{character.maxHealth}
                    </span>
                  </div>
                  <div className="w-full bg-[oklch(0.14_0.04_240)] rounded h-8 overflow-hidden">
                    <div
                      className="bg-[oklch(0.55_0.22_25)] h-full transition-all"
                      style={{
                        width: `${(character.currentHealth / character.maxHealth) * 100}%`,
                      }}
                    />
                  </div>
                  {isEditing && (
                    <div className="mt-2 flex gap-2">
                      <button className="px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-sm">−</button>
                      <input
                        type="number"
                        value={character.currentHealth}
                        className="flex-1 px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-center text-sm"
                      />
                      <button className="px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-sm">+</button>
                    </div>
                  )}
                </div>

                {/* Pontos de Poder */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-['Cinzel'] font-bold">Pontos de Poder</label>
                    <span className="text-[oklch(0.78_0.15_75)]">
                      {character.currentPowerPoints}/{character.maxPowerPoints}
                    </span>
                  </div>
                  <div className="w-full bg-[oklch(0.14_0.04_240)] rounded h-8 overflow-hidden">
                    <div
                      className="bg-[oklch(0.78_0.15_75)] h-full transition-all"
                      style={{
                        width: `${(character.currentPowerPoints / character.maxPowerPoints) * 100}%`,
                      }}
                    />
                  </div>
                  {isEditing && (
                    <div className="mt-2 flex gap-2">
                      <button className="px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-sm">−</button>
                      <input
                        type="number"
                        value={character.currentPowerPoints}
                        className="flex-1 px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-center text-sm"
                      />
                      <button className="px-2 py-1 bg-[oklch(0.16_0.04_240)] rounded text-sm">+</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Exaustão */}
              <div className="mt-6">
                <label className="font-['Cinzel'] font-bold mb-3 block">Nível de Exaustão</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map(level => (
                    <button
                      key={level}
                      className={`w-10 h-10 rounded font-bold transition-all ${
                        character.exhaustionLevel >= level
                          ? 'bg-[oklch(0.55_0.22_25)]'
                          : 'bg-[oklch(0.16_0.04_240)]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Haki */}
          <TabsContent value="haki" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Haki - Poder da Vontade</h3>
              
              {character.haki && Array.isArray(character.haki) && character.haki.length > 0 ? (
                <div className="space-y-3">
                  {character.haki.map((h: any, i: number) => (
                    <div key={i} className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-['Cinzel'] font-bold capitalize">{h.type}</h4>
                        <span className="text-xs px-2 py-1 bg-[oklch(0.55_0.22_25)] rounded">
                          {h.level}
                        </span>
                      </div>
                      <p className="text-sm text-[oklch(0.50_0.02_240)]">
                        Talentos: {h.talents?.join(', ') || 'Nenhum'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[oklch(0.50_0.02_240)]">Nenhum Haki desbloqueado</p>
              )}

              <div className="mt-4 bg-[oklch(0.14_0.04_240)] p-4 rounded">
                <div className="flex justify-between mb-2">
                  <label className="font-['Cinzel'] font-bold">Pontos de Ambição</label>
                  <span className="text-[oklch(0.78_0.15_75)]">
                    {character.ambitionPoints}/{character.maxAmbitionPoints}
                  </span>
                </div>
                <div className="w-full bg-[oklch(0.12_0.04_240)] rounded h-6 overflow-hidden">
                  <div
                    className="bg-[oklch(0.78_0.15_75)] h-full transition-all"
                    style={{
                      width: `${(character.ambitionPoints / character.maxAmbitionPoints) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Equipamento */}
          <TabsContent value="equipment" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Equipamento</h3>
              
              <div className="space-y-4">
                {/* Armas */}
                <div>
                  <h4 className="font-['Cinzel'] font-bold mb-2 text-[oklch(0.55_0.22_25)]">Armas</h4>
                  {character.weapons && Array.isArray(character.weapons) && character.weapons.length > 0 ? (
                    <ul className="space-y-1">
                      {character.weapons.map((weapon: string, i: number) => (
                        <li key={i} className="text-sm bg-[oklch(0.14_0.04_240)] p-2 rounded">
                          • {weapon}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[oklch(0.50_0.02_240)]">Nenhuma arma</p>
                  )}
                </div>

                {/* Armadura */}
                {character.armor && (
                  <div>
                    <h4 className="font-['Cinzel'] font-bold mb-2 text-[oklch(0.55_0.22_25)]">Armadura</h4>
                    <p className="text-sm bg-[oklch(0.14_0.04_240)] p-2 rounded">{character.armor}</p>
                  </div>
                )}

                {/* Itens */}
                <div>
                  <h4 className="font-['Cinzel'] font-bold mb-2 text-[oklch(0.55_0.22_25)]">Itens</h4>
                  {character.items && Array.isArray(character.items) && character.items.length > 0 ? (
                    <ul className="space-y-1">
                      {character.items.map((item: string, i: number) => (
                        <li key={i} className="text-sm bg-[oklch(0.14_0.04_240)] p-2 rounded">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[oklch(0.50_0.02_240)]">Nenhum item</p>
                  )}
                </div>

                {/* Bellys */}
                <div className="bg-[oklch(0.14_0.04_240)] p-3 rounded">
                  <p className="text-sm text-[oklch(0.50_0.02_240)]">Bellys (Ouro)</p>
                  <p className="font-['Cinzel'] text-xl font-bold">{character.bellys}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="log" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Notas e Histórico</h3>
              
              <div className="space-y-4">
                {/* Notas */}
                <div>
                  <label className="font-['Cinzel'] font-bold mb-2 block">Notas de Combate</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Adicione anotações sobre a batalha..."
                    className="w-full h-24 px-3 py-2 bg-[oklch(0.14_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded text-sm"
                  />
                </div>

                {/* Histórico */}
                <div>
                  <h4 className="font-['Cinzel'] font-bold mb-2">Últimas Ações</h4>
                  {actionLog.length > 0 ? (
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {actionLog.map((log, i) => (
                        <div key={i} className="text-xs text-[oklch(0.50_0.02_240)] bg-[oklch(0.14_0.04_240)] p-2 rounded font-['JetBrains_Mono']">
                          {log}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[oklch(0.50_0.02_240)]">Nenhuma ação registrada</p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
