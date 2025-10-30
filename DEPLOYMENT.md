# Guia de Deploy no Render.com

Este guia explica como fazer o deploy da aplicação PanAfrica Invest no Render.com.

## Pré-requisitos

1. Conta no [Render.com](https://render.com)
2. Repositório Git (GitHub, GitLab ou Bitbucket)
3. Chave API do Groq AI

## Passos para Deploy

### 1. Preparar o Repositório

Certifique-se de que seu código está em um repositório Git:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <seu-repositorio-url>
git push -u origin main
```

### 2. Criar Conta no Render

1. Acesse [render.com](https://render.com)
2. Crie uma conta ou faça login
3. Conecte sua conta do GitHub/GitLab

### 3. Deploy Automático com render.yaml

A aplicação já possui um arquivo `render.yaml` configurado. Siga estes passos:

1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Blueprint"**
3. Conecte seu repositório
4. O Render detectará automaticamente o arquivo `render.yaml`
5. Clique em **"Apply"**

### 4. Configurar Variáveis de Ambiente

**Ao usar o render.yaml (Blueprint), o Render configurará automaticamente:**
- ✅ `DATABASE_URL` - Conectado ao PostgreSQL automaticamente
- ✅ `SESSION_SECRET` - Gerado automaticamente
- ✅ `NODE_ENV` - Definido como "production"
- ✅ `PORT` - Atribuído automaticamente pelo Render (não precisa configurar)

**Você precisa adicionar manualmente:**

1. No dashboard do Render, acesse seu serviço web
2. Vá para **"Environment"**
3. Adicione a variável:
   - **GROQ_API_KEY**: Sua chave da API Groq (obtenha em [console.groq.com](https://console.groq.com))

### 5. Deploy Manual (Alternativa)

Se preferir configurar manualmente:

#### 5.1. Criar Database PostgreSQL

1. No Render Dashboard, clique em **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: panafrica-db
   - **Database**: panafrica
   - **User**: panafrica_user
   - **Region**: Oregon (ou sua preferência)
   - **Plan**: Starter (gratuito)
3. Clique em **"Create Database"**
4. Copie a **Internal Database URL**

#### 5.2. Criar Web Service

1. No Render Dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório Git
3. Configure:
   - **Name**: panafrica-invest
   - **Region**: Oregon (mesma do database)
   - **Branch**: main
   - **Root Directory**: (deixe vazio)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (gratuito)

4. Adicione as variáveis de ambiente:
   ```
   NODE_ENV=production
   DATABASE_URL=(Cole a Internal Database URL)
   SESSION_SECRET=(Gere uma string aleatória segura)
   GROQ_API_KEY=(Sua chave da API Groq)
   ```
   
   **Nota**: Não configure `PORT` manualmente. O Render atribui automaticamente uma porta e a aplicação está configurada para usá-la via `process.env.PORT`.

5. Clique em **"Create Web Service"**

### 6. Executar Migrations do Database

Após o primeiro deploy:

1. Acesse o **Shell** do seu web service no Render
2. Execute:
   ```bash
   npm run db:push
   ```

Ou configure um **Build Command** mais completo:
```bash
npm install && npm run build && npm run db:push
```

## Keep Alive (Sempre Online)

### ⚡ Solução Automática Implementada!

A aplicação já possui um sistema completo de **keep-alive** para não hibernar no plano gratuito!

✅ **Endpoint `/health`** criado e otimizado  
✅ **GitHub Action** configurado (executa a cada 5 minutos)  
✅ **Script Node.js** alternativo disponível  
✅ **Compatível** com UptimeRobot e Cron-Job.org  

### 📖 Guia Completo

Consulte o arquivo **[KEEP-ALIVE.md](./KEEP-ALIVE.md)** para instruções detalhadas.

### 🚀 Configuração Rápida (GitHub Actions)

1. No GitHub, vá para **Settings** → **Secrets and variables** → **Actions**
2. Adicione um novo secret:
   - Nome: `RENDER_APP_URL`
   - Valor: `https://seu-app.onrender.com`
3. Habilite workflows na aba **Actions**
4. Pronto! A aplicação não hibernará mais

### 💰 Outras Opções

#### Opção 1: Upgrade para Plano Pago
- Plano **Starter Plus** ($7/mês): Sempre online
- Sem sleep automático
- Melhor performance

#### Opção 2: Serviços Externos (Gratuito)
- **UptimeRobot**: Monitor HTTP a cada 5 minutos
- **Cron-Job.org**: Cron job periódico
- Veja instruções detalhadas em [KEEP-ALIVE.md](./KEEP-ALIVE.md)

**Consumo com Keep-Alive:**
- Render oferece 750 horas/mês no plano gratuito
- Com ping a cada 5 min = ~720 horas/mês (suficiente)

## Verificar Status do Deploy

1. Acesse o dashboard do Render
2. Veja os logs em tempo real
3. Sua aplicação estará disponível em: `https://panafrica-invest.onrender.com`

## Comandos Úteis

### Ver Logs
```bash
# No dashboard do Render, acesse "Logs"
```

### Acessar Shell
```bash
# No dashboard do Render, acesse "Shell"
```

### Redeploy Manual
```bash
# No dashboard do Render, clique em "Manual Deploy" → "Deploy latest commit"
```

## Solução de Problemas

### Database Connection Error
- Verifique se `DATABASE_URL` está configurada corretamente
- Certifique-se de usar a **Internal Database URL**
- Execute `npm run db:push` para criar as tabelas

### Build Failed
- Verifique os logs de build
- Certifique-se de que todas as dependências estão no `package.json`
- Teste localmente: `npm run build`

### Application Crashes
- Verifique os logs da aplicação
- Confirme que todas as variáveis de ambiente estão configuradas
- Teste localmente em modo produção: `npm run build && npm start`

## Monitoramento

Configure alertas no Render:
1. Acesse **"Settings"** do seu serviço
2. Configure **"Health Check Path"**: `/`
3. Ative **"Deployment Notifications"**

## Atualizações Automáticas

O Render faz deploy automático quando você:
1. Faz push para a branch configurada (main)
2. O build é executado automaticamente
3. A aplicação é atualizada sem downtime

## Custos

### Plano Gratuito (Starter)
- ✅ Web Service: 750 horas/mês
- ✅ PostgreSQL: 90 dias gratuito, depois $7/mês
- ⚠️ Serviço dorme após inatividade

### Plano Pago Recomendado
- **Starter Plus**: $7/mês (web service sempre online)
- **PostgreSQL**: $7/mês
- **Total**: ~$14/mês

## Suporte

- Documentação: [render.com/docs](https://render.com/docs)
- Status: [status.render.com](https://status.render.com)
- Suporte: [dashboard.render.com/support](https://dashboard.render.com/support)
