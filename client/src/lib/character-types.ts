// Tipos para Personagens do OPRPG - Baseado no Livro do Jogador v1.5.7
// AUDITORIA REALIZADA: 17/03/2026 - Sincronização Total com o PDF

export type Species = 'humano' | 'homem-peixe' | 'sireno' | 'mink' | 'celestial' | 'gigante' | 'anao' | 'lunariano' | 'mestico';
export type CombatStyle = 'lutador' | 'espadachim' | 'atirador' | 'ninja' | 'ciborgue' | 'guerrilheiro' | 'okama-kenpo' | 'rokushiki' | 'guerreiro-oni' | 'carateca-homem-peixe';
export type Profession = 'cozinheiro' | 'medico' | 'navegador' | 'timoneiro' | 'carpinteiro' | 'engenheiro' | 'musico' | 'arqueólogo' | 'adestrador' | 'combatente' | 'cacador-recompensas';

export interface Attributes {
  forca: number;
  destreza: number;
  constituicao: number;
  sabedoria: number;
  vontade: number;
  presenca: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experiencePoints: number;
  species: Species;
  combatStyle: CombatStyle;
  profession?: Profession;
  attributes: Attributes;
  currentHealth: number;
  maxHealth: number;
  currentPowerPoints: number;
  maxPowerPoints: number;
  bounty: number;
  dream: string;
  personality: string;
  appearance: string;
  philosophy: string;
  background: string;
  proficiencyBonus: number;
  armorClass: number;
}

// TABELA DE MODIFICADORES (PÁG 10)
export function calculateModifier(val: number): number {
  return Math.floor((val - 10) / 2);
}

// TABELA DE ESPÉCIES (CAPÍTULO 2)
export const SPECIES_DATA: Record<Species, { pvBase: number; description: string }> = {
  anao: { pvBase: 8, description: 'Miúdo, forte e ingênuo' },
  celestial: { pvBase: 10, description: 'Habitante do céu com Dials' },
  gigante: { pvBase: 20, description: 'Colossal e honrado' },
  humano: { pvBase: 10, description: 'Versátil e adaptável' },
  lunariano: { pvBase: 16, description: 'Raro, manipula fogo (16 PV pág 24)' },
  mestico: { pvBase: 0, description: 'Média das espécies' },
  mink: { pvBase: 12, description: 'Instintos animais e Electro (12 PV pág 27)' },
  'homem-peixe': { pvBase: 14, description: 'Povo do Mar (14 PV pág 29)' },
  sireno: { pvBase: 14, description: 'Povo do Mar (14 PV pág 29)' },
};

// TABELA DE ESTILOS DE COMBATE (PÁG 32)
export const COMBAT_STYLE_DATA: Record<CombatStyle, { die: number; primary: string[] }> = {
  'carateca-homem-peixe': { die: 12, primary: ['forca'] },
  lutador: { die: 12, primary: ['forca'] },
  'okama-kenpo': { die: 10, primary: ['forca', 'presenca'] },
  rokushiki: { die: 10, primary: ['forca', 'destreza'] },
  atirador: { die: 8, primary: ['destreza'] },
  espadachim: { die: 10, primary: ['forca', 'destreza'] },
  'guerreiro-oni': { die: 12, primary: ['forca'] },
  ciborgue: { die: 12, primary: ['sabedoria', 'forca'] },
  guerrilheiro: { die: 10, primary: ['forca', 'sabedoria'] },
  ninja: { die: 8, primary: ['destreza'] },
};

// CÁLCULO DE PV (PÁG 10/11/35)
export function calculateMaxHealth(char: Character): number {
  const speciesPV = SPECIES_DATA[char.species]?.pvBase || 10;
  const styleDie = COMBAT_STYLE_DATA[char.combatStyle]?.die || 10;
  const conMod = calculateModifier(char.attributes.constituicao);
  
  // 1º Nível: PV Espécie + Valor Máximo do Dado + Mod. CON
  let total = speciesPV + styleDie + conMod;
  
  // Níveis seguintes: Média do dado (die/2 + 0.5) + Mod. CON
  if (char.level > 1) {
    const averageGain = (styleDie / 2) + 0.5 + conMod;
    total += Math.floor((char.level - 1) * averageGain);
  }
  
  return total;
}

// CÁLCULO DE PP (PÁG 34)
export function calculateMaxPowerPoints(level: number): number {
  return level * 2;
}

// BÔNUS DE PROFICIÊNCIA (PÁG 12)
export function calculateProficiencyBonus(level: number): number {
  if (level <= 4) return 2;
  if (level <= 8) return 3;
  if (level <= 12) return 4;
  if (level <= 16) return 5;
  return 6;
}

export function createEmptyCharacter(): Character {
  return {
    id: '',
    name: '',
    level: 1,
    experiencePoints: 0,
    species: 'humano',
    combatStyle: 'lutador',
    attributes: {
      forca: 10,
      destreza: 10,
      constituicao: 10,
      sabedoria: 10,
      vontade: 10,
      presenca: 10,
    },
    currentHealth: 22,
    maxHealth: 22,
    currentPowerPoints: 2,
    maxPowerPoints: 2,
    bounty: 0,
    dream: '',
    personality: '',
    appearance: '',
    philosophy: '',
    background: '',
    proficiencyBonus: 2,
    armorClass: 10,
  };
}
