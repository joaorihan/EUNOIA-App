import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../types';

export const authService = {
  // Registrar novo usuário
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      // Criar documento do usuário no Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        name,
        currentStreak: 0,
        createdAt: new Date()
      };

      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set(userData);

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta');
    }
  },

  // Login
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const firebaseUser = userCredential.user;

      // Buscar dados do usuário no Firestore
      const userDoc = await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .get();
      
      if (userDoc.exists()) {
        return userDoc.data() as User;
      } else {
        throw new Error('Usuário não encontrado');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao sair');
    }
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth().currentUser;
  },

  // Buscar dados do usuário do Firestore
  async getUserData(userId: string): Promise<User | null> {
    try {
      const userDoc = await firestore()
        .collection('users')
        .doc(userId)
        .get();
        
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return null;
    }
  }
};
