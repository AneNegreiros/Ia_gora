import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai 
from dotenv import load_dotenv

load_dotenv()
print(f"Chave API carregada: {'Sim ✅' if os.getenv('GEMINI_API_KEY') else 'NÃO ❌ Verifique o .env'}")

app = FastAPI(title="Ana - IA Acolhedora")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.getenv("GEMINI_API_KEY"), transport="rest")

instrucoes_ana = """
Você é a Ana, uma assistente virtual de um aplicativo chamado iAgora, focado em segurança feminina. 
Seja sempre muito acolhedora, empática, e use respostas curtas e humanas. Pergunte como a usuária está se sentindo.
Não use jargões técnicos. Se a usuária demonstrar estar em perigo imediato, recomende o uso do botão de pânico ou 
ligar para o 190 de forma muito sutil e cuidadosa.
"""

configuracao_seguranca = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]

modelo = genai.GenerativeModel(
    'gemini-1.5-flash-latest',
    system_instruction=instrucoes_ana,
    safety_settings=configuracao_seguranca
)

# Histórico em memória para a Ana lembrar do contexto da conversa
historico = {}

class Mensagem(BaseModel):
    texto: str
    usuario_id: str

@app.post("/chat")
async def chat(msg: Mensagem):
    uid = msg.usuario_id
    # Se for a primeira mensagem, cria um novo histórico
    if uid not in historico:
        historico[uid] = modelo.start_chat(history=[])
    
    # Envia a mensagem pro Gemini
    resposta = historico[uid].send_message(msg.texto)
    
    # Devolve pro Frontend
    return {
        "usuario_id": uid,
        "resposta": resposta.text
    }

@app.get("/health")
async def health():
    return {"status": "ok", "mensagem": "A API da Ana está no ar! 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)