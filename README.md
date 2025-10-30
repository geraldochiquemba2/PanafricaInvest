# PanAfrica Invest 🌍

Plataforma de investimento digital pan-africana que conecta investidores globais às melhores oportunidades de investimento em todos os 54 países africanos.

## 🚀 Tecnologias

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Express.js, Node.js
- **IA**: Groq AI (llama-3.3-70b-versatile)
- **Database**: PostgreSQL
- **Blockchain**: Hedera Hashgraph

## 📦 Instalação

```bash
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5000`

## 🏗️ Build para Produção

```bash
npm run build
npm start
```

## 🌐 Deploy

A aplicação está configurada para deployment no **Render.com**. 

Para instruções detalhadas de deployment, consulte o arquivo **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

### Deploy Rápido

1. Faça push do código para seu repositório Git
2. No Render.com, crie um novo Blueprint
3. Conecte seu repositório
4. Adicione a variável `GROQ_API_KEY`
5. Deploy automático!

## 📝 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
GROQ_API_KEY=your-groq-api-key
```

## 🗄️ Database

Para sincronizar o schema do banco de dados:

```bash
npm run db:push
```

## 📚 Documentação

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia completo de deployment
- [replit.md](./replit.md) - Documentação técnica completa

## 🌟 Funcionalidades

- ✅ Sistema de autenticação completo
- ✅ Recomendações personalizadas via IA
- ✅ Dashboard de investimentos
- ✅ Simulação de wallet Hedera
- ✅ Modo escuro/claro
- ✅ Design responsivo

## 📄 Licença

MIT
