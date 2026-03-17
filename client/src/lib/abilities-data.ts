// OPRPG - Habilidades, Treinamentos e Maestrias

export interface Ability {
  id: string;
  name: string;
  category: 'skill' | 'training' | 'mastery' | 'haki' | 'akuma';
  level: number; // 1-20
  cost?: number; // Pontos de Treinamento ou PA
  description: string;
  requirements?: string[];
  effects?: string[];
}

// PERÍCIAS (Skills)
export const skills: Ability[] = [
  // Força
  { id: 'atletismo', name: 'Atletismo', category: 'skill', level: 1, description: 'Testes de Força (Atletismo) para saltar, escalar, nadar' },
  
  // Destreza
  { id: 'acrobacia', name: 'Acrobacia', category: 'skill', level: 1, description: 'Testes de Destreza (Acrobacia) para se mover com graça' },
  { id: 'furtividade', name: 'Furtividade', category: 'skill', level: 1, description: 'Testes de Destreza (Furtividade) para se esconder' },
  { id: 'prestidigitacao', name: 'Prestidigitação', category: 'skill', level: 1, description: 'Testes de Destreza (Prestidigitação) para manipular objetos' },
  
  // Sabedoria
  { id: 'adestramento', name: 'Adestramento', category: 'skill', level: 1, description: 'Testes de Sabedoria (Adestramento) para controlar animais' },
  { id: 'intuicao', name: 'Intuição', category: 'skill', level: 1, description: 'Testes de Sabedoria (Intuição) para detectar mentiras' },
  { id: 'medicina', name: 'Medicina', category: 'skill', level: 1, description: 'Testes de Sabedoria (Medicina) para curar ferimentos' },
  { id: 'percepcao', name: 'Percepção', category: 'skill', level: 1, description: 'Testes de Sabedoria (Percepção) para notar detalhes' },
  { id: 'sobrevivencia', name: 'Sobrevivência', category: 'skill', level: 1, description: 'Testes de Sabedoria (Sobrevivência) em ambientes hostis' },
  
  // Vontade
  { id: 'haki', name: 'Haki', category: 'skill', level: 1, description: 'Testes de Vontade (Haki) para usar poderes de Haki' },
  { id: 'sorte', name: 'Sorte', category: 'skill', level: 1, description: 'Testes de Vontade (Sorte) para situações de azar/sorte' },
  
  // Presença
  { id: 'atuacao', name: 'Atuação', category: 'skill', level: 1, description: 'Testes de Presença (Atuação) para enganar com performance' },
  { id: 'enganacao', name: 'Enganação', category: 'skill', level: 1, description: 'Testes de Presença (Enganação) para mentir convincentemente' },
  { id: 'historia', name: 'História', category: 'skill', level: 1, description: 'Testes de Presença (História) para conhecimento de lore' },
  { id: 'intimidacao', name: 'Intimidação', category: 'skill', level: 1, description: 'Testes de Presença (Intimidação) para assustar' },
  { id: 'investigacao', name: 'Investigação', category: 'skill', level: 1, description: 'Testes de Presença (Investigação) para pesquisar' },
  { id: 'persuasao', name: 'Persuasão', category: 'skill', level: 1, description: 'Testes de Presença (Persuasão) para convencer' },
  { id: 'provocacao', name: 'Provocação', category: 'skill', level: 1, description: 'Testes de Presença (Provocação) para provocar' },
  
  // Especial
  { id: 'sobrenatural', name: 'Sobrenatural', category: 'skill', level: 1, description: 'Testes para identificar e interagir com poderes sobrenaturais' },
];

