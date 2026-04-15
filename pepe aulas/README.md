# Sistema de Análise de Probabilidades

Sistema avançado de análise de probabilidades para eventos diversos, incluindo esportes, criptomoedas, clima, comportamento humano e tendências online.

## 🚀 Instalação

```bash
npm install
```

## 📖 Uso

### Executar exemplos:
```bash
npm start
```

### Modo desenvolvimento (com auto-reload):
```bash
npm run dev
```

## 💡 Como usar no seu código

```javascript
import { ProbabilityAnalyzer } from './src/analyzer.js';

const analyzer = new ProbabilityAnalyzer();

const evento = {
  titulo: 'Flamengo vs Palmeiras',
  tipo: 'esporte',
  descricao: 'Partida do Campeonato Brasileiro',
  opcoes: ['Vitória Flamengo', 'Empate', 'Vitória Palmeiras'],
  contexto: 'Flamengo jogando em casa, favorito nas apostas'
};

const resultado = analyzer.analyze(evento);
console.log(resultado);
```

## 📊 Tipos de Eventos Suportados

- **esporte**: Jogos, partidas, competições
- **cripto**: Movimentos de criptomoedas
- **clima**: Previsões meteorológicas
- **social**: Tendências e comportamento humano
- **entretenimento**: Filmes, séries, eventos culturais

## 📋 Formato de Entrada

```javascript
{
  titulo: 'Nome do evento',
  tipo: 'esporte|cripto|clima|social|entretenimento',
  descricao: 'Descrição breve',
  opcoes: ['Opção 1', 'Opção 2', 'Opção 3'],
  contexto: 'Informações relevantes, estatísticas, tendências...'
}
```

## 📤 Formato de Saída

```
EVENTO: Nome do evento

PROBABILIDADES:
- Opção 1: XX%
- Opção 2: XX%
- Opção 3: XX%

MELHOR ESCOLHA:
Opção mais provável

CONFIANÇA:
XX de 100

RESUMO:
Explicação curta em até 2 linhas
```

## ⚙️ Características

- ✅ Soma das probabilidades sempre 100%
- ✅ Evita valores extremos (0% ou 100%)
- ✅ Análise contextual inteligente
- ✅ Cálculo de confiança baseado em dados
- ✅ Suporte para 2 ou mais opções
- ✅ Extensível para novos tipos de eventos

## 🔧 Estrutura do Projeto

```
.
├── index.js              # Arquivo principal
├── package.json          # Configurações do projeto
├── src/
│   ├── analyzer.js       # Motor de análise
│   └── examples.js       # Eventos de exemplo
└── README.md            # Documentação
```

## 📝 Exemplos

Veja o arquivo `src/examples.js` para exemplos completos de cada tipo de evento.

## 🤝 Contribuindo

Sinta-se à vontade para adicionar novos tipos de eventos ou melhorar os algoritmos de análise!
