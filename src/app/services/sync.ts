import { getCurrentUser, getUserData, updateUserData } from './auth';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship?: string;
}

/**
 * Sincroniza contatos de emergência com o Firebase
 */
export async function syncEmergencyContacts(contacts: Contact[]): Promise<boolean> {
  const user = getCurrentUser();
  if (!user) return false;

  return await updateUserData(user.uid, {
    emergencyContacts: contacts
  });
}

/**
 * Recupera contatos de emergência do Firebase
 */
export async function getEmergencyContacts(): Promise<Contact[]> {
  const user = getCurrentUser();
  if (!user) return [];

  const userData = await getUserData(user.uid);
  return userData?.emergencyContacts || [];
}

/**
 * Sincroniza configurações do modo camaleão
 */
export async function syncChameleonSettings(enabled: boolean, disguiseType: string): Promise<boolean> {
  const user = getCurrentUser();
  if (!user) return false;

  return await updateUserData(user.uid, {
    chameleonMode: { enabled, disguiseType }
  });
}

/**
 * Sincroniza frase de pânico
 */
export async function syncPanicPhrase(phrase: string): Promise<boolean> {
  const user = getCurrentUser();
  if (!user) return false;

  return await updateUserData(user.uid, {
    panicPhrase: phrase
  });
}

/**
 * Restaura todos os dados do Firebase para o localStorage
 */
export async function restoreAllDataFromFirebase(): Promise<boolean> {
  const user = getCurrentUser();
  if (!user) return false;

  try {
    const userData = await getUserData(user.uid);
    if (!userData) return false;

    // Restaura contatos
    if (userData.emergencyContacts) {
      localStorage.setItem('emergency-contacts', JSON.stringify(userData.emergencyContacts));
    }

    // Restaura modo camaleão
    if (userData.chameleonMode) {
      localStorage.setItem('chameleon-mode-enabled', String(userData.chameleonMode.enabled));
      localStorage.setItem('chameleon-disguise-type', userData.chameleonMode.disguiseType);
    }

    // Restaura frase de pânico
    if (userData.panicPhrase) {
      localStorage.setItem('panic-phrase', userData.panicPhrase);
    }

    return true;
  } catch (error) {
    console.error('Error restoring data:', error);
    return false;
  }
}

/**
 * Sincroniza todos os dados locais para o Firebase
 */
export async function syncAllDataToFirebase(): Promise<boolean> {
  const user = getCurrentUser();
  if (!user) return false;

  try {
    const contacts = localStorage.getItem('emergency-contacts');
    const chameleonEnabled = localStorage.getItem('chameleon-mode-enabled');
    const disguiseType = localStorage.getItem('chameleon-disguise-type');
    const panicPhrase = localStorage.getItem('panic-phrase');

    const dataToSync: any = {};

    if (contacts) {
      dataToSync.emergencyContacts = JSON.parse(contacts);
    }

    if (chameleonEnabled && disguiseType) {
      dataToSync.chameleonMode = {
        enabled: chameleonEnabled === 'true',
        disguiseType
      };
    }

    if (panicPhrase) {
      dataToSync.panicPhrase = panicPhrase;
    }

    return await updateUserData(user.uid, dataToSync);
  } catch (error) {
    console.error('Error syncing data:', error);
    return false;
  }
}
