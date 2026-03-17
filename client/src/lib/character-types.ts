// Tipos para Personagens do OPRPG - Baseado no Livro do Jogador v1.5.7

export type Species = 'humano' | 'homem-peixe' | 'sereia' | 'mink' | 'celestial' | 'gigante' | 'anao' | 'lunariano' | 'mestico';
export type CombatStyle = 'lutador' | 'espadachim' | 'atirador' | 'ninja' | 'ciborgue' | 'guerrilheiro' | 'okama-kenpo' | 'rokushiki' | 'guerreiro-oni' | 'carateca-homem-peixe';
export type Profession = 'cozinheiro' | 'medico' | 'navegador' | 'timoneiro' | 'carpinteiro' | 'engenheiro' | 'musico' | 'arqueólogo' | 'adestrador' | 'combatente' | 'cacador-recompensas';
export type HakiType = 'observacao' | 'armamento' | 'rei';
export type AkumaType = 'paramecia' | 'zoan' | 'zoan-ancestral' | 'zoan-mitico' | 'logia';

export interface Attributes {
  forca: number;
  destreza: number;
  constituicao: number;
  sabedoria: number;
  vontade: number;
  presenca: number;
}

export interface Skills {
  atletismo: number;
  acrobacia: number;
  furtividade: number;
  prestidigitacao: number;
  adestramento: number;
  intuicao: number;
  medicina: number;
  percepcao: number;
  sobrevivencia: number;
  haki: number;
  sorte: number;
  atuacao: number;
  enganacao: number;
  historia: number;
  intimidacao: number;
  investigacao: number;
  persuasao: number;
  provocacao: number;
  sobrenatural: number;
}

export interface HakiAbility {
  type: HakiType;
  level: 'inexperiente' | 'treinado' | 'perito';
  ambitionPoints: number;
  talents: string[];
}

export interface Item {
  name: string;
  weight: number;
  rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
  description?: string;
  isEquipped?: boolean;
}

export interface Weapon extends Item {
  damageDice: string;
  attribute: keyof Attributes;
  bonus?: number;
  properties?: string[];
}

export interface AkumaNoMi {
  type: AkumaType;
  name: string;
  description: string;
  techniques: string[];
  powerPoints: number;
  maxPowerPoints: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  experiencePoints: number;
  species: Species;
  appearance: string;
  personality: string;
  dream: string;
  philosophy: string;
  combatStyle: CombatStyle;
  profession?: Profession;
  background: string;
  attributes: Attributes;
  skills: Skills;
  proficiencies: string[];
  maxHealth: number;
  currentHealth: number;
  maxPowerPoints: number;
  currentPowerPoints: number;
  exhaustionLevel: number;
  armorClass: number;
  proficiencyBonus: number;
  haki: HakiAbility[];
  ambitionPoints: number;
  maxAmbitionPoints: number;
  akumaNoMi?: AkumaNoMi;
  weapons: Weapon[];
  items: Item[];
  bellys: number;
  trainings: string[];
  masteries: string[];
  bounty: number;
  createdAt: Date;
  updatedAt: Date;
}

// Dados de Espécies do Livro v1.5.7 (Corrigido conforme PDF)
export const SPECIES_DATA: Record<Species, { pvBase: number; attributes: string; description: string }> = {
  humano: { pvBase: 10, attributes: '+1 em dois ou +2 em um', description: 'Versátil e adaptável' },
  'homem-peixe': { pvBase: 12, attributes: '+2 em Força e +1 em Constituição', description: 'Forte e adaptado ao mar' },
  sereia: { pvBase: 8, attributes: '+2 em Presença e +1 em Sabedoria', description: 'Natação superior' },
  mink: { pvBase: 10, attributes: '+1 em dois ou +2 em um', description: 'Instintos animais e Electro' },
  celestial: { pvBase: 10, attributes: '+1 em dois ou +2 em um', description: 'Habitante do céu com Dials' },
  gigante: { pvBase: 20, attributes: '+2 Força e +1 Const. ou +2 Const. e +1 Força', description: 'Colossal e honrado' },
  anao: { pvBase: 8, attributes: '+1 em dois ou +2 em um', description: 'Pequeno, forte e ingênuo' },
  lunariano: { pvBase: 14, attributes: '+2 Const. e +1 Força ou +2 Força e +1 Const.', description: 'Raro, manipula fogo' },
  mestico: { pvBase: 0, attributes: 'Média das espécies', description: 'Mistura de duas espécies' },
};

