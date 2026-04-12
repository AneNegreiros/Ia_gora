import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Calculator, Cloud, StickyNote, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import type { DisguiseType } from './ChameleonMode';

export default function ChameleonSettings() {
  const [enabled, setEnabled] = useState(false);
  const [disguiseType, setDisguiseType] = useState<DisguiseType>('calculator');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Carrega configurações salvas
    const savedEnabled = localStorage.getItem('chameleon-mode-enabled') === 'true';
    const savedType = (localStorage.getItem('chameleon-disguise-type') || 'calculator') as DisguiseType;

    setEnabled(savedEnabled);
    setDisguiseType(savedType);
  }, []);

  const handleActivate = () => {
    localStorage.setItem('chameleon-mode-enabled', 'true');
    localStorage.setItem('chameleon-disguise-type', disguiseType);
    setEnabled(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Atualiza a aparência imediatamente
    window.location.reload();
  };

  const handleDisable = () => {
    localStorage.setItem('chameleon-mode-enabled', 'false');
    setEnabled(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Restaura aparência original
    window.location.reload();
  };

  const disguises = [
    {
      type: 'calculator' as DisguiseType,
      name: 'Calculadora',
      description: 'Ícone 🔢 e nome "Calculadora"',
      icon: Calculator,
      emoji: '🔢',
      color: 'from-gray-600 to-gray-800',
    },
    {
      type: 'weather' as DisguiseType,
      name: 'Clima',
      description: 'Ícone 🌤️ e nome "Clima"',
      icon: Cloud,
      emoji: '🌤️',
      color: 'from-blue-400 to-blue-600',
    },
    {
      type: 'notes' as DisguiseType,
      name: 'Notas',
      description: 'Ícone 📝 e nome "Notas"',
      icon: StickyNote,
      emoji: '📝',
      color: 'from-yellow-400 to-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-lg mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Modo Camaleão</h1>
              <p className="text-xs text-gray-500">Proteja sua privacidade</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Info Card */}
        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 rounded-[28px] shadow-[0_15px_50px_rgba(244,114,182,0.35)] p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                O que é o Modo Camaleão?
              </h2>
              <p className="text-sm text-pink-50/90 leading-relaxed">
                O ícone e nome do app mudam para algo discreto. Ninguém vai desconfiar que é um app de proteção.
              </p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 ${
          enabled
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
            : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {enabled ? (
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-bold text-gray-900">
                  {enabled ? 'Modo Camaleão Ativo' : 'Modo Camaleão Desativado'}
                </h3>
                <p className="text-sm text-gray-500">
                  {enabled ? `Disfarçado como ${disguises.find(d => d.type === disguiseType)?.name}` : 'App aparece normalmente'}
                </p>
              </div>
            </div>
            {enabled && (
              <button
                onClick={handleDisable}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold text-sm hover:bg-red-200 transition-colors"
              >
                Desativar
              </button>
            )}
          </div>
        </div>

        {/* Disguise Selection */}
        {!enabled && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2 mb-4">
              Escolha a Aparência
            </h3>
            <div className="space-y-3">
              {disguises.map((disguise) => {
                const Icon = disguise.icon;
                const isSelected = disguiseType === disguise.type;

                return (
                  <button
                    key={disguise.type}
                    onClick={() => setDisguiseType(disguise.type)}
                    className={`w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${disguise.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative`}
                      >
                        <div className="text-3xl">{disguise.emoji}</div>
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-bold text-gray-900 mb-1">
                          {disguise.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {disguise.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!enabled ? (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <p className="text-sm text-blue-800 mb-1">
                <strong>💡 Preview:</strong>
              </p>
              <p className="text-sm text-blue-700">
                O ícone do app ficará como <strong>{disguises.find(d => d.type === disguiseType)?.emoji} {disguises.find(d => d.type === disguiseType)?.name}</strong>
              </p>
            </div>

            <button
              onClick={handleActivate}
              className="w-full bg-gradient-to-br from-pink-500 to-rose-500 text-white py-5 rounded-2xl font-bold hover:from-pink-600 hover:to-rose-600 transition-all shadow-[0_8px_30px_rgba(244,114,182,0.3)] active:scale-[0.98]"
            >
              Ativar Modo Camaleão
            </button>
          </>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
            <p className="text-green-800 font-semibold mb-2">
              ✅ Modo Camaleão está ativo!
            </p>
            <p className="text-sm text-green-700 mb-1">
              O app aparece como <strong>{disguises.find(d => d.type === disguiseType)?.emoji} {disguises.find(d => d.type === disguiseType)?.name}</strong>
            </p>
            <p className="text-xs text-green-600">
              Veja na aba do navegador
            </p>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Configurações salvas!</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
