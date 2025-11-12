// Tipos e interfaces do aplicativo

export interface User {
  id: string;
  email: string;
  name: string;
  currentStreak: number;
  createdAt: Date;
}

export interface MoodData {
  userId: string;
  date: Date;
  humor: string;
  energia: string;
  sono: string;
  justificativa: string;
  fotoStatus: string;
  analise?: AIAnalysis;
}

export interface AIAnalysis {
  analise: string;
  sugestoes: string[];
}

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  MainTabs: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Progresso: undefined;
  CheckinStack: undefined;
};

export type CheckinStackParamList = {
  Perguntas: undefined;
  Foto: { checkInData?: any } | undefined;
  Analise: { analise: AIAnalysis };
};

