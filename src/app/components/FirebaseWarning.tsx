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

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 animate-in slide-in-from-bottom-4">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm">
            <p className="font-bold text-yellow-900 mb-1">
              Modo de Desenvolvimento
            </p>
            <p className="text-yellow-800 leading-relaxed">
              Firebase não configurado. Os dados estão salvos apenas localmente.
              Para backup na nuvem, veja <strong>FIREBASE_SETUP.md</strong>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="w-6 h-6 rounded-full hover:bg-yellow-200 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <X className="w-4 h-4 text-yellow-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
