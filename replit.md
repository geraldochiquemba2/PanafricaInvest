# Panafrica Invest

## Visão Geral
Plataforma de investimento digital pan-africana que conecta investidores globais às melhores oportunidades de investimento em todos os 54 países africanos. Utiliza três agentes de IA trabalhando em conjunto:

1. **Agente 1 - Análise de Perfil**: Coleta dados do usuário via questionário detalhado
2. **Agente 2 - Motor de Recomendação**: Usa Groq AI para gerar recomendações personalizadas
3. **Agente 3 - Cadeia de Reinvestimento**: Monitora portfólio e sugere próximos investimentos

## Tecnologias Principais

### Frontend
- React + TypeScript
- Wouter (roteamento)
- TailwindCSS + Shadcn UI
- Recharts (visualizações)
- Framer Motion (animações)

### Backend
- Express.js + TypeScript
- Groq SDK (IA - llama-3.3-70b-versatile)
- PostgreSQL (planejado para armazenar perfis/histórico)

### Blockchain
- Hedera Hashgraph
  - Token Service (HTS) - tokenização de RWA
  - Consensus Service (HCS) - rastreamento imutável
  - Account Service - gestão de carteiras

## Estrutura do Projeto

### Páginas
- `/` - Landing page com hero, features, top performers
- `/questionnaire` - Questionário de perfil do investidor (4 etapas)
- `/dashboard` - Dashboard com portfólio, gráficos, tabela de ativos
- `/recommendations` - Recomendações personalizadas da IA
- `/reinvest` - Alertas de reinvestimento inteligente

### Componentes Principais
- `HeroSection` - Hero com imagem gerada por IA
- `TopPerformersScoreboard` - Melhores ações por país africano
- `ProfileQuestionnaire` - Questionário multi-etapa
- `RecommendationCard` - Card de recomendação com reasoning da IA
- `ReinvestmentAlert` - Alerta quando alvo de lucro é atingido
- `PortfolioSummary` - Cards resumo do portfólio
- `PerformanceChart` - Gráfico de desempenho temporal
- `AssetTable` - Tabela de ativos com ordenação

### API Endpoints

#### Autenticação
- `POST /api/register` - Registra novo usuário com $500
- `POST /api/login` - Autentica usuário
- `POST /api/logout` - Encerra sessão
- `GET /api/user` - Retorna dados do usuário logado

#### IA & Investimentos
- `POST /api/recommendations` - Gera recomendações usando Groq
- `POST /api/reinvestment-suggestion` - Sugere próximo investimento

## Dados Reais

### Bolsas de Valores Africanas
- Nigerian Stock Exchange (NSE) - DANGCEM, MTNN, BUACEMENT
- Johannesburg Stock Exchange (JSE) - NPN, AGL, BHP
- Nairobi Securities Exchange - SCOM, KCB, EQTY
- Egyptian Exchange (EGX) - COMI, ETEL, PHDC

### Links Externos Funcionais
- [Hedera Network](https://hedera.com/)
- [Groq AI](https://groq.com/)
- [HashScan Explorer](https://hashscan.io/)
- [African Stock Exchanges](https://en.wikipedia.org/wiki/List_of_African_stock_exchanges)
- [Hedera Tokenization](https://hedera.com/users/tokenization)

## Fluxo de Usuário

1. **Chegada** → Landing page com informações
2. **Registro** → Criar conta com $500 de saldo inicial
3. **Login** → Entrar na plataforma
4. **Questionário** → Completa perfil de investidor
5. **Recomendações** → IA (Groq) gera sugestões personalizadas
6. **Dashboard** → Visualiza portfólio e desempenho
7. **Reinvestimento** → Recebe alertas quando targets são atingidos

## Funcionalidades Implementadas

### ✅ Design & UI
- Sistema de design com cores pan-africanas (verde primário)
- Modo escuro/claro funcional
- Animações CSS suaves (fadeIn, slideIn, pulse)
- Componentes Shadcn responsivos
- Botões de voltar em todas as páginas
- Imagens de fundo realistas nas páginas principais

### ✅ Autenticação & Usuários
- Sistema completo de registro e login
- Validação de formulários com Zod
- Sessões seguras com express-session
- Senhas hash com bcryptjs
- Saldo inicial de $500 para novas contas
- Display de saldo e username em todas as páginas
- Logout funcional com confirmação
- Rotas protegidas (Dashboard, Recommendations, Reinvest)

### ✅ IA & Recomendações
- Integração com Groq API (llama-3.3-70b-versatile)
- Geração de recomendações baseada em perfil
- Reasoning detalhado para cada recomendação
- Sugestões de reinvestimento contextualizadas

### ✅ Wallet & Blockchain
- Simulação de conexão de carteira Hedera
- Geração de Account IDs realistas (0.0.XXXXXX)
- Links para HashScan Explorer
- Suporte para HashPack, Blade, MetaMask

### ⏳ Próximas Etapas (Fase 2)
- Integração real com @hashgraph/sdk
- Smart Contracts EVM para automação
- Conexão com APIs de bolsas africanas
- Migração de MemStorage para PostgreSQL persistente
- Sistema KYC/AML

## Variáveis de Ambiente

```
GROQ_API_KEY - Chave API do Groq (configurada)
DATABASE_URL - PostgreSQL connection string
SESSION_SECRET - Segredo para sessões
```

## Comandos

```bash
npm run dev  # Inicia aplicação (Express + Vite)
npm install  # Instala dependências
```

## Notas Técnicas

- Arquivos de mock usam dados reais de empresas africanas
- Links externos abrem em nova aba com security headers
- Questionário salva perfil no localStorage
- API de recomendações usa streaming do Groq
- Charts usam Recharts com temas dark/light adaptativos

## Estado Atual
✅ MVP funcional com IA integrada
✅ Design completo e polido
✅ Navegação fluida com animações
✅ Links externos funcionais
✅ Simulação de wallet Hedera
