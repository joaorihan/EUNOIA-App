import firestore from '@react-native-firebase/firestore';
import { MoodData, AIAnalysis } from '../types';

export const moodService = {
  // Salvar check-in diário
  async saveCheckIn(moodData: MoodData): Promise<string> {
    try {
      console.log('💾 [moodService] Preparando dados para salvar...');
      
      // Constrói o objeto manualmente (sem spread operator)
      const dataToSave = {
        userId: moodData.userId,
        date: firestore.Timestamp.fromDate(moodData.date),
        humor: moodData.humor,
        energia: moodData.energia,
        sono: moodData.sono,
        justificativa: moodData.justificativa || '',
        fotoStatus: moodData.fotoStatus,
        // Serializa a análise como strings simples
        analiseTexto: moodData.analise?.analise || '',
        sugestoes: moodData.analise?.sugestoes || []
      };
      
      console.log('💾 [moodService] Dados preparados:', {
        userId: dataToSave.userId,
        humor: dataToSave.humor,
        analiseSize: dataToSave.analiseTexto.length,
        sugestoesCount: dataToSave.sugestoes.length
      });
      
      console.log('💾 [moodService] Iniciando firestore().collection().add()...');
      const docRef = await firestore()
        .collection('moods')
        .add(dataToSave);
      
      console.log('💾 [moodService] Documento salvo com ID:', docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error('💾 [moodService] Erro ao salvar:', error);
      throw new Error(error.message || 'Erro ao salvar check-in');
    }
  },

  // Buscar histórico de check-ins do usuário
  async getUserMoods(userId: string, limit?: number): Promise<MoodData[]> {
    try {
      let query = firestore()
        .collection('moods')
        .where('userId', '==', userId)
        .orderBy('date', 'desc');

      if (limit) {
        query = query.limit(limit);
      }

      const querySnapshot = await query.get();
      const moods: MoodData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        moods.push({
          ...data,
          date: data.date.toDate()
        } as MoodData);
      });

      return moods;
    } catch (error: any) {
      console.error('Erro ao buscar histórico:', error);
      return [];
    }
  },

  // Calcular humor médio da semana
  async getWeeklyAverageMood(userId: string): Promise<string> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const querySnapshot = await firestore()
        .collection('moods')
        .where('userId', '==', userId)
        .where('date', '>=', firestore.Timestamp.fromDate(sevenDaysAgo))
        .orderBy('date', 'desc')
        .get();
      
      if (querySnapshot.empty) {
        return 'Sem dados suficientes';
      }

      const moodValues: { [key: string]: number } = {
        'Muito Bem': 5,
        'Bem': 4,
        'Normal': 3,
        'Cansado': 2,
        'Exausto': 1
      };

      let total = 0;
      let count = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        total += moodValues[data.humor] || 3;
        count++;
      });

      const average = total / count;

      if (average >= 4.5) return 'Muito Bem';
      if (average >= 3.5) return 'Bem';
      if (average >= 2.5) return 'Normal';
      if (average >= 1.5) return 'Cansado';
      return 'Exausto';
    } catch (error: any) {
      console.error('Erro ao calcular média semanal:', error);
      return 'Erro ao calcular';
    }
  },

  // Calcular streak (dias consecutivos de check-in)
  async calculateStreak(userId: string): Promise<number> {
    try {
      const moods = await this.getUserMoods(userId);
      
      if (moods.length === 0) return 0;

      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = 0; i < moods.length; i++) {
        const moodDate = new Date(moods[i].date);
        moodDate.setHours(0, 0, 0, 0);

        const expectedDate = new Date(today);
        expectedDate.setDate(expectedDate.getDate() - i);

        if (moodDate.getTime() === expectedDate.getTime()) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error: any) {
      console.error('Erro ao calcular streak:', error);
      return 0;
    }
  },

  // Atualizar streak do usuário
  async updateUserStreak(userId: string, streak: number): Promise<void> {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          currentStreak: streak
        });
    } catch (error: any) {
      console.error('Erro ao atualizar streak:', error);
    }
  }
};
