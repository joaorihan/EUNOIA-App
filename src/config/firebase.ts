import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Firebase já foi inicializado automaticamente pelo google-services.json
// Não precisa de initializeApp() com React Native Firebase!

export { auth, firestore as db };
export default { auth, firestore };
