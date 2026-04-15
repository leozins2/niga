import { ProbabilityAnalyzer } from './src/analyzer.js';
import { exampleEvents } from './src/examples.js';

// Exemplo de uso
const analyzer = new ProbabilityAnalyzer();

console.log('='.repeat(60));
console.log('SISTEMA DE ANÁLISE DE PROBABILIDADES');
console.log('='.repeat(60));
console.log();

// Analisar eventos de exemplo
exampleEvents.forEach((event, index) => {
  console.log(`\n📊 ANÁLISE ${index + 1}/${exampleEvents.length}`);
  console.log('='.repeat(60));
  const result = analyzer.analyze(event);
  console.log(result);
  console.log();
});

// Exemplo de uso programático
console.log('\n💡 EXEMPLO DE USO PROGRAMÁTICO:');
console.log('='.repeat(60));

const customEvent = {
  titulo: 'Bitcoin vai subir ou cair?',
  tipo: 'cripto',
  descricao: 'Movimento do Bitcoin nas próximas 24h',
  opcoes: ['Subir mais de 2%', 'Ficar estável (-2% a +2%)', 'Cair mais de 2%'],
  contexto: 'Mercado volátil, notícias positivas sobre ETFs, volume de negociação alto'
};

const customResult = analyzer.analyze(customEvent);
console.log(customResult);
