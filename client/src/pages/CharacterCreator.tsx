import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Character, Species, CombatStyle, Profession, 
  createEmptyCharacter, calculateModifier, 
  calculateMaxHealth, calculateMaxPowerPoints, 
  calculateProficiencyBonus, SPECIES_DATA, COMBAT_STYLE_DATA 
} from '@/lib/character-types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

const SPECIES_LIST: { value: Species; label: string; icon: string; description: string }[] = [
  { value: 'humano', label: 'Humano', icon: '👤', description: SPECIES_DATA['humano'].description },
  { value: 'homem-peixe', label: 'Homem-Peixe', icon: '🐠', description: SPECIES_DATA['homem-peixe'].description },
  { value: 'sireno', label: 'Sireno', icon: '🧜‍♂️', description: SPECIES_DATA['sireno'].description },
  { value: 'mink', label: 'Mink', icon: '🐱', description: SPECIES_DATA['mink'].description },
  { value: 'celestial', label: 'Celestial', icon: '☁️', description: SPECIES_DATA['celestial'].description },
  { value: 'gigante', label: 'Gigante', icon: '🗻', description: SPECIES_DATA['gigante'].description },
  { value: 'anao', label: 'Anão', icon: '🧚', description: SPECIES_DATA['anao'].description },
  { value: 'lunariano', label: 'Lunariano', icon: '🌙', description: SPECIES_DATA['lunariano'].description },
  { value: 'mestico', label: 'Mestiço', icon: '🔀', description: SPECIES_DATA['mestico'].description },
];

const COMBAT_STYLES_LIST: { value: CombatStyle; label: string; icon: string; die: number }[] = [
  { value: 'lutador', label: 'Lutador', icon: '👊', die: 12 },
  { value: 'espadachim', label: 'Espadachim', icon: '⚔️', die: 10 },
  { value: 'atirador', label: 'Atirador', icon: '🔫', die: 8 },
  { value: 'ninja', label: 'Ninja', icon: '🥷', die: 8 },
  { value: 'ciborgue', label: 'Ciborgue', icon: '🤖', die: 12 },
  { value: 'guerrilheiro', label: 'Guerrilheiro', icon: '🎖️', die: 10 },
  { value: 'okama-kenpo', label: 'Okama Kenpo', icon: '💃', die: 10 },
  { value: 'rokushiki', label: 'Rokushiki', icon: '🥋', die: 10 },
  { value: 'guerreiro-oni', label: 'Guerreiro-Oni', icon: '👹', die: 12 },
  { value: 'carateca-homem-peixe', label: 'Carateca Homem-Peixe', icon: '🐟', die: 12 },
];

