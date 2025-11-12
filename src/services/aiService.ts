import { AIAnalysis, MoodData } from '../types';

// Simulação de chamada de API de IA
export const aiService = {
  // Simula a análise da IA com base nos dados do humor
  async fetchAIAnalysis(
    moodData: Partial<MoodData>,
    facialData: string
  ): Promise<AIAnalysis> {
    // Simula delay de API (1-2 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Lógica de análise baseada no humor
    let analise = '';
    let sugestoes: string[] = [];

    switch (moodData.humor) {
      case 'Muito Bem':
        analise = 'Excelente! Você está em um ótimo momento. Continue mantendo esse equilíbrio e compartilhe suas práticas positivas com a equipe.';
        sugestoes = [
          'Trilha de Liderança Inspiradora',
          'Exercício de Gratidão (10 min)',
          'Meditação de Manutenção (5 min)'
        ];
        break;
      
      case 'Bem':
        analise = 'Você está bem! Seu foco está equilibrado. Mantenha as pausas regulares e continue cuidando da sua energia.';
        sugestoes = [
          'Trilha de Produtividade Consciente',
          'Atividade de Alongamento (10 min)',
          'Técnica Pomodoro para Foco'
        ];
        break;
      
      case 'Normal':
        analise = 'Estado neutro detectado. Considere introduzir pequenas mudanças na rotina para elevar sua energia e bem-estar.';
        sugestoes = [
          'Trilha de Gestão de Energia',
          'Caminhada Rápida (15 min)',
          'Exercício de Respiração Consciente (5 min)'
        ];
        break;
      
      case 'Cansado':
        analise = 'Detectamos sinais de cansaço. É importante priorizar descanso e estabelecer limites saudáveis no trabalho.';
        sugestoes = [
          'Trilha de Recuperação e Descanso',
          'Técnica de Relaxamento Progressivo (15 min)',
          'Reorganização de Prioridades',
          'Pausa para Hidratação e Lanche Saudável'
        ];
        break;
      
      case 'Exausto':
        analise = 'Nível crítico de exaustão detectado. Recomendamos fortemente pausas imediatas e considerar conversar com um líder sobre redistribuição de tarefas.';
        sugestoes = [
          'Protocolo de Emergência: Descanso Imediato',
          'Conversa com Líder/RH',
          'Trilha de Prevenção de Burnout',
          'Consulta com Profissional de Saúde Mental',
          'Técnica de Descompressão (20 min)'
        ];
        break;
      
      default:
        analise = 'Com base nos dados coletados, recomendamos atenção ao seu bem-estar geral.';
        sugestoes = [
          'Trilha de Autoconhecimento',
          'Check-in Emocional Diário',
          'Atividade de Mindfulness (10 min)'
        ];
    }

    // Adiciona análise baseada na energia
    if (moodData.energia === 'Baixa') {
      analise += ' Sua energia está baixa. Considere revisar sua alimentação, hidratação e qualidade do sono.';
      sugestoes.push('Guia de Nutrição Energética');
    }

    // Adiciona análise baseada no sono
    if (moodData.sono === 'Ruim' || moodData.sono === 'Muito Ruim') {
      analise += ' Qualidade de sono comprometida. O sono é fundamental para recuperação e performance.';
      sugestoes.push('Trilha de Higiene do Sono', 'Técnicas de Relaxamento Noturno');
    }

    // Considera a justificativa se houver palavras-chave
    if (moodData.justificativa) {
      const justLower = moodData.justificativa.toLowerCase();
      
      if (justLower.includes('pressão') || justLower.includes('prazo')) {
        analise += ' Detectamos pressão relacionada a prazos. Considere técnicas de gestão de tempo.';
        sugestoes.push('Trilha de Gestão de Prazos');
      }
      
      if (justLower.includes('conflito') || justLower.includes('discussão')) {
        analise += ' Situação de conflito identificada. A comunicação assertiva pode ajudar.';
        sugestoes.push('Trilha de Comunicação Assertiva', 'Mediação de Conflitos');
      }
      
      if (justLower.includes('motivação') || justLower.includes('desmotivado')) {
        analise += ' Questões motivacionais detectadas. Reconectar-se com seus valores pode ajudar.';
        sugestoes.push('Trilha de Propósito e Valores', 'Reconexão com Objetivos');
      }
    }

    // Remove duplicatas de sugestões
    sugestoes = [...new Set(sugestoes)];

    return {
      analise,
      sugestoes: sugestoes.slice(0, 5) // Limita a 5 sugestões
    };
  }
};


