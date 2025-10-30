#!/usr/bin/env node

/**
 * Keep-Alive Script
 * 
 * Este script faz ping periódico no endpoint /health da aplicação
 * para evitar que o serviço hiberne no plano gratuito do Render.com
 * 
 * Uso:
 * 1. Configure a variável de ambiente RENDER_APP_URL
 * 2. Execute: node scripts/keep-alive.js
 * 
 * Ou execute diretamente:
 * RENDER_APP_URL=https://seu-app.onrender.com node scripts/keep-alive.js
 */

const https = require('https');
const http = require('http');

const APP_URL = process.env.RENDER_APP_URL;
const PING_INTERVAL = 5 * 60 * 1000; // 5 minutos em millisegundos

if (!APP_URL) {
  console.error('❌ ERRO: Defina a variável de ambiente RENDER_APP_URL');
  console.error('   Exemplo: RENDER_APP_URL=https://seu-app.onrender.com node scripts/keep-alive.js');
  process.exit(1);
}

function ping() {
  const url = new URL('/health', APP_URL);
  const client = url.protocol === 'https:' ? https : http;
  
  const startTime = Date.now();
  
  client.get(url.toString(), (res) => {
    const duration = Date.now() - startTime;
    
    if (res.statusCode === 200) {
      console.log(`✅ [${new Date().toISOString()}] Ping bem-sucedido (${duration}ms)`);
    } else {
      console.log(`⚠️ [${new Date().toISOString()}] HTTP ${res.statusCode} (${duration}ms)`);
    }
    
    // Consumir response body
    res.resume();
  }).on('error', (err) => {
    console.error(`❌ [${new Date().toISOString()}] Erro:`, err.message);
  });
}

console.log(`🚀 Keep-Alive iniciado para: ${APP_URL}`);
console.log(`⏰ Intervalo de ping: ${PING_INTERVAL / 1000} segundos`);
console.log(`🔄 Pressione Ctrl+C para parar\n`);

// Primeiro ping imediato
ping();

// Pings periódicos
setInterval(ping, PING_INTERVAL);