const PROFESSIONS_LIST: { value: Profession; label: string; icon: string }[] = [
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
  const navigate = useNavigate();
  const [step, setStep] = useState<CreationStep>('species');
  const [character, setCharacter] = useState<Character>(createEmptyCharacter());

  // Atualizar cálculos derivados sempre que o personagem mudar
  useEffect(() => {
    const maxHealth = calculateMaxHealth(character);
    const maxPowerPoints = calculateMaxPowerPoints(character.level);
    const proficiencyBonus = calculateProficiencyBonus(character.level);
    
    if (character.maxHealth !== maxHealth || 
        character.maxPowerPoints !== maxPowerPoints || 
        character.proficiencyBonus !== proficiencyBonus) {
      setCharacter(prev => ({
        ...prev,
        maxHealth,
        currentHealth: prev.currentHealth > maxHealth ? maxHealth : prev.currentHealth,
        maxPowerPoints,
        currentPowerPoints: prev.currentPowerPoints > maxPowerPoints ? maxPowerPoints : prev.currentPowerPoints,
        proficiencyBonus
      }));
    }
  }, [character.species, character.combatStyle, character.level, character.attributes.constituicao]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    // Simulação de salvamento
    const savedCharacters = JSON.parse(localStorage.getItem('characters') || '[]');
    const newCharacter = { ...character, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() };
    localStorage.setItem('characters', JSON.stringify([...savedCharacters, newCharacter]));
    navigate(`/character/${newCharacter.id}`);
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
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold mb-2">Criador de Pirata</h1>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {SPECIES_LIST.map(s => (
                  <button
                    key={s.value}
                    onClick={() => updateCharacter({ species: s.value })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      character.species === s.value
                        ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                        : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-['Cinzel'] font-bold">{s.label}</div>
                    <div className="text-xs text-[oklch(0.50_0.02_240)] mt-1">{s.description}</div>
                    <div className="text-[10px] text-[oklch(0.55_0.22_25)] mt-2 uppercase font-bold">PV Base: {SPECIES_DATA[s.value].pvBase}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'combat' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Escolha seu Estilo de Combate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {COMBAT_STYLES_LIST.map(s => (
                  <button
                    key={s.value}
                    onClick={() => updateCharacter({ combatStyle: s.value })}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      character.combatStyle === s.value
                        ? 'border-[oklch(0.55_0.22_25)] bg-[oklch(0.18_0.06_240)]'
                        : 'border-[oklch(0.20_0.05_240)] hover:border-[oklch(0.30_0.06_240)]'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-['Cinzel'] font-bold">{s.label}</div>
                    <div className="text-xs text-[oklch(0.50_0.02_240)]">Dado de Vida: d{s.die}</div>
                    <div className="text-[10px] text-[oklch(0.55_0.22_25)] mt-2 uppercase font-bold">Primário: {COMBAT_STYLE_DATA[s.value].primary.join(', ')}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'profession' && (
            <div>
              <h2 className="font-['Cinzel'] text-2xl font-bold mb-6">Escolha sua Profissão (Opcional)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
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
                {PROFESSIONS_LIST.map(p => (
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
                    <span className="text-[oklch(0.55_0.22_25)] font-bold">Mod: {`${calculateModifier(value) >= 0 ? '+' : ''}${calculateModifier(value)}`}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-[oklch(0.14_0.04_240)] rounded border border-[oklch(0.20_0.05_240)]">
                <h3 className="text-sm font-bold font-['Cinzel'] mb-2">Cálculos de Saúde (v1.5.7)</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>PV Máximo: <span className="text-[oklch(0.55_0.22_25)] font-bold">{character.maxHealth}</span></p>
                  <p>Pontos de Poder: <span className="text-[oklch(0.55_0.22_25)] font-bold">{character.maxPowerPoints}</span></p>
                </div>
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
                    placeholder="Ex: Monkey D. Luffy"
                    className="bg-[oklch(0.16_0.04_240)] border-[oklch(0.25_0.05_240)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] mb-2">Aparência</label>
                  <Input
                    value={character.appearance}
                    onChange={e => updateCharacter({ appearance: e.target.value })}
                    placeholder="Descreva seu pirata..."
                    className="bg-[oklch(0.16_0.04_240)] border-[oklch(0.25_0.05_240)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-['Cinzel'] mb-2">Sonho / Objetivo</label>
                  <Input
                    value={character.dream}
                    onChange={e => updateCharacter({ dream: e.target.value })}
                    placeholder="Qual é seu grande objetivo?"
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
                <div className="bg-[oklch(0.14_0.04_240)] p-6 rounded-lg border border-[oklch(0.20_0.05_240)]">
                  <div className="text-xs text-[oklch(0.50_0.02_240)] uppercase mb-4 font-bold">Informações Básicas</div>
                  <div className="space-y-3 text-sm">
                    <p><span className="text-[oklch(0.50_0.02_240)]">Nome:</span> <span className="font-bold">{character.name || 'Não definido'}</span></p>
                    <p><span className="text-[oklch(0.50_0.02_240)]">Espécie:</span> <span className="font-bold">{SPECIES_LIST.find(s => s.value === character.species)?.label}</span></p>
                    <p><span className="text-[oklch(0.50_0.02_240)]">Estilo:</span> <span className="font-bold">{COMBAT_STYLES_LIST.find(s => s.value === character.combatStyle)?.label}</span></p>
                    <p><span className="text-[oklch(0.50_0.02_240)]">Profissão:</span> <span className="font-bold">{character.profession ? PROFESSIONS_LIST.find(p => p.value === character.profession)?.label : 'Nenhuma'}</span></p>
                  </div>
                </div>
                <div className="bg-[oklch(0.14_0.04_240)] p-6 rounded-lg border border-[oklch(0.20_0.05_240)]">
                  <div className="text-xs text-[oklch(0.50_0.02_240)] uppercase mb-4 font-bold">Status Finais</div>
                  <div className="grid grid-cols-2 gap-4 text-sm font-bold">
                    <div>
                      <p className="text-[oklch(0.50_0.02_240)] text-[10px] uppercase mb-1">Vida Máxima</p>
                      <p className="text-xl text-[oklch(0.55_0.22_25)]">{character.maxHealth} PV</p>
                    </div>
                    <div>
                      <p className="text-[oklch(0.50_0.02_240)] text-[10px] uppercase mb-1">Pontos de Poder</p>
                      <p className="text-xl text-blue-400">{character.maxPowerPoints} PP</p>
                    </div>
                    <div>
                      <p className="text-[oklch(0.50_0.02_240)] text-[10px] uppercase mb-1">Proficiência</p>
                      <p className="text-xl">+{character.proficiencyBonus}</p>
                    </div>
                    <div>
                      <p className="text-[oklch(0.50_0.02_240)] text-[10px] uppercase mb-1">Defesa (Base)</p>
                      <p className="text-xl">{10 + calculateModifier(character.attributes.destreza)}</p>
                    </div>
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
              <Button 
                onClick={handleSave}
                className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] px-8"
              >
                <Save className="w-4 h-4" />
                Criar Personagem
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="gap-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] px-8"
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
