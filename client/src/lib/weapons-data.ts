export interface WeaponData {
  name: string;
  category: 'cortante' | 'fogo' | 'especial' | 'marcial';
  damage: string;
  damageType: 'cortante' | 'perfurante' | 'contundente' | 'veneno' | 'fogo' | 'eletrico';
  price: number;
  properties: string[];
  description: string;
}

export const WEAPONS_LIST: WeaponData[] = [
  // CORTANTES
  {
    name: 'Adaga/Kunai',
    category: 'cortante',
    damage: '1d4',
    damageType: 'cortante',
    price: 20000,
    properties: ['Acuidade', 'Arremesso (6/15m)'],
    description: 'Pequena arma cortante e muito leve.'
  },
  {
    name: 'Daito Katana',
    category: 'cortante',
    damage: '1d6',
    damageType: 'cortante',
    price: 80000,
    properties: ['Acuidade', 'Versátil (1d8)'],
    description: 'Categoria de espada maior que uma katana normal.'
  },
  {
    name: 'Katana',
    category: 'cortante',
    damage: '1d6',
    damageType: 'cortante',
    price: 70000,
    properties: ['Acuidade'],
    description: 'Tipo de espada de corte em apenas um gume.'
  },
  {
    name: 'Nodachi',
    category: 'cortante',
    damage: '1d8',
    damageType: 'cortante',
    price: 100000,
    properties: ['Alcance', 'Duas Mãos', 'Pesada'],
    description: 'Uma grande katana com capacidade de corte superior.'
  },
  // FOGO
  {
    name: 'Pistola',
    category: 'fogo',
    damage: 'Varia',
    damageType: 'perfurante',
    price: 70000,
    properties: ['Distância (9/15m)', 'Munição'],
    description: 'Uma pistola comum.'
  },
  {
    name: 'Mosquete',
    category: 'fogo',
    damage: 'Varia',
    damageType: 'perfurante',
    price: 100000,
    properties: ['Distância (18/24m)', 'Munição', 'Duas Mãos'],
    description: 'Um mosquete comum.'
  },
  {
    name: 'Escopeta',
    category: 'fogo',
    damage: '3d6',
    damageType: 'contundente',
    price: 150000,
    properties: ['Distância (cone 3m)', 'Duas Mãos', 'Munição', 'Recarga'],
    description: 'Libera vários projéteis esféricos de uma única vez.'
  },
  {
    name: 'Metralhadora',
    category: 'fogo',
    damage: '3d6',
    damageType: 'perfurante',
    price: 380000,
    properties: ['Distância (cone 6m)', 'Duas Mãos', 'Munição', 'Recarga'],
    description: 'Libera grande quantidade de projéteis em curto tempo.'
  },
  // ESPECIAIS
  {
    name: 'Canhão de Mão/Bazuca',
    category: 'especial',
    damage: 'Varia',
    damageType: 'contundente',
    price: 350000,
    properties: ['Distância (21/30m)', 'Duas Mãos', 'Munição', 'Pesada', 'Recarga'],
    description: 'Dispara bolas de chumbo ou explosivas.'
  },
  {
    name: 'Espada Montante',
    category: 'especial',
    damage: '2d6',
    damageType: 'cortante',
    price: 150000,
    properties: ['Alcance', 'Arma de Cerco', 'Duas Mãos', 'Pesada'],
    description: 'Uma espada enorme que pode medir até 3 metros.'
  },
  {
    name: 'Martelo de Guerra',
    category: 'especial',
    damage: '1d12',
    damageType: 'contundente',
    price: 80000,
    properties: ['Arma de Cerco', 'Duas Mãos', 'Pesada'],
    description: 'Cabo com um grande e pesado pedaço de metal.'
  },
  // MARCIAIS
  {
    name: 'Kanabo/Tacape',
    category: 'marcial',
    damage: '1d10',
    damageType: 'contundente',
    price: 60000,
    properties: ['Arma de Cerco', 'Duas Mãos', 'Pesada'],
    description: 'Cabo com a extremidade grossa, podendo possuir espinhos.'
  }
];
