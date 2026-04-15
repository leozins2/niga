import http from 'http';
import { ProbabilityAnalyzer } from './src/analyzer.js';
import { exampleEvents } from './src/examples.js';
import { Database } from './src/database.js';

const PORT = 3000;
const analyzer = new ProbabilityAnalyzer();

// Email simples no console
class SimpleEmail {
    static async sendConfirmationEmail(email, name, token) {
        const link = `http://localhost:${PORT}/confirm?token=${token}`;
        console.log('='.repeat(80));
        console.log('📧 EMAIL DE CONFIRMAÇÃO');
        console.log('='.repeat(80));
        console.log(`Para: ${email}`);
        console.log(`Nome: ${name}`);
        console.log('');
        console.log('🔗 LINK PARA CONFIRMAR:');
        console.log(link);
        console.log('');
        console.log('💡 Copie e cole no navegador!');
        console.log('='.repeat(80));
        return true;
    }
}

// HTML das páginas
const generateHTML = () => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>XGaming</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
--bg:#06080f;
--bg2:#0a0e18;
--surface:rgba(16,22,38,.72);
--glass:rgba(255,255,255,.04);
--stroke:rgba(52,211,153,.14);
--accent:#34d399;
--accent2:#10b981;
--accent-dim:rgba(52,211,153,.16);
--accent-glow:rgba(52,211,153,.28);
--text:#f1f5f9;
--muted:#94a3b8;
--live:#fb7185;
--radius-xl:28px;
--radius-lg:22px;
--radius-md:16px;
--radius-pill:9999px;
--font:'Inter',system-ui,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:var(--font);color:var(--text);min-height:100vh;
background:radial-gradient(ellipse 100% 60% at 50% -15%,rgba(52,211,153,.14),transparent 52%),
linear-gradient(165deg,var(--bg2) 0%,var(--bg) 45%,#03040a 100%);}
.site-header{position:sticky;top:0;z-index:50;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
background:rgba(6,8,15,.75);border-bottom:1px solid var(--stroke)}
.site-header__inner{max-width:1180px;margin:0 auto;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand-mark{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--text)}
.brand-mark__icon{width:46px;height:46px;border-radius:var(--radius-lg);background:linear-gradient(145deg,var(--accent),#059669);
display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px var(--accent-glow)}
.brand-mark__icon svg{width:26px;height:26px;display:block}
.brand-mark__text{font-size:1.35rem;font-weight:700;letter-spacing:-.03em}
.auth-nav{display:flex;gap:12px;flex-wrap:wrap}
.auth-nav a{color:var(--text);text-decoration:none;padding:11px 22px;border-radius:var(--radius-pill);font-size:.9rem;font-weight:600;
background:var(--glass);border:1px solid var(--stroke);transition:background .2s,transform .15s,box-shadow .2s}
.auth-nav a:last-child{background:linear-gradient(135deg,var(--accent),#10b981);border:none;color:#04121a;box-shadow:0 6px 24px var(--accent-glow)}
.auth-nav a:hover{transform:translateY(-1px)}
.auth-nav a:first-child:hover{background:var(--accent-dim);border-color:rgba(52,211,153,.35)}
.category-bar{border-bottom:1px solid var(--stroke);background:rgba(8,11,20,.5)}
.category-bar__scroll{max-width:1180px;margin:0 auto;padding:12px 24px 16px;overflow-x:auto;-webkit-overflow-scrolling:touch}
.tabs-container{display:flex;gap:10px;min-width:min-content;padding-bottom:4px}
.tab{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:var(--radius-pill);cursor:pointer;white-space:nowrap;
font-size:.88rem;font-weight:600;color:var(--muted);border:1px solid transparent;transition:background .2s,color .2s,border-color .2s,box-shadow .2s}
.tab .tab-ic{width:20px;height:20px;flex-shrink:0;opacity:.85}
.tab:hover{color:var(--text);background:var(--glass)}
.tab.active{color:#04121a;background:linear-gradient(135deg,var(--accent),var(--accent2));border-color:transparent;box-shadow:0 6px 22px var(--accent-glow)}
.tab.active .tab-ic{opacity:1;color:#04121a}
.container{max-width:1280px;margin:0 auto}
.content{padding:32px 24px 48px}
.events{display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));align-items:start}
.event{display:none;transition:transform .25s,box-shadow .25s,border-color .25s}
.event--mercado{background:rgba(17,22,32,.92);border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:18px 18px 16px;box-shadow:0 8px 32px rgba(0,0,0,.35)}
.event--mercado.show{display:flex;flex-direction:column;gap:0}
.event--mercado:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.1);box-shadow:0 12px 40px rgba(0,0,0,.45)}
.mercado-cat{display:inline-block;font-size:11px;font-weight:600;color:#94a3b8;text-transform:capitalize;margin-bottom:14px}
.mercado-top{display:flex;gap:14px;align-items:flex-start;margin-bottom:16px}
.mercado-thumb{width:52px;height:52px;border-radius:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1.25rem;font-weight:800;color:#fff;box-shadow:inset 0 1px 0 rgba(255,255,255,.15)}
.mercado-title{margin:0;font-size:.98rem;font-weight:700;color:#f8fafc;line-height:1.35;letter-spacing:-.02em}
.mercado-row{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:12px 0;border:none;border-top:1px solid rgba(255,255,255,.06);background:transparent;cursor:pointer;text-align:left;font:inherit;color:inherit;transition:background .15s;border-radius:10px;margin:0 -6px;padding-left:6px;padding-right:6px}
.mercado-row:first-of-type{border-top:none;padding-top:4px}
.mercado-row:hover{background:rgba(255,255,255,.04)}
.mercado-opt{display:flex;flex-direction:column;gap:4px;min-width:0}
.mercado-name{font-size:.9rem;font-weight:600;color:#e2e8f0}
.mercado-odd{font-size:.8rem;color:#64748b;font-weight:500}
.mercado-pill{flex-shrink:0;min-width:52px;padding:8px 14px;border-radius:var(--radius-pill);font-size:.85rem;font-weight:700;text-align:center;border:2px solid transparent;background:rgba(0,0,0,.2)}
.mercado-pill--up{border-color:#22c55e;color:#22c55e}
.mercado-pill--down{border-color:#ef4444;color:#ef4444}
.mercado-foot{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.06);gap:10px;flex-wrap:wrap}
.mercado-foot-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.mercado-live{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:#fb923c;letter-spacing:.04em}
.mercado-live-dot{width:7px;height:7px;border-radius:50%;background:#fb923c;box-shadow:0 0 0 3px rgba(251,146,60,.35);animation:pulse 2s ease-in-out infinite}
.mercado-preco{font-size:.9rem;font-weight:700;color:#22c55e}
.mercado-time{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:#64748b;font-weight:500}
.mercado-time svg{flex-shrink:0;opacity:.7}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.55}}
.bet-modal{position:fixed;inset:0;background:rgba(2,4,10,.82);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;z-index:1000;padding:20px}
.bet-container{background:linear-gradient(165deg,rgba(18,24,42,.98),rgba(10,14,26,.98));border:1px solid var(--stroke);border-radius:var(--radius-xl);width:100%;max-width:1000px;height:min(82vh,720px);display:flex;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,.55)}
.bet-left{flex:2;padding:26px;border-right:1px solid var(--stroke);overflow-y:auto}
.bet-right{flex:1;padding:26px;background:rgba(6,8,15,.6);overflow-y:auto}
.bet-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px;gap:12px}
.bet-title{color:var(--accent);font-size:1.1rem;font-weight:700;letter-spacing:-.02em}
.close-btn{background:rgba(255,255,255,.06);border:1px solid var(--stroke);color:var(--text);width:40px;height:40px;border-radius:var(--radius-md);font-size:1.25rem;line-height:1;cursor:pointer;transition:background .2s}
.close-btn:hover{background:var(--accent-dim)}
.chart-container{background:rgba(0,0,0,.35);border-radius:var(--radius-lg);padding:18px;margin-bottom:22px;height:200px;border:1px solid var(--stroke)}
.chart{width:100%;height:100%;background:linear-gradient(160deg,rgba(52,211,153,.12),rgba(16,185,129,.06));border-radius:var(--radius-md);position:relative;overflow:hidden}
.chart-line{position:absolute;bottom:22px;left:12px;right:12px;height:3px;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:var(--radius-pill);opacity:.9}
.chart-points{position:absolute;bottom:16px;left:16px;right:16px;height:12px}
.chart-point{position:absolute;width:6px;height:6px;background:var(--accent);border-radius:50%;box-shadow:0 0 10px var(--accent-glow)}
.odds-section{margin-bottom:16px}
.odds-row{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;background:rgba(255,255,255,.04);border-radius:var(--radius-md);margin-bottom:10px;border:1px solid var(--stroke);gap:12px;flex-wrap:wrap}
.team-info{display:flex;align-items:center;gap:12px}
.team-logo{width:32px;height:32px;background:linear-gradient(135deg,var(--accent),#10b981);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#04121a}
.team-name{color:var(--text);font-weight:600}
.team-percent{color:var(--muted);font-size:12px}
.odds-buttons{display:flex;gap:8px;flex-wrap:wrap}
.odds-btn{background:var(--accent-dim);border:1px solid rgba(52,211,153,.35);color:var(--accent);padding:8px 14px;border-radius:var(--radius-pill);cursor:pointer;font-size:12px;font-weight:600;transition:background .2s,color .2s}
.odds-btn:hover,.odds-btn.selected{background:linear-gradient(135deg,var(--accent),#10b981);color:#04121a;border-color:transparent}
.bet-panel{background:rgba(0,0,0,.28);border-radius:var(--radius-lg);padding:18px;border:1px solid var(--stroke)}
.bet-selection{background:var(--accent-dim);border:1px solid rgba(52,211,153,.35);border-radius:var(--radius-md);padding:14px;margin-bottom:18px}
.bet-selection h4{color:var(--accent);margin:0 0 6px;font-size:1rem}
.bet-selection p{color:var(--muted);margin:0;font-size:14px}
.bet-amount{margin-bottom:18px}
.bet-amount label{display:block;color:var(--text);margin-bottom:10px;font-weight:600;font-size:.9rem}
.amount-input{width:100%;background:rgba(255,255,255,.06);border:1px solid var(--stroke);border-radius:var(--radius-md);padding:14px;color:var(--text);text-align:center;font-size:1.1rem;font-weight:700}
.amount-buttons{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.amount-btn{background:var(--accent-dim);border:1px solid rgba(52,211,153,.3);color:var(--accent);padding:8px 16px;border-radius:var(--radius-pill);cursor:pointer;font-size:12px;font-weight:600}
.amount-btn:hover{background:linear-gradient(135deg,var(--accent),#10b981);color:#04121a}
.bet-info{margin-bottom:18px}
.bet-info-row{display:flex;justify-content:space-between;margin-bottom:8px}
.bet-info-label{color:var(--muted)}
.bet-info-value{color:var(--accent);font-weight:700}
.place-bet-btn{width:100%;background:linear-gradient(135deg,var(--accent),#10b981);color:#04121a;border:none;padding:16px;border-radius:var(--radius-lg);font-size:1rem;font-weight:800;cursor:pointer;box-shadow:0 8px 28px var(--accent-glow);transition:transform .15s}
.place-bet-btn:hover{transform:translateY(-2px)}
.chat-section{margin-top:22px}
.chat-header{color:var(--accent);font-size:13px;font-weight:700;margin-bottom:12px;letter-spacing:.04em;display:flex;align-items:center;gap:8px}
.chat-messages{background:rgba(0,0,0,.35);border-radius:var(--radius-md);padding:12px;height:150px;overflow-y:auto;margin-bottom:12px;border:1px solid var(--stroke)}
.chat-message{margin-bottom:10px;font-size:12px;line-height:1.45}
.chat-user{color:var(--accent);font-weight:700}
.chat-input{width:100%;background:rgba(255,255,255,.06);border:1px solid var(--stroke);border-radius:var(--radius-md);padding:11px 14px;color:var(--text);font-size:12px;font-family:inherit}
</style></head><body>
<header class="site-header">
<div class="site-header__inner">
<a class="brand-mark" href="/" aria-label="XGaming">
<span class="brand-mark__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#fff"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg></span>
<span class="brand-mark__text">XGaming</span>
</a>
<nav class="auth-nav">
<a href="/login">Entrar</a>
<a href="/register">Cadastrar</a>
</nav>
</div>
</header>

<nav class="category-bar" aria-label="Categorias">
<div class="category-bar__scroll">
<div class="tabs-container">
<div class="tab active" data-category="todos"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>Todos</div>
<div class="tab" data-category="esporte"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M4.9 7.5l14.2 9M4.9 16.5l14.2-9M3 12h18"/></svg>Esportes</div>
<div class="tab" data-category="entretenimento"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M10 4v16"/></svg>Entretenimento</div>
<div class="tab" data-category="politica"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M6 21V7l6-4 6 4v14"/><path d="M9 21v-4h6v4"/></svg>Política</div>
<div class="tab" data-category="clima"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>Clima</div>
<div class="tab" data-category="celebridades"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Celebridades</div>
<div class="tab" data-category="cripto"><svg class="tab-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 9h6v6H9z"/><path d="M9 1v6M9 17v6M15 1v6M15 17v6M1 9h6M17 9h6M1 15h6M17 15h6"/></svg>Criptomoedas</div>
</div>
</div>
</nav>

<div class="container">
<div class="content">
<div class="events" id="eventsContainer">
${exampleEvents.map((event, index) => `
<div class="event event--mercado show" data-category="${event.categoria || event.tipo}">
<span class="mercado-cat">${event.badge || event.categoria || event.tipo}</span>
<div class="mercado-top">
<div class="mercado-thumb" style="background:${event.thumbBg}" aria-hidden="true"><span>${event.thumbLetter}</span></div>
<h3 class="mercado-title">${event.titulo}</h3>
</div>
${event.linhas.map((line, li) => `
<button type="button" class="mercado-row" onclick="openMercadoBet(${index},${li})">
<div class="mercado-opt">
<span class="mercado-name">${line.label}</span>
<span class="mercado-odd">${line.odd}x</span>
</div>
<span class="mercado-pill mercado-pill--${line.alta ? 'up' : 'down'}">${line.pct}%</span>
</button>
`).join('')}
<div class="mercado-foot">
<div class="mercado-foot-left">
${event.aoVivo ? '<span class="mercado-live"><span class="mercado-live-dot"></span> AO VIVO</span>' : ''}
${event.preco ? `<span class="mercado-preco">${event.preco}</span>` : ''}
</div>
<div class="mercado-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${event.tempo}</div>
</div>
</div>
`).join('')}
</div>
</div>
</div>

<!-- Modal de Apostas -->
<div id="betModal" class="bet-modal">
<div class="bet-container">
<div class="bet-left">
<div class="bet-header">
<div class="bet-title" id="betEventTitle">Chapecoense vs Botafogo</div>
<button class="close-btn" onclick="closeBetModal()">&times;</button>
</div>

<div class="chart-container">
<div class="chart">
<div class="chart-line"></div>
<div class="chart-points">
<div class="chart-point" style="left:10%"></div>
<div class="chart-point" style="left:25%"></div>
<div class="chart-point" style="left:40%"></div>
<div class="chart-point" style="left:60%"></div>
<div class="chart-point" style="left:80%"></div>
</div>
</div>
</div>

<div class="odds-section">
<div class="odds-row">
<div class="team-info">
<div class="team-logo">C</div>
<div>
<div class="team-name" id="option1Name">Chapecoense</div>
<div class="team-percent">36.4%</div>
</div>
</div>
<div class="odds-buttons">
<button class="odds-btn" onclick="selectBet(this, 'option1', 2.04)">Sim (2.04)</button>
<button class="odds-btn" onclick="selectBet(this, 'option1', 1.30)">Não (1.30)</button>
</div>
</div>

<div class="odds-row">
<div class="team-info">
<div class="team-logo">B</div>
<div>
<div class="team-name">Botafogo</div>
<div class="team-percent">36.4%</div>
</div>
</div>
<div class="odds-buttons">
<button class="odds-btn" onclick="selectBet(this, 'botafogo', 1.54)">Sim (1.54)</button>
<button class="odds-btn" onclick="selectBet(this, 'botafogo', 1.52)">Não (1.52)</button>
</div>
</div>

<div class="odds-row">
<div class="team-info">
<div class="team-logo">E</div>
<div>
<div class="team-name">Empate</div>
<div class="team-percent">27.0%</div>
</div>
</div>
<div class="odds-buttons">
<button class="odds-btn" onclick="selectBet(this, 'empate', 2.50)">Sim (2.50)</button>
<button class="odds-btn" onclick="selectBet(this, 'empate', 1.86)">Não (1.86)</button>
</div>
</div>
</div>
</div>

<div class="bet-right">
<div class="bet-panel">
<div class="bet-selection" id="betSelection" style="display:none;">
<h4 id="selectedOption">Chapecoense - Sim</h4>
<p id="selectedOdds">Odd: 2.04</p>
</div>

<div class="bet-amount">
<label>Quantia</label>
<input type="number" class="amount-input" id="betAmount" placeholder="R$ 0" min="1" max="1000">
<div class="amount-buttons">
<button class="amount-btn" onclick="setBetAmount(1)">1</button>
<button class="amount-btn" onclick="setBetAmount(10)">10</button>
<button class="amount-btn" onclick="setBetAmount(50)">50</button>
<button class="amount-btn" onclick="setBetAmount(100)">MAX</button>
</div>
</div>

<div class="bet-info">
<div class="bet-info-row">
<span class="bet-info-label">Para ganhar 💰</span>
<span class="bet-info-value" id="potentialWin">R$ 0,00</span>
</div>
<div class="bet-info-row">
<span class="bet-info-label">Máx: 0%</span>
</div>
</div>

<button class="place-bet-btn" onclick="placeBet()">Comprar Sim</button>

<div class="chat-section">
<div class="chat-header"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> CHAT AO VIVO</div>
<div class="chat-messages" id="chatMessages">
<div class="chat-message">
<span class="chat-user">@palpiteiro:</span> Chape vai surpreender!
</div>
<div class="chat-message">
<span class="chat-user">@analista:</span> Botafogo favorito
</div>
<div class="chat-message">
<span class="chat-user">@trader:</span> Empate é boa opção
</div>
</div>
<input type="text" class="chat-input" placeholder="Digite sua mensagem...">
</div>
</div>
</div>
</div>
</div>

<script>
window.__XG_EVENTS = ${JSON.stringify(exampleEvents).replace(/</g, '\\u003c')};
function openMercadoBet(evIdx, lineIdx) {
  var ev = window.__XG_EVENTS[evIdx];
  if (!ev || !ev.linhas || !ev.linhas[lineIdx]) return;
  var line = ev.linhas[lineIdx];
  openBetModal(ev.titulo, line.label + ' (' + line.odd + 'x)', line.pct);
}
// Função para filtrar eventos por categoria
function filterEvents(category) {
  const events = document.querySelectorAll('.event');
  const tabs = document.querySelectorAll('.tab');
  
  // Atualizar abas ativas
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector('[data-category="' + category + '"]').classList.add('active');
  
  // Mostrar/esconder eventos
  events.forEach(event => {
    const eventCategory = event.dataset.category;
    let shouldShow = false;
    
    if (category === 'todos') {
      shouldShow = true;
    } else if (category === 'esporte') {
      // Mostrar eventos de esporte, futebol e esportes
      shouldShow = eventCategory === 'esporte' || eventCategory === 'futebol' || eventCategory === 'esportes';
    } else if (category === 'cripto') {
      // Mostrar eventos de cripto e criptomoedas
      shouldShow = eventCategory === 'cripto' || eventCategory === 'criptomoedas';
    } else {
      shouldShow = eventCategory === category;
    }
    
    if (shouldShow) {
      event.classList.add('show');
    } else {
      event.classList.remove('show');
    }
  });
}

// Adicionar event listeners nas abas
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    filterEvents(category);
  });
});

// Sistema de apostas
let selectedBet = null;
let currentOdd = 1;

function openBetModal(eventTitle, option, percentage) {
  document.getElementById('betEventTitle').textContent = eventTitle;
  document.getElementById('option1Name').textContent = option;
  document.getElementById('betModal').style.display = 'flex';
  
  // Simular chat ao vivo
  startLiveChat();
}

function closeBetModal() {
  document.getElementById('betModal').style.display = 'none';
  selectedBet = null;
  document.getElementById('betSelection').style.display = 'none';
  
  // Resetar botão para padrão
  const buyButton = document.querySelector('.place-bet-btn');
  buyButton.textContent = 'Comprar Sim';
  buyButton.style.background = 'linear-gradient(135deg,#34d399,#10b981)';
}

function selectBet(button, option, odd) {
  // Remover seleção anterior
  document.querySelectorAll('.odds-btn').forEach(btn => btn.classList.remove('selected'));
  
  // Selecionar novo botão
  button.classList.add('selected');
  
  // Determinar se é Sim ou Não
  const isYes = button.textContent.includes('Sim');
  const betType = isYes ? 'Sim' : 'Não';
  
  // Atualizar informações da aposta
  selectedBet = { option, odd, type: betType };
  currentOdd = odd;
  
  document.getElementById('betSelection').style.display = 'block';
  document.getElementById('selectedOption').textContent = option + ' - ' + betType;
  document.getElementById('selectedOdds').textContent = 'Odd: ' + odd;
  
  // Atualizar botão de compra
  const buyButton = document.querySelector('.place-bet-btn');
  buyButton.textContent = 'Comprar ' + betType;
  buyButton.style.background = isYes ? 
    'linear-gradient(135deg,#34d399,#10b981)' : 
    'linear-gradient(135deg,#f87171,#dc2626)';
  
  // Atualizar ganho potencial
  updatePotentialWin();
}

function setBetAmount(amount) {
  document.getElementById('betAmount').value = amount;
  updatePotentialWin();
}

function updatePotentialWin() {
  const amount = parseFloat(document.getElementById('betAmount').value) || 0;
  const potentialWin = amount * currentOdd;
  document.getElementById('potentialWin').textContent = 'R$ ' + potentialWin.toFixed(2);
}

function placeBet() {
  const amount = parseFloat(document.getElementById('betAmount').value);
  
  if (!selectedBet) {
    alert('Selecione uma opção para apostar!');
    return;
  }
  
  if (!amount || amount <= 0) {
    alert('Digite um valor válido para apostar!');
    return;
  }
  
  const potentialWin = amount * currentOdd;
  const betType = selectedBet.type || 'Sim';
  
  alert('Aposta realizada com sucesso!' + '\\n\\n' + 
        'Tipo: ' + betType + '\\n' +
        'Valor: R$ ' + amount.toFixed(2) + '\\n' +
        'Opção: ' + selectedBet.option + '\\n' +
        'Odd: ' + currentOdd + '\\n' +
        'Ganho potencial: R$ ' + potentialWin.toFixed(2));
  
  closeBetModal();
}

function startLiveChat() {
  const messages = [
    '@trader123: Essa odd está boa!',
    '@palpiteiro: Vai dar zebra hoje',
    '@analista: Estatísticas favorecem o favorito',
    '@crypto_fan: Melhor que apostar em crypto 😅',
    '@futebol_lover: Jogo imprevisível',
    '@expert: Cuidado com o over/under'
  ];
  
  const chatContainer = document.getElementById('chatMessages');
  
  setInterval(() => {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message';
    msgDiv.innerHTML = '<span class="chat-user">' + randomMsg.split(':')[0] + ':</span>' + randomMsg.split(':')[1];
    
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Manter apenas 8 mensagens
    if (chatContainer.children.length > 8) {
      chatContainer.removeChild(chatContainer.firstChild);
    }
  }, 3000);
}

// Event listener para atualizar ganho potencial
document.getElementById('betAmount').addEventListener('input', updatePotentialWin);

// Mostrar todos os eventos por padrão
filterEvents('todos');
</script>
</body></html>`;

const generateLoginHTML = () => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>XGaming — Entrar</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;min-height:100vh;background:#0d1117;color:#fff;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 20px 80px}
.wrap{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}
.brand-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(145deg,#00c853,#00a844);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(0,200,83,.25)}
.brand-name{font-size:1.35rem;font-weight:700;letter-spacing:-.02em;color:#fff}
.card{width:100%;background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px}
.card h1{margin:0 0 8px;font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
.sub{margin:0 0 28px;font-size:.9rem;color:#8b949e;line-height:1.45}
.field{margin-bottom:20px;text-align:left}
.field label{display:block;font-size:.8rem;font-weight:600;color:#f0f6fc;margin-bottom:8px}
.input-wrap{position:relative;display:flex;align-items:center}
.field input{width:100%;height:48px;padding:0 44px 0 14px;border:1px solid #30363d;border-radius:8px;background:#0d1117;color:#f0f6fc;font-size:.95rem;font-family:inherit;outline:none;transition:border-color .15s}
.field input::placeholder{color:#6e7681}
.field input:focus{border-color:#00c853;box-shadow:0 0 0 3px rgba(0,200,83,.12)}
.field input[type=email]{padding-right:14px}
.toggle-pw{position:absolute;right:4px;width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px;color:#8b949e;transition:color .15s,background .15s}
.toggle-pw:hover{color:#f0f6fc;background:rgba(240,246,252,.06)}
.btn-submit{width:100%;height:50px;margin-top:8px;border:none;border-radius:8px;font-family:inherit;font-size:1rem;font-weight:700;color:#fff;cursor:pointer;background:linear-gradient(135deg,#00c853,#00bfa5);box-shadow:0 4px 16px rgba(0,200,83,.22);transition:transform .12s,filter .12s}
.btn-submit:hover{filter:brightness(1.06);transform:translateY(-1px)}
.btn-submit:active{transform:translateY(0)}
.card-foot{margin-top:24px;text-align:center;font-size:.9rem;color:#8b949e}
.card-foot a{color:#00c853;font-weight:600;text-decoration:none}
.card-foot a:hover{text-decoration:underline}
.back-link{display:block;margin-top:16px;font-size:.85rem;color:#6e7681;text-decoration:none;text-align:center}
.back-link:hover{color:#8b949e}
.page-foot{position:fixed;bottom:24px;left:0;right:0;text-align:center;font-size:.75rem;color:#6e7681;padding:0 16px}
</style></head><body>
<div class="wrap">
<header class="brand" aria-label="XGaming">
<div class="brand-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L9 11L13 15L20 8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8H20V12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
<span class="brand-name">XGaming</span>
</header>
<main class="card">
<h1>Entrar na conta</h1>
<p class="sub">Acesse sua conta demo e comece a operar</p>
<form id="loginForm">
<div class="field">
<label for="email">Email</label>
<input type="email" id="email" name="email" placeholder="seu@email.com" required autocomplete="email">
</div>
<div class="field">
<label for="password">Senha</label>
<div class="input-wrap">
<input type="password" id="password" name="password" placeholder="Sua senha" required autocomplete="current-password">
<button type="button" class="toggle-pw" aria-label="Mostrar senha" title="Mostrar senha"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
</div>
</div>
<button type="submit" class="btn-submit">Entrar</button>
</form>
<p class="card-foot">Não tem uma conta? <a href="/register">Criar conta grátis</a></p>
<a class="back-link" href="/">← Voltar ao início</a>
</main>
</div>
<p class="page-foot">Simulador educacional — Nenhum dinheiro real envolvido</p>
<script>
(function(){
document.querySelectorAll('.input-wrap').forEach(function(wrap){
var btn=wrap.querySelector('.toggle-pw');var inp=wrap.querySelector('input[type=password],input[type=text]');
if(!btn||!inp)return;
btn.addEventListener('click',function(){
var show=inp.type==='password';inp.type=show?'text':'password';
btn.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');
btn.setAttribute('title',show?'Ocultar senha':'Mostrar senha');
});
});
document.getElementById('loginForm').addEventListener('submit',async function(e){
e.preventDefault();
var email=document.getElementById('email').value;
var password=document.getElementById('password').value;
try{
var response=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,password:password})});
var result=await response.json();
if(response.ok){alert('Login realizado com sucesso!');window.location.href='/';}
else{alert(result.error);}
}catch(err){alert('Erro ao fazer login');}
});
})();
</script>
</body></html>`;

const generateRegisterHTML = () => `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>XGaming — Criar conta</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box}
body{margin:0;min-height:100vh;background:#0d1117;color:#fff;font-family:Inter,system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 20px 80px}
.wrap{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}
.brand-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(145deg,#00c853,#00a844);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(0,200,83,.25)}
.brand-name{font-size:1.35rem;font-weight:700;letter-spacing:-.02em;color:#fff}
.card{width:100%;background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px}
.card h1{margin:0 0 8px;font-size:1.5rem;font-weight:700;letter-spacing:-.02em}
.sub{margin:0 0 28px;font-size:.9rem;color:#8b949e;line-height:1.45}
.field{margin-bottom:18px;text-align:left}
.field label{display:block;font-size:.8rem;font-weight:600;color:#f0f6fc;margin-bottom:8px}
.input-wrap{position:relative;display:flex;align-items:center}
.field input{width:100%;height:48px;padding:0 44px 0 14px;border:1px solid #30363d;border-radius:8px;background:#0d1117;color:#f0f6fc;font-size:.95rem;font-family:inherit;outline:none;transition:border-color .15s}
.field input::placeholder{color:#6e7681}
.field input:focus{border-color:#00c853;box-shadow:0 0 0 3px rgba(0,200,83,.12)}
.field input.in-email{padding-right:14px}
.btn-submit{width:100%;height:50px;margin-top:8px;border:none;border-radius:8px;font-family:inherit;font-size:1rem;font-weight:700;color:#fff;cursor:pointer;background:linear-gradient(135deg,#00c853,#00bfa5);box-shadow:0 4px 16px rgba(0,200,83,.22);transition:transform .12s,filter .12s}
.btn-submit:hover{filter:brightness(1.06);transform:translateY(-1px)}
.btn-submit:active{transform:translateY(0)}
.toggle-pw{position:absolute;right:4px;width:40px;height:40px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:6px;color:#8b949e;transition:color .15s,background .15s}
.toggle-pw:hover{color:#f0f6fc;background:rgba(240,246,252,.06)}
.card-foot{margin-top:24px;text-align:center;font-size:.9rem;color:#8b949e}
.card-foot a{color:#00c853;font-weight:600;text-decoration:none}
.card-foot a:hover{text-decoration:underline}
.back-link{display:block;margin-top:16px;font-size:.85rem;color:#6e7681;text-decoration:none;text-align:center}
.back-link:hover{color:#8b949e}
.page-foot{position:fixed;bottom:24px;left:0;right:0;text-align:center;font-size:.75rem;color:#6e7681;padding:0 16px}
</style></head><body>
<div class="wrap">
<header class="brand" aria-label="XGaming">
<div class="brand-icon" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 16L9 11L13 15L20 8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8H20V12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
<span class="brand-name">XGaming</span>
</header>
<main class="card">
<h1>Criar conta</h1>
<p class="sub">Comece com saldo demo e opere sem arriscar dinheiro real</p>
<form id="registerForm">
<div class="field">
<label for="name">Nome completo</label>
<input type="text" id="name" name="name" class="in-email" placeholder="Seu nome" required autocomplete="name" minlength="2">
</div>
<div class="field">
<label for="email">Email</label>
<input type="email" id="email" name="email" class="in-email" placeholder="seu@email.com" required autocomplete="email">
</div>
<div class="field">
<label for="password">Senha</label>
<div class="input-wrap">
<input type="password" id="password" name="password" placeholder="Mínimo 6 caracteres" required minlength="6" autocomplete="new-password">
<button type="button" class="toggle-pw" aria-label="Mostrar senha" title="Mostrar senha"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
</div>
</div>
<div class="field">
<label for="password2">Confirmar senha</label>
<div class="input-wrap">
<input type="password" id="password2" name="password2" placeholder="Repita a senha" required minlength="6" autocomplete="new-password">
<button type="button" class="toggle-pw" aria-label="Mostrar senha" title="Mostrar senha"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
</div>
</div>
<button type="submit" class="btn-submit">Criar conta</button>
</form>
<p class="card-foot">Já tem uma conta? <a href="/login">Entrar</a></p>
<a class="back-link" href="/">← Voltar ao início</a>
</main>
</div>
<p class="page-foot">Simulador educacional — Nenhum dinheiro real envolvido</p>
<script>
(function(){
document.querySelectorAll('.input-wrap').forEach(function(wrap){
var btn=wrap.querySelector('.toggle-pw');var inp=wrap.querySelector('input');
if(!btn||!inp)return;
btn.addEventListener('click',function(){
var show=inp.type==='password';inp.type=show?'text':'password';
btn.setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');
btn.setAttribute('title',show?'Ocultar senha':'Mostrar senha');
});
});
document.getElementById('registerForm').addEventListener('submit',async function(e){
e.preventDefault();
var name=document.getElementById('name').value.trim();
var email=document.getElementById('email').value.trim();
var password=document.getElementById('password').value;
var password2=document.getElementById('password2').value;
if(password!==password2){alert('As senhas não coincidem.');return;}
try{
var response=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,email:email,password:password})});
var result=await response.json();
if(response.ok){alert('Conta criada! Verifique o console do servidor para o link de confirmação.');window.location.href='/login';}
else{alert(result.error);}
}catch(err){alert('Erro ao criar conta');}
});
})();
</script>
</body></html>`;

const generateConfirmHTML = (success, message) => `<!DOCTYPE html>
<html><head><title>XGaming - Confirmação</title><style>
body{font-family:Arial;background:linear-gradient(135deg,#0a0f1c,#1a2332);color:#fff;margin:0;padding:20px;display:flex;align-items:center;justify-content:center;min-height:100vh}
.form{background:rgba(26,35,50,0.8);padding:40px;border-radius:20px;width:400px;text-align:center}
.logo{color:#34d399;font-size:28px;font-weight:bold;margin-bottom:30px}
.icon{font-size:48px;margin:20px 0;color:${success ? '#34d399' : '#ef4444'}}
a{color:#34d399;text-decoration:none;padding:15px 30px;background:linear-gradient(135deg,#34d399,#10b981);color:#000;border-radius:10px;display:inline-block;margin-top:20px}
</style></head><body>
<div class="form">
<div class="logo">🎯 XGaming</div>
<div class="icon">${success ? '✅' : '❌'}</div>
<h2>${success ? 'Email Confirmado!' : 'Erro na Confirmação'}</h2>
<p>${message}</p>
<a href="${success ? '/login' : '/'}">${success ? 'Fazer Login' : 'Voltar'}</a>
</div>
</body></html>`;

// Servidor HTTP
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Rotas
  if (url.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateHTML());
  }
  else if (url.pathname === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateLoginHTML());
  }
  else if (url.pathname === '/register' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateRegisterHTML());
  }
  else if (url.pathname === '/confirm' && req.method === 'GET') {
    const token = url.searchParams.get('token');
    
    if (!token) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Token não encontrado.'));
      return;
    }
    
    const tokenData = Database.validateToken(token);
    
    if (!tokenData) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Token inválido ou expirado.'));
      return;
    }
    
    const user = Database.confirmUser(tokenData.email);
    
    if (user) {
      Database.removeToken(token);
      console.log('🎉 Conta confirmada:', user.email);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(true, 'Conta ativada com sucesso! Você já pode fazer login.'));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Erro ao confirmar conta.'));
    }
  }
  else if (url.pathname === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    
    req.on('end', async () => {
      try {
        const { name, email, password } = JSON.parse(body);
        
        if (!name || !email || !password || password.length < 6) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Dados inválidos' }));
          return;
        }
        
        if (Database.findUserByEmail(email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email já cadastrado' }));
          return;
        }
        
        const user = Database.createUser({ name, email, password });
        const token = Database.createConfirmationToken(email);
        
        await SimpleEmail.sendConfirmationEmail(email, name, token);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Conta criada! Verifique o console.' }));
        
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno' }));
      }
    });
  }
  else if (url.pathname === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        const user = Database.findUserByEmail(email);
        
        if (!user) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email não encontrado' }));
          return;
        }
        
        if (!user.confirmed) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Conta não confirmada. Verifique o console do servidor.' }));
          return;
        }
        
        if (!Database.validatePassword(password, user.password)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Senha incorreta' }));
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Login realizado!' }));
        
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno' }));
      }
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🎯 XGAMING - ANÁLISE DE PROBABILIDADES');
  console.log('='.repeat(50));
  console.log(`🚀 Servidor: http://localhost:${PORT}`);
  console.log(`📱 Acesse no navegador para usar`);
  console.log('='.repeat(50));
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Porta ${PORT} em uso. Tentando ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('❌ Erro:', err.message);
  }
});