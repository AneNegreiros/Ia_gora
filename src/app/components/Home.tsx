import { Link } from "react-router";
import { MessageCircle, Mic, Users, Flower, Phone, AlertTriangle, ShieldAlert, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isCallingEmergency, setIsCallingEmergency] = useState(false);

  const handleEmergencyCall = () => {
    setIsCallingEmergency(true);
    // Simula a ligação por 5 segundos
    setTimeout(() => {
      setIsCallingEmergency(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Emergency Call Modal */}
      {isCallingEmergency && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-10 max-w-sm w-full text-center animate-in zoom-in">
            <div className="w-28 h-28 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-[0_8px_30px_rgba(244,114,182,0.4)]">
              <Phone className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Ligando para 190
            </h2>
            <p className="text-gray-500 text-lg mb-8">Polícia Militar</p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-green-50 p-4 rounded-2xl shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Chamada sendo conectada...</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700 bg-blue-50 p-4 rounded-2xl shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Localização sendo compartilhada</span>
              </div>
            </div>

            <button
              onClick={() => setIsCallingEmergency(false)}
              className="text-sm text-gray-400 hover:text-gray-600 font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-lg mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(251,191,36,0.25)]">
              <Flower className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">IAgora</h1>
              <p className="text-xs text-gray-500">Você não está sozinha</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-8 space-y-6">
        {/* Welcome Card */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Bem-vinda ao IAgora
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Este é um espaço seguro criado para você. Aqui você encontra apoio,
            orientação e ferramentas que podem ajudar em momentos difíceis.
          </p>
        </div>

        {/* Emergency Button */}
        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 rounded-[28px] shadow-[0_15px_50px_rgba(244,114,182,0.35)] p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Emergência 190
              </h3>
              <p className="text-sm text-pink-50/90">
                Ligue agora se estiver em perigo
              </p>
            </div>
          </div>
          <button 
            onClick={handleEmergencyCall}
            className="w-full bg-white text-pink-600 py-4 rounded-2xl font-bold hover:bg-pink-50 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
          >
            <Phone className="w-5 h-5" />
            Ligar Agora
          </button>
        </div>

        {/* Emergency Contacts Link */}
        <Link
          to="/emergency-contacts"
          className="block bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300 border-2 border-pink-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Contatos de Emergência
                </h3>
                <p className="text-sm text-gray-500">
                  Configure sua rede de proteção
                </p>
              </div>
            </div>
            <div className="text-pink-600 text-2xl">→</div>
          </div>
        </Link>

        {/* Modules */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
            Recursos de Proteção
          </h3>

          {/* Module 1: AI Support */}
          <Link
            to="/ai-support"
            className="block bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <MessageCircle className="w-7 h-7 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  Conversar com IA
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Assistente virtual para ouvir, acolher e orientar você com empatia
                </p>
              </div>
            </div>
          </Link>

          {/* Module 2: Panic Phrase */}
          <Link
            to="/panic-phrase"
            className="block bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mic className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  Frase de Pânico
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Frase secreta que ativa gravação e alerta contatos
                </p>
              </div>
            </div>
          </Link>

          {/* Module 3: Community */}
          <Link
            to="/community"
            className="block bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-100 via-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-7 h-7 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  Comunidade
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Espaço seguro e anônimo para compartilhar experiências
                </p>
              </div>
            </div>
          </Link>

          {/* Module 4: Chameleon Mode */}
          <Link
            to="/chameleon-settings"
            className="block bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-[24px] shadow-[0_8px_30px_rgba(251,191,36,0.3)] p-6 hover:shadow-[0_12px_40px_rgba(251,191,36,0.4)] transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <ShieldAlert className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white mb-1">
                  Modo Camaleão
                </h4>
                <p className="text-sm text-yellow-50/90 leading-relaxed">
                  Mude o ícone do app para algo discreto
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Resources */}
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 mt-8">
          <h3 className="font-bold text-gray-900 mb-6 text-lg">
            Recursos Importantes
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Central de Atendimento à Mulher
                </p>
                <p className="text-sm text-gray-500">Ligue 180 (24h)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Delegacias Especializadas
                </p>
                <p className="text-sm text-gray-500">DEAMs em todo Brasil</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Defensoria Pública
                </p>
                <p className="text-sm text-gray-500">Assistência jurídica gratuita</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  Medida Protetiva
                </p>
                <p className="text-sm text-gray-500">Lei Maria da Penha</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}