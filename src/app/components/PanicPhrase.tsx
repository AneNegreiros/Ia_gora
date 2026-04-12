import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Mic,
  Check,
  AlertCircle,
  User,
  MapPin,
  Video,
  Volume2,
  Flower,
  Settings,
  CheckCircle,
  Plus,
} from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship?: string;
}

export default function PanicPhrase() {
  const [panicPhrase, setPanicPhrase] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isPanicActivated, setIsPanicActivated] = useState(false);
  const [activationStep, setActivationStep] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    // Carrega os contatos de emergência do localStorage
    const loadContacts = () => {
      const saved = localStorage.getItem('emergency-contacts');
      if (saved) {
        setEmergencyContacts(JSON.parse(saved));
      }
    };
    loadContacts();

    // Recarrega contatos quando a página ganha foco (usuário volta de outra página)
    const handleFocus = () => loadContacts();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleStartListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setPanicPhrase("Vou ligar para minha mãe");
      setIsListening(false);
    }, 2000);
  };

  const handleActivate = () => {
    if (panicPhrase && emergencyContacts.length > 0) {
      setIsActivated(true);
    }
  };

  const handleTestPanicPhrase = () => {
    setIsPanicActivated(true);
    setActivationStep(0);

    const steps = [
      { delay: 1000, step: 1 },
      { delay: 2500, step: 2 },
      { delay: 4000, step: 3 },
      { delay: 5500, step: 4 },
    ];

    steps.forEach(({ delay, step }) => {
      setTimeout(() => {
        setActivationStep(step);
      }, delay);
    });

    setTimeout(() => {
      setIsPanicActivated(false);
      setActivationStep(0);
    }, 7000);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Panic Phrase Activation Modal */}
      {isPanicActivated && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-10 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-[0_10px_30px_rgba(251,191,36,0.4)]">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Frase de Pânico Detectada
              </h2>
              <p className="text-sm text-gray-500">"{panicPhrase}"</p>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  activationStep >= 1
                    ? "bg-green-50 border-2 border-green-400 shadow-sm"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {activationStep >= 1 ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-gray-700" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Ativando gravação de vídeo
                    </span>
                  </div>
                  {activationStep >= 1 && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      Gravação iniciada
                    </p>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  activationStep >= 2
                    ? "bg-green-50 border-2 border-green-400 shadow-sm"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {activationStep >= 2 ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gray-700" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Ativando gravação de áudio
                    </span>
                  </div>
                  {activationStep >= 2 && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      Gravação iniciada
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  activationStep >= 3
                    ? "bg-green-50 border-2 border-green-400 shadow-sm"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {activationStep >= 3 ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Localização compartilhada
                    </span>
                  </div>
                  {activationStep >= 3 && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      Enviando para contatos
                    </p>
                  )}
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${
                  activationStep >= 4
                    ? "bg-green-50 border-2 border-green-400 shadow-sm"
                    : "bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {activationStep >= 4 ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0"></div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-700" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Alertando contatos de emergência
                    </span>
                  </div>
                  {activationStep >= 4 && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      {emergencyContacts.length} contatos notificados
                    </p>
                  )}
                </div>
              </div>
            </div>

            {activationStep >= 4 && (
              <div className="mt-6 p-5 bg-green-50 rounded-2xl text-center border-2 border-green-400">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <p className="font-bold text-green-900 text-lg">
                  Sistema de Proteção Ativado
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Ajuda está a caminho
                </p>
              </div>
            )}

            <button
              onClick={() => setIsPanicActivated(false)}
              className="w-full mt-6 text-sm text-gray-400 hover:text-gray-600 font-medium"
            >
              Fechar demonstração
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-5 flex items-center gap-4">
          <Link to="/" className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900">Frase de Pânico</h1>
            <p className="text-xs text-gray-500">Configure seu alerta secreto</p>
          </div>
          {isActivated && (
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-green-700">Ativo</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 mb-3 text-lg">
                Como Funciona
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Configure uma frase comum do seu dia a dia. Quando você disser essa frase em voz alta, o celular irá automaticamente:
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Gravar áudio e vídeo discretamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Enviar sua localização em tempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Alertar seus contatos de emergência</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span>Notificar as autoridades, se configurado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Panic Phrase Setup */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
          <h3 className="font-bold text-gray-900 mb-6 text-lg">
            Configure sua Frase Secreta
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Frase de Pânico
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={panicPhrase}
                  onChange={(e) => setPanicPhrase(e.target.value)}
                  placeholder="Ex: Vou ligar para minha mãe"
                  className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-sm text-sm"
                />
                <button
                  onClick={handleStartListening}
                  disabled={isListening}
                  className={`p-3.5 rounded-2xl transition-all shadow-sm ${
                    isListening
                      ? "bg-yellow-500 text-white shadow-[0_4px_12px_rgba(251,191,36,0.3)]"
                      : "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  }`}
                >
                  <Mic
                    className={`w-6 h-6 ${isListening ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
              {isListening && (
                <p className="text-xs text-yellow-600 mt-3 flex items-center gap-2 font-medium">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  Ouvindo... diga sua frase agora
                </p>
              )}
              <p className="text-xs text-gray-500 mt-3">
                💡 Escolha uma frase natural que você usaria no dia a dia
              </p>
            </div>

            {/* Example Phrases */}
            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-100">
              <p className="text-xs font-semibold text-yellow-900 mb-3">
                Exemplos de frases discretas:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Vou ligar para minha mãe",
                  "Preciso comprar pão",
                  "Está tarde já",
                  "Esqueci minha bolsa",
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setPanicPhrase(example)}
                    className="text-xs bg-white px-4 py-2 rounded-full text-yellow-700 font-medium hover:bg-yellow-100 transition-colors shadow-sm"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 text-lg">
              Contatos de Emergência
            </h3>
            <Link
              to="/emergency-contacts"
              className="text-sm text-pink-600 hover:text-pink-700 font-semibold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Gerenciar
            </Link>
          </div>

          {emergencyContacts.length > 0 ? (
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-xl flex items-center justify-center shadow-sm">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {contact.name}
                    </p>
                    <p className="text-xs text-gray-500">{contact.phone}</p>
                    {contact.relationship && (
                      <p className="text-xs text-gray-400">{contact.relationship}</p>
                    )}
                  </div>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Nenhum contato adicionado ainda
              </p>
              <Link
                to="/emergency-contacts"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white px-6 py-3 rounded-2xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Adicionar Contatos
              </Link>
            </div>
          )}
        </div>

        {/* Actions Configured */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
          <h3 className="font-bold text-gray-900 mb-6 text-lg">
            Ações Automáticas
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Gravação de vídeo
                </span>
              </div>
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Gravação de áudio
                </span>
              </div>
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Compartilhar localização
                </span>
              </div>
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Flower className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-gray-700 font-medium">
                  Notificar autoridades
                </span>
              </div>
              <button className="text-xs text-yellow-600 hover:text-yellow-700 flex items-center gap-1 font-semibold">
                <Settings className="w-3.5 h-3.5" />
                Configurar
              </button>
            </div>
          </div>
        </div>

        {/* Activate Button */}
        <button
          onClick={handleActivate}
          disabled={!panicPhrase || emergencyContacts.length === 0 || isActivated}
          className={`w-full py-5 rounded-[24px] font-bold transition-all text-base ${
            isActivated
              ? "bg-green-600 text-white shadow-[0_8px_30px_rgba(34,197,94,0.3)]"
              : panicPhrase && emergencyContacts.length > 0
              ? "bg-gradient-to-br from-yellow-500 to-pink-500 text-white hover:shadow-[0_12px_40px_rgba(251,191,36,0.4)]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isActivated ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              Frase de Pânico Ativada
            </span>
          ) : (
            "Ativar Frase de Pânico"
          )}
        </button>

        {isActivated && (
          <button
            onClick={handleTestPanicPhrase}
            className="w-full py-4 rounded-[24px] font-semibold bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
          >
            🧪 Testar Frase de Pânico (Demonstração)
          </button>
        )}

        {!panicPhrase && (
          <p className="text-xs text-center text-gray-400 mt-4">
            Configure uma frase e adicione pelo menos um contato para ativar
          </p>
        )}

        {/* Privacy Note */}
        <div className="bg-yellow-50 rounded-[24px] p-6 text-center border border-yellow-100">
          <Flower className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
          <p className="text-xs text-yellow-900 leading-relaxed">
            <strong className="font-bold">Privacidade garantida:</strong> As
            gravações são criptografadas e só são enviadas quando a frase é
            ativada. Você tem controle total sobre seus dados.
          </p>
        </div>
      </main>
    </div>
  );
}
