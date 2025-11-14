import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';
import { authService } from '../../services/authService';
import { moodService } from '../../services/moodService';
import { aiService } from '../../services/aiService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { CheckinStackParamList } from '../../types';

type FotoScreenNavigationProp = NativeStackNavigationProp<
  CheckinStackParamList,
  'Foto'
>;

type FotoScreenRouteProp = RouteProp<CheckinStackParamList, 'Foto'>;

interface Props {
  navigation: FotoScreenNavigationProp;
  route: FotoScreenRouteProp;
}

export const FotoScreen: React.FC<Props> = ({ navigation, route }) => {
  const [fotoCaptured, setFotoCaptured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkInData = (route.params as any)?.checkInData || {};

  const handleCaptureFoto = () => {
    // Simulação de captura de foto
    setShowModal(true);
    setTimeout(() => {
      setFotoCaptured(true);
      setShowModal(false);
    }, 1500);
  };

  const handleContinuar = async () => {
    if (!fotoCaptured) {
      return;
    }

    setLoading(true);

    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        console.error('Usuário não autenticado');
        alert('Erro: Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      console.log('🔄 Iniciando análise da IA...');
      
      // Simular análise da IA
      const aiAnalysis = await aiService.fetchAIAnalysis(
        checkInData,
        'foto_simulada'
      );

      console.log('✅ Análise concluída:', aiAnalysis);
      console.log('💾 Salvando check-in no Firestore...');

      // Salvar check-in no Firestore
      await moodService.saveCheckIn({
        userId: currentUser.uid,
        date: new Date(),
        humor: checkInData.humor,
        energia: checkInData.energia,
        sono: checkInData.sono,
        justificativa: checkInData.justificativa || '',
        fotoStatus: 'Capturada',
        analise: aiAnalysis
      });

      console.log('✅ Check-in salvo com sucesso!');
      console.log('📍 Navegando para tela de análise...');

      // Navegar para tela de análise
      navigation.navigate('Analise', { analise: aiAnalysis });
    } catch (error: any) {
      console.error('❌ Erro ao processar check-in:', error);
      alert(`Erro: ${error?.message || 'Não foi possível processar o check-in'}`);
      setLoading(false);
    }
  };

  const handlePular = async () => {
    setLoading(true);

    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        console.error('Usuário não autenticado');
        alert('Erro: Usuário não autenticado. Faça login novamente.');
        setLoading(false);
        return;
      }

      console.log('🔄 Iniciando análise da IA (sem foto)...');

      // Simular análise da IA sem foto
      const aiAnalysis = await aiService.fetchAIAnalysis(
        checkInData,
        'sem_foto'
      );

      console.log('✅ Análise concluída:', aiAnalysis);
      console.log('💾 Salvando check-in no Firestore...');

      // Salvar check-in no Firestore
      await moodService.saveCheckIn({
        userId: currentUser.uid,
        date: new Date(),
        humor: checkInData.humor,
        energia: checkInData.energia,
        sono: checkInData.sono,
        justificativa: checkInData.justificativa || '',
        fotoStatus: 'Não capturada',
        analise: aiAnalysis
      });

      console.log('✅ Check-in salvo com sucesso!');
      console.log('📍 Navegando para tela de análise...');

      // Navegar para tela de análise
      navigation.navigate('Analise', { analise: aiAnalysis });
    } catch (error: any) {
      console.error('❌ Erro ao processar check-in:', error);
      alert(`Erro: ${error?.message || 'Não foi possível processar o check-in'}`);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Captura Facial</Text>
          <Text style={styles.subtitle}>
            {fotoCaptured
              ? 'Foto capturada com sucesso!'
              : 'Tire uma foto para análise adicional (opcional)'}
          </Text>
        </View>

        <View style={styles.cameraContainer}>
          {!fotoCaptured ? (
            <View style={styles.cameraPlaceholder}>
              <Ionicons name="camera" size={80} color="#DFE6E9" />
              <Text style={styles.cameraText}>
                Simulação de Câmera
              </Text>
            </View>
          ) : (
            <View style={styles.capturedIndicator}>
              <Ionicons name="checkmark-circle" size={80} color="#00B894" />
              <Text style={styles.capturedText}>
                Foto Capturada!
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={24} color="#6C5CE7" />
          <Text style={styles.infoText}>
            A análise facial ajuda a identificar sinais não verbais de estresse
            e bem-estar. Seus dados são privados e seguros.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {!fotoCaptured ? (
            <>
              <CustomButton
                title="Tirar Foto"
                onPress={handleCaptureFoto}
                disabled={loading}
                style={styles.button}
              />
              <CustomButton
                title="Pular esta Etapa"
                onPress={handlePular}
                variant="outline"
                loading={loading}
                style={styles.button}
              />
            </>
          ) : (
            <>
              <CustomButton
                title="Continuar para Análise"
                onPress={handleContinuar}
                loading={loading}
                style={styles.button}
              />
              <CustomButton
                title="Tirar Outra Foto"
                onPress={() => setFotoCaptured(false)}
                variant="secondary"
                disabled={loading}
                style={styles.button}
              />
            </>
          )}
        </View>
      </View>

      {/* Modal de Simulação */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="camera" size={48} color="#6C5CE7" />
            <Text style={styles.modalText}>
              Simulação de Captura Facial...
            </Text>
            <Text style={styles.modalSubtext}>
              Analisando expressões faciais
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  content: {
    flex: 1,
    padding: 20
  },
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24
  },
  cameraContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    borderWidth: 2,
    borderColor: '#DFE6E9',
    borderStyle: 'dashed'
  },
  cameraPlaceholder: {
    alignItems: 'center'
  },
  cameraText: {
    fontSize: 18,
    color: '#B2BEC3',
    marginTop: 16
  },
  capturedIndicator: {
    alignItems: 'center'
  },
  capturedText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00B894',
    marginTop: 16
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E8E6FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3436',
    marginLeft: 12,
    lineHeight: 20
  },
  buttonsContainer: {
    gap: 12
  },
  button: {
    marginBottom: 0
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 280
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 16
  },
  modalSubtext: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8
  }
});