// Dados de Estilos de Combate do Livro v1.5.7 (Corrigido conforme PDF)
export const COMBAT_STYLE_DATA: Record<CombatStyle, { die: number; primary: string[] }> = {
  lutador: { die: 12, primary: ['forca'] },
  espadachim: { die: 10, primary: ['forca', 'destreza'] },
  atirador: { die: 8, primary: ['destreza'] },
  ninja: { die: 8, primary: ['destreza'] },
  ciborgue: { die: 12, primary: ['forca', 'sabedoria'] },
  guerrilheiro: { die: 10, primary: ['forca', 'sabedoria'] },
  'okama-kenpo': { die: 10, primary: ['forca', 'presenca'] },
  rokushiki: { die: 10, primary: ['forca', 'destreza'] },
  'guerreiro-oni': { die: 12, primary: ['forca'] },
  'carateca-homem-peixe': { die: 12, primary: ['forca'] },
};

export function calculateModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}

export function calculateAttributeModifiers(attributes: Attributes): Attributes {
  return {
    forca: calculateModifier(attributes.forca),
    destreza: calculateModifier(attributes.destreza),
    constituicao: calculateModifier(attributes.constituicao),
    sabedoria: calculateModifier(attributes.sabedoria),
    vontade: calculateModifier(attributes.vontade),
    presenca: calculateModifier(attributes.presenca),
  };
}

export function calculateMaxHealth(character: Character): number {
  const speciesPV = SPECIES_DATA[character.species]?.pvBase || 10;
  const styleDie = COMBAT_STYLE_DATA[character.combatStyle]?.die || 10;
  const conMod = calculateModifier(character.attributes.constituicao);
  
  // No 1º nível: PV Base da Espécie + Valor Máximo do Dado do Estilo + Mod. Constituição
  let total = speciesPV + styleDie + conMod;
  
  // Para níveis seguintes (simplificado como média do dado + conMod)
  if (character.level > 1) {
    const averageDie = (styleDie / 2) + 0.5;
    total += Math.floor((character.level - 1) * (averageDie + conMod));
  }
  
  return total;
}

export function calculateMaxPowerPoints(level: number): number {
  // PP = 2 * Nível (conforme tabela de PP por nível v1.5.7)
  return level * 2;
}

export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function createEmptyCharacter(): Character {
  return {
    id: '',
    name: '',
    level: 1,
    experiencePoints: 0,
    species: 'humano',
    appearance: '',
    personality: '',
    dream: '',
    philosophy: '',
    combatStyle: 'lutador',
    background: '',
    attributes: {
      forca: 10,
      destreza: 10,
      constituicao: 10,
      sabedoria: 10,
      vontade: 10,
      presenca: 10,
    },
    skills: {
      atletismo: 0,
      acrobacia: 0,
      furtividade: 0,
      prestidigitacao: 0,
      adestramento: 0,
      intuicao: 0,
      medicina: 0,
      percepcao: 0,
      sobrevivencia: 0,
      haki: 0,
      sorte: 0,
      atuacao: 0,
      enganacao: 0,
      historia: 0,
      intimidacao: 0,
      investigacao: 0,
      persuasao: 0,
      provocacao: 0,
      sobrenatural: 0,
    },
    proficiencies: [],
    maxHealth: 22, // 10 (humano) + 12 (lutador) + 0 (con)
    currentHealth: 22,
    maxPowerPoints: 2,
    currentPowerPoints: 2,
    exhaustionLevel: 0,
    armorClass: 10,
    proficiencyBonus: 2,
    haki: [],
    ambitionPoints: 0,
    maxAmbitionPoints: 0,
    weapons: [],
    items: [],
    bellys: 0,
    trainings: [],
    masteries: [],
    bounty: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
