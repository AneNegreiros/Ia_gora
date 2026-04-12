import { useState, ReactNode } from 'react';
import { Lock, X } from 'lucide-react';

interface PINProtectionProps {
  children: ReactNode;
  onUnlock: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export default function PINProtection({
  children,
  onUnlock,
  onCancel,
  title = 'Digite seu PIN',
  description = 'Para acessar esta área'
}: PINProtectionProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handlePinInput = (value: string) => {
    const newPin = value.replace(/\D/g, '').slice(0, 4);
    setPin(newPin);
    setError('');

    // Verifica automaticamente quando digitar 4 dígitos
    if (newPin.length === 4) {
      verifyPin(newPin);
    }
  };

  const verifyPin = (pinToVerify: string) => {
    const savedPin = localStorage.getItem('app-pin');
    const decodedPin = savedPin ? atob(savedPin) : '';

    if (pinToVerify === decodedPin) {
      setIsUnlocked(true);
      onUnlock();
    } else {
      setError('PIN incorreto');
      setShake(true);
      setPin('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (pin.length < 4) {
      handlePinInput(pin + digit);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl p-8 max-w-sm w-full animate-in zoom-in">
        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-500">
            {description}
          </p>
        </div>

        {/* PIN Display */}
        <div className={`mb-8 ${shake ? 'animate-shake' : ''}`}>
          <div className="flex justify-center gap-3 mb-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                  pin.length > i
                    ? 'bg-gradient-to-br from-pink-400 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                {pin.length > i ? '•' : ''}
              </div>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-3">
              {error}
            </p>
          )}
        </div>

        {/* Number Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeypadPress(String(num))}
              className="h-14 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold text-gray-900 text-lg transition-all active:scale-95"
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            onClick={() => handleKeypadPress('0')}
            className="h-14 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold text-gray-900 text-lg transition-all active:scale-95"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold text-gray-900 text-lg transition-all active:scale-95"
          >
            ⌫
          </button>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full text-gray-500 hover:text-gray-700 py-3 font-medium transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
