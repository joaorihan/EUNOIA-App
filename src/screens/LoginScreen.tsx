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

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' as 'success' | 'error' | 'info'
  });

  const validateForm = () => {
    if (!email.trim()) {
      showToast('Por favor, insira seu e-mail', 'error');
      return false;
    }
    if (!password.trim()) {
      showToast('Por favor, insira sua senha', 'error');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Por favor, insira um e-mail válido', 'error');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await authService.login(email, password);
      showToast('Login realizado com sucesso!', 'success');
      setTimeout(() => {
        navigation.navigate('MainTabs');
      }, 1000);
    } catch (error: any) {
      showToast(
        error.message || 'Erro ao fazer login. Verifique suas credenciais.',
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
          <Text style={styles.logo}>🧠</Text>
          <Text style={styles.title}>EUNOIA</Text>
          <Text style={styles.subtitle}>Bem-estar para trabalhadores</Text>
        </View>

        <View style={styles.form}>
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
            placeholder="••••••••"
            secureTextEntry
          />

          <CustomButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <CustomButton
            title="Criar Conta"
            onPress={() => navigation.navigate('Cadastro')}
            variant="outline"
            disabled={loading}
          />
        </View>

        <Text style={styles.footerText}>
          Cuide do seu bem-estar emocional e mental
        </Text>
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
    marginBottom: 48
  },
  logo: {
    fontSize: 64,
    marginBottom: 16
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6C5CE7',
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
  loginButton: {
    marginBottom: 16
  },
  footerText: {
    textAlign: 'center',
    color: '#B2BEC3',
    fontSize: 14
  }
});


