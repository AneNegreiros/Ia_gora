import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';

const DOMAIN = '@iagora.app';

// Fallback: Simula Firebase usando localStorage quando não configurado
class LocalStorageAuthFallback {
  private usersKey = 'iagora-users-db';

  private getUsers(): Record<string, any> {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : {};
  }

  private saveUsers(users: Record<string, any>) {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  async register(email: string, password: string, userData: any) {
    const users = this.getUsers();

    if (users[email]) {
      throw new Error('auth/email-already-in-use');
    }

    const uid = 'local_' + Date.now();
    users[email] = {
      uid,
      password: btoa(password), // Codificação básica
      ...userData
    };

    this.saveUsers(users);
    localStorage.setItem('current-user-uid', uid);

    return { uid };
  }

  async login(email: string, password: string) {
    const users = this.getUsers();
    const user = users[email];

    if (!user || user.password !== btoa(password)) {
      throw new Error('auth/wrong-password');
    }

    localStorage.setItem('current-user-uid', user.uid);
    return { uid: user.uid };
  }

  async getUserData(uid: string) {
    const users = this.getUsers();
    const user = Object.values(users).find((u: any) => u.uid === uid);
    return user || null;
  }

  async updateUserData(uid: string, data: any) {
    const users = this.getUsers();
    const email = Object.keys(users).find(k => users[k].uid === uid);

    if (email && users[email]) {
      users[email] = { ...users[email], ...data };
      this.saveUsers(users);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('current-user-uid');
  }

  getCurrentUser() {
    return localStorage.getItem('current-user-uid');
  }
}

const localAuth = new LocalStorageAuthFallback();

interface UserData {
  fictionalName: string;
  createdAt: string;
  emergencyContacts: any[];
  panicPhrase?: string;
  chameleonMode?: {
    enabled: boolean;
    disguiseType: string;
  };
}

/**
 * Cria um e-mail fantasma a partir do nome fictício
 */
function createPhantomEmail(fictionalName: string): string {
  return `${fictionalName.toLowerCase().replace(/\s+/g, '')}${DOMAIN}`;
}

/**
 * Registra um novo usuário usando nome fictício + PIN
 * Cria um e-mail fantasma internamente
 */
export async function registerUser(
  fictionalName: string,
  pin: string
): Promise<{ success: boolean; error?: string; uid?: string }> {
  try {
    const email = createPhantomEmail(fictionalName);

    const userData: UserData = {
      fictionalName,
      createdAt: new Date().toISOString(),
      emergencyContacts: [],
    };

    // Usa Firebase se configurado, senão usa localStorage
    if (isFirebaseConfigured && auth && db) {
      // Cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, pin);
      const user = userCredential.user;

      // Salva dados iniciais no Firestore
      await setDoc(doc(db, 'users', user.uid), userData);

      // Salva localmente para referência
      localStorage.setItem('fictional-name', fictionalName);
      localStorage.setItem('user-uid', user.uid);

      return { success: true, uid: user.uid };
    } else {
      // Fallback: usa apenas localStorage
      const result = await localAuth.register(email, pin, userData);

      localStorage.setItem('fictional-name', fictionalName);
      localStorage.setItem('user-uid', result.uid);

      return { success: true, uid: result.uid };
    }
  } catch (error: any) {
    console.error('Error registering user:', error);

    if (error.message === 'auth/email-already-in-use' || error.code === 'auth/email-already-in-use') {
      return { success: false, error: 'Este nome fictício já está em uso. Escolha outro.' };
    }

    return { success: false, error: 'Erro ao criar conta. Tente novamente.' };
  }
}

/**
 * Faz login usando nome fictício + PIN
 */
export async function loginUser(
  fictionalName: string,
  pin: string
): Promise<{ success: boolean; error?: string; uid?: string }> {
  try {
    const email = createPhantomEmail(fictionalName);

    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, pin);
      const user = userCredential.user;

      // Salva localmente
      localStorage.setItem('fictional-name', fictionalName);
      localStorage.setItem('user-uid', user.uid);

      return { success: true, uid: user.uid };
    } else {
      // Fallback: usa apenas localStorage
      const result = await localAuth.login(email, pin);

      localStorage.setItem('fictional-name', fictionalName);
      localStorage.setItem('user-uid', result.uid);

      return { success: true, uid: result.uid };
    }
  } catch (error: any) {
    console.error('Error logging in:', error);

    if (error.message === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return { success: false, error: 'Nome fictício ou PIN incorretos' };
    }

    return { success: false, error: 'Erro ao fazer login. Verifique sua conexão.' };
  }
}

/**
 * Faz logout
 */
export async function logoutUser(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    localAuth.logout();
  }
  localStorage.removeItem('fictional-name');
  localStorage.removeItem('user-uid');
}

/**
 * Recupera dados do usuário do Firestore
 */
export async function getUserData(uid: string): Promise<UserData | null> {
  try {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      }
    } else {
      // Fallback: busca do localStorage
      const data = await localAuth.getUserData(uid);
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}

/**
 * Atualiza dados do usuário no Firestore
 */
export async function updateUserData(
  uid: string,
  data: Partial<UserData>
): Promise<boolean> {
  try {
    if (isFirebaseConfigured && db) {
      const docRef = doc(db, 'users', uid);
      await setDoc(docRef, data, { merge: true });
      return true;
    } else {
      // Fallback: atualiza no localStorage
      return await localAuth.updateUserData(uid, data);
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
}

/**
 * Retorna o usuário atual (se logado)
 */
export function getCurrentUser(): User | null {
  if (isFirebaseConfigured && auth) {
    return auth.currentUser;
  }
  // Fallback: simula usuário do localStorage
  const uid = localAuth.getCurrentUser();
  return uid ? ({ uid } as any) : null;
}

/**
 * Verifica se há um usuário logado
 */
export function isUserLoggedIn(): boolean {
  if (isFirebaseConfigured && auth) {
    return auth.currentUser !== null;
  }
  return localAuth.getCurrentUser() !== null;
}
