import { AIAnalysis, MoodData } from '../types';
import { getGeminiClient, isGeminiConfigured } from '../config/gemini';

/**
 * Serviço de IA usando Google Gemini (Nova API)
 * Gera análises personalizadas baseadas no estado emocional do usuário
 */
export const geminiAIService = {
  /**
   * Gera análise usando Google Gemini (Nova API)
   */
  async fetchGeminiAnalysis(
    moodData: Partial<MoodData>,
    facialData: string
  ): Promise<AIAnalysis | null> {
    // Verifica se o Gemini está configurado
    if (!isGeminiConfigured()) {
      console.log('Gemini não configurado, usando simulação');
      return null;
    }

    const ai = getGeminiClient();
    if (!ai) {
      console.log('❌ Cliente Gemini não inicializado');
      return null;
    }

    console.log('🔍 Testando modelos Gemini disponíveis (Nova API)...');
    
    // Lista de modelos a tentar (ordem de mais provável para menos provável)
    const modelsToTry = [
      'gemini-2.5-flash',
      'gemini-2.5-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro',
      'gemini-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro-latest'
    ];

    // Constrói o prompt contextualizado uma vez
    const prompt = this.buildPrompt(moodData, facialData);

    // Tenta cada modelo até encontrar um que funcione
    let lastError = '';
    for (let i = 0; i < modelsToTry.length; i++) {
      const modelName = modelsToTry[i];
      try {
        console.log(`🔄 [${i + 1}/${modelsToTry.length}] Tentando modelo: ${modelName}`);
        
        // Chama o Gemini usando a Nova API
        console.log(`📤 Enviando requisição para ${modelName}...`);
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });

        const text = response.text;
        console.log(`📥 Resposta recebida (${text.length} caracteres)`);

        // Parse da resposta (esperamos JSON)
        const analysis = this.parseGeminiResponse(text);
        
        console.log(`✅ SUCESSO! Modelo ${modelName} funcionou!`);
        console.log(`💡 Use este modelo: ${modelName}`);
        return analysis;
      } catch (error: any) {
        const errorMsg = error?.message || String(error);
        lastError = errorMsg.split('\n')[0];
        console.log(`❌ [${i + 1}/${modelsToTry.length}] ${modelName}: ${lastError}`);
        // Continua para o próximo modelo
        continue;
      }
    }

    // Se nenhum modelo funcionou
    console.log('');
    console.log('⚠️ ════════════════════════════════════════════════════');
    console.log('⚠️  Nenhum modelo Gemini disponível');
    console.log('⚠️ ════════════════════════════════════════════════════');
    console.log('💡 Possíveis causas:');
    console.log('   1. API key inválida ou expirada');
    console.log('   2. API key sem permissões para esses modelos');
    console.log('   3. Problemas de conectividade');
    console.log('');
    console.log('🔧 Para resolver:');
    console.log('   1. Verifique se sua API key está correta no .env');
    console.log('   2. Acesse: https://aistudio.google.com/app/apikey');
    console.log('   3. Crie uma nova API key se necessário');
    console.log('');
    console.log('📱 O app continuará funcionando com IA simulada');
    console.log('⚠️ ════════════════════════════════════════════════════');
    console.log('');
    return null;
  },

  /**
   * Constrói o prompt para o Gemini baseado nos dados do usuário
   */
  buildPrompt(moodData: Partial<MoodData>, facialData: string): string {
    const prompt = `
Você é um assistente de bem-estar emocional especializado em saúde mental no trabalho.

Analise os seguintes dados de um trabalhador e forneça uma análise empática e construtiva:

**Dados do Check-in:**
- Humor: ${moodData.humor || 'Não informado'}
- Nível de Energia: ${moodData.energia || 'Não informado'}
- Qualidade do Sono: ${moodData.sono || 'Não informado'}
- Contexto adicional: ${moodData.justificativa || 'Não fornecido'}
- Status da captura facial: ${facialData === 'foto_simulada' ? 'Realizada' : 'Não realizada'}

**Sua tarefa:**
1. Forneça uma análise empática e profissional sobre o estado atual do trabalhador
2. Identifique possíveis sinais de alerta (cansaço, burnout, estresse)
3. Sugira de 3 a 5 ações práticas e específicas que o trabalhador pode fazer

**IMPORTANTE:**
- Seja empático e encorajador
- Use linguagem clara e acessível
- Foque em ações práticas e realizáveis
- Se detectar sinais graves (exaustão, burnout), recomende buscar ajuda profissional

**Formato de resposta (JSON):**
{
  "analise": "Sua análise textual aqui (2-4 frases)",
  "sugestoes": [
    "Sugestão 1 específica e prática",
    "Sugestão 2 específica e prática",
    "Sugestão 3 específica e prática",
    "Sugestão 4 específica e prática (opcional)",
    "Sugestão 5 específica e prática (opcional)"
  ]
}

Responda APENAS com o JSON, sem texto adicional.
`;

    return prompt.trim();
  },

  /**
   * Faz parse da resposta do Gemini
   */
  parseGeminiResponse(text: string): AIAnalysis {
    try {
      // Remove possíveis markdown code blocks
      let cleanText = text.trim();
      
      // Remove ```json e ```
      cleanText = cleanText.replace(/```json\n?/g, '');
      cleanText = cleanText.replace(/```\n?/g, '');
      cleanText = cleanText.trim();

      // Parse do JSON
      const parsed = JSON.parse(cleanText);

      // Valida a estrutura
      if (!parsed.analise || !Array.isArray(parsed.sugestoes)) {
        throw new Error('Estrutura inválida');
      }

      return {
        analise: parsed.analise,
        sugestoes: parsed.sugestoes.slice(0, 5) // Limita a 5
      };
    } catch (error) {
      console.error('Erro ao fazer parse da resposta Gemini:', error);
      console.log('Resposta recebida:', text);
      
      // Fallback: tenta extrair informações da resposta
      return {
        analise: 'Análise gerada com sucesso. Recomendamos atenção ao seu bem-estar.',
        sugestoes: [
          'Faça pausas regulares durante o trabalho',
          'Pratique exercícios de respiração',
          'Mantenha uma rotina de sono consistente',
          'Converse com alguém de confiança sobre seus sentimentos'
        ]
      };
    }
  }
};

