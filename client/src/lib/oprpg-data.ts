// OP RPG - Livro do Jogador v1.5.7
// Dados extraídos do PDF

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  icon: string;
  badge?: string;
  color: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'rule-box' | 'gold-box' | 'table' | 'quote' | 'list' | 'stat-block' | 'example' | 'warning';
  content?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  author?: string;
}

export const chapters: Chapter[] = [
  {
    id: 'regras-gerais',
    number: 1,
    title: 'Regras Gerais',
    icon: '📜',
    badge: 'Fundamentos',
    color: 'text-blue-400',
    sections: [
      {
        id: 'como-jogar',
        title: '1.1 – Como Jogar',
        content: [
          {
            type: 'paragraph',
            content: 'O jogo de RPG se desenvolve de acordo com os seguintes passos fundamentais que guiam toda a aventura.'
          },
          {
            type: 'rule-box',
            content: '**Passo 1 — O Narrador descreve o ambiente:** O Narrador apresenta o cenário aos jogadores, informando onde estão os piratas, descrevendo os arredores e oferecendo um escopo básico de opções. Por exemplo: quantas portas conduzem para fora de um cômodo, o que está sobre a mesa, entre outros detalhes.'
          },
          {
            type: 'rule-box',
            content: '**Passo 2 — Os jogadores descrevem o que querem fazer:** Os jogadores indicam as ações de seus personagens. Um jogador pode falar em nome de todos, dizendo, por exemplo: "Vamos partir para a próxima ilha". Alternativamente, cada personagem pode agir de forma independente.'
          },
          {
            type: 'rule-box',
            content: '**Passo 3 — O Narrador narra os resultados:** O Narrador descreve o que acontece após as ações dos jogadores, levando a um novo ponto de decisão e retornando ao passo 1.'
          },
          {
            type: 'subheading',
            content: 'Dados de Jogo'
          },
          {
            type: 'paragraph',
            content: 'O RPG utiliza dados poliédricos com diferentes números de lados, encontrados em lojas especializadas ou aplicativos. Os dados são identificados pela letra "d" seguida do número de lados: d4, d6, d8, d10, d12 e d20.'
          },
          {
            type: 'table',
            headers: ['Dado', 'Lados', 'Uso Principal'],
            rows: [
              ['d4', '4 faces', 'Dano de armas leves'],
              ['d6', '6 faces', 'Dado comum, dano médio'],
              ['d8', '8 faces', 'Dano de armas médias'],
              ['d10', '10 faces', 'Dano de técnicas, d100'],
              ['d12', '12 faces', 'Dado de vida do Lutador'],
              ['d20', '20 faces', 'Testes, ataques, salvaguardas'],
              ['d100', '2×d10', 'Percentual (dezenas + unidades)'],
            ]
          },
          {
            type: 'subheading',
            content: 'O D20'
          },
          {
            type: 'paragraph',
            content: 'O d20 é usado para determinar sucessos ou falhas em situações incertas. Cada personagem ou criatura tem seis Atributos: Força, Destreza, Constituição, Sabedoria, Vontade e Presença. Eles formam a base para Testes de Atributo, Jogadas de ataque e Salvaguardas.'
          },
          {
            type: 'gold-box',
            content: '**Passos para uma Jogada com D20:**\n1. Role o d20 e adicione modificadores (atributo + bônus de proficiência)\n2. Aplique bônus ou penalidades circunstanciais\n3. Compare o total ao número-alvo (CD para testes, CR para ataques)'
          },
          {
            type: 'subheading',
            content: 'Vantagem e Desvantagem'
          },
          {
            type: 'paragraph',
            content: 'Em algumas situações, um Teste de Atributo, jogada de ataque ou Salvaguarda pode ser afetado por condições chamadas vantagem ou desvantagem. Quando estiver sob uma dessas condições, role um segundo d20 durante a jogada.'
          },
          {
            type: 'table',
            headers: ['Condição', 'Efeito', 'Exemplo'],
            rows: [
              ['Vantagem', 'Use o maior resultado dos dois dados', 'Tirou 17 e 5 → usa 17'],
              ['Desvantagem', 'Use o menor resultado dos dois dados', 'Tirou 17 e 5 → usa 5'],
            ]
          },
          {
            type: 'subheading',
            content: 'Os Três Pilares da Aventura'
          },
          {
            type: 'list',
            items: [
              '**Exploração:** Movimentos dos personagens pelo mundo, interação com objetos e situações. Atravessar mares agitados, investigar passagens subterrâneas, acionar alavancas em salas futuristas.',
              '**Interação Social:** Diálogo com NPCs. Exigir informações de um batedor capturado, persuadir um oficial da Marinha, convencer um soldado a revelar onde está o tesouro.',
              '**Combate:** Enfrentamentos usando armas, habilidades de Akuma no Mi e táticas de movimentação. Estruturado com turnos para garantir que todos os participantes tenham oportunidade de agir.'
            ]
          }
        ]
      },
      {
        id: 'criacao-personagem',
        title: '1.2 – Criação de Personagens',
        content: [
          {
            type: 'paragraph',
            content: 'A primeira etapa para jogar uma aventura de RPG é criar um personagem. Esse personagem combina estatísticas de jogo, detalhes interpretativos e imaginação. O personagem será seu representante no jogo, o avatar que você controla no mundo da aventura.'
          },
          {
            type: 'subheading',
            content: 'Passos para Criar seu Personagem'
          },
          {
            type: 'table',
            headers: ['Passo', 'Etapa', 'Descrição'],
            rows: [
              ['I', 'Escolha uma Espécie', 'Humano, Homem-Peixe, Mink, Celestial, Gigante, Anão...'],
              ['II', 'Escolha um Estilo de Combate', 'Lutador, Atirador, Espadachim, Ninja, Ciborgue...'],
              ['III', 'Escolha uma Profissão', 'Cozinheiro, Médico, Navegador, Arqueólogo...'],
              ['IV', 'Determine Valores de Atributo', 'Aleatório (4d6 descarte menor) ou Padrão (15,14,13,12,10,8)'],
              ['V', 'Descreva seu Personagem', 'Nome, aparência, personalidade, antecedente, sonho, caminho'],
              ['VI', 'Escolha o Equipamento', 'Armas e itens concedidos pelo Estilo de Combate e Profissão'],
              ['VII', 'Reúna um Grupo', 'Decida como os personagens se conheceram e que aventuras viverão'],
            ]
          },
          {
            type: 'subheading',
            content: 'Valores e Modificadores de Atributo'
          },
          {
            type: 'table',
            headers: ['Valor', 'Modificador', 'Valor', 'Modificador', 'Valor', 'Modificador'],
            rows: [
              ['1', '–5', '8–9', '–1', '16–17', '+3'],
              ['2–3', '–4', '10–11', '+0', '18–19', '+4'],
              ['4–5', '–3', '12–13', '+1', '20–21', '+5'],
              ['6–7', '–2', '14–15', '+2', '22–23', '+6'],
            ]
          },
          {
            type: 'gold-box',
            content: '**Fórmula do Modificador:** Subtraia 10 do valor de Atributo, divida o resultado por 2 e arredonde para baixo. Exemplo: Força 15 → (15-10)/2 = 2,5 → modificador **+2**'
          },
          {
            type: 'subheading',
            content: 'Classe de Resistência (CR)'
          },
          {
            type: 'paragraph',
            content: 'A CR reflete a habilidade do personagem de evitar ferimentos em combate. Por padrão, a CR é igual a 10 + modificador de Destreza, podendo ser influenciada por Características de Combate, Habilidades Básicas, escudos ou outros bônus.'
          }
        ]
      },
      {
        id: 'alem-nivel',
        title: '1.3 – Além do 1º Nível',
        content: [
          {
            type: 'paragraph',
            content: 'À medida que um personagem supera desafios e adquire Pontos de Experiência (PE), ele melhora suas capacidades, em um processo conhecido como "subir de nível". Quando um personagem sobe de nível, ele ganha novas características de acordo com seu Estilo de Combate.'
          },
          {
            type: 'subheading',
            content: 'Avanço de Personagem'
          },
          {
            type: 'table',
            headers: ['PE Necessários', 'Nível', 'Bônus de Proficiência', 'Estágio do Jogo'],
            rows: [
              ['0', '1', '+2', 'Desconhecidos'],
              ['300', '2', '+2', 'Desconhecidos'],
              ['900', '3', '+2', 'Desconhecidos'],
              ['2.700', '4', '+2', 'Desconhecidos'],
              ['6.500', '5', '+3', 'Fama Local'],
              ['14.000', '6', '+3', 'Fama Local'],
              ['23.000', '7', '+3', 'Fama Local'],
              ['34.000', '8', '+3', 'Fama Local'],
              ['48.000', '9', '+4', 'Notoriedade Regional'],
              ['64.000', '10', '+4', 'Notoriedade Regional'],
              ['85.000', '11', '+4', 'Notoriedade Regional'],
              ['100.000', '12', '+4', 'Notoriedade Regional'],
              ['120.000', '13', '+5', 'Renome na Grand Line'],
              ['140.000', '14', '+5', 'Renome na Grand Line'],
              ['165.000', '15', '+5', 'Renome na Grand Line'],
              ['195.000', '16', '+5', 'Renome na Grand Line'],
              ['225.000', '17', '+6', 'Fama Mundial'],
              ['265.000', '18', '+6', 'Fama Mundial'],
              ['305.000', '19', '+6', 'Fama Mundial'],
              ['355.000', '20', '+6', 'Fama Mundial'],
            ]
          },
          {
            type: 'gold-box',
            content: '**Ao subir de nível:** Ganho de 1 Dado de Vida adicional + modificador de Constituição em PV. Possível Aprimoramento de Atributos (+2 em um ou +1 em dois). Aumento do Bônus de Proficiência em níveis específicos.'
          }
        ]
      }
    ]
  },
  {
    id: 'especies',
    number: 2,
    title: 'Espécies',
    icon: '🌊',
    badge: 'Raças',
    color: 'text-teal-400',
    sections: [
      {
        id: 'escolhendo-especie',
        title: '2.1 – Escolhendo uma Espécie',
        content: [
          {
            type: 'paragraph',
            content: 'O mundo possui um único grande continente que envolve o planeta e inúmeras ilhas com as mais diversas geomorfologias e climas, encontradas até mesmo no céu e embaixo do mar. Neste mundo, também existem os mais diferentes tipos de espécies inteligentes que o habitam, desde pequeninos anões até gigantes com mais de 15 metros.'
          },
          {
            type: 'paragraph',
            content: 'A escolha da espécie afeta muitos aspectos diferentes de um personagem. Estabelece qualidades fundamentais que impactam as aventuras do seu personagem. A espécie do seu personagem não só afeta seus valores de atributo e traços raciais, mas também fornece sugestões para a construção da história do seu personagem.'
          },
          {
            type: 'subheading',
            content: 'Características de Espécie'
          },
          {
            type: 'table',
            headers: ['Característica', 'Descrição'],
            rows: [
              ['Ajuste de Atributo', '+1 em dois atributos ou +2 em um. Máximo de 20.'],
              ['Pontos de Vida Base', 'PV iniciais que se somam aos do Estilo de Combate'],
              ['Tamanho', 'Miúdo, Pequeno, Médio, Grande, Enorme, Colossal'],
              ['Deslocamento', 'Velocidade de movimento e nado por turno'],
              ['Traços da Espécie', 'Características marcantes positivas e negativas'],
              ['Variante da Espécie', 'Diferenciação dentro da mesma espécie (apenas não-mestiços)'],
              ['Ancestralidade', 'Ligação com tipos de animais (ex: Homem-Peixe Tubarão)'],
              ['Traço Cultural', 'Características ligadas aos costumes do povo'],
            ]
          }
        ]
      },
      {
        id: 'anoes',
        title: 'Anões',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+1 em dois atributos ou +2 em um'],
              ['Preconceito', 'Débil'],
              ['Pontos de Vida Base', '8 PV'],
              ['Tamanho', '10 a 15 centímetros (Miúdo)'],
              ['Peso', '0,5 a 2 kg'],
              ['Deslocamento', '9 metros'],
              ['Nado', '4,5 metros'],
            ]
          },
          {
            type: 'subheading',
            content: 'Benefícios da Espécie'
          },
          {
            type: 'rule-box',
            content: '**Corpo Pequeno:** Enquanto na categoria Miúdo, os anões se beneficiam de:\n\n**Estômago Pequeno:** Itens consumíveis feitos para criaturas Médias ou maiores podem ser usados em metade da quantidade usual para garantir os mesmos bônus.\n\n**Piscar:** Pode desaparecer e reaparecer em local desocupado a até 9 metros. Uso: 3 vezes por descanso longo.\n\n**Andar das Fadas:** Vantagem em Testes de Destreza (Furtividade) fora de combate. Em combate, podem tentar se esconder com ação bônus.\n\n**Hóspede Feérico:** Podem ocupar o mesmo espaço de criaturas maiores, sendo movidos junto com elas. Não podem ser alvejados por ataques, mas sofrem metade do dano recebido pela criatura.'
          },
          {
            type: 'warning',
            content: '**Dificuldade da Espécie — Ingenuidade Anormal:** Anões são muito ingênuos e recebem **–10** em Testes de Atributo de Vontade (Intuição).'
          },
          {
            type: 'paragraph',
            content: 'Os anões são uma espécie de pessoas pequenas semelhantes aos humanos comuns. Têm caudas peludas, cabeças quase tão grandes quanto seus corpos, muitos com narizes pontudos e corpos arredondados. São extremamente fortes para o seu tamanho, capazes de derrotar um humano comum com grande facilidade.'
          },
          {
            type: 'paragraph',
            content: 'Originados de uma ilha desconhecida, os anões mais conhecidos habitam o subterrâneo de Green Bit, próxima de Dressrosa (Tribo Tontatta). Por mais de 900 anos, durante o Século Perdido, foram forçados a trabalhar sob o domínio da família Donquixote. Há 800 anos, a família real Riku aboliu a escravidão, dando origem à "Lenda das Fadas".'
          },
          {
            type: 'gold-box',
            content: '**Armas Reduzidas:** Os anões possuem grande conhecimento de manufatura, sendo capazes de fazer em tamanho reduzido qualquer arma que já tenham visto funcionar, gastando 1/5 dos recursos normais. Armas de fogo têm dano total reduzido pela metade por conta do tamanho.'
          }
        ]
      },
      {
        id: 'celestiais',
        title: 'Celestiais',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+1 em dois atributos ou +2 em um'],
              ['Preconceito', 'Débil'],
              ['Pontos de Vida Base', '10 PV'],
              ['Tamanho', '1,5 a 2,5 metros (Médio)'],
              ['Peso', '50 a 200 kg'],
              ['Deslocamento', '12 metros'],
              ['Nado', '3 metros'],
            ]
          },
          {
            type: 'rule-box',
            content: '**Herança Cultural:** Um celestial conhece todos os tipos de dials e suas funcionalidades. No início do jogo recebe 3 dials cotidianos de tipos diferentes e 1 dial bélico. Além disso, escolhe 2 Perícias para adicionar proficiência (exceto Sobrenatural e Sorte). No lugar de uma perícia, pode receber a Singularidade "Haki da Observação Inato" e 10 Pontos de Ambição exclusivos para o Haki da Observação.'
          },
          {
            type: 'warning',
            content: '**Anjos Caídos:** Por estarem acostumados com atmosferas menos densas, altitudes mais baixas distorcem o senso de equilíbrio. Recebem **–2** em Testes de Destreza (Acrobacia) quando não estão a mais de 5.000 metros do nível do mar.'
          },
          {
            type: 'subheading',
            content: 'Variantes da Espécie'
          },
          {
            type: 'table',
            headers: ['Tribo', 'Origem', 'Benefício'],
            rows: [
              ['Birkans', 'Ilha de Birka (sudeste de Skypiea). Asas apontam para baixo.', '+5 em Testes de Presença (Atuação)'],
              ['Shandians', 'Originalmente de Jaya, levados para o céu. Guerreiros tribais.', '+5 em Testes de Força (Atletismo)'],
              ['Skypeans', 'Povo mais pacato das ilhas do céu. Usam dials no cotidiano.', '+5 em Testes de Presença (Persuasão)'],
            ]
          },
          {
            type: 'paragraph',
            content: 'Os celestiais são idênticos aos humanos comuns e possuem pequenas asas na parte superior das costas (não maiores que 70 cm), incapazes de suportar o peso de seus corpos. Habitam as ilhas do céu a 10.000 metros acima do nível do mar, em mares de nuvens chamadas "Nuvens Marinhas".'
          }
        ]
      },
      {
        id: 'gigantes',
        title: 'Gigantes',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+2 em Força e +1 em Constituição, ou +2 em Constituição e +1 em Força'],
              ['Preconceito', 'Intimidador'],
              ['Pontos de Vida Base', '20 PV'],
              ['Tamanho', '10 a 15 metros (Enorme)'],
              ['Deslocamento', '15 metros'],
              ['Nado', '7,5 metros'],
            ]
          },
          {
            type: 'paragraph',
            content: 'Os gigantes são humanoides de aparência similar aos humanos, mas com proporções muito maiores. São conhecidos por sua força descomunal e resistência. A maioria dos gigantes conhecidos vem de Elbaf, uma ilha que é considerada a mais forte do mundo.'
          },
          {
            type: 'rule-box',
            content: '**Corpo Colossal:** Gigantes têm tamanho Enorme, podendo usar armas e equipamentos de tamanho Enorme. Recebem vantagem em Testes de Força (Atletismo) para empurrar, puxar, levantar ou quebrar objetos. Criaturas Grandes ou menores têm desvantagem em Testes de Força contra você.'
          }
        ]
      },
      {
        id: 'humanos',
        title: 'Humanos',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+1 em dois atributos à sua escolha'],
              ['Preconceito', 'Nenhum'],
              ['Pontos de Vida Base', '10 PV'],
              ['Tamanho', '1,5 a 2,5 metros (Médio)'],
              ['Deslocamento', '9 metros'],
              ['Nado', '4,5 metros'],
            ]
          },
          {
            type: 'paragraph',
            content: 'Os humanos são a espécie mais comum e diversa do mundo. Podem ser encontrados em praticamente todas as ilhas e regiões, desde o East Blue até a Grand Line. Sua versatilidade é sua maior força — sem especializações extremas, os humanos compensam com adaptabilidade e determinação.'
          },
          {
            type: 'subheading',
            content: 'Variantes Humanas'
          },
          {
            type: 'table',
            headers: ['Variante', 'Característica Especial'],
            rows: [
              ['Humano Comum', '+1 em dois atributos à escolha. Traço Cultural: Pontos de Treinamento.'],
              ['Braços Longos', 'Alcance de ataque corpo a corpo aumentado em 1,5m. +5 em Testes de Destreza (Prestidigitação).'],
              ['Pernas Longas', 'Deslocamento aumentado para 12m. +5 em Testes de Força (Atletismo) para saltar.'],
              ['Pescoço Longo', 'Visão privilegiada. +5 em Testes de Sabedoria (Percepção) e Investigação.'],
              ['Família D.', 'Singularidade especial: Vontade do D. Resistência a efeitos de morte.'],
            ]
          }
        ]
      },
      {
        id: 'lunarianos',
        title: 'Lunarianos',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+2 em Constituição e +1 em Força, ou +2 em Força e +1 em Constituição'],
              ['Preconceito', 'Lendário'],
              ['Pontos de Vida Base', '14 PV'],
              ['Tamanho', '1,8 a 2,5 metros (Médio)'],
              ['Deslocamento', '12 metros'],
              ['Nado', '4,5 metros'],
            ]
          },
          {
            type: 'paragraph',
            content: 'Os Lunarianos são uma espécie quase extinta, conhecida por sua resistência sobre-humana. Possuem asas negras nas costas, cabelos brancos e uma chama nas costas que queima continuamente. São considerados "deuses" por algumas culturas devido à sua durabilidade extraordinária.'
          },
          {
            type: 'rule-box',
            content: '**Chama da Imortalidade:** Os Lunarianos possuem uma chama nas costas que confere resistência a danos. Enquanto a chama estiver acesa, recebem resistência a todos os tipos de dano. Ao desativar a chama, perdem a resistência mas ganham velocidade e poder de ataque aumentados.'
          }
        ]
      },
      {
        id: 'mesticos',
        title: 'Mestiços',
        content: [
          {
            type: 'paragraph',
            content: 'Mestiços são personagens que possuem herança de duas espécies diferentes. Eles combinam características de ambas as espécies, mas com algumas limitações. Mestiços não podem escolher Variantes de Espécie.'
          },
          {
            type: 'rule-box',
            content: '**Regras de Mestiço:** Escolha duas espécies parentais. Receba os Pontos de Vida Base da média das duas espécies (arredondado para baixo). Receba o Ajuste de Atributo de apenas uma das espécies. Receba os Traços da Espécie de ambas, mas não as Variantes. O Preconceito é o mais severo entre as duas espécies.'
          }
        ]
      },
      {
        id: 'minks',
        title: 'Minks',
        content: [
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+1 em dois atributos à sua escolha'],
              ['Preconceito', 'Varia por ancestralidade'],
              ['Pontos de Vida Base', '10 PV'],
              ['Tamanho', '1,5 a 2,5 metros (Médio)'],
              ['Deslocamento', '9 metros'],
              ['Nado', '4,5 metros'],
            ]
          },
          {
            type: 'paragraph',
            content: 'Os Minks são humanoides com características animais — pelo, garras, orelhas e caudas de animais. Habitam Zou, uma ilha no dorso de um elefante gigante chamado Zunesha. Todos os Minks possuem a habilidade de usar Sulong, uma transformação ativada pela luz da lua cheia.'
          },
          {
            type: 'rule-box',
            content: '**Electro:** Todos os Minks podem gerar eletricidade natural pelo corpo. Como ação bônus, podem ativar o Electro, adicionando 1d4 de dano Elétrico nos ataques corpo a corpo até o início do próximo turno.'
          },
          {
            type: 'gold-box',
            content: '**Sulong (Maestria):** Sob a luz da lua cheia, Minks podem se transformar em sua forma Sulong. Nessa forma, todos os atributos físicos aumentam significativamente, mas a transformação é difícil de controlar e esgota o usuário.'
          }
        ]
      },
      {
        id: 'povo-do-mar',
        title: 'Povo do Mar',
        content: [
          {
            type: 'paragraph',
            content: 'O Povo do Mar engloba os Homens-Peixe e as Sereias, espécies aquáticas que habitam as profundezas dos oceanos, especialmente Fishman Island, localizada a 10.000 metros de profundidade.'
          },
          {
            type: 'subheading',
            content: 'Homens-Peixe'
          },
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+2 em Força e +1 em Constituição'],
              ['Preconceito', 'Varia por ancestralidade'],
              ['Pontos de Vida Base', '12 PV'],
              ['Tamanho', '1,5 a 2,5 metros (Médio)'],
              ['Deslocamento', '9 metros'],
              ['Nado', '15 metros'],
            ]
          },
          {
            type: 'rule-box',
            content: '**Respiração Aquática:** Homens-Peixe podem respirar tanto no ar quanto na água. Sob a água, recebem vantagem em todos os Testes de Atributo e jogadas de ataque. Sua velocidade de nado é de 15 metros.'
          },
          {
            type: 'subheading',
            content: 'Sereias'
          },
          {
            type: 'table',
            headers: ['Característica', 'Valor'],
            rows: [
              ['Ajuste de Atributo', '+2 em Presença e +1 em Sabedoria'],
              ['Preconceito', 'Frágil'],
              ['Pontos de Vida Base', '8 PV'],
              ['Tamanho', '1,5 a 2,5 metros (Médio)'],
              ['Deslocamento', '6 metros (em terra)'],
              ['Nado', '18 metros'],
            ]
          },
          {
            type: 'warning',
            content: '**Limitação em Terra:** Sereias têm dificuldade de se mover em terra. Seu deslocamento terrestre é reduzido para 6 metros e recebem –2 em Testes de Destreza (Acrobacia) fora da água.'
          }
        ]
      }
    ]
  },
  {
    id: 'estilos-combate',
    number: 3,
    title: 'Estilo de Combate',
    icon: '⚔️',
    badge: 'Classes',
    color: 'text-red-400',
    sections: [
      {
        id: 'informacoes-gerais',
        title: '3.1 – Informações Gerais',
        content: [
          {
            type: 'quote',
            content: 'Acima das nove montanhas e dos oito mares, não existe nada que eu não possa cortar!',
            author: 'Roronoa Zoro'
          },
          {
            type: 'paragraph',
            content: 'O Estilo de Combate é a principal definição das habilidades e da abordagem de um personagem no jogo. Moldando como o personagem percebe e interage com o mundo, além de influenciar seu relacionamento com outras pessoas.'
          },
          {
            type: 'subheading',
            content: 'Tabela de Estilos de Combate'
          },
          {
            type: 'table',
            headers: ['Nome', 'Dado de Vida', 'Atributo Primário', 'Salvaguardas', 'Categoria'],
            rows: [
              ['Atirador', 'D8', 'Destreza', 'Destreza e Sabedoria', 'Especialista'],
              ['Carateca Homem-Peixe', 'D12', 'Força', 'Força e Constituição', 'Guerreiro'],
              ['Ciborgue', 'D12', 'Sabedoria ou Força', 'Força e Sabedoria', 'Divergente'],
              ['Espadachim', 'D10', 'Força ou Destreza', 'Destreza e Vontade', 'Especialista'],
              ['Guerreiro-Oni', 'D12', 'Força', 'Força e Constituição', 'Especialista'],
              ['Guerrilheiro', 'D10', 'Força ou Sabedoria', 'Força e Destreza', 'Divergente'],
              ['Lutador', 'D12', 'Força', 'Força e Constituição', 'Guerreiro'],
              ['Ninja', 'D8', 'Destreza', 'Destreza e Sabedoria', 'Divergente'],
              ['Okama Kenpo', 'D10', 'Força ou Presença', 'Destreza e Presença', 'Guerreiro'],
              ['Usuário de Rokushiki', 'D10', 'Força ou Destreza', 'Força e Destreza', 'Guerreiro'],
            ]
          },
          {
            type: 'subheading',
            content: 'Pontos de Poder'
          },
          {
            type: 'paragraph',
            content: 'Pontos de Poder são a representação do quanto de esforço físico ou mental uma técnica exige para ser realizada. Um personagem com todos os seus Pontos de Poder está completamente recuperado de uma batalha. Um personagem sem Pontos de Poder está esgotado, ofegante e perto do seu limite.'
          },
          {
            type: 'gold-box',
            content: 'Você recupera todos os seus Pontos de Poder ao término de um descanso longo. Caso o personagem esteja com qualquer Nível de Exaustão, ao final do descanso longo, ele só recupera **metade** dos Pontos de Poder que normalmente recuperaria.'
          },
          {
            type: 'subheading',
            content: 'Sobrecarga'
          },
          {
            type: 'paragraph',
            content: 'Quando um personagem gasta todos os seus Pontos de Poder, ele não poderá usar técnicas sem colocar o próprio corpo em risco. Se optar pela sobrecarga, o jogador pode usar uma Técnica de Combate sem gastar PP, mas o grau da técnica será equivalente ao Nível de Exaustão que ele receberá ou aumentará imediatamente após realizá-la.'
          },
          {
            type: 'subheading',
            content: 'Grau da Técnica por Nível'
          },
          {
            type: 'table',
            headers: ['Nível do Personagem', 'Grau Máximo de Técnica'],
            rows: [
              ['1º Nível', '1º Grau'],
              ['3º Nível', '2º Grau'],
              ['6º Nível', '3º Grau'],
              ['9º Nível', '4º Grau'],
              ['12º Nível', '5º Grau'],
              ['16º Nível', '6º Grau'],
              ['20º Nível', '7º Grau'],
            ]
          },
          {
            type: 'subheading',
            content: 'Ataque Combinado'
          },
          {
            type: 'rule-box',
            content: '**Ataque Combinado:** Algumas Técnicas de Combate podem ser usadas em conjunto com aliados. Quando usado, o dano de cada técnica envolvida aumenta em 1 dado de dano extra. Cada personagem pode participar do Ataque Combinado 1 vez por descanso longo. No 11º nível, pode participar até 2 vezes por descanso longo.\n\n**Requisitos:** A técnica deve ser uma Técnica de Combate que cause dano diretamente, com requisito de Ação Poderosa, sem condições, sem alcance Cilindro/Esfera e com duração Instantânea.'
          }
        ]
      },
      {
        id: 'categorias',
        title: '3.2 – Categorias e Estilos',
        content: [
          {
            type: 'subheading',
            content: 'Atirador'
          },
          {
            type: 'paragraph',
            content: 'Especialistas em combate à distância, os Atiradores são mestres no uso de armas de fogo, canhões e outros projéteis. Combinam precisão cirúrgica com conhecimento tático para eliminar inimigos antes mesmo de chegarem perto.'
          },
          {
            type: 'table',
            headers: ['Característica', 'Detalhes'],
            rows: [
              ['Dado de Vida', 'D8'],
              ['Atributo Primário', 'Destreza'],
              ['Salvaguardas', 'Destreza e Sabedoria'],
              ['Proficiências em Armas', 'Armas de Fogo, Lançador de Arpão, Bazuca, Canhão de Mão e Armas de Navio'],
              ['Proficiências em Perícias', 'Escolha 3 quaisquer'],
            ]
          },
          {
            type: 'subheading',
            content: 'Espadachim'
          },
          {
            type: 'paragraph',
            content: 'Mestres das lâminas, os Espadachins desenvolvem técnicas únicas com suas espadas. Podem especializar-se em velocidade, poder bruto ou estilos únicos como o Santoryu (três espadas).'
          },
          {
            type: 'table',
            headers: ['Característica', 'Detalhes'],
            rows: [
              ['Dado de Vida', 'D10'],
              ['Atributo Primário', 'Força ou Destreza'],
              ['Salvaguardas', 'Destreza e Vontade'],
              ['Proficiências em Armas', 'Armas Cortantes'],
              ['Proficiências em Perícias', 'Escolha 2: Atletismo, Intimidação, Intuição ou Percepção'],
            ]
          },
          {
            type: 'subheading',
            content: 'Lutador'
          },
          {
            type: 'paragraph',
            content: 'Os Lutadores são combatentes corpo a corpo que confiam em sua força bruta e resistência. Especialistas em combate desarmado, podem desenvolver técnicas devastadoras com os próprios punhos e pés.'
          },
          {
            type: 'table',
            headers: ['Característica', 'Detalhes'],
            rows: [
              ['Dado de Vida', 'D12'],
              ['Atributo Primário', 'Força'],
              ['Salvaguardas', 'Força e Constituição'],
              ['Proficiências em Armas', 'Armas Marciais'],
              ['Proficiências em Perícias', 'Escolha 2: Atletismo, Intimidação, Provocação ou Sobrevivência'],
            ]
          },
          {
            type: 'subheading',
            content: 'Ninja'
          },
          {
            type: 'paragraph',
            content: 'Mestres da furtividade e do engano, os Ninjas combinam velocidade, técnicas de ilusão e ataques precisos. Especialistas em eliminar alvos antes de serem detectados.'
          },
          {
            type: 'table',
            headers: ['Característica', 'Detalhes'],
            rows: [
              ['Dado de Vida', 'D8'],
              ['Atributo Primário', 'Destreza'],
              ['Salvaguardas', 'Destreza e Sabedoria'],
              ['Proficiências em Armas', 'Katana, Kunai, Adaga, Shuriken, Foice e Arco'],
              ['Proficiências em Perícias', 'Escolha 2: Acrobacia, Enganação, Furtividade ou Prestidigitação'],
            ]
          },
          {
            type: 'subheading',
            content: 'Ciborgue'
          },
          {
            type: 'paragraph',
            content: 'Seres que combinam carne e metal, os Ciborgues modificam seus corpos com implantes mecânicos que concedem habilidades únicas. Podem ser tanques resistentes ou especialistas em gadgets tecnológicos.'
          },
          {
            type: 'table',
            headers: ['Característica', 'Detalhes'],
            rows: [
              ['Dado de Vida', 'D12'],
              ['Atributo Primário', 'Sabedoria ou Força'],
              ['Salvaguardas', 'Força e Sabedoria'],
              ['Proficiências em Armas', 'Nenhuma (usa implantes)'],
              ['Proficiências em Perícias', 'Escolha 2: Atletismo, Investigação, Prestidigitação ou Sobrevivência'],
            ]
          },
          {
            type: 'subheading',
            content: 'Guerrilheiro'
          },
          {
            type: 'paragraph',
            content: 'Combatentes versáteis que dominam múltiplas armas e táticas de guerrilha. Adaptáveis a qualquer situação, os Guerrilheiros são especialistas em aproveitar o ambiente a seu favor.'
          },
          {
            type: 'subheading',
            content: 'Okama Kenpo'
          },
          {
            type: 'paragraph',
            content: 'Um estilo de combate único que combina artes marciais com expressão artística. Os praticantes do Okama Kenpo são imprevisíveis e flamboyant, usando movimentos de dança e poses teatrais para confundir e derrotar inimigos.'
          },
          {
            type: 'subheading',
            content: 'Usuário de Rokushiki'
          },
          {
            type: 'paragraph',
            content: 'Mestres das Seis Técnicas (Rokushiki), esses combatentes dominam habilidades sobre-humanas como Soru (velocidade extrema), Geppo (caminhar no ar), Tekkai (corpo de ferro), Shigan (dedo pistola), Rankyaku (chute de vento) e Kami-e (corpo de papel).'
          },
          {
            type: 'subheading',
            content: 'Guerreiro-Oni'
          },
          {
            type: 'paragraph',
            content: 'Guerreiros que empunham o Kanabo, uma maça pesada de ferro. Os Guerreiros-Oni são combatentes brutais que devastam inimigos com golpes poderosos e resistência sobre-humana.'
          },
          {
            type: 'subheading',
            content: 'Carateca Homem-Peixe'
          },
          {
            type: 'paragraph',
            content: 'Especialistas no Karatê Homem-Peixe, uma arte marcial que usa a água do ar para amplificar os golpes. São devastadores tanto em terra quanto na água, podendo manipular a umidade ao redor para criar ataques poderosos.'
          }
        ]
      },
      {
        id: 'maestrias',
        title: '3.6 – Maestrias',
        content: [
          {
            type: 'paragraph',
            content: 'As Maestrias são habilidades especiais que podem ser adquiridas por personagens de qualquer Estilo de Combate, desde que cumpram os requisitos. Representam especializações únicas que vão além do Estilo de Combate base.'
          },
          {
            type: 'table',
            headers: ['Maestria', 'Requisito', 'Descrição'],
            rows: [
              ['Arqueiro', 'Atirador, nível 6', 'Especialização em arco e flecha com técnicas únicas'],
              ['Ambição Suprema', 'Haki do Rei', 'Domínio avançado do Haki do Rei'],
              ['Armamento Máximo', 'Haki do Armamento Perito', 'Forma avançada do Haki do Armamento'],
              ['Capitão Implacável', 'Nível 10, Presença 16+', 'Habilidades de liderança e inspiração'],
              ['Estilingueiro', 'Atirador, nível 4', 'Especialização em estilingue'],
              ['Hasshoken', 'Guerreiro-Oni, nível 6', 'Técnica de vibração do Kanabo'],
              ['Imaculado', 'Espadachim, nível 8', 'Domínio perfeito da espada'],
              ['Sulong', 'Mink, nível 8', 'Controle da transformação Sulong'],
              ['Ryusoken', 'Lutador, nível 6', 'Técnica de garra de dragão'],
              ['Lâmina Cega', 'Espadachim, nível 4', 'Combate com espada na bainha'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'profissoes',
    number: 4,
    title: 'Profissões',
    icon: '🔧',
    badge: 'Ocupações',
    color: 'text-yellow-400',
    sections: [
      {
        id: 'evolucao',
        title: '4.1 – Evolução e Adquisição',
        content: [
          {
            type: 'paragraph',
            content: 'Um personagem geralmente tem um ofício que desempenha no navio ou durante suas aventuras. As Profissões concedem Perícias Especiais únicas e outras proficiências em perícias comuns e ferramentas relacionadas à profissão.'
          },
          {
            type: 'rule-box',
            content: '**Adquirindo Novas Profissões:** É possível adquirir uma segunda profissão ao longo da aventura, desde que o personagem passe tempo aprendendo com um mestre da profissão desejada e o Narrador aprove. Isso requer dedicação e tempo de treinamento.'
          },
          {
            type: 'gold-box',
            content: '**Não Ter Profissão:** Um personagem pode optar por não ter uma profissão inicial. Nesse caso, recebe 2 proficiências em perícias adicionais à sua escolha e uma quantidade extra de Bellys iniciais.'
          }
        ]
      },
      {
        id: 'lista-profissoes',
        title: 'Lista de Profissões',
        content: [
          {
            type: 'table',
            headers: ['Profissão', 'Função no Navio', 'Habilidade Especial Principal'],
            rows: [
              ['Adestrador', 'Cuidar de animais e criaturas', 'Treinar e comandar animais selvagens'],
              ['Arqueólogo', 'Pesquisa e história', 'Decifrar textos antigos e encontrar artefatos'],
              ['Caçador de Recompensas', 'Captura de fugitivos', 'Rastrear e capturar alvos'],
              ['Carpinteiro', 'Manutenção do navio', 'Reparar e construir estruturas navais'],
              ['Combatente', 'Combate e proteção', 'Técnicas de combate aprimoradas'],
              ['Cozinheiro', 'Alimentação da tripulação', 'Preparar refeições com efeitos especiais'],
              ['Engenheiro', 'Tecnologia e invenções', 'Criar e operar dispositivos mecânicos'],
              ['Médico', 'Saúde da tripulação', 'Curar ferimentos e doenças'],
              ['Músico', 'Moral da tripulação', 'Efeitos musicais em combate e fora dele'],
              ['Navegador', 'Rota e clima', 'Prever clima e traçar rotas precisas'],
              ['Timoneiro', 'Pilotagem do navio', 'Manobras navais avançadas'],
            ]
          },
          {
            type: 'subheading',
            content: 'Cozinheiro — Detalhes'
          },
          {
            type: 'paragraph',
            content: 'O Cozinheiro é responsável pela alimentação e moral da tripulação. Suas refeições especiais podem conferir bônus temporários em combate e exploração. Um bom cozinheiro é tão valioso quanto um combatente habilidoso.'
          },
          {
            type: 'rule-box',
            content: '**Refeição Especial:** Como parte de um descanso longo, o Cozinheiro pode preparar uma refeição especial para a tripulação. Cada membro que consumir a refeição recebe um bônus específico dependendo do tipo de prato preparado (bônus de ataque, PV temporários, resistência a condições, etc.).'
          },
          {
            type: 'subheading',
            content: 'Médico — Detalhes'
          },
          {
            type: 'paragraph',
            content: 'O Médico é essencial para a sobrevivência da tripulação. Além de curar ferimentos em combate, pode tratar doenças raras e criar antídotos para venenos. Um médico experiente pode salvar vidas em situações que pareciam sem esperança.'
          },
          {
            type: 'rule-box',
            content: '**Diagnóstico Rápido:** Como ação bônus, o Médico pode examinar uma criatura e determinar sua condição de saúde atual, incluindo Pontos de Vida aproximados, condições ativas e possíveis doenças. Isso permite planejar o tratamento mais eficaz.'
          },
          {
            type: 'subheading',
            content: 'Navegador — Detalhes'
          },
          {
            type: 'paragraph',
            content: 'O Navegador é indispensável para qualquer tripulação que deseje cruzar os mares perigosos do mundo. Com conhecimento profundo de meteorologia, correntes marítimas e cartografia, o Navegador garante que o navio chegue ao destino com segurança.'
          }
        ]
      }
    ]
  },
  {
    id: 'personalizacao',
    number: 5,
    title: 'Personalização',
    icon: '🎭',
    badge: 'Identidade',
    color: 'text-purple-400',
    sections: [
      {
        id: 'detalhes-personagem',
        title: '5.1 a 5.4 – Detalhes, Preconceito, Sonhos e Caminhos',
        content: [
          {
            type: 'paragraph',
            content: 'A personalização vai além das estatísticas. Ela define quem seu personagem é como pessoa — seus valores, medos, ambições e a forma como interage com o mundo ao redor.'
          },
          {
            type: 'subheading',
            content: 'Preconceito'
          },
          {
            type: 'paragraph',
            content: 'O Preconceito representa como o mundo percebe seu personagem com base em sua espécie ou aparência. Pode criar situações de discriminação ou vantagem dependendo do contexto social.'
          },
          {
            type: 'table',
            headers: ['Tipo de Preconceito', 'Efeito Mecânico'],
            rows: [
              ['Débil', 'NPCs podem subestimar o personagem. Vantagem em enganar sobre capacidades.'],
              ['Intimidador', 'NPCs ficam desconfortáveis. Vantagem em Intimidação, desvantagem em Persuasão.'],
              ['Lendário', 'NPCs reconhecem a raridade. Reações variadas de admiração ou medo.'],
              ['Frágil', 'NPCs tentam proteger ou explorar. Situações sociais únicas.'],
            ]
          },
          {
            type: 'subheading',
            content: 'Sonhos'
          },
          {
            type: 'paragraph',
            content: 'O Sonho é o objetivo maior do personagem — o que o move a enfrentar todos os perigos do mundo. É a âncora da personalidade e pode conceder bônus mecânicos quando o personagem age em direção ao seu sonho.'
          },
          {
            type: 'subheading',
            content: 'Caminhos'
          },
          {
            type: 'paragraph',
            content: 'Os Caminhos representam a filosofia de vida do personagem — como ele acredita que o mundo funciona e como deve agir. Influenciam as decisões do personagem e podem criar conflitos interessantes com outros membros da tripulação.'
          }
        ]
      },
      {
        id: 'singularidades',
        title: '5.5 – Singularidades e Defeitos',
        content: [
          {
            type: 'paragraph',
            content: 'Singularidades são características únicas que tornam o personagem especial. Defeitos são fraquezas ou limitações que criam desafios interessantes durante a aventura.'
          },
          {
            type: 'subheading',
            content: 'Singularidades (Exemplos)'
          },
          {
            type: 'table',
            headers: ['Singularidade', 'Efeito'],
            rows: [
              ['Recuperação Espantosa', 'Recupera PV adicionais durante descansos curtos'],
              ['Determinação', 'Uma vez por descanso longo, pode se recusar a cair inconsciente'],
              ['Tesouro Precioso', 'Possui um item de valor sentimental que concede bônus quando em posse'],
              ['Haki da Observação Inato', 'Desperta o Haki da Observação prematuramente'],
              ['Ambição do Rei', 'Possui o Haki do Rei (determinar com o Narrador)'],
              ['Instinto de Sobrevivência', 'Vantagem em Salvaguardas contra efeitos de morte'],
            ]
          },
          {
            type: 'subheading',
            content: 'Defeitos (Exemplos)'
          },
          {
            type: 'table',
            headers: ['Defeito', 'Efeito'],
            rows: [
              ['Linhagem Demoníaca', 'Certas criaturas ou organizações caçam o personagem'],
              ['Sonolência', 'Pode adormecer em momentos inoportunos (Salvaguarda de Constituição)'],
              ['Teimoso', 'Desvantagem em Testes de Vontade para aceitar ajuda ou mudar de plano'],
              ['Ingênuo', 'Desvantagem em Testes de Intuição para detectar mentiras'],
              ['Faminto', 'Precisa comer o dobro do normal ou sofre penalidades'],
            ]
          }
        ]
      },
      {
        id: 'antecedentes',
        title: '5.6 – Antecedentes',
        content: [
          {
            type: 'paragraph',
            content: 'O Antecedente descreve de onde o personagem vem e o que fazia antes de se tornar um aventureiro. Concede proficiências em perícias, ferramentas e idiomas, além de um item especial e uma característica de antecedente.'
          },
          {
            type: 'table',
            headers: ['Antecedente', 'Proficiências', 'Característica Especial'],
            rows: [
              ['Família D.', 'Atletismo, Persuasão', 'Vontade do D.: resistência a efeitos de morte'],
              ['Ex-Marinheiro', 'Atletismo, Intimidação', 'Contatos na Marinha'],
              ['Nobre', 'História, Persuasão', 'Acesso a recursos e contatos aristocráticos'],
              ['Criminoso', 'Enganação, Furtividade', 'Contatos no submundo'],
              ['Artesão', 'Prestidigitação + ferramenta', 'Habilidade de criar itens especiais'],
              ['Explorador', 'Sobrevivência, Percepção', 'Conhecimento de terrenos e rotas'],
              ['Erudito', 'Arcana, História', 'Acesso a bibliotecas e conhecimento raro'],
              ['Forasteiro', 'Sobrevivência, Percepção', 'Adaptação a ambientes hostis'],
            ]
          }
        ]
      },
      {
        id: 'treinamentos',
        title: '5.7 – Treinamentos',
        content: [
          {
            type: 'paragraph',
            content: 'Treinamentos são habilidades adicionais que o personagem pode adquirir ao longo de sua jornada. São divididos em categorias de complexidade e podem ser adquiridos usando Pontos de Treinamento.'
          },
          {
            type: 'table',
            headers: ['Categoria', 'Custo em PT', 'Exemplos'],
            rows: [
              ['Gerais Simples', '1 PT', 'Proficiência em perícia, idioma ou ferramenta'],
              ['Gerais Intermediários', '2 PT', 'Habilidades de combate básicas'],
              ['Gerais Complexos', '3 PT', 'Habilidades avançadas e especializações'],
              ['Com Armas Simples', '1 PT', 'Técnicas básicas com arma específica'],
              ['Com Armas Intermediários', '2 PT', 'Técnicas avançadas com arma específica'],
              ['Com Armas Complexos', '3 PT', 'Técnicas mestras com arma específica'],
              ['De Espécies', 'Variável', 'Habilidades exclusivas da espécie do personagem'],
            ]
          }
        ]
      },
      {
        id: 'codigos-honra',
        title: '5.8 – Códigos de Honra',
        content: [
          {
            type: 'paragraph',
            content: 'Códigos de Honra são conjuntos de regras pessoais que o personagem segue voluntariamente. Seguir o código concede bônus, enquanto violá-lo impõe penalidades. São opcionais mas adicionam profundidade à interpretação.'
          },
          {
            type: 'table',
            headers: ['Código', 'Regras Principais', 'Bônus'],
            rows: [
              ['Código do Samurai', 'Nunca atacar pelas costas, honrar os mais fortes', 'Bônus em combate honrado'],
              ['Código Pirata', 'Proteger a tripulação, cumprir promessas', 'Bônus em lealdade e moral'],
              ['Código do Caçador', 'Nunca matar alvos inocentes, honrar contratos', 'Bônus em rastreamento'],
              ['Código do Médico', 'Curar qualquer ferido, não causar dano desnecessário', 'Bônus em cura'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'akuma-no-mi',
    number: 6,
    title: 'Akuma no Mi',
    icon: '🍎',
    badge: 'Poderes',
    color: 'text-violet-400',
    sections: [
      {
        id: 'sobre-akuma',
        title: '6.1 – Sobre as Akuma no Mi',
        content: [
          {
            type: 'quote',
            content: 'Dependendo de como você treina suas habilidades, os poderes da Akuma no Mi podem se tornar extremamente fortes em batalha.',
            author: 'Crocodile'
          },
          {
            type: 'paragraph',
            content: 'Pouco se sabe sobre elas, mas é dito que as Akuma no Mi são frutos do "Diabo do Oceano" e que sua origem está oculta na Grand Line. Por serem raras, diversos boatos circulam a seu respeito. As Akuma no Mi são classificadas em três tipos: Logia, Paramecia e Zoan.'
          },
          {
            type: 'rule-box',
            content: '**Regras Básicas:**\n- Uma única mordida é necessária para a transferência de poderes\n- Só pode haver uma única Akuma no Mi idêntica (ou usuário dela) ao mesmo tempo\n- Quando um usuário morre, a Akuma no Mi renasce em um fruto já existente\n- Após ingerir uma Akuma no Mi, o usuário se torna vulnerável a água do mar e Kairoseki'
          },
          {
            type: 'subheading',
            content: 'Tipos de Akuma no Mi'
          },
          {
            type: 'table',
            headers: ['Tipo', 'Descrição', 'Exemplos'],
            rows: [
              ['Paramecia', 'Confere habilidades sobre-humanas variadas. O mais comum.', 'Gomu-Gomu, Bara-Bara, Bari-Bari'],
              ['Zoan', 'Permite transformação em animal ou híbrido. Três subtipos.', 'Ushi-Ushi, Neko-Neko, Tori-Tori'],
              ['Logia', 'Transforma o corpo em elemento natural. O mais raro e poderoso.', 'Mera-Mera, Hie-Hie, Goro-Goro'],
            ]
          }
        ]
      },
      {
        id: 'fraquezas',
        title: '6.2 – Fraquezas',
        content: [
          {
            type: 'warning',
            content: '**Água do Mar:** Ao entrarem em contato com água do mar em quantidade suficiente para submergir parte deles, os usuários ficam na condição de "Enfraquecidos", tornando-se completamente incapazes de se mover e afundando no oceano. O efeito também ocorre em água doce ou qualquer outro líquido.'
          },
          {
            type: 'warning',
            content: '**Kairoseki (Pedra do Mar):** Causa um efeito no usuário semelhante a estar submerso em água do mar, causando a condição "Enfraquecido". Objetos ou armas deste material geram o mesmo efeito ao entrar em contato com o usuário.'
          },
          {
            type: 'warning',
            content: '**Inimigo Natural:** Frutos do tipo Logia e algumas do tipo Paramecia encontram fraquezas em elementos ou manifestações específicas. Por exemplo, um usuário da Logia da areia não consegue se tornar intangível ao interagir com água.'
          }
        ]
      },
      {
        id: 'criando-tecnicas',
        title: '6.6 a 6.9 – Criando Técnicas',
        content: [
          {
            type: 'paragraph',
            content: 'Quando o jogador comer uma Akuma no Mi, suas habilidades devem ser criadas pelo próprio jogador com a aprovação do Narrador. As técnicas são aprendidas conforme o nível do personagem aumenta.'
          },
          {
            type: 'subheading',
            content: 'Relação entre Pontos de Poder e Dano'
          },
          {
            type: 'table',
            headers: ['Tipo de Técnica', 'Dado de Dano por PP', 'Observação'],
            rows: [
              ['Alvo único (ataque)', '1d10 por PP', 'Jogada de ataque normal'],
              ['Múltiplos alvos (área)', '1d6 por PP', 'Salvaguarda de Destreza'],
              ['Alvo único (salvaguarda, metade no sucesso)', '1d8 por PP', 'Salvaguarda definida pelo fruto'],
              ['Alvo único (salvaguarda, nenhum no sucesso)', '1d10 por PP', 'Salvaguarda definida pelo fruto'],
            ]
          },
          {
            type: 'subheading',
            content: 'Graus das Técnicas'
          },
          {
            type: 'table',
            headers: ['Grau', 'Nível Mínimo', 'PP Máximo', 'Alcance Máximo'],
            rows: [
              ['1º Grau', '1º nível', '3 PP', '9 metros'],
              ['2º Grau', '3º nível', '6 PP', '18 metros'],
              ['3º Grau', '6º nível', '9 PP', '30 metros'],
              ['4º Grau', '9º nível', '12 PP', '45 metros'],
              ['5º Grau', '12º nível', '15 PP', '60 metros'],
              ['6º Grau', '16º nível', '18 PP', '90 metros'],
              ['7º Grau', '20º nível', '21 PP', '120 metros'],
            ]
          },
          {
            type: 'subheading',
            content: 'Tipos de Dano'
          },
          {
            type: 'table',
            headers: ['Tipo de Dano', 'Custo Adicional em PP'],
            rows: [
              ['Contundente, Cortante, Perfurante', 'Gratuito'],
              ['Ácido, Elétrico, Fogo, Frio, Veneno', '1 PP adicional'],
              ['Psíquico, Energia, Trovejante', '2 PP ou metade do grau (o menor)'],
              ['Verdadeiro', '3 PP ou metade do grau (o maior)'],
            ]
          },
          {
            type: 'gold-box',
            content: '**CD da Akuma no Mi:** 8 + bônus de proficiência + modificador do atributo apropriado\n\n**Modificador de Ataque:** bônus de proficiência + modificador do atributo apropriado'
          }
        ]
      },
      {
        id: 'logia-paramecia',
        title: '6.11 – Usuários Logia e Paramecia',
        content: [
          {
            type: 'paragraph',
            content: 'Usuários de Logia podem transformar seu corpo no elemento que representam, tornando-se intangíveis a ataques físicos normais. Usuários de Paramecia ganham habilidades sobre-humanas variadas que modificam seu corpo ou o ambiente ao redor.'
          },
          {
            type: 'subheading',
            content: 'Intangibilidade Logia'
          },
          {
            type: 'rule-box',
            content: '**Corpo Elementar:** Usuários de Logia podem ativar sua intangibilidade como reação quando são alvo de um ataque. O ataque passa pelo corpo sem causar dano. Ataques com Haki do Armamento, Kairoseki ou o Inimigo Natural do fruto ignoram essa habilidade.'
          },
          {
            type: 'subheading',
            content: 'Despertar da Akuma no Mi'
          },
          {
            type: 'gold-box',
            content: '**Despertar:** Em níveis avançados (geralmente 15+), usuários de Akuma no Mi podem despertar seus poderes, expandindo suas habilidades para além dos limites normais. Para Paramecia, isso geralmente significa afetar o ambiente ao redor. Para Logia, significa controle ainda maior do elemento. Para Zoan, significa uma forma ainda mais poderosa.'
          }
        ]
      },
      {
        id: 'zoan',
        title: '6.12 a 6.13 – Usuários Zoan',
        content: [
          {
            type: 'paragraph',
            content: 'Usuários de Zoan podem se transformar em animais ou híbridos. Existem três subtipos: Zoan Comum (animais normais), Zoan Ancestral (animais extintos ou lendários) e Zoan Mítico (criaturas mitológicas).'
          },
          {
            type: 'table',
            headers: ['Subtipo', 'Exemplos', 'Poder Relativo'],
            rows: [
              ['Zoan Comum', 'Lobo, Tubarão, Falcão', 'Moderado'],
              ['Zoan Ancestral', 'Dinossauro, Mamute, Pterossauro', 'Alto'],
              ['Zoan Mítico', 'Fênix, Dragão, Nika', 'Extremamente Alto'],
            ]
          },
          {
            type: 'rule-box',
            content: '**Formas de Transformação:** Usuários Zoan possuem três formas:\n\n**Forma Humana:** Aparência normal, sem poderes ativos.\n\n**Forma Híbrida:** Combinação de humano e animal. Mantém habilidades humanas enquanto ganha atributos animais. É a forma mais versátil em combate.\n\n**Forma Animal:** Transformação completa no animal. Máximo poder físico mas perde habilidades humanas como falar e usar armas.'
          }
        ]
      }
    ]
  },
  {
    id: 'haki',
    number: 7,
    title: 'Haki',
    icon: '👁️',
    badge: 'Espírito',
    color: 'text-amber-400',
    sections: [
      {
        id: 'despertando-haki',
        title: '7.1 – Despertando o Haki',
        content: [
          {
            type: 'quote',
            content: 'Haki é um poder dormente em todas as criaturas do mundo... "Presença", "Espírito de Luta" e "Intimidação"... Não é diferente de coisas que os humanos sentem naturalmente como o "Ato de não duvidar". Isso é força!',
            author: 'Silvers Rayleigh'
          },
          {
            type: 'paragraph',
            content: 'Haki é um poder misterioso inerente de todos os seres vivos do mundo. O despertar do Haki ocorre quando o personagem atinge o 8º nível de personagem, sendo considerado que nesse nível ele já esteja ciente de sua existência.'
          },
          {
            type: 'rule-box',
            content: '**Pontos de Ambição (PA):** Recebidos automaticamente ao atingir o 8º nível (1 ponto inicial + 3 pontos a cada nível posterior). O Narrador também pode recompensar jogadores com PA por critérios próprios.\n\n**Aptidão para Haki:** A partir do 1º nível, o personagem escolhe em qual Haki terá mais afinidade. Ao despertar, recebe 2 PA extras no Haki escolhido.'
          },
          {
            type: 'subheading',
            content: 'Estágios do Usuário'
          },
          {
            type: 'table',
            headers: ['Estágio', 'PA Distribuídos', 'Capacidade'],
            rows: [
              ['Inexperiente', '1 a 10 PA', 'Teste de Vontade (Haki) CD 15 no início de cada combate. Falha = não pode usar Haki.'],
              ['Treinado', '11 a 30 PA', 'Teste de Vontade (Haki) CD 15 no início de cada combate. Falha = só pode usar Haki Principal.'],
              ['Perito', '31+ PA', 'Sem necessidade de teste. Usa todos os tipos de Haki normalmente.'],
            ]
          },
          {
            type: 'subheading',
            content: 'Superando-se'
          },
          {
            type: 'gold-box',
            content: '**Ganhar PA em Combate:** Ao enfrentar um oponente com alto domínio de Haki, você pode romper suas próprias barreiras. O Narrador decide se você conseguiu superar os limites. Este evento pode ocorrer uma vez por descanso longo, recebendo 1 PA ao final do encontro.\n\nFormas garantidas de receber 1 PA:\n- Cair a 0 PV e recuperar pelo menos 1 PV durante o encontro\n- Usar uma técnica com Sobrecarga\n- Realizar um acerto crítico natural com uma técnica afetada pelo Haki'
          }
        ]
      },
      {
        id: 'tipos-haki',
        title: '7.4 – Tipos de Haki e Talentos',
        content: [
          {
            type: 'subheading',
            content: 'Haki da Observação'
          },
          {
            type: 'paragraph',
            content: 'Permite ao usuário sentir a presença e as emoções de outras pessoas, mesmo que estejam escondidas ou muito longe. Em níveis mais elevados, pode prever os movimentos de um adversário antes de fazê-los.'
          },
          {
            type: 'table',
            headers: ['Talento', 'Estágio', 'PA', 'Requisito'],
            rows: [
              ['Identificar Emoções', 'Inexperiente', '1', '—'],
              ['Perceber Presença', 'Inexperiente', '1', '—'],
              ['Senso de Desafio', 'Inexperiente', '1', 'Identificar Emoções'],
              ['Antevisão', 'Inexperiente', '3', '—'],
              ['Previsão', 'Inexperiente', '2', '—'],
              ['Percepção Ágil', 'Inexperiente', '2', 'Previsão'],
              ['Clarividência', 'Inexperiente', '2', 'Identificar Emoção e Perceber Presença'],
              ['Antecipação', 'Treinado', '2', 'Perceber Presença'],
              ['Antevisão Sobrenatural', 'Treinado', '2', 'Antevisão (Dom.)'],
              ['Previsão Sobrenatural', 'Treinado', '2', 'Previsão (Dom.)'],
              ['Vidente', 'Treinado', '2', 'Antevisão e Previsão'],
              ['Premonição', 'Treinado', '2', 'Clarividência (Dom.)'],
              ['Ver o Futuro', 'Perito', '5', 'Premonição e Vidente (Av.)'],
              ['Antevisão Especial', 'Perito', '5', 'Antevisão Sobrenatural e Antecipação'],
              ['Previsão Especial', 'Perito', '5', 'Previsão Sobrenatural, Percepção Ágil e Identificar Emoções'],
            ]
          },
          {
            type: 'subheading',
            content: 'Haki do Armamento'
          },
          {
            type: 'paragraph',
            content: 'Permite ao usuário criar uma armadura invisível ao redor do corpo ou de armas, aumentando o poder de ataque e a defesa. É o único meio de atingir usuários de Logia em sua forma elementar.'
          },
          {
            type: 'table',
            headers: ['Talento', 'Estágio', 'PA', 'Efeito'],
            rows: [
              ['Endurecimento', 'Inexperiente', '1', 'Bônus de +1 na CR'],
              ['Revestimento', 'Inexperiente', '2', 'Ataques ignoram resistência a dano físico'],
              ['Fluxo Interno', 'Treinado', '3', 'Dano adicional em ataques'],
              ['Armamento Avançado', 'Treinado', '4', 'Penetra imunidades a dano físico'],
              ['Armamento Supremo', 'Perito', '5', 'Forma máxima do Haki do Armamento'],
            ]
          },
          {
            type: 'subheading',
            content: 'Haki do Rei'
          },
          {
            type: 'paragraph',
            content: 'O tipo mais raro de Haki, possuído apenas por "escolhidos". Permite ao usuário subjugar a vontade dos outros ao redor, levando inimigos com pouca força de vontade a perderem a consciência.'
          },
          {
            type: 'rule-box',
            content: '**CD do Haki do Rei:** 8 + bônus de proficiência + modificador de Vontade\n\n**Desmaiando Inimigos:** Ao liberar a aura contra inimigos com Vontade menor que a sua, eles devem fazer uma Salvaguarda de Vontade. Em caso de falha, ficam "Inconscientes" por até 5 minutos.\n\n**Não afeta:** Criaturas com Vontade igual ou maior que a sua, Vontade 18+, imunes a "Amedrontado", com ações lendárias, ou que possuam o Haki do Rei.'
          },
          {
            type: 'subheading',
            content: 'Choque entre Haki do Rei'
          },
          {
            type: 'table',
            headers: ['Estágio', 'Sobreposição', 'Impacto Real', 'Presença Sufocante', 'Mesura dos Céus'],
            rows: [
              ['Inexperiente', '+1', '1d10', '1d6', 'Forte ventania'],
              ['Treinado', '+3', '3d10', '2d10', 'Nuvens do céu se dividem'],
              ['Perito', '+5', '6d10', '3d12', 'Nuvens do céu se dissipam'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'equipamentos',
    number: 8,
    title: 'Equipamentos',
    icon: '🗡️',
    badge: 'Itens',
    color: 'text-orange-400',
    sections: [
      {
        id: 'riqueza',
        title: '8.1 a 8.2 – Equipamento Inicial e Riqueza',
        content: [
          {
            type: 'paragraph',
            content: 'A moeda do mundo de One Piece é o Berry (B$). O equipamento inicial é concedido pelo Estilo de Combate e pela Profissão do personagem. Adicionalmente, o personagem recebe uma quantidade de Bellys para comprar itens extras.'
          },
          {
            type: 'subheading',
            content: 'Estilos de Vida e Custos Diários'
          },
          {
            type: 'table',
            headers: ['Estilo de Vida', 'Custo Diário', 'Descrição'],
            rows: [
              ['Miserável', '0 B$', 'Sem abrigo fixo, mendicância'],
              ['Pobre', '1 B$', 'Abrigo básico, refeições simples'],
              ['Modesto', '5 B$', 'Estalagem simples, refeições decentes'],
              ['Confortável', '20 B$', 'Boa estalagem, refeições variadas'],
              ['Rico', '100 B$', 'Alojamento de luxo, refeições finas'],
              ['Aristocrático', '1.000+ B$', 'Mansão, banquetes, serviçais'],
            ]
          }
        ]
      },
      {
        id: 'aventura',
        title: '8.3 – Equipamentos de Aventura',
        content: [
          {
            type: 'paragraph',
            content: 'Equipamentos de aventura incluem ferramentas, suprimentos e itens especiais que auxiliam os personagens em suas jornadas. Muitos itens são únicos do universo de One Piece, como os Dials dos Celestiais.'
          },
          {
            type: 'table',
            headers: ['Item', 'Custo', 'Peso', 'Descrição'],
            rows: [
              ['Corda (15m)', '1 B$', '2 kg', 'Corda resistente de cânhamo'],
              ['Lanterna', '5 B$', '1 kg', 'Ilumina área de 6 metros por 6 horas'],
              ['Antídoto', '50 B$', '—', 'Cura venenos comuns'],
              ['Kit de Primeiros Socorros', '100 B$', '1,5 kg', 'Permite testes de Medicina sem penalidade'],
              ['Bússola', '200 B$', '0,1 kg', 'Indica o norte magnético'],
              ['Log Pose', '500 B$', '0,1 kg', 'Essencial para navegar na Grand Line'],
              ['Eternal Pose', '5.000+ B$', '0,1 kg', 'Aponta permanentemente para uma ilha específica'],
              ['Dial (cotidiano)', '100-500 B$', '0,2 kg', 'Armazena e libera elementos (vento, som, etc.)'],
              ['Dial (bélico)', '1.000-5.000 B$', '0,3 kg', 'Dials poderosos para combate'],
            ]
          }
        ]
      },
      {
        id: 'armas',
        title: '8.4 – Armas',
        content: [
          {
            type: 'paragraph',
            content: 'As armas são divididas em categorias: Simples (qualquer um pode usar), Marciais (requerem treinamento) e Especiais (únicas do universo). Cada arma tem propriedades que afetam como pode ser usada em combate.'
          },
          {
            type: 'table',
            headers: ['Arma', 'Dano', 'Tipo', 'Propriedades'],
            rows: [
              ['Adaga', '1d4', 'Cortante/Perfurante', 'Leve, Arremesso (6/18m), Acuidade'],
              ['Espada Curta', '1d6', 'Perfurante', 'Leve, Acuidade'],
              ['Espada Longa', '1d8 / 1d10 (2 mãos)', 'Cortante', 'Versátil'],
              ['Katana', '1d8 / 1d10 (2 mãos)', 'Cortante', 'Versátil, Acuidade'],
              ['Kanabo', '2d6', 'Contundente', 'Pesada, Duas Mãos'],
              ['Pistola', '1d10', 'Perfurante', 'Munição (30/90m), Recarga'],
              ['Rifle', '1d12', 'Perfurante', 'Munição (80/240m), Pesada, Duas Mãos'],
              ['Bazuca', '2d8', 'Contundente', 'Munição (60/180m), Pesada, Recarga'],
              ['Canhão de Mão', '3d6', 'Contundente', 'Munição (30/90m), Pesada, Recarga'],
              ['Tridente', '1d6', 'Perfurante', 'Arremesso (6/18m), Versátil (1d8)'],
              ['Arco', '1d8', 'Perfurante', 'Munição (30/120m), Duas Mãos'],
              ['Shuriken', '1d4', 'Perfurante', 'Arremesso (6/18m), Leve'],
            ]
          },
          {
            type: 'subheading',
            content: 'Propriedades das Armas'
          },
          {
            type: 'table',
            headers: ['Propriedade', 'Efeito'],
            rows: [
              ['Acuidade', 'Pode usar Destreza em vez de Força para ataque e dano'],
              ['Arremesso', 'Pode ser arremessada (alcance curto/longo)'],
              ['Duas Mãos', 'Requer duas mãos para usar'],
              ['Leve', 'Pode ser usada com a outra mão (combate com duas armas)'],
              ['Munição', 'Requer munição para usar (alcance curto/longo)'],
              ['Pesada', 'Criaturas Pequenas têm desvantagem'],
              ['Recarga', 'Requer ação para recarregar após uso'],
              ['Versátil', 'Pode ser usada com uma ou duas mãos (dano diferente)'],
            ]
          }
        ]
      },
      {
        id: 'montarias',
        title: '8.6 – Montarias e Veículos',
        content: [
          {
            type: 'paragraph',
            content: 'No mundo de One Piece, os personagens podem usar diversas montarias e veículos para se deslocar mais rapidamente ou em terrenos difíceis.'
          },
          {
            type: 'table',
            headers: ['Montaria/Veículo', 'Custo', 'Deslocamento', 'Capacidade'],
            rows: [
              ['Cavalo de Sela', '500 B$', '18m', '1 cavaleiro + carga'],
              ['Carruagem', '2.000 B$', '12m', '4 passageiros + carga'],
              ['Barco a Remo', '100 B$', '6m (remo)', '4 pessoas'],
              ['Barco a Vela (pequeno)', '5.000 B$', 'Vento', '8 pessoas'],
              ['Navio Pirata (médio)', '50.000+ B$', 'Vento', '20-50 pessoas'],
              ['Submarino', '100.000+ B$', '12m submerso', '10-30 pessoas'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'atributos',
    number: 9,
    title: 'Atributos',
    icon: '📊',
    badge: 'Estatísticas',
    color: 'text-cyan-400',
    sections: [
      {
        id: 'valores-modificadores',
        title: '9.1 a 9.3 – Valores, Modificadores e Proficiência',
        content: [
          {
            type: 'paragraph',
            content: 'Os seis atributos fundamentais definem as capacidades básicas de um personagem. Cada atributo tem um valor (geralmente entre 1 e 20) e um modificador derivado desse valor.'
          },
          {
            type: 'table',
            headers: ['Atributo', 'Abreviação', 'Governa'],
            rows: [
              ['Força', 'FOR', 'Poder físico, ataques corpo a corpo, carga máxima'],
              ['Destreza', 'DES', 'Agilidade, reflexos, ataques à distância, furtividade'],
              ['Constituição', 'CON', 'Resistência física, Pontos de Vida, concentração'],
              ['Sabedoria', 'SAB', 'Percepção, intuição, atenção ao ambiente'],
              ['Vontade', 'VON', 'Força mental, determinação, resistência psíquica, Haki'],
              ['Presença', 'PRE', 'Carisma, liderança, persuasão, intimidação'],
            ]
          }
        ]
      },
      {
        id: 'testes-atributo',
        title: '9.4 a 9.6 – Testes, Salvaguardas e Trabalho em Equipe',
        content: [
          {
            type: 'paragraph',
            content: 'Testes de Atributo são usados quando o resultado de uma ação é incerto. O Narrador define a Classe de Dificuldade (CD) e o jogador rola 1d20 + modificador do atributo relevante.'
          },
          {
            type: 'table',
            headers: ['Dificuldade', 'CD'],
            rows: [
              ['Muito Fácil', '5'],
              ['Fácil', '10'],
              ['Médio', '15'],
              ['Difícil', '20'],
              ['Muito Difícil', '25'],
              ['Quase Impossível', '30'],
            ]
          },
          {
            type: 'subheading',
            content: 'Trabalho de Equipe'
          },
          {
            type: 'rule-box',
            content: '**Ajuda:** Um personagem pode ajudar outro em um Teste de Atributo. O personagem que ajuda deve ser capaz de realizar a tarefa sozinho. O personagem que recebe ajuda realiza o teste com Vantagem.'
          }
        ]
      },
      {
        id: 'usando-atributos',
        title: '9.7 – Usando Cada Atributo',
        content: [
          {
            type: 'subheading',
            content: 'Perícias por Atributo'
          },
          {
            type: 'table',
            headers: ['Atributo', 'Perícias Associadas'],
            rows: [
              ['Força', 'Atletismo'],
              ['Destreza', 'Acrobacia, Furtividade, Prestidigitação'],
              ['Constituição', '(Salvaguardas, sem perícias diretas)'],
              ['Sabedoria', 'Adestramento, Intuição, Medicina, Percepção, Sobrevivência'],
              ['Vontade', 'Haki, Sorte'],
              ['Presença', 'Atuação, Enganação, História, Intimidação, Investigação, Persuasão, Provocação'],
            ]
          },
          {
            type: 'gold-box',
            content: '**Sobrenatural:** Uma perícia especial que não pertence a nenhum atributo específico. É usada para identificar e interagir com poderes sobrenaturais como Akuma no Mi e Haki.'
          }
        ]
      }
    ]
  },
  {
    id: 'tecnicas',
    number: 10,
    title: 'Técnicas',
    icon: '💥',
    badge: 'Habilidades',
    color: 'text-rose-400',
    sections: [
      {
        id: 'utilizando-tecnicas',
        title: '10.1 a 10.2 – Utilizando Técnicas e Área de Efeito',
        content: [
          {
            type: 'paragraph',
            content: 'Técnicas são habilidades especiais que requerem Pontos de Poder para serem executadas. Podem ser ofensivas, defensivas ou de suporte. Cada técnica tem requisitos específicos de ação, alcance e custo.'
          },
          {
            type: 'subheading',
            content: 'Tipos de Alcance'
          },
          {
            type: 'table',
            headers: ['Tipo de Alcance', 'Descrição'],
            rows: [
              ['Toque', 'Deve tocar o alvo para ativar'],
              ['A si mesmo', 'Afeta apenas o usuário'],
              ['Linha', 'Área retangular estreita em linha reta'],
              ['Cone', 'Área em forma de cone a partir do usuário'],
              ['Esfera', 'Área circular ao redor de um ponto'],
              ['Cilindro', 'Área cilíndrica vertical ao redor de um ponto'],
              ['Cubo', 'Área cúbica a partir de um ponto'],
            ]
          }
        ]
      },
      {
        id: 'condicoes',
        title: '10.3 – Condições',
        content: [
          {
            type: 'paragraph',
            content: 'Condições são estados especiais que afetam as capacidades de um personagem. Podem ser positivas (bônus) ou negativas (penalidades). Algumas condições se acumulam, outras se cancelam mutuamente.'
          },
          {
            type: 'table',
            headers: ['Condição', 'Efeito Principal'],
            rows: [
              ['Amedrontado', 'Desvantagem em testes e ataques enquanto a fonte do medo estiver visível'],
              ['Atordoado', 'Incapaz de se mover, falar ou realizar ações. Falha automática em FOR e DES.'],
              ['Cego', 'Não pode ver. Desvantagem em ataques, inimigos têm vantagem contra você.'],
              ['Caído', 'Deitado no chão. Deslocamento custa o dobro. Ataques corpo a corpo têm vantagem.'],
              ['Enfeitiçado', 'Não pode atacar o encantador. Encantador tem vantagem em interações sociais.'],
              ['Enfraquecido', 'Incapaz de se mover ou usar poderes da Akuma no Mi.'],
              ['Envenenado', 'Desvantagem em ataques e testes de atributo.'],
              ['Impedido', 'Velocidade 0. Desvantagem em ataques e DES. Ataques contra você têm vantagem.'],
              ['Inconsciente', 'Incapacitado, cai no chão. Falha em FOR e DES. Ataques corpo a corpo são críticos.'],
              ['Invisível', 'Não pode ser visto. Vantagem em ataques, inimigos têm desvantagem contra você.'],
              ['Paralisado', 'Incapacitado e não pode se mover. Falha em FOR e DES.'],
              ['Petrificado', 'Transformado em pedra. Incapacitado, resistência a todos os danos.'],
              ['Surdo', 'Não pode ouvir. Falha em testes de Percepção baseados em som.'],
            ]
          }
        ]
      },
      {
        id: 'exaustao',
        title: '10.4 – Exaustão',
        content: [
          {
            type: 'paragraph',
            content: 'A condição de Exaustão é acumulativa. Cada vez que você recebe essa condição, ela aumenta em 1 nível, levando ao desmaio caso atinja o 6º nível.'
          },
          {
            type: 'table',
            headers: ['Grau', 'Nível de Exaustão', 'Redução no D20', 'Redução no Deslocamento'],
            rows: [
              ['1º Grau', '1', '–2', '–1,5 metros'],
              ['2º Grau', '2', '–4', '–3 metros'],
              ['3º Grau', '3', '–6', '–4,5 metros'],
              ['4º Grau', '4', '–8', '–6 metros'],
              ['5º Grau', '5', '–10', '–7,5 metros'],
              ['—', '6', 'Desmaio', 'Desmaio'],
            ]
          },
          {
            type: 'gold-box',
            content: '**Removendo Exaustão:** Ao término de um descanso longo, você reduz 1 Nível de Exaustão. Quando seus Níveis de Exaustão chegam a 0, a condição é encerrada.'
          }
        ]
      },
      {
        id: 'doencas',
        title: '10.5 – Doenças',
        content: [
          {
            type: 'paragraph',
            content: 'Doenças são condições especiais que se desenvolvem ao longo do tempo e requerem tratamento médico ou descanso prolongado para serem curadas. No mundo de One Piece, existem doenças raras e exóticas que afetam apenas certas espécies ou regiões.'
          },
          {
            type: 'table',
            headers: ['Doença', 'Transmissão', 'Efeito', 'Cura'],
            rows: [
              ['Febre Marinha', 'Exposição prolongada à água do mar', 'Penalidades em CON e FOR', 'Descanso e medicamentos'],
              ['Mal do Navegante', 'Navegar sem Log Pose por muito tempo', 'Desorientação e alucinações', 'Log Pose e descanso'],
              ['Veneno de Serpente', 'Mordida de serpente venenosa', 'Dano contínuo e fraqueza', 'Antídoto específico'],
              ['Gripe Azul', 'Contato com infectados', 'Febre alta e fraqueza extrema', 'Tratamento médico especializado'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'aventura',
    number: 11,
    title: 'Aventura',
    icon: '🗺️',
    badge: 'Exploração',
    color: 'text-green-400',
    sections: [
      {
        id: 'aventurando',
        title: '11.1 a 11.2 – Aventurando-se e Deslocamento',
        content: [
          {
            type: 'paragraph',
            content: 'A aventura é o coração do RPG. Explorar ilhas desconhecidas, navegar mares perigosos e descobrir segredos antigos são atividades centrais no universo de One Piece.'
          },
          {
            type: 'subheading',
            content: 'Velocidade de Viagem'
          },
          {
            type: 'table',
            headers: ['Ritmo', 'Distância por Hora', 'Distância por Dia', 'Efeito'],
            rows: [
              ['Rápido', '6 km', '45 km', 'Penalidade de –5 em Percepção passiva'],
              ['Normal', '4,5 km', '36 km', 'Sem penalidade'],
              ['Lento', '3 km', '27 km', 'Pode usar Furtividade, +5 em Percepção passiva'],
            ]
          },
          {
            type: 'subheading',
            content: 'Tipos de Terreno'
          },
          {
            type: 'table',
            headers: ['Terreno', 'Modificador de Velocidade'],
            rows: [
              ['Estrada ou campo aberto', '×1 (normal)'],
              ['Floresta densa', '×0,5'],
              ['Pântano ou terreno alagado', '×0,5'],
              ['Montanha ou terreno acidentado', '×0,5'],
              ['Neve profunda', '×0,5'],
              ['Mar (navio)', 'Depende do vento e do navio'],
            ]
          }
        ]
      },
      {
        id: 'descanso',
        title: '11.3 – Descanso',
        content: [
          {
            type: 'subheading',
            content: 'Descanso Curto'
          },
          {
            type: 'rule-box',
            content: '**Descanso Curto (1 hora):** Durante um descanso curto, o personagem pode gastar um ou mais Dados de Vida para recuperar Pontos de Vida. Para cada Dado de Vida gasto, role o dado e adicione o modificador de Constituição. O total é adicionado aos PV atuais (máximo: PV máximos).'
          },
          {
            type: 'subheading',
            content: 'Descanso Longo'
          },
          {
            type: 'rule-box',
            content: '**Descanso Longo (8 horas):** Ao final de um descanso longo, o personagem recupera todos os Pontos de Vida e todos os Dados de Vida gastos (até metade do total). Também recupera todos os Pontos de Poder e reduz 1 Nível de Exaustão. Um personagem só pode se beneficiar de um descanso longo por período de 24 horas.'
          }
        ]
      },
      {
        id: 'ambiente',
        title: '11.5 – O Ambiente',
        content: [
          {
            type: 'paragraph',
            content: 'O mundo de One Piece possui ambientes extremamente variados, desde ilhas tropicais até regiões de gelo eterno, florestas flutuantes e até ilhas no céu. Cada ambiente apresenta desafios únicos.'
          },
          {
            type: 'table',
            headers: ['Ambiente', 'Desafio Principal', 'Habilidade Relevante'],
            rows: [
              ['Mar Aberto', 'Tempestades, criaturas marinhas', 'Sobrevivência, Atletismo'],
              ['Grand Line', 'Clima imprevisível, Log Pose necessário', 'Navegação, Percepção'],
              ['Ilha de Neve', 'Frio extremo, visibilidade reduzida', 'Sobrevivência, Constituição'],
              ['Ilha de Deserto', 'Calor extremo, falta de água', 'Sobrevivência, Constituição'],
              ['Ilha do Céu', 'Altitude, ventos fortes', 'Acrobacia, Atletismo'],
              ['Fundo do Mar', 'Pressão, falta de ar', 'Constituição, Atletismo'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'combate',
    number: 12,
    title: 'Combate',
    icon: '🥊',
    badge: 'Batalha',
    color: 'text-red-500',
    sections: [
      {
        id: 'ordem-combate',
        title: '12.1 – A Ordem de Combate',
        content: [
          {
            type: 'paragraph',
            content: 'O combate é a parte mais estruturada do RPG, com turnos que garantem que todos os participantes tenham oportunidade de agir. A ordem de combate é determinada pela Iniciativa.'
          },
          {
            type: 'rule-box',
            content: '**Iniciativa:** No início de um combate, todos os participantes rolam 1d20 + modificador de Destreza. O resultado determina a ordem de ação — do maior para o menor. Em caso de empate, o personagem com maior modificador de Destreza age primeiro.'
          },
          {
            type: 'subheading',
            content: 'Surpresa'
          },
          {
            type: 'paragraph',
            content: 'Se um grupo de aventureiros ou monstros surpreender o outro, aqueles que foram surpreendidos não podem agir no primeiro turno do combate. Um membro de um grupo pode ser surpreendido mesmo que os outros não sejam.'
          }
        ]
      },
      {
        id: 'acoes-combate',
        title: '12.4 – Ações de Combate',
        content: [
          {
            type: 'table',
            headers: ['Ação', 'Tipo', 'Descrição'],
            rows: [
              ['Atacar', 'Ação', 'Realizar um ataque com arma ou desarmado'],
              ['Ajuda', 'Ação', 'Dar vantagem a um aliado em um teste ou ataque'],
              ['Disparada', 'Ação', 'Dobrar o deslocamento neste turno'],
              ['Esconder', 'Ação', 'Tentar se esconder (Teste de Furtividade)'],
              ['Esquivar', 'Ação', 'Inimigos têm desvantagem em ataques contra você'],
              ['Estudar', 'Ação', 'Analisar um inimigo para descobrir fraquezas'],
              ['Influenciar', 'Ação', 'Tentar persuadir, intimidar ou enganar em combate'],
              ['Preparar', 'Ação', 'Preparar uma ação para usar como reação'],
              ['Procurar', 'Ação', 'Procurar algo ou alguém (Teste de Percepção)'],
              ['Usar um Objeto', 'Ação', 'Usar um item do inventário'],
              ['Técnica de Combate', 'Ação Poderosa', 'Executar uma técnica especial do Estilo de Combate'],
              ['Técnica Auxiliar', 'Ação Bônus/Reação', 'Executar uma técnica de suporte ou defesa'],
            ]
          }
        ]
      },
      {
        id: 'realizando-ataque',
        title: '12.5 – Realizando um Ataque',
        content: [
          {
            type: 'paragraph',
            content: 'Para realizar um ataque, role 1d20 e adicione os modificadores relevantes. Compare o resultado com a Classe de Resistência (CR) do alvo. Se o resultado for igual ou maior que a CR, o ataque acerta.'
          },
          {
            type: 'gold-box',
            content: '**Bônus de Ataque:**\n- Armas corpo a corpo: modificador de Força + bônus de proficiência\n- Armas à distância: modificador de Destreza + bônus de proficiência\n- Arma favorita: pode usar o modificador do Atributo Primário\n- Técnicas: bônus de proficiência + modificador do atributo apropriado'
          },
          {
            type: 'subheading',
            content: 'Acerto Crítico e Falha Crítica'
          },
          {
            type: 'table',
            headers: ['Resultado no D20', 'Efeito'],
            rows: [
              ['20 natural', 'Acerto Crítico: role o dado de dano duas vezes e some'],
              ['1 natural', 'Falha Crítica: o ataque falha automaticamente, independente de bônus'],
            ]
          }
        ]
      },
      {
        id: 'dano-cura',
        title: '12.6 a 12.7 – Dano, Cura e Ferimentos Persistentes',
        content: [
          {
            type: 'paragraph',
            content: 'Quando um ataque acerta, role o dado de dano e adicione os modificadores relevantes. Subtraia o resultado dos Pontos de Vida do alvo. Quando os PV chegam a 0, o personagem cai inconsciente.'
          },
          {
            type: 'subheading',
            content: 'Ferimentos Persistentes'
          },
          {
            type: 'rule-box',
            content: '**Ferimentos Persistentes:** Quando um personagem sofre dano massivo em um único golpe (geralmente metade ou mais dos PV máximos), o Narrador pode determinar que o personagem sofreu um ferimento persistente. Esses ferimentos requerem tratamento médico específico para serem curados e podem impor penalidades mecânicas até serem tratados.'
          },
          {
            type: 'subheading',
            content: 'Morte e Estabilização'
          },
          {
            type: 'rule-box',
            content: '**A 0 PV:** O personagem cai inconsciente e deve fazer Salvaguardas de Morte no início de cada turno (1d20, CD 10). Três sucessos = estabilizado. Três falhas = morte. Receber dano a 0 PV conta como uma falha. Um 1 natural conta como duas falhas. Um 20 natural = recupera 1 PV e volta à consciência.'
          }
        ]
      },
      {
        id: 'combate-submerso',
        title: '12.8 a 12.9 – Combate Submerso e Montado',
        content: [
          {
            type: 'paragraph',
            content: 'O combate submerso apresenta desafios únicos. Criaturas sem deslocamento de nado têm desvantagem em ataques com armas de corte e perfuração. Armas de fogo não funcionam submerso. Usuários de Akuma no Mi ficam enfraquecidos.'
          },
          {
            type: 'paragraph',
            content: 'O combate montado permite que um personagem use sua montaria para se mover mais rapidamente e atacar de posições vantajosas. A montaria age na mesma iniciativa do cavaleiro.'
          }
        ]
      }
    ]
  },
  {
    id: 'tripulacao',
    number: 13,
    title: 'Tripulação',
    icon: '🏴‍☠️',
    badge: 'Grupo',
    color: 'text-indigo-400',
    sections: [
      {
        id: 'unindo-tripulacao',
        title: '13.1 a 13.2 – Unindo-se e Funções',
        content: [
          {
            type: 'paragraph',
            content: 'Uma tripulação pirata é mais do que um grupo de aventureiros — é uma família. Cada membro tem um papel vital que contribui para o sucesso de toda a equipe.'
          },
          {
            type: 'table',
            headers: ['Função', 'Responsabilidade', 'Profissão Relacionada'],
            rows: [
              ['Capitão', 'Liderança e tomada de decisões', 'Combatente, qualquer'],
              ['Imediato', 'Segundo em comando', 'Combatente, qualquer'],
              ['Navegador', 'Traçar rotas e prever clima', 'Navegador'],
              ['Cozinheiro', 'Alimentação da tripulação', 'Cozinheiro'],
              ['Médico', 'Saúde da tripulação', 'Médico'],
              ['Carpinteiro', 'Manutenção do navio', 'Carpinteiro'],
              ['Músico', 'Moral da tripulação', 'Músico'],
              ['Arqueólogo', 'Pesquisa e história', 'Arqueólogo'],
              ['Timoneiro', 'Pilotagem do navio', 'Timoneiro'],
              ['Engenheiro', 'Tecnologia e invenções', 'Engenheiro'],
            ]
          }
        ]
      },
      {
        id: 'recompensas',
        title: '13.3 – Recompensas',
        content: [
          {
            type: 'paragraph',
            content: 'As recompensas (bounties) são preços colocados pela Marinha sobre a cabeça de piratas perigosos. Quanto maior a recompensa, mais famoso (e perigoso) é o pirata. A recompensa aumenta conforme o personagem realiza feitos notáveis.'
          },
          {
            type: 'table',
            headers: ['Faixa de Recompensa', 'Status', 'Nível Aproximado'],
            rows: [
              ['0 – 1.000.000 B$', 'Desconhecido', '1-4'],
              ['1.000.001 – 50.000.000 B$', 'Fama Local', '5-8'],
              ['50.000.001 – 200.000.000 B$', 'Notoriedade Regional', '9-12'],
              ['200.000.001 – 500.000.000 B$', 'Renome na Grand Line', '13-16'],
              ['500.000.001+ B$', 'Fama Mundial', '17-20'],
            ]
          }
        ]
      },
      {
        id: 'combates-tripulacao',
        title: '13.4 a 13.5 – Combates de Tripulação e Títulos',
        content: [
          {
            type: 'paragraph',
            content: 'Combates de Tripulação são confrontos em larga escala entre grupos de piratas. As regras são simplificadas para representar batalhas com dezenas ou centenas de combatentes.'
          },
          {
            type: 'subheading',
            content: 'Títulos'
          },
          {
            type: 'table',
            headers: ['Título', 'Requisito', 'Benefício'],
            rows: [
              ['Pirata Novato', 'Começar o jogo', 'Nenhum especial'],
              ['Pirata Notório', 'Recompensa 50M+', 'Reconhecimento em portos'],
              ['Supernovato', 'Recompensa 100M+', 'Respeito de outros piratas'],
              ['Pirata do Novo Mundo', 'Cruzar o Red Line', 'Acesso ao Novo Mundo'],
              ['Yonko', 'Dominar o Novo Mundo', 'Um dos quatro grandes piratas'],
              ['Rei dos Piratas', 'Encontrar o One Piece', 'Objetivo final'],
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'embarcacoes',
    number: 14,
    title: 'Embarcações',
    icon: '⛵',
    badge: 'Navios',
    color: 'text-sky-400',
    sections: [
      {
        id: 'navio',
        title: '14.1 a 14.4 – O Navio e Construção',
        content: [
          {
            type: 'paragraph',
            content: 'O navio é o lar da tripulação pirata. Escolher e manter um bom navio é essencial para sobreviver nos mares perigosos do mundo de One Piece.'
          },
          {
            type: 'subheading',
            content: 'Características do Navio'
          },
          {
            type: 'table',
            headers: ['Característica', 'Descrição'],
            rows: [
              ['Pontos de Vida do Navio', 'Resistência do casco a danos em batalha'],
              ['Classe de Resistência', 'Dificuldade de acertar o navio'],
              ['Velocidade', 'Deslocamento máximo com vento favorável'],
              ['Efetivo Necessário', 'Número mínimo de tripulantes para operar'],
              ['Efetivo Máximo', 'Número máximo de tripulantes que o navio suporta'],
              ['Capacidade de Carga', 'Peso máximo de carga que o navio pode transportar'],
              ['Armamento', 'Canhões e outras armas instaladas'],
            ]
          },
          {
            type: 'subheading',
            content: 'Modelos de Embarcações'
          },
          {
            type: 'table',
            headers: ['Modelo', 'Tamanho', 'PV', 'Velocidade', 'Custo Base'],
            rows: [
              ['Bote a Remo', 'Minúsculo', '50', '3m', '100 B$'],
              ['Barco a Vela', 'Pequeno', '150', '9m', '5.000 B$'],
              ['Caravela', 'Médio', '300', '12m', '20.000 B$'],
              ['Galeão', 'Grande', '600', '12m', '100.000 B$'],
              ['Navio de Guerra', 'Enorme', '1.200', '15m', '500.000 B$'],
              ['Submarino', 'Grande', '400', '9m (submerso)', '200.000 B$'],
            ]
          }
        ]
      },
      {
        id: 'batalha-maritima',
        title: '14.5 a 14.6 – Batalha Marítima e Navegação',
        content: [
          {
            type: 'paragraph',
            content: 'Batalhas marítimas são confrontos entre navios. As regras representam manobras táticas, trocas de canhonadas e abordagens. A posição relativa dos navios é crucial para o resultado do combate.'
          },
          {
            type: 'rule-box',
            content: '**Ações em Batalha Marítima:**\n- **Manobrar:** Teste de Navegação para reposicionar o navio\n- **Disparar Canhão:** Ataque com o canhão do navio (requer tripulante)\n- **Reparar:** Teste de Carpintaria para recuperar PV do navio\n- **Abordar:** Aproximar o navio para combate corpo a corpo\n- **Fugir:** Manobra para escapar do combate'
          },
          {
            type: 'subheading',
            content: 'Navegação na Grand Line'
          },
          {
            type: 'paragraph',
            content: 'A Grand Line é o mar mais perigoso e imprevisível do mundo. O clima muda constantemente e de forma inexplicável. Um Log Pose é absolutamente necessário para navegar nessas águas — sem ele, é impossível determinar a direção correta.'
          },
          {
            type: 'gold-box',
            content: '**Log Pose:** O Log Pose registra o campo magnético de uma ilha e aponta para a próxima. Leva tempo para "calibrar" em cada nova ilha (de horas a semanas). O Eternal Pose aponta permanentemente para uma ilha específica e não precisa de calibração.'
          }
        ]
      }
    ]
  }
];

export const getChapterById = (id: string): Chapter | undefined => {
  return chapters.find(c => c.id === id);
};

export const getSectionById = (chapterId: string, sectionId: string) => {
  const chapter = getChapterById(chapterId);
  return chapter?.sections.find(s => s.id === sectionId);
};

export const searchContent = (query: string): Array<{chapter: Chapter, section: Section, preview: string}> => {
  const results: Array<{chapter: Chapter, section: Section, preview: string}> = [];
  const lowerQuery = query.toLowerCase();
  
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      let found = false;
      let preview = '';
      
      if (section.title.toLowerCase().includes(lowerQuery)) {
        found = true;
        preview = section.title;
      }
      
      if (!found) {
        for (const block of section.content) {
          const text = block.content || block.items?.join(' ') || '';
          if (text.toLowerCase().includes(lowerQuery)) {
            found = true;
            const idx = text.toLowerCase().indexOf(lowerQuery);
            preview = text.substring(Math.max(0, idx - 50), idx + 100) + '...';
            break;
          }
          if (block.rows) {
            for (const row of block.rows) {
              const rowText = row.join(' ');
              if (rowText.toLowerCase().includes(lowerQuery)) {
                found = true;
                preview = rowText.substring(0, 100) + '...';
                break;
              }
            }
          }
          if (found) break;
        }
      }
      
      if (found) {
        results.push({ chapter, section, preview });
      }
    }
  }
  
  return results;
};