// TREINAMENTOS (Trainings)
export const trainings: Ability[] = [
  // Gerais Simples (1 PT)
  { id: 'treino-foco', name: 'Foco Mental', category: 'training', level: 1, cost: 1, description: 'Ganhe vantagem em Testes de Vontade uma vez por descanso longo' },
  { id: 'treino-reflexos', name: 'Reflexos Aguçados', category: 'training', level: 1, cost: 1, description: '+2 em iniciativa' },
  { id: 'treino-resistencia', name: 'Resistência Aumentada', category: 'training', level: 1, cost: 1, description: '+5 PV máximos' },
  
  // Gerais Intermediários (2 PT)
  { id: 'treino-combate-basico', name: 'Combate Básico', category: 'training', level: 2, cost: 2, description: 'Proficiência em uma arma simples à sua escolha' },
  { id: 'treino-defesa', name: 'Técnica de Defesa', category: 'training', level: 2, cost: 2, description: '+1 na CR quando não está usando escudo' },
  { id: 'treino-esquiva', name: 'Esquiva Acrobática', category: 'training', level: 2, cost: 2, description: 'Quando é alvo de ataque, pode usar reação para se mover até metade do deslocamento' },
  
  // Gerais Complexos (3 PT)
  { id: 'treino-combate-avancado', name: 'Combate Avançado', category: 'training', level: 3, cost: 3, description: 'Proficiência em uma arma marcial à sua escolha', requirements: ['treino-combate-basico'] },
  { id: 'treino-maestria-arma', name: 'Maestria com Arma', category: 'training', level: 3, cost: 3, description: '+1 em jogadas de ataque com uma arma específica', requirements: ['treino-combate-avancado'] },
  
  // Treinamentos com Armas
  { id: 'treino-espada-simples', name: 'Treino: Espada Simples', category: 'training', level: 1, cost: 1, description: 'Proficiência em espadas simples' },
  { id: 'treino-espada-longa', name: 'Treino: Espada Longa', category: 'training', level: 2, cost: 2, description: 'Proficiência em espadas longas e técnicas especiais' },
  { id: 'treino-katana', name: 'Treino: Katana', category: 'training', level: 2, cost: 2, description: 'Proficiência em katanas e Santoryu (três espadas)' },
  { id: 'treino-pistola', name: 'Treino: Pistola', category: 'training', level: 1, cost: 1, description: 'Proficiência em pistolas e armas de fogo simples' },
  { id: 'treino-bazuca', name: 'Treino: Bazuca', category: 'training', level: 2, cost: 2, description: 'Proficiência em bazucas e armas pesadas' },
  { id: 'treino-arco', name: 'Treino: Arco', category: 'training', level: 1, cost: 1, description: 'Proficiência em arcos e flechas' },
  { id: 'treino-kanabo', name: 'Treino: Kanabo', category: 'training', level: 2, cost: 2, description: 'Proficiência em kanabos (maças de ferro)' },
];

// MAESTRIAS (Masteries)
export const masteries: Ability[] = [
  { id: 'maestria-arqueiro', name: 'Arqueiro', category: 'mastery', level: 6, cost: 3, description: 'Especialização em arco e flecha com técnicas únicas', requirements: ['treino-arco'] },
  { id: 'maestria-espadachim', name: 'Espadachim Imaculado', category: 'mastery', level: 8, cost: 5, description: 'Domínio perfeito da espada', requirements: ['treino-espada-longa'] },
  { id: 'maestria-santoryu', name: 'Santoryu (Três Espadas)', category: 'mastery', level: 8, cost: 5, description: 'Técnicas de combate com três espadas simultaneamente', requirements: ['treino-katana'] },
  { id: 'maestria-lutador', name: 'Lutador Supremo', category: 'mastery', level: 10, cost: 5, description: 'Domínio completo de técnicas de combate desarmado' },
  { id: 'maestria-ryusoken', name: 'Ryusoken (Garra de Dragão)', category: 'mastery', level: 6, cost: 3, description: 'Técnica de garra de dragão para lutadores' },
  { id: 'maestria-hasshoken', name: 'Hasshoken (Vibração)', category: 'mastery', level: 6, cost: 3, description: 'Técnica de vibração do Kanabo' },
  { id: 'maestria-rokushiki', name: 'Rokushiki (Seis Técnicas)', category: 'mastery', level: 10, cost: 5, description: 'Domínio das Seis Técnicas: Soru, Geppo, Tekkai, Shigan, Rankyaku, Kami-e' },
  { id: 'maestria-sulong', name: 'Sulong (Transformação Lunar)', category: 'mastery', level: 8, cost: 5, description: 'Controle da transformação Sulong para Minks', requirements: ['Mink'] },
  { id: 'maestria-lama-cega', name: 'Lâmina Cega', category: 'mastery', level: 4, cost: 2, description: 'Combate com espada na bainha' },
  { id: 'maestria-capitao', name: 'Capitão Implacável', category: 'mastery', level: 10, cost: 5, description: 'Habilidades de liderança e inspiração' },
];

