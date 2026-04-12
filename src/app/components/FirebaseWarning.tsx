import { AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isFirebaseConfigured } from '../services/firebase';

export default function FirebaseWarning() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Verifica se já foi dispensado nesta sessão
    const dismissed = sessionStorage.getItem('firebase-warning-dismissed');
    if (!isFirebaseConfigured && !dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('firebase-warning-dismissed', 'true');
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  
}
