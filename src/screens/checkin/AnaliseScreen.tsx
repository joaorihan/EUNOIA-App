import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { CheckinStackParamList } from '../../types';
import { useNavigation } from '@react-navigation/native';

type AnaliseScreenNavigationProp = NativeStackNavigationProp<
  CheckinStackParamList,
  'Analise'
>;

type AnaliseScreenRouteProp = RouteProp<CheckinStackParamList, 'Analise'>;

interface Props {
  route: AnaliseScreenRouteProp;
}

export const AnaliseScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<any>();
  const { analise } = route.params;

  const handleVoltar = () => {
    // Navegar de volta para a Home (resetando o stack de check-in)
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Success Header */}
      <View style={styles.successHeader}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={64} color="#00B894" />
        </View>
        <Text style={styles.successTitle}>Check-in Concluído!</Text>
        <Text style={styles.successSubtitle}>
          Obrigado por compartilhar como você está
        </Text>
      </View>

      {/* Análise da IA */}
      <View style={styles.analysisCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="bulb" size={24} color="#6C5CE7" />
          <Text style={styles.cardTitle}>Análise Personalizada</Text>
        </View>
        <Text style={styles.analysisText}>{analise.analise}</Text>
      </View>

      {/* Sugestões */}
      <View style={styles.suggestionsSection}>
        <Text style={styles.sectionTitle}>
          🎯 Trilhas e Atividades Recomendadas
        </Text>
        <Text style={styles.sectionSubtitle}>
          Estas sugestões foram personalizadas para você
        </Text>

        <View style={styles.suggestionsList}>
          {analise.sugestoes.map((sugestao: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              activeOpacity={0.7}
            >
              <View style={styles.suggestionIcon}>
                <Ionicons name="play-circle" size={24} color="#6C5CE7" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionText}>{sugestao}</Text>
                <Text style={styles.suggestionAction}>
                  Toque para iniciar
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#B2BEC3" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Insights */}
      <View style={styles.insightCard}>
        <Ionicons name="information-circle" size={24} color="#2196F3" />
        <Text style={styles.insightText}>
          Seus dados estão sendo registrados de forma segura. Continue fazendo
          check-ins diários para acompanhar sua evolução e receber análises
          mais precisas.
        </Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionsContainer}>
        <CustomButton
          title="Voltar para Início"
          onPress={handleVoltar}
          style={styles.actionButton}
        />
        
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            // Funcionalidade de compartilhar pode ser implementada aqui
          }}
        >
          <Ionicons name="share-social" size={20} color="#6C5CE7" />
          <Text style={styles.shareText}>
            Compartilhar progresso com líder
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>+1</Text>
          <Text style={styles.statLabel}>Check-in realizado</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>🔥</Text>
          <Text style={styles.statLabel}>Mantenha o streak!</Text>
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
  successHeader: {
    alignItems: 'center',
    marginBottom: 32
  },
  successIcon: {
    marginBottom: 16
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  successSubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center'
  },
  analysisCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginLeft: 12
  },
  analysisText: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24
  },
  suggestionsSection: {
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
  suggestionsList: {
    gap: 12
  },
  suggestionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  suggestionIcon: {
    marginRight: 12
  },
  suggestionContent: {
    flex: 1
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
    marginBottom: 4
  },
  suggestionAction: {
    fontSize: 13,
    color: '#6C5CE7'
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3'
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3436',
    marginLeft: 12,
    lineHeight: 20
  },
  actionsContainer: {
    marginBottom: 24
  },
  actionButton: {
    marginBottom: 16
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DFE6E9',
    backgroundColor: '#fff'
  },
  shareText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6C5CE7',
    marginLeft: 8
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  statItem: {
    alignItems: 'center',
    flex: 1
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6C5CE7',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center'
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#DFE6E9'
  }
});


