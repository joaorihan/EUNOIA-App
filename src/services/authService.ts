import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types';

export const authService = {
  // Registrar novo usuá˜rio
  async register(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Criar documento do usuário no Firestore
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        name,
        currentStreak: 0,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      return userData;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta');
    }
  },

  // Login
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Buscar dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
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
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao sair');
    }
  },

  // Obter usuário atual
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },

  // Buscar dados do usuário do Firestore
  async getUserData(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
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


