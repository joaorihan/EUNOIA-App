import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';
import { moodService } from '../services/moodService';
import { MoodData } from '../types';

export const ProgressoScreen: React.FC = () => {
  const [weeklyAverage, setWeeklyAverage] = useState('Carregando...');
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        // Calcular humor médio da semana
        const average = await moodService.getWeeklyAverageMood(currentUser.uid);
        setWeeklyAverage(average);

        // Buscar histórico recente
        const history = await moodService.getUserMoods(currentUser.uid, 7);
        setMoodHistory(history);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProgressData();
    setRefreshing(false);
  };

  const getMoodIcon = (humor: string) => {
    switch (humor) {
      case 'Muito Bem':
        return { name: 'happy', color: '#00B894' };
      case 'Bem':
        return { name: 'happy-outline', color: '#55EFC4' };
      case 'Normal':
        return { name: 'remove-circle-outline', color: '#FDCB6E' };
      case 'Cansado':
        return { name: 'sad-outline', color: '#FFA07A' };
      case 'Exausto':
        return { name: 'sad', color: '#FF6348' };
      default:
        return { name: 'help-circle-outline', color: '#B2BEC3' };
    }
  };

  const getAverageMoodColor = (average: string) => {
    switch (average) {
      case 'Muito Bem':
        return '#00B894';
      case 'Bem':
        return '#55EFC4';
      case 'Normal':
        return '#FDCB6E';
      case 'Cansado':
        return '#FFA07A';
      case 'Exausto':
        return '#FF6348';
      default:
        return '#B2BEC3';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando progresso...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Seu Progresso</Text>
        <Text style={styles.subtitle}>
          Acompanhe sua jornada de bem-estar
        </Text>
      </View>

      {/* Weekly Average Card */}
      <View style={styles.averageCard}>
        <Text style={styles.cardTitle}>📊 Humor Médio da Semana</Text>
        <View style={styles.averageContent}>
          <View
            style={[
              styles.averageCircle,
              { backgroundColor: getAverageMoodColor(weeklyAverage) }
            ]}
          >
            <Text style={styles.averageText}>{weeklyAverage}</Text>
          </View>
        </View>
        <Text style={styles.averageSubtitle}>
          Baseado nos últimos 7 dias
        </Text>
      </View>

      {/* Mood History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>📅 Mapa de Sequência</Text>
        <Text style={styles.sectionSubtitle}>
          Últimos {moodHistory.length} check-ins
        </Text>

        {moodHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#DFE6E9" />
            <Text style={styles.emptyText}>
              Nenhum check-in ainda
            </Text>
            <Text style={styles.emptySubtext}>
              Comece fazendo seu primeiro check-in diário
            </Text>
          </View>
        ) : (
          <View style={styles.historyList}>
            {moodHistory.map((mood, index) => {
              const moodIcon = getMoodIcon(mood.humor);
              return (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyDate}>
                    <Text style={styles.historyDay}>
                      {formatDate(mood.date)}
                    </Text>
                  </View>
                  <View style={styles.historyContent}>
                    <View style={styles.historyMood}>
                      <Ionicons
                        name={moodIcon.name as any}
                        size={32}
                        color={moodIcon.color}
                      />
                      <View style={styles.historyTextContainer}>
                        <Text style={styles.historyHumor}>{mood.humor}</Text>
                        <Text style={styles.historyDetails}>
                          Energia: {mood.energia} | Sono: {mood.sono}
                        </Text>
                      </View>
                    </View>
                    {mood.justificativa && (
                      <Text style={styles.historyJustificativa} numberOfLines={2}>
                        "{mood.justificativa}"
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>

      {/* Insights Section */}
      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>💡 Insights</Text>
        <View style={styles.insightCard}>
          <Ionicons name="bulb" size={24} color="#FFD93D" />
          <Text style={styles.insightText}>
            {moodHistory.length >= 7
              ? 'Continue mantendo sua consistência! Check-ins diários ajudam a identificar padrões.'
              : 'Faça check-ins por 7 dias consecutivos para obter análises mais precisas.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  content: {
    padding: 20,
    paddingBottom: 40
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA'
  },
  loadingText: {
    fontSize: 16,
    color: '#636E72'
  },
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72'
  },
  averageCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16
  },
  averageContent: {
    alignItems: 'center',
    marginVertical: 16
  },
  averageCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  averageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  averageSubtitle: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center'
  },
  historySection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 16
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 16
  },
  emptySubtext: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8,
    textAlign: 'center'
  },
  historyList: {
    gap: 12
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  historyDate: {
    marginBottom: 12
  },
  historyDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C5CE7'
  },
  historyContent: {
    gap: 8
  },
  historyMood: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyTextContainer: {
    marginLeft: 12,
    flex: 1
  },
  historyHumor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436'
  },
  historyDetails: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 2
  },
  historyJustificativa: {
    fontSize: 14,
    color: '#636E72',
    fontStyle: 'italic',
    marginTop: 8
  },
  insightsSection: {
    marginBottom: 24
  },
  insightCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD93D'
  },
  insightText: {
    flex: 1,
    fontSize: 15,
    color: '#2D3436',
    marginLeft: 12,
    lineHeight: 22
  }
});


