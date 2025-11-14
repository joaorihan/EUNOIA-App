import { GoogleGenAI } from '@google/genai';
import Constants from 'expo-constants';

// Configuração do Google Gemini AI (Nova API)
// Para obter sua API Key: https://aistudio.google.com/app/apikey

// Lê da configuração do Expo (app.config.js)
const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || '';

// Debug: Mostra informações sobre a API key (sem expor a chave completa)
if (__DEV__) {
  if (GEMINI_API_KEY) {
    console.log('🔑 Gemini API Key detectada:', GEMINI_API_KEY.substring(0, 10) + '...');
  } else {
    console.log('⚠️ Gemini API Key não configurada');
  }
}

// Inicializa o cliente Gemini (Nova API)
let ai: GoogleGenAI | null = null;

if (GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    console.log('✅ Google Gemini AI inicializado com sucesso (Nova API)');
  } catch (error) {
    console.error('❌ Erro ao inicializar Google Gemini AI:', error);
  }
}

// Exporta a instância do cliente
export const getGeminiClient = () => {
  return ai;
};

export const isGeminiConfigured = () => {
  return !!GEMINI_API_KEY && !!ai;
};

