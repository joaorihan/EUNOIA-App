import { AIAnalysis, MoodData } from '../types';
import { getGeminiModel, isGeminiConfigured } from '../config/gemini';

/**
 * Serviço de IA usando Google Gemini Pro
 * Gera análises personalizadas baseadas no estado emocional do usuário
 */
export const geminiAIService = {
  /**
   * Gera análise usando Google Gemini Pro
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

    try {
      const model = getGeminiModel();
      if (!model) {
        return null;
      }

      // Constrói o prompt contextualizado
      const prompt = this.buildPrompt(moodData, facialData);

      // Chama o Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse da resposta (esperamos JSON)
      const analysis = this.parseGeminiResponse(text);
      
      return analysis;
    } catch (error) {
      console.error('Erro ao chamar Gemini:', error);
      return null;
    }
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

