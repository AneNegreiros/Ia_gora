import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// A chave é acessada aqui, isolada do componente de UI
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: `Você é a Ana, uma assistente virtual de um aplicativo chamado iAgora, focado em segurança feminina. 
Seja sempre muito acolhedora, empática, e use respostas curtas e humanas. Pergunte como a usuária está se sentindo.
Não use jargões técnicos. Se a usuária demonstrar estar em perigo imediato, recomende o uso do botão de pânico ou 
ligar para o 190 de forma muito sutil e cuidadosa.`,
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        response: { type: SchemaType.STRING },
        suggestedActions: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
      },
      required: ["response", "suggestedActions"],
    },
  },
});

// Mantemos o chat na memória apenas durante a sessão
let chat: any = null;

export const sendMessageToAI = async (message: string, history: any[] = []) => {
  if (!chat) {
    chat = model.startChat({ history });
  }
  
  const result = await chat.sendMessage(message);
  return JSON.parse(result.response.text());
};