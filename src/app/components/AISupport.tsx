import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Send,
  Flower,
  AlertTriangle,
  Heart,
  Phone,
  FileText,
  UserCheck,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestedActions?: string[];
}

export default function AISupport() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá, eu sou a Ana, sua assistente virtual. Este é um espaço seguro e confidencial. Estou aqui para ouvir você sem julgamentos e oferecer orientação. Como você está se sentindo hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // 1. Coloca a mensagem da usuária na tela
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // 2. Manda a mensagem pro Backend Python
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texto: userMessage.text,
          usuario_id: "demo_user_123",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com a API");
      }

      const data = await response.json();

      // 3. Coloca a resposta inteligente do Gemini na tela
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.resposta,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Erro ao conectar:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, estou com um pequeno problema de conexão agora. Mas lembre-se: se estiver em perigo imediato, ligue 190.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false); // Desliga a bolinha de digitando
    }
  };
  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-pink-50/30 to-yellow-50/30">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link
            to="/"
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <h1 className="font-bold text-gray-900">Ana - IA Acolhedora</h1>
            </div>
            <p className="text-xs text-gray-500">
              Conversa privada e confidencial
            </p>
          </div>
          <Flower className="w-5 h-5 text-yellow-500" />
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-pink-50/80 backdrop-blur-sm border-l-4 border-pink-400 py-3">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-pink-600 flex-shrink-0" />
          <p className="text-pink-800">
            Em caso de perigo imediato, ligue <strong>190</strong> ou use a{" "}
            <Link to="/panic-phrase" className="underline font-semibold">
              Frase de Pânico
            </Link>
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[85%] ${message.sender === "user"
                  ? "bg-pink-500 text-white rounded-[24px] rounded-tr-md shadow-[0_8px_20px_rgba(236,72,153,0.25)]"
                  : "bg-white text-gray-900 rounded-[24px] rounded-tl-md shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                  } px-5 py-4`}
              >
                {message.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-xs font-semibold text-pink-600">
                      Ana
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>

                {message.suggestedActions && (
                  <div className="mt-4 space-y-2">
                    {message.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(action)}
                        className="block w-full text-left text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-[24px] rounded-tl-md shadow-[0_8px_20px_rgba(0,0,0,0.08)] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-gray-100/50 py-3">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-pink-50 text-pink-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-pink-100 transition-colors shadow-sm">
              <Phone className="w-3.5 h-3.5" />
              Como ligar 190
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-yellow-100 transition-colors shadow-sm">
              <FileText className="w-3.5 h-3.5" />
              Registrar BO
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-pink-50 text-pink-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-pink-100 transition-colors shadow-sm">
              <Flower className="w-3.5 h-3.5" />
              Medida Protetiva
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium whitespace-nowrap hover:bg-yellow-100 transition-colors shadow-sm">
              <UserCheck className="w-3.5 h-3.5" />
              Defensoria Pública
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/70 backdrop-blur-xl border-t border-gray-100/50 p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-sm text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-3.5 rounded-full hover:from-pink-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-[0_4px_12px_rgba(236,72,153,0.3)] disabled:shadow-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}