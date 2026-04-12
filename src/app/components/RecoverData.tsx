import { useState } from 'react';
import { Download, Lock, User, ChevronLeft } from 'lucide-react';
import { loginUser } from '../services/auth';
import { restoreAllDataFromFirebase } from '../services/sync';

interface RecoverDataProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RecoverData({ onSuccess, onCancel }: RecoverDataProps) {
  const [fictionalName, setFictionalName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'name' | 'pin'>('name');

  const handleContinueToPin = () => {
    if (!fictionalName || fictionalName.length < 3) {
      setError('Digite seu nome fictício');
      return;
    }
    setStep('pin');
    setError('');
  };

  const handleRecover = async () => {
    if (pin.length !== 4) {
      setError('O PIN deve ter 4 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    // Tenta fazer login
    const result = await loginUser(fictionalName, pin);

    if (result.success) {
      // Restaura todos os dados do Firebase
      const restored = await restoreAllDataFromFirebase();

      if (restored) {
        // Salva o PIN localmente
        localStorage.setItem('app-pin', btoa(pin));
        localStorage.setItem('app-setup-complete', 'true');
        onSuccess();
      } else {
        setError('Erro ao restaurar dados. Tente novamente.');
        setIsLoading(false);
      }
    } else {
      setError(result.error || 'Nome fictício ou PIN incorretos');
      setIsLoading(false);
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
      setError('');
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {step === 'name' ? (
          <div className="animate-in fade-in">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Download className="w-12 h-12 text-white" />
              </div>

              <h1 className="text-4xl font-bold text-white mb-4">
                Recuperar Dados
              </h1>

              <p className="text-lg text-blue-50/90 leading-relaxed">
                Digite o nome fictício que você criou anteriormente
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 mb-6">
              <label className="block text-white font-semibold mb-3 text-sm">
                Nome Fictício
              </label>
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-white/60" />
                <input
                  type="text"
                  value={fictionalName}
                  onChange={(e) => {
                    setFictionalName(e.target.value);
                    setError('');
                  }}
                  className="flex-1 bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-white text-center text-lg font-semibold placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="Ex: borboleta22"
                  autoFocus
                />
              </div>

              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-300/30 rounded-xl px-4 py-3 text-white text-sm text-center">
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handleContinueToPin}
              disabled={!fictionalName}
              className="w-full bg-white text-blue-600 py-5 rounded-[24px] font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] mb-3"
            >
              Continuar
            </button>

            <button
              onClick={onCancel}
              className="w-full text-white/80 py-3 font-medium hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4">
            <button
              onClick={() => setStep('name')}
              className="mb-6 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Digite seu PIN
              </h2>
              <p className="text-blue-50/90">
                Usuário: <span className="font-semibold">{fictionalName}</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 mb-6">
              {/* PIN Display */}
              <div className="mb-8">
                <div className="flex justify-center gap-3 mb-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                        pin.length > i
                          ? 'bg-white text-blue-600 shadow-lg'
                          : 'bg-white/20 text-white/30'
                      }`}
                    >
                      {pin.length > i ? '•' : ''}
                    </div>
                  ))}
                </div>
                {error && (
                  <p className="text-red-300 text-sm text-center mt-3">
                    {error}
                  </p>
                )}
              </div>

              {/* Number Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeypadPress(String(num))}
                    className="h-14 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <div></div>
                <button
                  onClick={() => handleKeypadPress('0')}
                  className="h-14 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                >
                  0
                </button>
                <button
                  onClick={handleDelete}
                  className="h-14 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-white text-lg transition-all active:scale-95"
                >
                  ⌫
                </button>
              </div>
            </div>

            <button
              onClick={handleRecover}
              disabled={pin.length !== 4 || isLoading}
              className="w-full bg-white text-blue-600 py-5 rounded-[24px] font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Recuperando dados...
                </span>
              ) : (
                'Recuperar Meus Dados'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
