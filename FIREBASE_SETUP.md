# 🔥 Configuração do Firebase - IAgora

## Guia Rápido para Hackathon (15 minutos)

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `iagora-app` (ou qualquer nome)
4. Desabilite Google Analytics (não é necessário)
5. Clique em "Criar projeto"

### 2. Configurar Firebase Authentication

1. No menu lateral, clique em **Authentication**
2. Clique em "Começar"
3. Ative o método **E-mail/senha**:
   - Clique em "E-mail/senha"
   - Ative a primeira opção (E-mail/senha)
   - **NÃO ative** "Link de e-mail (login sem senha)"
   - Clique em "Salvar"

### 3. Configurar Cloud Firestore

1. No menu lateral, clique em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha **Modo de produção** (vamos configurar as regras depois)
4. Escolha uma localização (ex: `southamerica-east1` para São Paulo)
5. Clique em "Ativar"

### 4. Configurar Regras de Segurança do Firestore

Vá em **Firestore Database** → Aba **Regras** e substitua por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cada usuário só pode ler/escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Clique em **Publicar**

### 5. Obter Credenciais do Firebase

1. Clique no ícone de **engrenagem** ⚙️ ao lado de "Visão geral do projeto"
2. Clique em "Configurações do projeto"
3. Role até a seção "Seus aplicativos"
4. Clique no ícone **</>** (Web)
5. Dê um apelido (ex: "IAgora Web")
6. **NÃO** marque "Também configurar o Firebase Hosting"
7. Clique em "Registrar app"
8. Copie o objeto `firebaseConfig`

### 6. Adicionar Credenciais no Projeto

Abra o arquivo `src/app/services/firebase.ts` e substitua:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 7. Testar a Configuração

Execute o app e:

1. **Primeiro uso**: Crie um nome fictício (ex: `borboleta22`) e PIN (`1234`)
2. Adicione um contato de emergência
3. Você deve ver "Salvando..." e depois "Salvo" com ícone de nuvem ☁️
4. **Limpe o localStorage** no DevTools (Application → Local Storage → Clear All)
5. Recarregue a página
6. Clique em "Já tenho uma conta"
7. Digite `borboleta22` e PIN `1234`
8. Seus contatos devem ser restaurados! ✅

---

## 🎯 Como Funciona (Resumo Técnico)

### E-mail Fantasma
- Usuária escolhe: `borboleta22`
- App cria internamente: `borboleta22@iagora.app`
- Firebase Auth não valida e-mail (perfeito!)

### Fluxo de Dados

```
Usuária cria conta
    ↓
Firebase Auth: borboleta22@iagora.app + PIN
    ↓
Retorna UID único (ex: "abc123xyz")
    ↓
Firestore: Salva dados em /users/abc123xyz
    ↓
localStorage: Salva referência local
```

### Reinstalação/Recuperação

```
Usuária digita: borboleta22 + PIN
    ↓
Firebase Auth: Login com borboleta22@iagora.app
    ↓
Retorna mesmo UID: "abc123xyz"
    ↓
Firestore: Busca dados de /users/abc123xyz
    ↓
Restaura contatos, configurações, etc.
```

---

## 🔒 Segurança

- ✅ Cada usuária tem UID único e isolado
- ✅ Regras do Firestore impedem acesso cruzado
- ✅ PIN funciona como senha (4 dígitos = 10.000 combinações)
- ✅ Dados criptografados em trânsito (HTTPS)
- ✅ Nenhum dado pessoal real é coletado

---

## 🚀 Próximos Passos (Pós-Hackathon)

1. **Melhorar PIN**: Aumentar para 6 dígitos ou usar biometria
2. **Criptografia**: Encriptar dados sensíveis antes de salvar no Firestore
3. **Variáveis de ambiente**: Mover credenciais para `.env`
4. **Rate limiting**: Prevenir ataques de força bruta
5. **Backup automático**: Sincronizar automaticamente em background

---

## 📝 Estrutura de Dados no Firestore

```
/users/{uid}
  ├─ fictionalName: "borboleta22"
  ├─ createdAt: "2026-04-12T10:30:00Z"
  ├─ emergencyContacts: [
  │   {
  │     id: "1",
  │     name: "Maria Silva",
  │     phone: "(11) 98765-4321",
  │     relationship: "Amiga"
  │   }
  │ ]
  ├─ panicPhrase: "Vou ligar para minha mãe"
  └─ chameleonMode: {
      enabled: true,
      disguiseType: "calculator"
    }
```

---

## ❓ Troubleshooting

### Erro: "Firebase: Error (auth/invalid-email)"
→ Certifique-se de que o Firebase Auth está configurado para aceitar E-mail/senha

### Erro: "Missing or insufficient permissions"
→ Verifique as regras do Firestore (passo 4)

### Dados não sincronizam
→ Abra o DevTools Console e veja se há erros de rede
→ Verifique se as credenciais do Firebase estão corretas

### "Já tenho uma conta" não funciona
→ Verifique se você criou a conta com sucesso primeiro
→ Use exatamente o mesmo nome fictício e PIN

---

## 🎉 Pronto!

Agora o IAgora tem **persistência na nuvem** e **recuperação de dados**!

Perfeito para a demo da hackathon! 🏆
