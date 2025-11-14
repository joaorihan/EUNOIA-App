import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

// Configuração do Google Gemini AI
// Para obter sua API Key: https://makersuite.google.com/app/apikey

const GEMINI_API_KEY = Constants.expoConfig?.extra?.geminiApiKey || '';

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
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

export const isGeminiConfigured = () => {
  return !!GEMINI_API_KEY && !!genAI;
};

