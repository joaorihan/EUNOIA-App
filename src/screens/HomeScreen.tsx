import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { authService } from '../services/authService';
import { moodService } from '../services/moodService';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabsParamList, User } from '../types';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabsParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const userData = await authService.getUserData(currentUser.uid);
        setUser(userData);
        
        // Calcular streak
        const currentStreak = await moodService.calculateStreak(currentUser.uid);
        setStreak(currentStreak);
        
        // Atualizar streak no Firestore se mudou
        if (userData && currentStreak !== userData.currentStreak) {
          await moodService.updateUserStreak(currentUser.uid, currentStreak);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      // Navigation será tratada pelo contexto de autenticação
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
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
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={28} color="#6C5CE7" />
        </TouchableOpacity>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <View style={styles.streakHeader}>
          <Ionicons name="flame" size={32} color="#FF6348" />
          <Text style={styles.streakTitle}>Sequência de Check-ins</Text>
        </View>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakSubtitle}>
          {streak === 0
            ? 'Comece sua jornada hoje!'
            : streak === 1
            ? 'dia consecutivo'
            : 'dias consecutivos'}
        </Text>
      </View>

      {/* Check-in Button */}
      <View style={styles.checkinSection}>
        <Text style={styles.sectionTitle}>Registro Diário</Text>
        <Text style={styles.sectionSubtitle}>
          Como você está se sentindo hoje?
        </Text>
        <CustomButton
          title="Fazer Check-in Diário"
          onPress={() => navigation.navigate('CheckinStack')}
          style={styles.checkinButton}
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="fitness" size={24} color="#6C5CE7" />
          <Text style={styles.statLabel}>Bem-estar</Text>
          <Text style={styles.statValue}>Em análise</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="analytics" size={24} color="#00B894" />
          <Text style={styles.statLabel}>Progresso</Text>
          <Text style={styles.statValue}>Ver mais</Text>
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>💡 Dica do Dia</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            Lembre-se de fazer pausas regulares durante o trabalho. Pequenos
            intervalos podem melhorar significativamente sua produtividade e
            bem-estar.
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  greeting: {
    fontSize: 18,
    color: '#636E72'
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436'
  },
  logoutButton: {
    padding: 8
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginLeft: 12
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#6C5CE7'
  },
  streakSubtitle: {
    fontSize: 16,
    color: '#636E72'
  },
  checkinSection: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 16
  },
  checkinButton: {
    marginTop: 8
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  statLabel: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 4
  },
  tipsSection: {
    marginBottom: 24
  },
  tipCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD93D'
  },
  tipText: {
    fontSize: 15,
    color: '#2D3436',
    lineHeight: 22
  }
});


