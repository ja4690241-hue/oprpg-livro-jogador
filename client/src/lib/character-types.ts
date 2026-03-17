// Tipos para Personagens do OPRPG

export type Species = 'humano' | 'homem-peixe' | 'mink' | 'celestial' | 'gigante' | 'anao' | 'lunariano' | 'mestico';
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
  talents: string[]; // IDs dos talentos de Haki
}

export interface AkumaNoMi {
  type: AkumaType;
  name: string;
  description: string;
  techniques: string[]; // IDs das técnicas
  powerPoints: number;
  maxPowerPoints: number;
}

export interface Character {
  // Informações Básicas
  id: string;
  name: string;
  level: number;
  experiencePoints: number;
  
  // Aparência e Personalidade
  species: Species;
  appearance: string;
  personality: string;
  dream: string;
  philosophy: string;
  
  // Classe e Profissão
  combatStyle: CombatStyle;
  profession?: Profession;
  background: string;
  
  // Atributos
  attributes: Attributes;
  
  // Perícias
  skills: Skills;
  proficiencies: string[]; // IDs de perícias com proficiência
  
  // Saúde
  maxHealth: number;
  currentHealth: number;
  maxPowerPoints: number;
  currentPowerPoints: number;
  exhaustionLevel: number; // 0-6
  
  // Combate
  armorClass: number;
  proficiencyBonus: number;
  
  // Haki
  haki: HakiAbility[];
  ambitionPoints: number;
  maxAmbitionPoints: number;
  
  // Akuma no Mi
  akumaNoMi?: AkumaNoMi;
  
  // Equipamento
  weapons: string[];
  armor?: string;
  items: string[];
  bellys: number;
  
  // Treinamentos e Maestrias
  trainings: string[]; // IDs dos treinamentos
  masteries: string[]; // IDs das maestrias
  
  // Recompensa
  bounty: number;
  
  // Tripulação
  crewName?: string;
  crewRole?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterSheet extends Character {
  // Cálculos derivados
  attributeModifiers: Attributes;
  skillBonuses: Skills;
  savingThrows: Attributes;
}

// Funções auxiliares
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
    maxHealth: 10,
    currentHealth: 10,
    maxPowerPoints: 5,
    currentPowerPoints: 5,
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
