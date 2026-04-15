/** Todos os mercados usam o mesmo layout de card (grade, odds, %). */
const _exampleEventsData = [
  // FUTEBOL / ESPORTES
  {
    titulo: 'Flamengo vs Palmeiras',
    tipo: 'esporte',
    categoria: 'futebol',
    descricao: 'Partida do Campeonato Brasileiro',
    badge: 'Futebol',
    thumbLetter: '⚽',
    thumbBg: 'linear-gradient(145deg,#dc2626,#991b1b)',
    linhas: [
      { label: 'Vitória Flamengo', odd: 2.15, pct: 42, alta: true },
      { label: 'Empate', odd: 3.2, pct: 28, alta: false },
      { label: 'Vitória Palmeiras', odd: 3.4, pct: 30, alta: false }
    ],
    tempo: "90'",
    aoVivo: true,
    preco: 'R$ 2,88'
  },
  {
    titulo: 'Corinthians vs São Paulo',
    tipo: 'esporte',
    categoria: 'futebol',
    descricao: 'Clássico Majestoso',
    badge: 'Futebol',
    thumbLetter: '⚽',
    thumbBg: 'linear-gradient(145deg,#000000,#374151)',
    linhas: [
      { label: 'Vitória Corinthians', odd: 2.45, pct: 38, alta: false },
      { label: 'Empate', odd: 3.1, pct: 32, alta: true },
      { label: 'Vitória São Paulo', odd: 2.9, pct: 30, alta: false }
    ],
    tempo: "78'",
    aoVivo: true,
    preco: 'R$ 3,10'
  },
  {
    titulo: 'Brasil vs Argentina',
    tipo: 'esporte',
    categoria: 'futebol',
    descricao: 'Eliminatórias da Copa do Mundo',
    badge: 'Futebol',
    thumbLetter: '🇧🇷',
    thumbBg: 'linear-gradient(145deg,#eab308,#ca8a04)',
    linhas: [
      { label: 'Vitória Brasil', odd: 2.05, pct: 45, alta: true },
      { label: 'Empate', odd: 3.25, pct: 30, alta: false },
      { label: 'Vitória Argentina', odd: 3.8, pct: 25, alta: false }
    ],
    tempo: '1d 4h',
    aoVivo: false,
    preco: 'R$ 4,50'
  },
  {
    titulo: 'Lakers vs Warriors',
    tipo: 'esporte',
    categoria: 'esporte',
    descricao: 'NBA - Temporada Regular',
    badge: 'Esportes',
    thumbLetter: '🏀',
    thumbBg: 'linear-gradient(145deg,#7c3aed,#5b21b6)',
    linhas: [
      { label: 'Vitória Lakers', odd: 1.92, pct: 54, alta: true },
      { label: 'Vitória Warriors', odd: 1.98, pct: 46, alta: false }
    ],
    tempo: '03:12',
    aoVivo: true,
    preco: 'R$ 1,95'
  },
  {
    titulo: 'Djokovic vs Nadal',
    tipo: 'esporte',
    categoria: 'esporte',
    descricao: 'Final de Roland Garros',
    badge: 'Esportes',
    thumbLetter: '🎾',
    thumbBg: 'linear-gradient(145deg,#15803d,#14532d)',
    linhas: [
      { label: 'Vitória Djokovic', odd: 1.72, pct: 58, alta: true },
      { label: 'Vitória Nadal', odd: 2.25, pct: 42, alta: false }
    ],
    tempo: '2h20',
    aoVivo: true,
    preco: 'R$ 2,40'
  },

  // ENTRETENIMENTO
  {
    titulo: 'Jesus Cristo retornará até 2027?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Mercado de longo prazo',
    badge: 'Entretenimento',
    thumbLetter: '✝',
    thumbBg: 'linear-gradient(145deg,#7c3aed,#5b21b6)',
    linhas: [
      { label: 'Sim', odd: 3.62, pct: 25, alta: true },
      { label: 'Não', odd: 1.2, pct: 75, alta: false }
    ],
    tempo: '37 sem.',
    aoVivo: false,
    preco: 'R$ 3,06'
  },
  {
    titulo: 'GTA VI: Preço acima de R$500?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Preço de lançamento',
    badge: 'Entretenimento',
    thumbLetter: 'G',
    thumbBg: 'linear-gradient(145deg,#22c55e,#15803d)',
    linhas: [
      { label: 'Sim', odd: 1.46, pct: 52, alta: true },
      { label: 'Não', odd: 1.58, pct: 48, alta: false }
    ],
    tempo: '39 sem.',
    aoVivo: true,
    preco: 'R$ 4,12'
  },
  {
    titulo: 'BBB 26: Campeão será uma mulher?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Reality show',
    badge: 'Entretenimento',
    thumbLetter: 'B',
    thumbBg: 'linear-gradient(145deg,#f97316,#c2410c)',
    linhas: [
      { label: 'Sim', odd: 1.12, pct: 87, alta: true },
      { label: 'Não', odd: 7.54, pct: 13, alta: false }
    ],
    tempo: '6d',
    aoVivo: true,
    preco: 'R$ 2,84'
  },
  {
    titulo: 'Rodovia (5 minutos): quantos carros?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Contagem ao vivo',
    badge: 'Entretenimento',
    thumbLetter: '🚗',
    thumbBg: 'linear-gradient(145deg,#64748b,#475569)',
    linhas: [
      { label: 'Mais de 70', odd: 2.1, pct: 44, alta: true },
      { label: 'Até 70', odd: 1.85, pct: 56, alta: false }
    ],
    tempo: '03:34',
    aoVivo: true,
    preco: 'R$ 1,92'
  },
  {
    titulo: 'BBB 26: Quem será eliminado?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Paredão',
    badge: 'Entretenimento',
    thumbLetter: 'B',
    thumbBg: 'linear-gradient(145deg,#ec4899,#be185d)',
    linhas: [
      { label: 'Jordana', odd: 1.65, pct: 58, alta: true },
      { label: 'Ana Paula', odd: 2.45, pct: 42, alta: false }
    ],
    tempo: '17h22',
    aoVivo: true,
    preco: 'R$ 5,40'
  },
  {
    titulo: 'Oscar 2026: Oppenheimer 2 leva Melhor Filme?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Premiação',
    badge: 'Entretenimento',
    thumbLetter: '🎬',
    thumbBg: 'linear-gradient(145deg,#eab308,#a16207)',
    linhas: [
      { label: 'Sim', odd: 4.2, pct: 18, alta: false },
      { label: 'Não', odd: 1.28, pct: 82, alta: true }
    ],
    tempo: '1d',
    aoVivo: false,
    preco: null
  },
  {
    titulo: 'Stranger Things 5: estreia antes de julho?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'Série Netflix',
    badge: 'Entretenimento',
    thumbLetter: 'S',
    thumbBg: 'linear-gradient(145deg,#dc2626,#991b1b)',
    linhas: [
      { label: 'Sim', odd: 1.88, pct: 61, alta: true },
      { label: 'Não', odd: 2.05, pct: 39, alta: false }
    ],
    tempo: '6d',
    aoVivo: false,
    preco: 'R$ 2,15'
  },
  {
    titulo: 'The Last of Us S3: anunciada em 2026?',
    tipo: 'entretenimento',
    categoria: 'entretenimento',
    descricao: 'TV / games',
    badge: 'Entretenimento',
    thumbLetter: 'T',
    thumbBg: 'linear-gradient(145deg,#14b8a6,#0f766e)',
    linhas: [
      { label: 'Sim', odd: 2.3, pct: 35, alta: false },
      { label: 'Não', odd: 1.72, pct: 65, alta: true }
    ],
    tempo: '37 sem.',
    aoVivo: false,
    preco: null
  },

  // POLÍTICA
  {
    titulo: 'Eleições 2024: Prefeito de SP',
    tipo: 'politica',
    categoria: 'politica',
    descricao: 'Eleições municipais de São Paulo',
    badge: 'Política',
    thumbLetter: '🏛️',
    thumbBg: 'linear-gradient(145deg,#475569,#1e293b)',
    linhas: [
      { label: 'Candidato A', odd: 2.8, pct: 35, alta: false },
      { label: 'Candidato B', odd: 2.2, pct: 40, alta: true },
      { label: 'Candidato C', odd: 4.5, pct: 25, alta: false }
    ],
    tempo: '14d',
    aoVivo: false,
    preco: 'R$ 3,25'
  },
  {
    titulo: 'Aprovação do Presidente',
    tipo: 'politica',
    categoria: 'politica',
    descricao: 'Pesquisa de aprovação presidencial',
    badge: 'Política',
    thumbLetter: '📊',
    thumbBg: 'linear-gradient(145deg,#0ea5e9,#0369a1)',
    linhas: [
      { label: 'Acima de 50%', odd: 1.65, pct: 62, alta: true },
      { label: 'Abaixo de 50%', odd: 2.35, pct: 38, alta: false }
    ],
    tempo: '5d',
    aoVivo: false,
    preco: 'R$ 1,78'
  },
  {
    titulo: 'Reforma Tributária será aprovada?',
    tipo: 'politica',
    categoria: 'politica',
    descricao: 'Votação no Congresso Nacional',
    badge: 'Política',
    thumbLetter: 'R',
    thumbBg: 'linear-gradient(145deg,#78716c,#44403c)',
    linhas: [
      { label: 'Sim', odd: 1.48, pct: 68, alta: true },
      { label: 'Não', odd: 2.95, pct: 32, alta: false }
    ],
    tempo: '2d 8h',
    aoVivo: true,
    preco: 'R$ 2,02'
  },

  // CLIMA
  {
    titulo: 'Vai chover amanhã em São Paulo?',
    tipo: 'clima',
    categoria: 'clima',
    descricao: 'Previsão de chuva para São Paulo',
    badge: 'Clima',
    thumbLetter: '🌧️',
    thumbBg: 'linear-gradient(145deg,#3b82f6,#1d4ed8)',
    linhas: [
      { label: 'Sim, vai chover', odd: 1.75, pct: 55, alta: true },
      { label: 'Não vai chover', odd: 2.15, pct: 45, alta: false }
    ],
    tempo: '18h',
    aoVivo: false,
    preco: 'R$ 1,55'
  },
  {
    titulo: 'Temperatura no Rio de Janeiro',
    tipo: 'clima',
    categoria: 'clima',
    descricao: 'Máxima do dia no Rio',
    badge: 'Clima',
    thumbLetter: '☀️',
    thumbBg: 'linear-gradient(145deg,#f59e0b,#d97706)',
    linhas: [
      { label: 'Acima de 35°C', odd: 2.4, pct: 32, alta: false },
      { label: 'Entre 30-35°C', odd: 1.9, pct: 48, alta: true },
      { label: 'Abaixo de 30°C', odd: 5.2, pct: 20, alta: false }
    ],
    tempo: '8h15',
    aoVivo: true,
    preco: 'R$ 2,30'
  },
  {
    titulo: 'Neve em Gramado este inverno?',
    tipo: 'clima',
    categoria: 'clima',
    descricao: 'Previsão de neve na Serra Gaúcha',
    badge: 'Clima',
    thumbLetter: '❄️',
    thumbBg: 'linear-gradient(145deg,#93c5fd,#3b82f6)',
    linhas: [
      { label: 'Sim', odd: 3.1, pct: 28, alta: false },
      { label: 'Não', odd: 1.42, pct: 72, alta: true }
    ],
    tempo: '4m',
    aoVivo: false,
    preco: null
  },

  // CELEBRIDADES
  {
    titulo: 'Anitta lançará música nova?',
    tipo: 'celebridades',
    categoria: 'celebridades',
    descricao: 'Novo single da cantora',
    badge: 'Celebridades',
    thumbLetter: '🎤',
    thumbBg: 'linear-gradient(145deg,#db2777,#9d174d)',
    linhas: [
      { label: 'Esta semana', odd: 4.2, pct: 22, alta: false },
      { label: 'Próximo mês', odd: 2.1, pct: 48, alta: true },
      { label: 'Não lançará', odd: 3.5, pct: 30, alta: false }
    ],
    tempo: '12d',
    aoVivo: false,
    preco: 'R$ 3,80'
  },
  {
    titulo: 'Neymar voltará ao Santos?',
    tipo: 'celebridades',
    categoria: 'celebridades',
    descricao: 'Retorno do craque ao clube do coração',
    badge: 'Celebridades',
    thumbLetter: 'N',
    thumbBg: 'linear-gradient(145deg,#ffffff,#cbd5e1)',
    linhas: [
      { label: 'Sim', odd: 2.85, pct: 38, alta: false },
      { label: 'Não', odd: 1.48, pct: 62, alta: true }
    ],
    tempo: '90d',
    aoVivo: false,
    preco: 'R$ 2,95'
  },
  {
    titulo: 'Casamento de famosos em 2024',
    tipo: 'celebridades',
    categoria: 'celebridades',
    descricao: 'Qual casal se casará primeiro',
    badge: 'Celebridades',
    thumbLetter: '💍',
    thumbBg: 'linear-gradient(145deg,#f472b6,#db2777)',
    linhas: [
      { label: 'Casal A', odd: 2.5, pct: 40, alta: true },
      { label: 'Casal B', odd: 2.8, pct: 35, alta: false },
      { label: 'Casal C', odd: 4.0, pct: 25, alta: false }
    ],
    tempo: '6m',
    aoVivo: false,
    preco: 'R$ 1,90'
  },

  // CRIPTOMOEDAS
  {
    titulo: 'Bitcoin nas próximas 24h',
    tipo: 'cripto',
    categoria: 'cripto',
    descricao: 'Movimento do preço do Bitcoin',
    badge: 'Criptomoedas',
    thumbLetter: '₿',
    thumbBg: 'linear-gradient(145deg,#f7931a,#d97706)',
    linhas: [
      { label: 'Subir mais de 2%', odd: 2.1, pct: 38, alta: false },
      { label: 'Ficar estável (-2% a +2%)', odd: 1.75, pct: 45, alta: true },
      { label: 'Cair mais de 2%', odd: 3.2, pct: 17, alta: false }
    ],
    tempo: '14h32',
    aoVivo: true,
    preco: 'R$ 5,20'
  },
  {
    titulo: 'Ethereum ultrapassará $4000?',
    tipo: 'cripto',
    categoria: 'cripto',
    descricao: 'Preço do Ethereum este mês',
    badge: 'Criptomoedas',
    thumbLetter: 'Ξ',
    thumbBg: 'linear-gradient(145deg,#627eea,#4338ca)',
    linhas: [
      { label: 'Sim', odd: 2.25, pct: 42, alta: true },
      { label: 'Não', odd: 1.72, pct: 58, alta: false }
    ],
    tempo: '22d',
    aoVivo: false,
    preco: 'R$ 3,45'
  },
  {
    titulo: 'Nova criptomoeda no top 10',
    tipo: 'cripto',
    categoria: 'cripto',
    descricao: 'Ranking das maiores criptos',
    badge: 'Criptomoedas',
    thumbLetter: '📈',
    thumbBg: 'linear-gradient(145deg,#22c55e,#15803d)',
    linhas: [
      { label: 'Sim', odd: 3.4, pct: 29, alta: false },
      { label: 'Não', odd: 1.38, pct: 71, alta: true }
    ],
    tempo: '45d',
    aoVivo: false,
    preco: null
  }
];

/** Inclui `opcoes` e `contexto` para o ProbabilityAnalyzer e scripts CLI. */
export const exampleEvents = _exampleEventsData.map((e) => ({
  ...e,
  opcoes: e.linhas.map((l) => l.label),
  contexto: e.descricao
}));
