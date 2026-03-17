import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DiceRoller from '@/components/DiceRoller';
import DamageCalculator from '@/components/DamageCalculator';
import { Dices, Zap, Users, BookOpen } from 'lucide-react';

const NAMES_BY_SPECIES = {
  humano: ['Luffy', 'Zoro', 'Sanji', 'Nami', 'Usopp', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jimbei'],
  'homem-peixe': ['Jimbei', 'Arlong', 'Hody', 'Vander Decken', 'Wadatsumi', 'Hyouzou', 'Dosun', 'Zeo', 'Ikaros', 'Daruma'],
  mink: ['Inuarashi', 'Nekomamushi', 'Bepo', 'Pekoms', 'Wanda', 'Carrot', 'Musketeers', 'Musketeer', 'Musketeer', 'Musketeer'],
  celestial: ['Enel', 'Urouge', 'Borsalino', 'Kizaru', 'Fujitora', 'Greenbull', 'Smoker', 'Tashigi', 'Hina', 'Jango'],
  gigante: ['Dorry', 'Brogy', 'Oimo', 'Kashi', 'Hajrudin', 'Panz Fry', 'Elbaf', 'Elbaf', 'Elbaf', 'Elbaf'],
  anao: ['Wapol', 'Kinemon', 'Momonosuke', 'Raizo', 'Kanjuro', 'Inulan', 'Ashura Doji', 'Denjiro', 'Kikunojo', 'Kawamatsu'],
  lunariano: ['Nika', 'Joyboy', 'Nika', 'Nika', 'Nika', 'Nika', 'Nika', 'Nika', 'Nika', 'Nika'],
  mestico: ['Hancock', 'Boa', 'Sonia', 'Marigold', 'Shakky', 'Alvida', 'Buggy', 'Kuro', 'Jango', 'Morgan'],
};

const EQUIPMENT_BY_PROFESSION = {
  cozinheiro: ['Faca de Cozinha', 'Avental', 'Panela', 'Prato', 'Garfo', 'Colher', 'Tábua de Corte', 'Ralador', 'Peneira', 'Escorredor'],
  medico: ['Estetoscópio', 'Seringa', 'Bandagem', 'Antídoto', 'Poção de Cura', 'Bisturi', 'Gaze', 'Pomada', 'Termômetro', 'Luvas'],
  navegador: ['Bússola', 'Mapa', 'Sextante', 'Luneta', 'Corda', 'Âncora', 'Vela', 'Timão', 'Leme', 'Bóia'],
  timoneiro: ['Leme', 'Timão', 'Bússola', 'Mapa', 'Corda', 'Vela', 'Âncora', 'Corrente', 'Nó', 'Bóia'],
  carpinteiro: ['Martelo', 'Serrote', 'Chave de Fenda', 'Prego', 'Parafuso', 'Madeira', 'Tinta', 'Pincel', 'Lixa', 'Nível'],
  engenheiro: ['Chave Inglesa', 'Alicate', 'Martelo', 'Chave de Fenda', 'Parafuso', 'Porca', 'Corrente', 'Roda', 'Eixo', 'Engrenagem'],
  musico: ['Violão', 'Violino', 'Flauta', 'Trompete', 'Tambor', 'Pandeiro', 'Marimba', 'Harpa', 'Lira', 'Sino'],
  arqueólogo: ['Livro Antigo', 'Lupa', 'Pá', 'Escova', 'Mapa', 'Pergaminho', 'Tinta', 'Pena', 'Lanterna', 'Corda'],
  adestrador: ['Corda', 'Alimento', 'Chicote', 'Corrente', 'Gaiola', 'Sela', 'Freio', 'Esporas', 'Açúcar', 'Mel'],
  combatente: ['Espada', 'Escudo', 'Armadura', 'Capacete', 'Luvas', 'Botas', 'Cinto', 'Mochila', 'Cantil', 'Mapa'],
  'cacador-recompensas': ['Rede', 'Corda', 'Corrente', 'Grilhão', 'Algemas', 'Bola de Ferro', 'Chicote', 'Lança', 'Escudo', 'Mapa'],
};

export default function PlayerTools() {
  const [selectedSpecies, setSelectedSpecies] = useState<keyof typeof NAMES_BY_SPECIES>('humano');
  const [selectedProfession, setSelectedProfession] = useState<keyof typeof EQUIPMENT_BY_PROFESSION>('cozinheiro');
  const [generatedName, setGeneratedName] = useState('');
  const [generatedEquipment, setGeneratedEquipment] = useState<string[]>([]);

  const generateName = () => {
    const names = NAMES_BY_SPECIES[selectedSpecies];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setGeneratedName(randomName);
  };

  const generateEquipment = () => {
    const equipment = EQUIPMENT_BY_PROFESSION[selectedProfession];
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 itens
    const selected: string[] = [];
    const indices = new Set<number>();
    
    while (indices.size < Math.min(count, equipment.length)) {
      indices.add(Math.floor(Math.random() * equipment.length));
    }
    
    indices.forEach(i => selected.push(equipment[i]));
    setGeneratedEquipment(selected);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold mb-2">Ferramentas do Jogador</h1>
          <p className="text-[oklch(0.55_0.02_240)]">Utilitários para facilitar suas aventuras no OPRPG</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dice" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[oklch(0.12_0.04_240)] border border-[oklch(0.20_0.05_240)]">
            <TabsTrigger value="dice" className="gap-2">
              <Dices className="w-4 h-4" />
              <span className="hidden sm:inline">Dados</span>
            </TabsTrigger>
            <TabsTrigger value="damage" className="gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Dano</span>
            </TabsTrigger>
            <TabsTrigger value="names" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Nomes</span>
            </TabsTrigger>
            <TabsTrigger value="equipment" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Equip.</span>
            </TabsTrigger>
          </TabsList>

          {/* Rolador de Dados */}
          <TabsContent value="dice" className="mt-6">
            <DiceRoller />
          </TabsContent>

          {/* Calculadora de Dano */}
          <TabsContent value="damage" className="mt-6">
            <DamageCalculator />
          </TabsContent>

          {/* Gerador de Nomes */}
          <TabsContent value="names" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Gerador de Nomes</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Espécie</label>
                  <select
                    value={selectedSpecies}
                    onChange={e => setSelectedSpecies(e.target.value as keyof typeof NAMES_BY_SPECIES)}
                    className="w-full px-4 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded"
                  >
                    {Object.keys(NAMES_BY_SPECIES).map(species => (
                      <option key={species} value={species}>
                        {species.charAt(0).toUpperCase() + species.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={generateName}
                  className="w-full px-4 py-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] rounded font-['Cinzel'] transition-all"
                >
                  Gerar Nome
                </button>

                {generatedName && (
                  <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded text-center">
                    <p className="text-sm text-[oklch(0.50_0.02_240)] mb-2">Nome Gerado:</p>
                    <p className="font-['Cinzel'] text-2xl font-bold text-[oklch(0.78_0.15_75)]">
                      {generatedName}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Gerador de Equipamento */}
          <TabsContent value="equipment" className="mt-6">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4">Gerador de Equipamento</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[oklch(0.50_0.02_240)] mb-2 block">Profissão</label>
                  <select
                    value={selectedProfession}
                    onChange={e => setSelectedProfession(e.target.value as keyof typeof EQUIPMENT_BY_PROFESSION)}
                    className="w-full px-4 py-2 bg-[oklch(0.16_0.04_240)] border border-[oklch(0.25_0.05_240)] rounded"
                  >
                    {Object.keys(EQUIPMENT_BY_PROFESSION).map(profession => (
                      <option key={profession} value={profession}>
                        {profession.charAt(0).toUpperCase() + profession.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={generateEquipment}
                  className="w-full px-4 py-2 bg-[oklch(0.55_0.22_25)] hover:bg-[oklch(0.65_0.25_25)] rounded font-['Cinzel'] transition-all"
                >
                  Gerar Equipamento
                </button>

                {generatedEquipment.length > 0 && (
                  <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                    <p className="text-sm text-[oklch(0.50_0.02_240)] mb-3">Equipamento Gerado:</p>
                    <ul className="space-y-2">
                      {generatedEquipment.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 p-2 bg-[oklch(0.12_0.04_240)] rounded"
                        >
                          <span className="w-6 h-6 flex items-center justify-center bg-[oklch(0.55_0.22_25)] rounded text-sm font-bold">
                            ✓
                          </span>
                          <span className="font-['Cinzel']">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dicas */}
        <Card className="mt-8 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
          <h3 className="font-['Cinzel'] font-bold mb-3">💡 Dicas Úteis</h3>
          <ul className="space-y-2 text-sm text-[oklch(0.65_0.02_240)]">
            <li>• Use o rolador de dados para todos os seus testes</li>
            <li>• A calculadora de dano leva em conta modificadores e críticos</li>
            <li>• Gere nomes aleatórios para NPCs e aliados</li>
            <li>• Crie equipamento variado para suas aventuras</li>
            <li>• Salve seus personagens favoritos na ficha</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
