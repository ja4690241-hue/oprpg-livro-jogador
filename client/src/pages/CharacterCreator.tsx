import { useState } from 'react';
import { Character, Species, CombatStyle, Profession, createEmptyCharacter, calculateModifier } from '@/lib/character-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const SPECIES: { value: Species; label: string; icon: string; description: string }[] = [
  { value: 'humano', label: 'Humano', icon: '👤', description: 'Versátil e adaptável' },
  { value: 'homem-peixe', label: 'Homem-Peixe', icon: '🐠', description: 'Forte na água' },
  { value: 'mink', label: 'Mink', icon: '🐱', description: 'Características animais' },
  { value: 'celestial', label: 'Celestial', icon: '☁️', description: 'Do céu' },
  { value: 'gigante', label: 'Gigante', icon: '🗻', description: 'Muito grande e forte' },
  { value: 'anao', label: 'Anão', icon: '🧚', description: 'Pequeno e ágil' },
  { value: 'lunariano', label: 'Lunariano', icon: '🌙', description: 'Raro e poderoso' },
  { value: 'mestico', label: 'Mestiço', icon: '🔀', description: 'Duas espécies' },
];

const COMBAT_STYLES: { value: CombatStyle; label: string; icon: string; diceLife: string }[] = [
  { value: 'lutador', label: 'Lutador', icon: '👊', diceLife: 'd12' },
  { value: 'espadachim', label: 'Espadachim', icon: '⚔️', diceLife: 'd10' },
  { value: 'atirador', label: 'Atirador', icon: '🔫', diceLife: 'd8' },
  { value: 'ninja', label: 'Ninja', icon: '🥷', diceLife: 'd8' },
  { value: 'ciborgue', label: 'Ciborgue', icon: '🤖', diceLife: 'd12' },
  { value: 'guerrilheiro', label: 'Guerrilheiro', icon: '🎖️', diceLife: 'd10' },
  { value: 'okama-kenpo', label: 'Okama Kenpo', icon: '💃', diceLife: 'd10' },
  { value: 'rokushiki', label: 'Rokushiki', icon: '🥋', diceLife: 'd10' },
  { value: 'guerreiro-oni', label: 'Guerreiro-Oni', icon: '👹', diceLife: 'd12' },
  { value: 'carateca-homem-peixe', label: 'Carateca Homem-Peixe', icon: '🐟', diceLife: 'd12' },
];

const PROFESSIONS: { value: Profession; label: string; icon: string }[] = [
  { value: 'cozinheiro', label: 'Cozinheiro', icon: '👨‍🍳' },
  { value: 'medico', label: 'Médico', icon: '⚕️' },
  { value: 'navegador', label: 'Navegador', icon: '🧭' },
  { value: 'timoneiro', label: 'Timoneiro', icon: '⛵' },
  { value: 'carpinteiro', label: 'Carpinteiro', icon: '🔨' },
  { value: 'engenheiro', label: 'Engenheiro', icon: '⚙️' },
  { value: 'musico', label: 'Músico', icon: '🎵' },
  { value: 'arqueólogo', label: 'Arqueólogo', icon: '🔍' },
  { value: 'adestrador', label: 'Adestrador', icon: '🦁' },
  { value: 'combatente', label: 'Combatente', icon: '⚡' },
  { value: 'cacador-recompensas', label: 'Caçador de Recompensas', icon: '💰' },
];

type CreationStep = 'species' | 'combat' | 'profession' | 'attributes' | 'skills' | 'review';

