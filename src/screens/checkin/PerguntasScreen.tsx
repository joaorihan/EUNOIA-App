import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { CustomToast } from '../../components/CustomToast';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckinStackParamList } from '../../types';

type PerguntasScreenNavigationProp = NativeStackNavigationProp<
  CheckinStackParamList,
  'Perguntas'
>;

interface Props {
  navigation: PerguntasScreenNavigationProp;
}

const HUMOR_OPTIONS = ['Muito Bem', 'Bem', 'Normal', 'Cansado', 'Exausto'];
const ENERGIA_OPTIONS = ['Alta', 'Média', 'Baixa'];
const SONO_OPTIONS = ['Muito Bom', 'Bom', 'Regular', 'Ruim', 'Muito Ruim'];

export const PerguntasScreen: React.FC<Props> = ({ navigation }) => {
  const [humor, setHumor] = useState('');
  const [energia, setEnergia] = useState('');
  const [sono, setSono] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const validateForm = () => {
    if (!humor) {
      showToast('Por favor, selecione como você está se sentindo', 'error');
      return false;
    }
    if (!energia) {
      showToast('Por favor, selecione seu nível de energia', 'error');
      return false;
    }
    if (!sono) {
      showToast('Por favor, avalie a qualidade do seu sono', 'error');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    // Passar dados para a próxima tela
    navigation.navigate('Foto', {
      checkInData: {
        humor,
        energia,
        sono,
        justificativa
      }
    } as any);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, message, type });
  };

  const renderOptionButton = (
    option: string,
    selectedValue: string,
    onSelect: (value: string) => void,
    icon?: string
  ) => {
    const isSelected = selectedValue === option;
    return (
      <TouchableOpacity
        key={option}
        style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
        onPress={() => onSelect(option)}
        activeOpacity={0.7}
      >
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color={isSelected ? '#fff' : '#6C5CE7'}
            style={styles.optionIcon}
          />
        )}
        <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Check-in Diário</Text>
        <Text style={styles.subtitle}>
          Responda algumas perguntas sobre como você está
        </Text>
      </View>

      {/* Humor */}
      <View style={styles.questionSection}>
        <Text style={styles.questionTitle}>
          <Ionicons name="happy" size={20} color="#6C5CE7" /> Como você está se
          sentindo hoje?
        </Text>
        <View style={styles.optionsGrid}>
          {HUMOR_OPTIONS.map((option) =>
            renderOptionButton(option, humor, setHumor)
          )}
        </View>
      </View>

      {/* Energia */}
      <View style={styles.questionSection}>
        <Text style={styles.questionTitle}>
          <Ionicons name="flash" size={20} color="#6C5CE7" /> Qual é o seu nível
          de energia?
        </Text>
        <View style={styles.optionsRow}>
          {ENERGIA_OPTIONS.map((option) =>
            renderOptionButton(option, energia, setEnergia)
          )}
        </View>
      </View>

      {/* Sono */}
      <View style={styles.questionSection}>
        <Text style={styles.questionTitle}>
          <Ionicons name="moon" size={20} color="#6C5CE7" /> Como foi a qualidade
          do seu sono?
        </Text>
        <View style={styles.optionsGrid}>
          {SONO_OPTIONS.map((option) =>
            renderOptionButton(option, sono, setSono)
          )}
        </View>
      </View>

      {/* Justificativa */}
      <View style={styles.questionSection}>
        <Text style={styles.questionTitle}>
          <Ionicons name="document-text" size={20} color="#6C5CE7" /> Gostaria de
          compartilhar mais alguma coisa? (Opcional)
        </Text>
        <CustomInput
          label=""
          value={justificativa}
          onChangeText={setJustificativa}
          placeholder="Ex: Tive uma semana produtiva, mas me senti pressionado por prazos..."
          multiline
          numberOfLines={4}
        />
      </View>

      <CustomButton
        title="Continuar para Foto"
        onPress={handleContinue}
        style={styles.continueButton}
      />

      <CustomToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />
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
    color: '#636E72'
  },
  questionSection: {
    marginBottom: 32
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
    lineHeight: 24
  },
  optionsGrid: {
    gap: 12
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DFE6E9',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  optionButtonSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7'
  },
  optionIcon: {
    marginRight: 8
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D3436',
    flex: 1
  },
  optionTextSelected: {
    color: '#fff'
  },
  continueButton: {
    marginTop: 16
  }
});


