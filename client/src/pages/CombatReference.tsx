import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CombatReference() {
  return (
    <div className="min-h-screen bg-[oklch(0.10_0.03_240)] text-[oklch(0.92_0.01_240)] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-['Cinzel_Decorative'] text-3xl font-bold mb-2">Referência de Combate</h1>
          <p className="text-[oklch(0.55_0.02_240)]">Guia rápido para mecânicas de combate do OPRPG</p>
        </div>

        <Tabs defaultValue="actions" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[oklch(0.12_0.04_240)] border border-[oklch(0.20_0.05_240)]">
            <TabsTrigger value="actions">Ações</TabsTrigger>
            <TabsTrigger value="conditions">Condições</TabsTrigger>
            <TabsTrigger value="haki">Haki</TabsTrigger>
            <TabsTrigger value="akuma">Akuma</TabsTrigger>
          </TabsList>

          {/* Ações em Combate */}
          <TabsContent value="actions" className="mt-6 space-y-4">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 text-[oklch(0.55_0.22_25)]">Ações por Turno</h3>
              
              <div className="space-y-4">
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Ação Principal</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Atacar com uma arma</li>
                    <li>• Usar uma técnica</li>
                    <li>• Lançar um feitiço</li>
                    <li>• Usar uma habilidade especial</li>
                  </ul>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Movimento</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Mover até sua velocidade</li>
                    <li>• Subir, escalar ou nadar</li>
                    <li>• Derrubar um inimigo (teste de FOR)</li>
                    <li>• Desengajar (se furtivo)</li>
                  </ul>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Ação Bônus</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Usar um item</li>
                    <li>• Interagir com objeto</li>
                    <li>• Falar (sempre disponível)</li>
                    <li>• Ação rápida de classe</li>
                  </ul>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Reação</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Responder a um ataque</li>
                    <li>• Usar Haki defensivo</li>
                    <li>• Esquivar (se tiver habilidade)</li>
                    <li>• Contra-ataque oportunista</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 text-[oklch(0.55_0.22_25)]">Ataque e Defesa</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Ataque</h4>
                  <p className="text-sm mb-2">1d20 + Modificador + Proficiência</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Precisa bater a CR do alvo</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Dano</h4>
                  <p className="text-sm mb-2">Dado da Arma + Modificador</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Crítico (20) = 2x o dano</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Classe de Armadura</h4>
                  <p className="text-sm mb-2">10 + Mod DES + Armadura</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Padrão: 10 (sem armadura)</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Iniciativa</h4>
                  <p className="text-sm mb-2">1d20 + Mod DES</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Determina ordem de turno</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Condições */}
          <TabsContent value="conditions" className="mt-6 space-y-4">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 text-[oklch(0.55_0.22_25)]">Condições em Combate</h3>
              
              <div className="space-y-3">
                {[
                  { name: 'Agarrado', effect: 'Velocidade = 0, -4 em ataques' },
                  { name: 'Assustado', effect: 'Desvantagem em testes, afasta-se do medo' },
                  { name: 'Atordoado', effect: 'Incapacitado, falha em testes' },
                  { name: 'Cego', effect: 'Falha em ataques, -4 em ataques contra você' },
                  { name: 'Derrubado', effect: 'Só pode se mover rastejando' },
                  { name: 'Envenenado', effect: 'Desvantagem em testes, dano por turno' },
                  { name: 'Exaurido', effect: 'Níveis 1-6, cada nível piora testes' },
                  { name: 'Incapacitado', effect: 'Não pode se mover nem falar' },
                  { name: 'Invisível', effect: 'Vantagem em ataques, desvantagem em ataques contra você' },
                  { name: 'Paralisado', effect: 'Incapacitado, falha em testes FOR/DES' },
                  { name: 'Petrificado', effect: 'Incapacitado, imune a dano não mágico' },
                  { name: 'Surdo', effect: 'Incapaz de ouvir, falha em testes de Percepção' },
                ].map((condition, i) => (
                  <div key={i} className="bg-[oklch(0.14_0.04_240)] p-3 rounded">
                    <h4 className="font-['Cinzel'] font-bold text-sm">{condition.name}</h4>
                    <p className="text-xs text-[oklch(0.50_0.02_240)]">{condition.effect}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Haki */}
          <TabsContent value="haki" className="mt-6 space-y-4">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 text-[oklch(0.55_0.22_25)]">Haki - Poder da Vontade</h3>
              
              <div className="space-y-4">
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded border-l-4 border-[oklch(0.55_0.22_25)]">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Haki da Observação</h4>
                  <p className="text-sm mb-2">Veja o futuro e sinta presença</p>
                  <ul className="text-xs space-y-1">
                    <li>• Desvantagem em ataques contra você</li>
                    <li>• Vantagem em Percepção</li>
                    <li>• Custo: 1 PA por turno</li>
                  </ul>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded border-l-4 border-[oklch(0.78_0.15_75)]">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Haki do Armamento</h4>
                  <p className="text-sm mb-2">Endurecimento do corpo</p>
                  <ul className="text-xs space-y-1">
                    <li>• +1 em CR</li>
                    <li>• Ataques ignoram resistência</li>
                    <li>• Custo: 1 PA por turno</li>
                  </ul>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded border-l-4 border-[oklch(0.92_0.01_240)]">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Haki do Rei</h4>
                  <p className="text-sm mb-2">Domínio supremo da vontade</p>
                  <ul className="text-xs space-y-1">
                    <li>• Subjuga inimigos fracos</li>
                    <li>• Causa dano em área</li>
                    <li>• Custo: 2 PA por uso</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Akuma no Mi */}
          <TabsContent value="akuma" className="mt-6 space-y-4">
            <Card className="bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
              <h3 className="font-['Cinzel'] text-xl font-bold mb-4 text-[oklch(0.55_0.22_25)]">Akuma no Mi - Frutos do Diabo</h3>
              
              <div className="space-y-4">
                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Paramecia</h4>
                  <p className="text-sm mb-2">Habilidades variadas</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Exemplos: Goma, Corte, Lentidão, Tremor</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Zoan</h4>
                  <p className="text-sm mb-2">Transformação em animal</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Forma animal, forma híbrida, forma humana</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Logia</h4>
                  <p className="text-sm mb-2">Transformação em elemento</p>
                  <p className="text-xs text-[oklch(0.50_0.02_240)]">Imunidade a dano físico, controle do elemento</p>
                </div>

                <div className="bg-[oklch(0.14_0.04_240)] p-4 rounded border-t-2 border-[oklch(0.55_0.22_25)]">
                  <h4 className="font-['Cinzel'] font-bold mb-2">Fraquezas</h4>
                  <ul className="text-xs space-y-1">
                    <li>• Água do mar (imobiliza)</li>
                    <li>• Pedra do mar (drena poder)</li>
                    <li>• Haki (penetra defesa)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Tips */}
        <Card className="mt-8 bg-[oklch(0.12_0.04_240)] border-[oklch(0.20_0.05_240)] p-6">
          <h3 className="font-['Cinzel'] font-bold mb-3">⚡ Dicas Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold text-[oklch(0.55_0.22_25)] mb-2">Vantagem/Desvantagem</p>
              <p className="text-[oklch(0.65_0.02_240)]">Role 2d20 e use o resultado maior/menor</p>
            </div>
            <div>
              <p className="font-bold text-[oklch(0.55_0.22_25)] mb-2">Teste de Resistência</p>
              <p className="text-[oklch(0.65_0.02_240)]">1d20 + Modificador vs CD do efeito</p>
            </div>
            <div>
              <p className="font-bold text-[oklch(0.55_0.22_25)] mb-2">Crítico</p>
              <p className="text-[oklch(0.65_0.02_240)]">Natural 20 em ataque = dobra o dano</p>
            </div>
            <div>
              <p className="font-bold text-[oklch(0.55_0.22_25)] mb-2">Falha Crítica</p>
              <p className="text-[oklch(0.65_0.02_240)]">Natural 1 em ataque = falha automática</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
