export class ProbabilityAnalyzer {
  constructor() {
    this.tiposEvento = {
      esporte: this.analisarEsporte.bind(this),
      cripto: this.analisarCripto.bind(this),
      clima: this.analisarClima.bind(this),
      social: this.analisarSocial.bind(this),
      entretenimento: this.analisarEntretenimento.bind(this),
      default: this.analisarGenerico.bind(this)
    };
  }

  analyze(evento) {
    const { titulo, tipo, descricao, opcoes, contexto } = evento;

    if (!titulo || !tipo || !opcoes || opcoes.length < 2) {
      throw new Error('Evento inválido: título, tipo e pelo menos 2 opções são obrigatórios');
    }

    // Selecionar método de análise baseado no tipo
    const metodoAnalise = this.tiposEvento[tipo.toLowerCase()] || this.tiposEvento.default;
    const probabilidades = metodoAnalise(evento);

    // Normalizar para garantir 100%
    const probabilidadesNormalizadas = this.normalizarProbabilidades(probabilidades, opcoes);

    // Encontrar melhor escolha
    const melhorEscolha = this.encontrarMelhorEscolha(probabilidadesNormalizadas, opcoes);

    // Calcular confiança
    const confianca = this.calcularConfianca(probabilidadesNormalizadas, contexto);

    // Gerar resumo
    const resumo = this.gerarResumo(evento, probabilidadesNormalizadas, melhorEscolha);

    return this.formatarResposta({
      titulo,
      opcoes,
      probabilidades: probabilidadesNormalizadas,
      melhorEscolha,
      confianca,
      resumo
    });
  }

  analisarEsporte(evento) {
    const { contexto, opcoes } = evento;
    const prob = [];

    // Análise baseada em palavras-chave no contexto
    const palavrasChave = {
      favorito: ['favorito', 'melhor', 'líder', 'campeão', 'forte'],
      equilibrado: ['equilibrado', 'parelho', 'igual', 'similar'],
      azarao: ['azarão', 'fraco', 'desfalque', 'lesão']
    };

    const contextoLower = contexto?.toLowerCase() || '';

    if (opcoes.length === 2) {
      // Vitória ou derrota
      if (this.contemPalavras(contextoLower, palavrasChave.favorito)) {
        prob.push(65, 35);
      } else if (this.contemPalavras(contextoLower, palavrasChave.equilibrado)) {
        prob.push(50, 50);
      } else {
        prob.push(55, 45);
      }
    } else if (opcoes.length === 3) {
      // Vitória, empate, derrota
      if (this.contemPalavras(contextoLower, palavrasChave.favorito)) {
        prob.push(55, 25, 20);
      } else if (this.contemPalavras(contextoLower, palavrasChave.equilibrado)) {
        prob.push(35, 35, 30);
      } else {
        prob.push(40, 30, 30);
      }
    }

    return prob;
  }

  analisarCripto(evento) {
    const { contexto, opcoes } = evento;
    const prob = [];

    const palavrasChave = {
      alta: ['positivo', 'subir', 'alta', 'bull', 'otimista', 'etf', 'adoção'],
      baixa: ['negativo', 'cair', 'baixa', 'bear', 'pessimista', 'regulação'],
      volatil: ['volátil', 'incerto', 'instável']
    };

    const contextoLower = contexto?.toLowerCase() || '';

    if (opcoes.length === 2) {
      if (this.contemPalavras(contextoLower, palavrasChave.alta)) {
        prob.push(60, 40);
      } else if (this.contemPalavras(contextoLower, palavrasChave.baixa)) {
        prob.push(40, 60);
      } else {
        prob.push(50, 50);
      }
    } else if (opcoes.length === 3) {
      if (this.contemPalavras(contextoLower, palavrasChave.alta)) {
        prob.push(50, 30, 20);
      } else if (this.contemPalavras(contextoLower, palavrasChave.baixa)) {
        prob.push(20, 30, 50);
      } else if (this.contemPalavras(contextoLower, palavrasChave.volatil)) {
        prob.push(35, 30, 35);
      } else {
        prob.push(33, 34, 33);
      }
    }

    return prob;
  }

  analisarClima(evento) {
    const { contexto, opcoes } = evento;
    const prob = [];

    const palavrasChave = {
      sol: ['sol', 'limpo', 'claro', 'seco', 'alta pressão'],
      chuva: ['chuva', 'nublado', 'frente fria', 'umidade', 'baixa pressão'],
      instavel: ['instável', 'variável', 'pancadas']
    };

    const contextoLower = contexto?.toLowerCase() || '';

    if (opcoes.length === 2) {
      if (this.contemPalavras(contextoLower, palavrasChave.sol)) {
        prob.push(70, 30);
      } else if (this.contemPalavras(contextoLower, palavrasChave.chuva)) {
        prob.push(30, 70);
      } else {
        prob.push(50, 50);
      }
    } else if (opcoes.length === 3) {
      if (this.contemPalavras(contextoLower, palavrasChave.sol)) {
        prob.push(60, 25, 15);
      } else if (this.contemPalavras(contextoLower, palavrasChave.chuva)) {
        prob.push(15, 25, 60);
      } else if (this.contemPalavras(contextoLower, palavrasChave.instavel)) {
        prob.push(30, 40, 30);
      } else {
        prob.push(40, 30, 30);
      }
    }

    return prob;
  }

