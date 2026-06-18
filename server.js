const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o motor de visualização EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Dados para a página
const siteData = {
    banner: {
        text: 'Corretor da Bolsa Leo • Especialista em',
        highlight: 'Day Trading há 6 anos!',
        emoji: '🔥'
    },
    hero: {
        title: 'Opere com',
        titleHighlight: 'Profissionalidade',
        tags: ['Forex', 'B3', 'Cripto'],
        description: {
            text: 'Análises técnicas, fundamentalistas e de timing avançadas.',
            strong: 'Saiba o que operar, quando entrar e onde sair.',
            conclusion: 'Decisões baseadas em dados, não em emoção.'
        },
        ctaButton: {
            text: 'Clique aqui e me chame no whatsapp!',
            link: '#'
        }
    },
    stats: [
        {
            icon: '💰',
            value: 'R$1,5M+',
            label: 'Capital Protegido'
        },
        {
            icon: '⚡',
            value: 'R$ 100K+',
            label: 'Movimentados<br>diariamente com OB'
        },
        {
            icon: '📈',
            value: '30K+',
            label: 'Análises'
        },
        {
            icon: '👥',
            value: '5K+',
            label: 'Traders Ativos'
        }
    ],
    about: {
        title: 'Sobre Mim',
        text: 'Com 6 anos de experiência como Corretor em ações de DayTrading, desenvolvo operações baseadas em estatística, análise de mercado e gestão de risco, priorizando resultados consistentes acima de decisões emocionais. Atualmente, meu foco está nos gráficos e movimentos do mercado de criptomoedas, sempre seguindo práticas legais, transparentes e alinhadas às normas regulatórias aplicáveis.'
    },
    testimonials: {
        title: 'Resultados',
        titleHighlight1: 'Reais',
        titleMiddle: 'de Traders',
        titleHighlight2: 'Reais',
        subtitle: 'Veja como minha equipe de corretagem está transformando a vida de milhares de traders',
        reviews: [
            {
                initials: 'RM',
                name: 'Talles M.',
                verified: true,
                role: 'Trader de Criptomoedas',
                stars: 5,
                percentage: '+47%',
                period: 'em 3 meses',
                text: '"Eu passava 6 horas por dia analisando gráficos e ainda tomava decisões erradas. Com a equipe especializada de corretores do Leo, minha assertividade subiu de 30% para 98%. Minha vida mudou completamente."'
            },
            {
                initials: 'AC',
                name: 'Claudia P.',
                verified: true,
                role: 'Investidora',
                stars: 5,
                percentage: '+23%',
                period: 'no primeiro mês',
                text: '"Eu tinha medo de operar porque não entendia os indicadores. A equipe de corretores do Leo me explicaram tudo de forma simples e me deram confiança para entrar nas operações."'
            },
            {
                initials: 'PH',
                name: 'Kenzo A.',
                verified: true,
                role: 'Day Trader',
                stars: 5,
                percentage: '+156%',
                period: 'em 6 meses',
                text: '"Já tentei de tudo: cursos caros, robôs que prometiam milagres, grupos de sinais. Nada funcionou até eu entrar para o grupo do Corretor Leo. A análise experiente dele e de sua equipe mudou meu jogo completamente."'
            },
            {
                initials: 'MV',
                name: 'Pedro S.',
                verified: true,
                role: 'Empresário',
                stars: 5,
                percentage: '+89%',
                period: 'em 4 meses',
                text: '"Não tenho tempo para ficar horas estudando gráficos. A equipe de corretagem do Leo me deram análises completas, com pontos de entrada, stop e alvo. Opero no meu tempo livre e estou tendo resultados incríveis."'
            }
        ],
        footer: {
            avatars: 'RM  AC  PH  MV',
            count: '+6.308 traders ativos',
            rating: '4.8/5 média de avaliação',
            approval: '98% taxa de assertividade'
        }
    }
};

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { data: siteData });
});

// Rota para API (retorna dados em JSON)
app.get('/api/data', (req, res) => {
    res.json(siteData);
});

// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}/api/data`);
});
