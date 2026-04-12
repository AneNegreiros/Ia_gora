import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Configuração do Firebase
// NOTA: Substitua essas credenciais com as suas do Firebase Console
// Veja FIREBASE_SETUP.md para instruções completas
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "iagora-app.firebaseapp.com",
  projectId: "iagora-app",
  storageBucket: "iagora-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Verifica se as credenciais foram configuradas
const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

// Só inicializa Firebase se estiver configurado
if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
  }
}

export { auth, db, isFirebaseConfigured };
export default app;
