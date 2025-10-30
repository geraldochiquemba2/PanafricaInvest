# Keep Alive - Não Hibernar no Render.com

Este guia explica como manter sua aplicação **sempre online** no plano gratuito do Render.com, evitando que ela hiberne após 15 minutos de inatividade.

## 🎯 Soluções Implementadas

A aplicação já possui um endpoint `/health` otimizado para health checks. Escolha uma das opções abaixo:

---

## ✨ Opção 1: GitHub Actions (Recomendado)

**Vantagens:**
- ✅ Totalmente gratuito
- ✅ Automatizado (não precisa configurar nada extra)
- ✅ Integrado ao seu repositório
- ✅ Confiável (infraestrutura do GitHub)

### Como Configurar:

1. **O arquivo `.github/workflows/keep-alive.yml` já está criado**

2. **Configure o Secret no GitHub:**
   - Vá para seu repositório no GitHub
   - Acesse **Settings** → **Secrets and variables** → **Actions**
   - Clique em **"New repository secret"**
   - Nome: `RENDER_APP_URL`
   - Valor: `https://seu-app.onrender.com` (sua URL do Render)
   - Clique em **"Add secret"**

3. **Ative o Workflow:**
   - Vá para a aba **Actions** do seu repositório
   - Se aparecer uma mensagem para habilitar workflows, clique em **"I understand my workflows, go ahead and enable them"**
   - O workflow será executado automaticamente a cada 5 minutos

4. **Teste Manualmente (Opcional):**
   - Vá para **Actions** → **Keep Alive**
   - Clique em **"Run workflow"** → **"Run workflow"**
   - Aguarde alguns segundos e veja o resultado

**Pronto! Sua aplicação não hibernará mais!** 🎉

---

## 🖥️ Opção 2: Script Node.js Local

Se preferir rodar um script no seu computador ou servidor:

### Como Usar:

```bash
# Defina sua URL do Render
export RENDER_APP_URL=https://seu-app.onrender.com

# Execute o script
node scripts/keep-alive.js
```

O script fará ping a cada 5 minutos automaticamente.

### Manter Rodando em Background (Linux/Mac):

```bash
# Com nohup
nohup node scripts/keep-alive.js > keep-alive.log 2>&1 &

# Com screen
screen -dmS keepalive node scripts/keep-alive.js

# Com pm2
npm install -g pm2
pm2 start scripts/keep-alive.js --name "keepalive"
pm2 save
pm2 startup
```

---

## 🌐 Opção 3: Serviços Externos Gratuitos

### UptimeRobot (Mais Simples)

1. Acesse [uptimerobot.com](https://uptimerobot.com)
2. Crie uma conta gratuita
3. Clique em **"+ Add New Monitor"**
4. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: PanAfrica Invest
   - **URL**: `https://seu-app.onrender.com/health`
   - **Monitoring Interval**: 5 minutes
5. Clique em **"Create Monitor"**

### Cron-Job.org

1. Acesse [cron-job.org](https://cron-job.org)
2. Crie uma conta gratuita
3. Clique em **"Create cronjob"**
4. Configure:
   - **Title**: PanAfrica Keep Alive
   - **URL**: `https://seu-app.onrender.com/health`
   - **Execution schedule**: Every 5 minutes
5. Clique em **"Create"**

---

## 📊 Comparação de Soluções

| Solução | Custo | Confiabilidade | Facilidade | Automação |
|---------|-------|----------------|------------|-----------|
| GitHub Actions | Gratuito | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Script Node.js | Gratuito | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| UptimeRobot | Gratuito | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cron-Job.org | Gratuito | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Recomendação:** Use **GitHub Actions** se seu código está no GitHub, ou **UptimeRobot** caso contrário.

---

## 🔍 Verificar se Está Funcionando

### Testar o Endpoint de Health:

```bash
curl https://seu-app.onrender.com/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T12:34:56.789Z"
}
```

### Verificar Logs no Render:

1. Acesse o dashboard do Render
2. Abra seu serviço web
3. Clique em **"Logs"**
4. Procure por requisições GET `/health` a cada 5 minutos

---

## ⚠️ Importante

### Limitações do Plano Gratuito:

- **Horas disponíveis**: 750 horas/mês
- **Com keep-alive**: ~720 horas/mês consumidas
- **Margem de segurança**: 30 horas restantes

### Se Precisar de Mais:

- **Plano Starter Plus** ($7/mês): Sempre online sem necessidade de keep-alive
- **Vantagens**: Sem cold starts, melhor performance, sem consumo de horas

---

## 🆘 Solução de Problemas

### GitHub Actions não está executando:

1. Verifique se habilitou workflows nas configurações do repositório
2. Confirme que o secret `RENDER_APP_URL` está configurado corretamente
3. Vá para Actions e execute manualmente para testar

### Script Node.js com erro:

```bash
# Verifique se a URL está correta
echo $RENDER_APP_URL

# Teste manualmente
curl $RENDER_APP_URL/health
```

### UptimeRobot não está pingando:

1. Verifique se o monitor está ativo (Status: Up)
2. Confirme que a URL está correta
3. Teste manualmente com curl

---

## 📝 Resumo

1. ✅ Endpoint `/health` criado
2. ✅ GitHub Action configurado (recomendado)
3. ✅ Script Node.js alternativo disponível
4. ✅ Compatível com UptimeRobot/Cron-Job

**Escolha uma solução e sua aplicação permanecerá sempre online!** 🚀
