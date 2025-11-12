import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { CustomToast } from '../components/CustomToast';
import { authService } from '../services/authService';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type CadastroScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cadastro'>;

interface Props {
  navigation: CadastroScreenNavigationProp;
}

export const CadastroScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const validateForm = () => {
    if (!name.trim()) {
      showToast('Por favor, insira seu nome', 'error');
      return false;
    }
    if (!email.trim()) {
      showToast('Por favor, insira seu e-mail', 'error');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Por favor, insira um e-mail válido', 'error');
      return false;
    }
    if (password.length < 6) {
      showToast('A senha deve ter pelo menos 6 caracteres', 'error');
      return false;
    }
    if (password !== confirmPassword) {
      showToast('As senhas não coincidem', 'error');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await authService.register(email, password, name);
      showToast('Conta criada com sucesso!', 'success');
      setTimeout(() => {
        navigation.navigate('MainTabs');
      }, 1000);
    } catch (error: any) {
      showToast(
        error.message || 'Erro ao criar conta. Tente novamente.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ visible: true, message, type });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Junte-se à comunidade EUNOIA
          </Text>
        </View>

        <View style={styles.form}>
          <CustomInput
            label="Nome Completo"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
          />

          <CustomInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            keyboardType="email-address"
          />

          <CustomInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            secureTextEntry
          />

          <CustomInput
            label="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Digite a senha novamente"
            secureTextEntry
          />

          <CustomButton
            title="Criar Conta"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />

          <CustomButton
            title="Já tenho conta"
            onPress={() => navigation.goBack()}
            variant="outline"
            disabled={loading}
          />
        </View>
      </ScrollView>

      <CustomToast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center'
  },
  form: {
    marginBottom: 32
  },
  registerButton: {
    marginBottom: 16
  }
});


