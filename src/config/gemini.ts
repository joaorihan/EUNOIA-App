import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';
import { GEMINI_API_KEY as ENV_GEMINI_KEY } from '@env';

// Configuração do Google Gemini AI
// Para obter sua API Key: https://makersuite.google.com/app/apikey

// Prioriza .env, depois app.config.js
const GEMINI_API_KEY = ENV_GEMINI_KEY || Constants.expoConfig?.extra?.geminiApiKey || '';

// Inicializa o cliente Gemini
let genAI: GoogleGenerativeAI | null = null;

if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// Exporta a instância do modelo
export const getGeminiModel = () => {
  if (!genAI) {
    return null;
  }
  // Usando gemini-1.5-flash (gratuito e rápido)
  // Alternativa: 'gemini-1.5-pro' (mais poderoso, mas pode ter limites)
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
};

export const isGeminiConfigured = () => {
  return !!GEMINI_API_KEY && !!genAI;
};