// HAKI - Talentos
export const hakiTalents: Ability[] = [
  // Haki da Observação
  { id: 'haki-obs-emocoes', name: 'Identificar Emoções', category: 'haki', level: 1, cost: 1, description: 'Sinta as emoções de outras pessoas' },
  { id: 'haki-obs-presenca', name: 'Perceber Presença', category: 'haki', level: 1, cost: 1, description: 'Sinta a presença de criaturas próximas' },
  { id: 'haki-obs-desafio', name: 'Senso de Desafio', category: 'haki', level: 1, cost: 1, description: 'Sinta quando alguém é mais forte que você' },
  { id: 'haki-obs-antevisao', name: 'Antevisão', category: 'haki', level: 1, cost: 3, description: 'Preveja ataques alguns segundos antes' },
  { id: 'haki-obs-previsao', name: 'Previsão', category: 'haki', level: 1, cost: 2, description: 'Veja o futuro imediato' },
  { id: 'haki-obs-vidente', name: 'Vidente', category: 'haki', level: 3, cost: 5, description: 'Veja o futuro com clareza', requirements: ['haki-obs-antevisao', 'haki-obs-previsao'] },
  
  // Haki do Armamento
  { id: 'haki-arm-endurecimento', name: 'Endurecimento', category: 'haki', level: 1, cost: 1, description: '+1 na CR' },
  { id: 'haki-arm-revestimento', name: 'Revestimento', category: 'haki', level: 1, cost: 2, description: 'Ataques ignoram resistência a dano físico' },
  { id: 'haki-arm-fluxo', name: 'Fluxo Interno', category: 'haki', level: 2, cost: 3, description: 'Dano adicional em ataques' },
  { id: 'haki-arm-avancado', name: 'Armamento Avançado', category: 'haki', level: 2, cost: 4, description: 'Penetra imunidades a dano físico' },
  { id: 'haki-arm-supremo', name: 'Armamento Supremo', category: 'haki', level: 3, cost: 5, description: 'Forma máxima do Haki do Armamento' },
  
  // Haki do Rei
  { id: 'haki-rei-basico', name: 'Haki do Rei', category: 'haki', level: 3, cost: 5, description: 'Subjugue a vontade dos outros ao seu redor' },
  { id: 'haki-rei-choque', name: 'Choque de Haki do Rei', category: 'haki', level: 5, cost: 5, description: 'Libere ondas de Haki do Rei que causam dano' },
];

// AKUMA NO MI - Tipos
export const akumaTypes: Ability[] = [
  { id: 'akuma-paramecia', name: 'Paramecia', category: 'akuma', level: 1, description: 'Fruto que confere habilidades sobre-humanas variadas' },
  { id: 'akuma-zoan', name: 'Zoan', category: 'akuma', level: 1, description: 'Fruto que permite transformação em animal' },
  { id: 'akuma-zoan-ancestral', name: 'Zoan Ancestral', category: 'akuma', level: 3, description: 'Fruto Zoan de animal extinto ou lendário' },
  { id: 'akuma-zoan-mitico', name: 'Zoan Mítico', category: 'akuma', level: 5, description: 'Fruto Zoan de criatura mitológica' },
  { id: 'akuma-logia', name: 'Logia', category: 'akuma', level: 3, description: 'Fruto que transforma o corpo em elemento natural' },
];

// Funções auxiliares
export function getAbilityById(id: string): Ability | undefined {
  return [...skills, ...trainings, ...masteries, ...hakiTalents, ...akumaTypes].find(a => a.id === id);
}

export function getAbilitiesByCategory(category: Ability['category']): Ability[] {
  return [...skills, ...trainings, ...masteries, ...hakiTalents, ...akumaTypes].filter(a => a.category === category);
}

export function getAbilitiesByLevel(minLevel: number, maxLevel: number): Ability[] {
  return [...skills, ...trainings, ...masteries, ...hakiTalents, ...akumaTypes].filter(
    a => a.level >= minLevel && a.level <= maxLevel
  );
}
