# OP RPG - Livro do Jogador

Um site completo com o **Livro do Jogador do OPRPG v1.5.7** + **Sistema de Criação de Fichas** + **Ferramentas para Players**.

## 🎮 Funcionalidades

### 📚 Livro do Jogador
- 14 capítulos completos
- Busca por regras, espécies e técnicas
- Sidebar de navegação
- Renderização de tabelas e caixas de regras

### 👤 Criador de Fichas
- 6 etapas guiadas
- 8 espécies disponíveis
- 10 estilos de combate
- 11 profissões
- Cálculo automático de modificadores

### 🎲 Ferramentas para Players
- **Rolador de Dados:** d4, d6, d8, d10, d12, d20, d100
- **Calculadora de Dano:** Com modificadores e críticos
- **Gerador de Nomes:** Nomes aleatórios por espécie
- **Gerador de Equipamento:** Itens por profissão
- **Referência de Combate:** Ações, condições, Haki e Akuma

### 📋 Ficha de Personagem
- Visualização de atributos
- Barras de saúde (PV) e energia
- Gerenciador de Haki
- Equipamento e itens
- Notas de combate
- Histórico de ações

### 💾 Backend Completo
- Banco de dados MySQL
- Autenticação OAuth
- Sincronização em nuvem
- CRUD de personagens

## 🚀 Deploy no Vercel

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Conta no [GitHub](https://github.com)

### Passos

1. **Acesse:** https://vercel.com/new
2. **Clique:** "Import Git Repository"
3. **Selecione:** `oprpg-livro-jogador`
4. **Configure as variáveis de ambiente:**
   ```
   DATABASE_URL=sua_conexao_mysql
   JWT_SECRET=sua_chave_secreta
   VITE_APP_ID=seu_app_id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
   OWNER_OPEN_ID=seu_owner_id
   OWNER_NAME=seu_nome
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=sua_chave_api
   VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
   VITE_ANALYTICS_WEBSITE_ID=seu_website_id
   VITE_APP_TITLE=OP RPG - Livro do Jogador
   VITE_APP_LOGO=sua_logo_url
   ```
5. **Clique:** "Deploy"

## 📦 Desenvolvimento Local

### Instalação
```bash
pnpm install
```

### Desenvolvimento
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Start (Produção)
```bash
pnpm start
```

### Testes
```bash
pnpm test
```

### Verificar TypeScript
```bash
pnpm check
```

## 📁 Estrutura do Projeto

```
oprpg-livro-jogador/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── pages/       # Páginas (Home, CharacterCreator, etc)
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── lib/         # Dados e tipos
│   │   └── App.tsx      # Componente principal
│   └── index.html
├── server/              # Backend Express + tRPC
│   ├── routers.ts       # Rotas tRPC
│   ├── routers-characters.ts  # Rotas de personagens
│   ├── db.ts            # Helpers de banco de dados
│   └── db-characters.ts # Helpers de personagens
├── drizzle/             # Migrations e schema
│   └── schema.ts        # Schema do banco de dados
├── shared/              # Código compartilhado
├── vercel.json          # Configuração Vercel
└── package.json         # Dependências
```

## 🔧 Tecnologias

- **Frontend:** React 19, Vite, Tailwind CSS 4, TypeScript
- **Backend:** Express 4, tRPC 11, Node.js
- **Database:** MySQL, Drizzle ORM
- **Auth:** Manus OAuth
- **Deployment:** Vercel

## 📝 Licença

MIT

## 🤝 Suporte

Para dúvidas ou problemas, consulte o [Livro do Jogador](./DEPLOY.md).

---

**Criado com ❤️ para a comunidade OPRPG**
