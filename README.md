# 🌸 IAgora - Aplicativo de Proteção para Mulheres

Aplicativo de segurança com **Modo Camaleão** e proteção em camadas para mulheres em situação de violência doméstica.

---

## 🚀 Começar Agora (2 minutos)

O app funciona **imediatamente** sem configuração adicional!

### Opção 1: Usar Apenas localStorage (Recomendado para Demo)
✅ **Pronto para usar agora**  
✅ Todos os recursos funcionam  
⚠️ Dados apenas no navegador (sem backup na nuvem)

**Como usar:**
1. Abra o app
2. Crie seu nome fictício + PIN
3. Pronto! Tudo funciona localmente

---

## 📋 Recursos Principais

### 🦎 Modo Camaleão
- App se disfarça como **Calculadora**, **Previsão do Tempo** ou **Leitor de PDF**
- Gesto secreto para revelar app verdadeiro
- 100% imperceptível

### 🔐 Proteção com PIN
- PIN de 4 dígitos protege dados sensíveis
- Bloqueio automático de áreas críticas

### ☁️ Backup na Nuvem (Opcional)
- Sistema de "e-mail fantasma"
- Recuperação após reinstalação
- Sincronização automática

### 🆘 Frase de Pânico
- Detecção de voz
- Gravação automática de áudio/vídeo
- Alerta para contatos de emergência
- Compartilhamento de localização

### 👥 Contatos de Emergência
- Rede de proteção personalizada
- Proteção por PIN

---

## 🎯 Como Funciona

### Primeira Vez
1. Abre o app → **Onboarding**
2. Escolhe **Nome Fictício** (ex: `borboleta22`)
3. Cria **PIN** de 4 dígitos
4. Adiciona **Contatos de Emergência**
5. Configura **Frase de Pânico**
6. Ativa **Modo Camaleão** (opcional)

### Uso Normal
1. Abre app → vê disfarce (se ativado)
2. Faz gesto secreto → app verdadeiro aparece
3. Navega livremente
4. Áreas sensíveis pedem PIN

### Reinstalação
1. Abre app → "Já tenho uma conta"
2. Digite nome fictício + PIN
3. Dados restaurados! ✅

---

## 🛠️ Stack Técnica

- **React** + **TypeScript**
- **Tailwind CSS** v4
- **Firebase** (Auth + Firestore)
- **React Router** v7
- **Lucide React** (ícones)
- **Vite** (build)

---

## 📁 Estrutura do Projeto

```
src/app/
├── components/          # Componentes React
│   ├── disguises/      # Disfarces (Calculadora, Clima, PDF)
│   ├── Home.tsx        # Tela inicial
│   ├── Onboarding.tsx  # Setup inicial
│   ├── EmergencyContacts.tsx
│   ├── PanicPhrase.tsx
│   └── ...
├── services/           # Lógica de backend
│   ├── firebase.ts     # Config Firebase
│   ├── auth.ts         # Autenticação
│   └── sync.ts         # Sincronização
└── hooks/              # Custom hooks
```

---

## 🎮 Como Testar

### Teste 1: Modo Camaleão
1. Vá em "Modo Camaleão"
2. Ative e escolha "Calculadora"
3. Feche e reabra o app
4. Deve aparecer como calculadora
5. **Shift + Clique por 3s** (desktop) ou arraste do topo 2x
6. App verdadeiro aparece

### Teste 2: Contatos de Emergência
1. Clique em "Contatos de Emergência"
2. Digite seu PIN
3. Adicione um contato
4. Veja indicador "Salvando..." → "Salvo ☁️" (se Firebase configurado)

### Teste 3: Frase de Pânico
1. Vá em "Frase de Pânico"
2. Configure uma frase
3. Clique em "Testar Frase"
4. Veja animação de ativação

### Teste 4: Recuperação (Se Firebase configurado)
1. DevTools → Application → Local Storage → Clear All
2. Recarregue
3. Clique "Já tenho uma conta"
4. Digite nome fictício + PIN
5. Dados devem voltar

---

## 📖 Documentação Adicional

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Configurar Firebase (15 min)
- **[IMPLEMENTACAO_COMPLETA.md](./IMPLEMENTACAO_COMPLETA.md)** - Docs técnicas
- **[DEMO_HACKATHON.md](./DEMO_HACKATHON.md)** - Roteiro de apresentação

---

## ⚠️ Avisos Importantes

### Modo Desenvolvimento (localStorage)
Quando você vê o banner amarelo:
> "Firebase não configurado. Os dados estão salvos apenas localmente."

Isso significa:
- ✅ Tudo funciona normalmente
- ✅ Dados salvos no navegador
- ⚠️ Sem backup na nuvem
- ⚠️ Perda de dados se limpar navegador

### Para Produção
- Configure Firebase (veja FIREBASE_SETUP.md)
- Use variáveis de ambiente para chaves
- Implemente criptografia E2E
- Adicione detecção de voz real
- Configure envio de SMS/WhatsApp

---

## 🏆 Desenvolvido para Hackathon

Este é um **protótipo funcional** desenvolvido em 48h para demonstrar o conceito.

**Diferenciais:**
- Sistema de "e-mail fantasma" (sem coletar dados pessoais)
- Modo Camaleão (disfarce de app)
- Backup na nuvem opcional
- Funciona 100% offline

---

## 🤝 Contribuindo

Este projeto foi criado para **salvar vidas**. Contribuições são bem-vindas!

**Áreas que precisam de ajuda:**
- Detecção de voz real (API de Speech Recognition)
- Integração com Twilio (SMS)
- Criptografia E2E
- Testes automatizados
- Acessibilidade

---

## 📞 Recursos de Ajuda

- **Central de Atendimento à Mulher**: 180 (24h)
- **Polícia Militar**: 190
- **DEAM**: Delegacias Especializadas de Atendimento à Mulher

---

## 📄 Licença

MIT License - Use para o bem! 💜

---

**"Tecnologia que protege vidas"** 🌸