export default function CharacterCreator() {
  const [step, setStep] = useState<CreationStep>('species');
  const [character, setCharacter] = useState<Character>(createEmptyCharacter());

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    const steps: CreationStep[] = ['species', 'combat', 'profession', 'attributes', 'skills', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: CreationStep[] = ['species', 'combat', 'profession', 'attributes', 'skills', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold mb-2">Criador de Personagem</h1>
          <p className="text-[oklch(0.55_0.02_240)]">OP RPG - Livro do Jogador v1.5.7</p>
        </div>

        {/* Progress */}
        <div className="mb-8 flex gap-2 justify-between">
          {['species', 'combat', 'profession', 'attributes', 'skills', 'review'].map((s, i) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded ${
                step === s
                  ? 'bg-[oklch(0.55_0.22_25)]'
                  : ['species', 'combat', 'profession', 'attributes', 'skills', 'review'].indexOf(step) > i
                  ? 'bg-[oklch(0.30_0.06_240)]'
                  : 'bg-[oklch(0.15_0.04_240)]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-8 mb-8">
          {step === 'species' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Escolha sua Espécie</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {SPECIES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => updateCharacter({ species: s.value })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.species === s.value
                        ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                        : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-['Cinzel'] font-bold">{s.label}</div>
                    <div className="text-xs text-[oklch(0.50_0.02_240)]">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'combat' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Escolha seu Estilo de Combate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {COMBAT_STYLES.map(s => (
                  <button
                    key={s.value}
                    onClick={() => updateCharacter({ combatStyle: s.value })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.combatStyle === s.value
                        ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                        : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-['Cinzel'] font-bold">{s.label}</div>
                    <div className="text-xs text-[oklch(0.50_0.02_240)]">Dado de Vida: {s.diceLife}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'profession' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Escolha sua Profissão (Opcional)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => updateCharacter({ profession: undefined })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    character.profession === undefined
                      ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                      : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                  }`}
                >
                  <div className="text-3xl mb-2">❌</div>
                  <div className="font-['Cinzel'] font-bold">Nenhuma</div>
                </button>
                {PROFESSIONS.map(p => (
                  <button
                    key={p.value}
                    onClick={() => updateCharacter({ profession: p.value })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      character.profession === p.value
                        ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                        : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{p.icon}</div>
                    <div className="font-['Cinzel'] font-bold text-sm">{p.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'attributes' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Defina seus Atributos</h2>
              <div className="space-y-4 mb-6">
                {Object.entries(character.attributes).map(([attr, value]) => (
                  <div key={attr} className="flex items-center gap-4">
                    <label className="w-24 font-['Cinzel'] text-sm uppercase">{attr.slice(0, 3)}</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={value}
                      onChange={e => updateCharacter({
                        attributes: {
                          ...character.attributes,
                          [attr]: parseInt(e.target.value) || 10,
                        }
                      })}
                      className="w-20 px-3 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded text-center"
                    />
                    <span className="text-[oklch(0.55_0.22_25)]">Mod: {`${calculateModifier(value) >= 0 ? '+' : ''}${calculateModifier(value)}`}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-[oklch(0.50_0.02_240)]">
                <p>Método padrão: 15, 14, 13, 12, 10, 8</p>
                <p>Ou role 4d6 e descarte o menor</p>
              </div>
            </div>
          )}

          {step === 'skills' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Informações Adicionais</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-['Cinzel'] mb-2">Nome do Personagem</label>
                  <Input
                    value={character.name}
                    onChange={e => updateCharacter({ name: e.target.value })}
                    placeholder="Digite o nome..."
                    className="bg-[oklch(0.16_0.04_240)] border-[oklch(0.25_0.05_240)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] mb-2">Aparência</label>
                  <Input
                    value={character.appearance}
                    onChange={e => updateCharacter({ appearance: e.target.value })}
                    placeholder="Descreva sua aparência..."
                    className="bg-[oklch(0.16_0.04_240)] border-[oklch(0.25_0.05_240)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] mb-2">Sonho / Objetivo</label>
                  <Input
                    value={character.dream}
                    onChange={e => updateCharacter({ dream: e.target.value })}
                    placeholder="Qual é seu grande sonho?"
                    className="bg-[oklch(0.16_0.04_240)] border-[oklch(0.25_0.05_240)]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Resumo do Personagem</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded-lg">
                  <div className="text-xs text-[oklch(0.50_0.02_240)] uppercase mb-2">Informações Básicas</div>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {character.name || 'Não definido'}</p>
                    <p><strong>Espécie:</strong> {SPECIES.find(s => s.value === character.species)?.label}</p>
                    <p><strong>Estilo:</strong> {COMBAT_STYLES.find(s => s.value === character.combatStyle)?.label}</p>
                    <p><strong>Profissão:</strong> {character.profession ? PROFESSIONS.find(p => p.value === character.profession)?.label : 'Nenhuma'}</p>
                  </div>
                </div>
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded-lg">
                  <div className="text-xs text-[oklch(0.50_0.02_240)] uppercase mb-2">Atributos</div>
                  <div className="space-y-1 text-sm font-['JetBrains_Mono']">
                    <p>FOR: {character.attributes.forca} ({`${calculateModifier(character.attributes.forca) >= 0 ? '+' : ''}${calculateModifier(character.attributes.forca)}`})</p>
                    <p>DES: {character.attributes.destreza} ({`${calculateModifier(character.attributes.destreza) >= 0 ? '+' : ''}${calculateModifier(character.attributes.destreza)}`})</p>
                    <p>CON: {character.attributes.constituicao} ({`${calculateModifier(character.attributes.constituicao) >= 0 ? '+' : ''}${calculateModifier(character.attributes.constituicao)}`})</p>
                    <p>SAB: {character.attributes.sabedoria} ({`${calculateModifier(character.attributes.sabedoria) >= 0 ? '+' : ''}${calculateModifier(character.attributes.sabedoria)}`})</p>
                    <p>VON: {character.attributes.vontade} ({`${calculateModifier(character.attributes.vontade) >= 0 ? '+' : ''}${calculateModifier(character.attributes.vontade)}`})</p>
                    <p>PRE: {character.attributes.presenca} ({`${calculateModifier(character.attributes.presenca) >= 0 ? '+' : ''}${calculateModifier(character.attributes.presenca)}`})</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <Button
            onClick={prevStep}
            disabled={step === 'species'}
            variant="outline"
            className="gap-2 border-[oklch(0.20_0.05_240)]"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="flex gap-2">
            {step === 'review' ? (
              <>
                <Button variant="outline" className="gap-2 border-[oklch(0.20_0.05_240)]">
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={createMutation.isPending}
                  className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
                >
                  <Save className="w-4 h-4" />
                  Finalizar Pirata
                </Button>
              </>
            ) : (
              <Button
                onClick={nextStep}
                className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)]"
              >
                Próximo
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
