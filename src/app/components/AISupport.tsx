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
// Importando sua camada de serviço de IA
import { sendMessageToAI } from "../services/aiService";

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

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Chamando a sua nova camada de serviço
      const aiData = await sendMessageToAI(userMessage.text);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiData.response,
        sender: "ai",
        timestamp: new Date(),
        suggestedActions: aiData.suggestedActions,
      };

      setMessages((prev: Message[]) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro ao conectar com IA:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Desculpe, tive um problema de conexão. Se estiver em perigo, ligue 190.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
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
          <Link to="/" className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <h1 className="font-bold text-gray-900">Ana - IA Acolhedora</h1>
            </div>
            <p className="text-xs text-gray-500">Conversa privada e confidencial</p>
          </div>
          <Flower className="w-5 h-5 text-yellow-500" />
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-pink-50/80 backdrop-blur-sm border-l-4 border-pink-400 py-3">
        <div className="max-w-4xl mx-auto px-6 flex items-center gap-2 text-sm">
          <AlertTriangle className="w-4 h-4 text-pink-600 flex-shrink-0" />
          <p className="text-pink-800">
            Em caso de perigo imediato, ligue <strong>190</strong>
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${message.sender === "user" ? "bg-pink-500 text-white rounded-[24px] rounded-tr-md" : "bg-white text-gray-900 rounded-[24px] rounded-tl-md"} px-5 py-4`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                {message.suggestedActions && (
                  <div className="mt-4 space-y-2">
                    {message.suggestedActions.map((action, idx) => (
                      <button key={idx} onClick={() => handleSuggestionClick(action)} className="block w-full text-left text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-medium px-4 py-2.5 rounded-xl transition-colors">
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-xs text-gray-400 p-4">Ana está digitando...</div>}
          <div ref={messagesEndRef} />
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
            className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm text-sm"
          />
          <button onClick={handleSend} className="bg-pink-500 text-white p-3.5 rounded-full hover:bg-pink-600 transition-all">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}