import { useState, useEffect } from 'react';
import { CheckCircle, X, ArrowDown, Hand } from 'lucide-react';
import { useSecretGesture } from '../hooks/useSecretGesture';
import Calculator from './disguises/Calculator';
import Weather from './disguises/Weather';
import PDFReader from './disguises/PDFReader';
import type { DisguiseType } from './ChameleonMode';

interface TestGestureProps {
  disguiseType: DisguiseType;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TestGesture({ disguiseType, onSuccess, onCancel }: TestGestureProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useSecretGesture(() => {
    setIsUnlocked(true);
    setAttempts(prev => prev + 1);
  });

  useEffect(() => {
    // Esconde a dica após 8 segundos
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const renderDisguise = () => {
    switch (disguiseType) {
      case 'calculator':
        return <Calculator />;
      case 'weather':
        return <Weather />;
      case 'pdf':
        return <PDFReader />;
      default:
        return null;
    }
  };

  const getDisguiseName = () => {
    switch (disguiseType) {
      case 'calculator':
        return 'Calculadora';
      case 'weather':
        return 'Previsão do Tempo';
      case 'pdf':
        return 'Leitor de PDF';
      default:
        return '';
    }
  };

  if (isUnlocked) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 flex items-center justify-center p-6 z-50 animate-in fade-in">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-10 text-center animate-in zoom-in">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perfeito! 🎉
          </h2>

          <p className="text-lg text-gray-600 mb-3">
            Você desbloqueou o disfarce com sucesso!
          </p>

          <p className="text-sm text-gray-500 mb-8">
            Agora você sabe como acessar o app verdadeiro quando precisar.
          </p>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 mb-8">
            <p className="text-sm text-green-800 font-semibold mb-2">
              ✅ Gesto secreto confirmado
            </p>
            <p className="text-xs text-green-700">
              Tentativas até acertar: <strong>{attempts}</strong>
            </p>
          </div>

          <button
            onClick={onSuccess}
            className="w-full bg-gradient-to-br from-green-500 to-emerald-500 text-white py-5 rounded-[24px] font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-xl active:scale-[0.98] mb-3"
          >
            Ativar Modo Camaleão
          </button>

          <button
            onClick={onCancel}
            className="w-full text-gray-500 hover:text-gray-700 py-3 font-medium transition-colors"
          >
            Cancelar e voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Overlay de Teste */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 pointer-events-none" />

      {/* Disfarce */}
      <div className="relative z-30">
        {renderDisguise()}
      </div>

      {/* Banner de Teste */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-lg mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[24px] shadow-2xl p-6 animate-in slide-in-from-top-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <Hand className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Modo Teste</h3>
                <p className="text-sm text-blue-100">Pratique o gesto secreto</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <p className="text-white text-sm mb-3">
              <strong>Disfarce atual:</strong> {getDisguiseName()}
            </p>
            <p className="text-blue-100 text-sm">
              Tente desbloquear usando o gesto secreto para confirmar que você sabe como fazer.
            </p>
          </div>

          {showHint && (
            <div className="bg-yellow-400/20 border border-yellow-300/30 rounded-xl p-4 animate-in fade-in">
              <p className="text-yellow-100 text-sm font-semibold mb-2">
                💡 Como desbloquear:
              </p>
              <div className="space-y-2 text-sm text-yellow-50">
                <div className="flex items-start gap-2">
                  <ArrowDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Arraste do topo para baixo <strong>2 vezes rapidamente</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <Hand className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>OU</strong> segure qualquer lugar por <strong>3 segundos</strong></span>
                </div>
                <div className="flex items-start gap-2 text-xs opacity-75">
                  <span>💻 Desktop: Shift + Clique por 3 segundos</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contador de tentativas */}
      {attempts > 0 && !isUnlocked && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2">
          <div className="bg-white rounded-full px-5 py-2 shadow-xl border border-gray-200">
            <p className="text-sm text-gray-700">
              Tentativas: <strong className="text-blue-600">{attempts}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
