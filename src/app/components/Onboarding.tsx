import { useState } from 'react';
import { Flower, ShieldCheck, Lock, ChevronRight, User, Download } from 'lucide-react';
import { registerUser } from '../services/auth';
import RecoverData from './RecoverData';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [fictionalName, setFictionalName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRecover, setShowRecover] = useState(false);

  if (showRecover) {
    return (
      <RecoverData
        onSuccess={onComplete}
        onCancel={() => setShowRecover(false)}
      />
    );
  }

  const handlePinInput = (value: string, isConfirm: boolean = false) => {
    const newValue = value.replace(/\D/g, '').slice(0, 4);
    if (isConfirm) {
      setConfirmPin(newValue);
    } else {
      setPin(newValue);
    }
    setError('');
  };

  const handleContinueToFictionalName = () => {
    setStep(2);
  };

  const handleContinueToPin = () => {
    if (!fictionalName || fictionalName.length < 3) {
      setError('O nome fictício deve ter pelo menos 3 caracteres');
      return;
    }
    setStep(3);
    setError('');
  };

  const handleCreatePin = async () => {
    if (pin.length !== 4) {
      setError('O PIN deve ter 4 dígitos');
      return;
    }

    if (pin !== confirmPin) {
      setError('Os PINs não conferem');
      return;
    }

    setIsLoading(true);
    setError('');

    // Registra usuário no Firebase com e-mail fantasma
    const result = await registerUser(fictionalName, pin);

    if (result.success) {
      // Salva o PIN localmente também (para acesso offline)
      localStorage.setItem('app-pin', btoa(pin));
      localStorage.setItem('app-setup-complete', 'true');
      onComplete();
    } else {
      setError(result.error || 'Erro ao criar conta');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {step === 1 ? (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Flower className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Bem-vinda ao IAgora
            </h1>

            <p className="text-lg text-pink-50/90 mb-8 leading-relaxed">
              Vamos configurar sua segurança em apenas 2 passos
            </p>

            <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 mb-8 text-left space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Proteção Total</h3>
                  <p className="text-sm text-pink-50/80">
                    Suas informações ficam apenas no seu celular, nunca em servidores
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Acesso Seguro</h3>
                  <p className="text-sm text-pink-50/80">
                    Crie um PIN de 4 dígitos para proteger suas configurações
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinueToFictionalName}
              className="w-full bg-white text-pink-600 py-5 rounded-[24px] font-bold text-lg hover:bg-pink-50 transition-all shadow-2xl flex items-center justify-center gap-2 active:scale-[0.98] mb-3"
            >
              Começar
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setShowRecover(true)}
              className="w-full bg-white/10 backdrop-blur-sm text-white py-4 rounded-[24px] font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <Download className="w-5 h-5" />
              Já tenho uma conta
            </button>
          </div>
        ) : step === 2 ? (
          <div className="animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Nome Fictício
              </h2>
              <p className="text-pink-50/90 leading-relaxed">
                Escolha um apelido para recuperar seus dados se precisar reinstalar o app
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 mb-6">
              <label className="block text-white font-semibold mb-3 text-sm">
                Seu nome fictício
              </label>
              <input
                type="text"
                value={fictionalName}
                onChange={(e) => {
                  setFictionalName(e.target.value);
                  setError('');
                }}
                className="w-full bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-white text-center text-lg font-semibold placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                placeholder="Ex: borboleta22"
                autoFocus
              />

              <div className="mt-4 bg-yellow-500/20 border border-yellow-300/30 rounded-xl px-4 py-3 text-yellow-100 text-sm">
                💡 Use algo que você se lembre facilmente, mas que não revele sua identidade
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
              className="w-full bg-white text-pink-600 py-5 rounded-[24px] font-bold text-lg hover:bg-pink-50 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Continuar
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 text-white/80 py-3 font-medium hover:text-white transition-colors"
            >
              Voltar
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">
                Crie seu PIN
              </h2>
              <p className="text-pink-50/90">
                Este PIN protegerá suas informações sensíveis
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[28px] p-8 mb-6">
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 text-sm">
                  Digite seu PIN (4 dígitos)
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value)}
                  className="w-full bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-white text-center text-2xl font-bold tracking-[0.5em] placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="••••"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3 text-sm">
                  Confirme seu PIN
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={confirmPin}
                  onChange={(e) => handlePinInput(e.target.value, true)}
                  className="w-full bg-white/20 border-2 border-white/30 rounded-2xl px-6 py-4 text-white text-center text-2xl font-bold tracking-[0.5em] placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  placeholder="••••"
                  disabled={pin.length !== 4}
                />
              </div>

              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-300/30 rounded-xl px-4 py-3 text-white text-sm text-center">
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handleCreatePin}
              disabled={pin.length !== 4 || confirmPin.length !== 4 || isLoading}
              className="w-full bg-white text-pink-600 py-5 rounded-[24px] font-bold text-lg hover:bg-pink-50 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? 'Criando conta...' : 'Concluir Configuração'}
            </button>

            <button
              onClick={() => setStep(2)}
              disabled={isLoading}
              className="w-full mt-3 text-white/80 py-3 font-medium hover:text-white transition-colors disabled:opacity-50"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