  analisarSocial(evento) {
    const { contexto, opcoes } = evento;
    const prob = [];

    const palavrasChave = {
      provavel: ['popular', 'tendência', 'viral', 'comum', 'esperado'],
      improvavel: ['raro', 'incomum', 'improvável', 'difícil']
    };

    const contextoLower = contexto?.toLowerCase() || '';

    if (opcoes.length === 2) {
      if (this.contemPalavras(contextoLower, palavrasChave.provavel)) {
        prob.push(65, 35);
      } else if (this.contemPalavras(contextoLower, palavrasChave.improvavel)) {
        prob.push(35, 65);
      } else {
        prob.push(50, 50);
      }
    } else if (opcoes.length === 3) {
      prob.push(40, 35, 25);
    }

    return prob;
  }

  analisarEntretenimento(evento) {
    const { opcoes } = evento;
    const prob = [];

    // Distribuição mais equilibrada para entretenimento
    if (opcoes.length === 2) {
      prob.push(55, 45);
    } else if (opcoes.length === 3) {
      prob.push(40, 35, 25);
    } else {
      const base = Math.floor(100 / opcoes.length);
      for (let i = 0; i < opcoes.length; i++) {
        prob.push(base);
      }
    }

    return prob;
  }

  analisarGenerico(evento) {
    const { opcoes } = evento;
    const prob = [];

    // Distribuição equilibrada
    const base = Math.floor(100 / opcoes.length);
    const resto = 100 - (base * opcoes.length);

    for (let i = 0; i < opcoes.length; i++) {
      prob.push(base + (i < resto ? 1 : 0));
    }

    return prob;
  }

  contemPalavras(texto, palavras) {
    return palavras.some(palavra => texto.includes(palavra));
  }

  normalizarProbabilidades(probabilidades, opcoes) {
    const soma = probabilidades.reduce((acc, val) => acc + val, 0);
    
    if (soma === 0) {
      // Se todas são zero, distribuir igualmente
      const valorIgual = Math.floor(100 / opcoes.length);
      const resto = 100 - (valorIgual * opcoes.length);
      return opcoes.map((_, i) => valorIgual + (i < resto ? 1 : 0));
    }

    // Normalizar para 100%
    const normalizadas = probabilidades.map(p => (p / soma) * 100);
    
    // Arredondar e ajustar para garantir exatamente 100%
    const arredondadas = normalizadas.map(p => Math.round(p));
    const somaArredondada = arredondadas.reduce((acc, val) => acc + val, 0);
    
    if (somaArredondada !== 100) {
      const diff = 100 - somaArredondada;
      const maxIndex = arredondadas.indexOf(Math.max(...arredondadas));
      arredondadas[maxIndex] += diff;
    }

    return arredondadas;
  }

  encontrarMelhorEscolha(probabilidades, opcoes) {
    const maxProb = Math.max(...probabilidades);
    const maxIndex = probabilidades.indexOf(maxProb);
    return opcoes[maxIndex];
  }

  calcularConfianca(probabilidades, contexto) {
    const maxProb = Math.max(...probabilidades);
    const minProb = Math.min(...probabilidades);
    const diferenca = maxProb - minProb;

    // Confiança baseada na diferença entre maior e menor probabilidade
    let confianca = Math.min(50 + diferenca, 95);

    // Ajustar baseado na presença de contexto
    if (!contexto || contexto.trim().length < 20) {
      confianca = Math.max(confianca - 20, 30);
    }

    return Math.round(confianca);
  }

  gerarResumo(evento, probabilidades, melhorEscolha) {
    const { tipo, contexto } = evento;
    const maxProb = Math.max(...probabilidades);
    
    const resumos = {
      esporte: `Baseado nas estatísticas e forma atual, ${melhorEscolha} tem ${maxProb}% de chance.`,
      cripto: `Análise de mercado indica ${maxProb}% de probabilidade para ${melhorEscolha}.`,
      clima: `Condições meteorológicas sugerem ${maxProb}% de chance de ${melhorEscolha}.`,
      social: `Tendências e comportamento indicam ${maxProb}% para ${melhorEscolha}.`,
      entretenimento: `Análise sugere ${maxProb}% de probabilidade para ${melhorEscolha}.`
    };

    return resumos[tipo.toLowerCase()] || `Análise indica ${maxProb}% de probabilidade para ${melhorEscolha}.`;
  }

  formatarResposta({ titulo, opcoes, probabilidades, melhorEscolha, confianca, resumo }) {
    let resposta = `EVENTO: ${titulo}\n\n`;
    resposta += 'PROBABILIDADES:\n';
    
    opcoes.forEach((opcao, index) => {
      resposta += `- ${opcao}: ${probabilidades[index]}%\n`;
    });

    resposta += `\nMELHOR ESCOLHA:\n${melhorEscolha}\n`;
    resposta += `\nCONFIANÇA:\n${confianca} de 100\n`;
    resposta += `\nRESUMO:\n${resumo}`;

    return resposta;
  }
}
