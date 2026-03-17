# 🚀 Guia de Deploy - OPRPG Livro do Jogador

## Deploy no Vercel

### Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Repositório GitHub: https://github.com/ja4690241-hue/oprpg-livro-jogador

### Passos para Deploy

#### 1. Conectar GitHub ao Vercel
```bash
1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione "GitHub"
4. Procure por "oprpg-livro-jogador"
5. Clique em "Import"
```

#### 2. Configurar Variáveis de Ambiente
Na tela de configuração do Vercel, adicione as seguintes variáveis de ambiente:

```
DATABASE_URL=seu_banco_de_dados_mysql
JWT_SECRET=sua_chave_secreta_jwt
VITE_APP_ID=seu_app_id_manus
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
VITE_APP_LOGO=https://seu-cdn.com/logo.png
```

#### 3. Deploy
```bash
Clique em "Deploy"
Vercel fará o build e deploy automaticamente
```

### Domínio Customizado
1. Acesse as configurações do projeto no Vercel
2. Vá para "Domains"
3. Adicione seu domínio customizado
4. Configure os registros DNS conforme instruído

## Estrutura do Projeto

```
oprpg-livro-jogador/
├── client/              # Frontend React + Vite
│   ├── src/
│   │   ├── pages/       # Páginas (Home, CharacterCreator, CharactersList)
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
└── vercel.json          # Configuração Vercel
```

## Funcionalidades

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

### 💾 Gerenciador de Personagens
- Criar, editar, deletar fichas
- Duplicar personagens
- Sincronização em nuvem
- Autenticação de usuários

### 🎮 Habilidades Completas
- 19+ perícias
- 20+ treinamentos
- 10+ maestrias
- 6+ talentos de Haki
- 5+ tipos de Akuma no Mi

## Troubleshooting

### Erro de Banco de Dados
```bash
# Verificar conexão
pnpm db:push

# Recriar migrations
rm -rf drizzle/migrations
pnpm db:push
```

### Erro de Build
```bash
# Limpar cache
rm -rf .next dist node_modules
pnpm install
pnpm build
```

### Erro de Autenticação
Verifique se as variáveis de ambiente estão corretas:
- `VITE_APP_ID`
- `OAUTH_SERVER_URL`
- `JWT_SECRET`

## Suporte

Para mais informações sobre o OPRPG, visite:
- [Livro do Jogador v1.5.7](./OPRPG-LivrodoJogador1.5.7.pdf)
- [GitHub Repository](https://github.com/ja4690241-hue/oprpg-livro-jogador)

---

**Criado com ❤️ para a comunidade OPRPG**
