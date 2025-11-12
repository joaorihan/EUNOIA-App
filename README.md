
# 🚀 EUNOIA

## 📋 Informações do Projeto

**Nome do Projeto:** EUNOIA  
**Tipo:** Aplicação Mobile  
**Tecnologia:** React Native + Expo + TypeScript  

## 👥 Integrantes da Equipe

| Nome | RM |
|------|-----|
| Rodrigo Fernandes Serafim | RM550816 |
| João Antonio Rihan | RM99656 |
| Letícia Resina | RM98069 |


## 📝 Descrição do Projeto

**EUNOIA** é uma aplicação mobile completa desenvolvida para promover o bem-estar dos trabalhadores através de:
- 📊 **Check-ins diários** de humor, energia e sono
- 🤖 **Análises personalizadas** por IA (simulada)
- 🎯 **Recomendações** de atividades e trilhas de melhoria
- 📈 **Acompanhamento** de progresso e métricas
- 🔥 **Gamificação** com sistema de streak

O aplicativo utiliza **React Native** para interface nativa multiplataforma, **Firebase** para autenticação e armazenamento de dados, e uma **simulação de IA** local para análises emocionais personalizadas.

## 🛠️ Tecnologias Utilizadas

### Core
- **React Native 0.79** - Framework para desenvolvimento mobile
- **Expo ~53.0** - Plataforma para desenvolvimento React Native
- **TypeScript ~5.8** - Linguagem de programação tipada
- **React 19.0** - Biblioteca JavaScript para UI

### Navegação
- **React Navigation 7.x** - Sistema de navegação
- **@react-navigation/native-stack** - Stack Navigator
- **@react-navigation/bottom-tabs** - Tab Navigator
- **@react-navigation/stack** - Stack Navigator avançado

### Backend & Dados
- **Firebase 10.7** - Backend como serviço
  - Authentication (Email/Password)
  - Firestore Database (NoSQL)
- **Axios** - Cliente HTTP para APIs

### UI/UX
- **Expo Vector Icons** - Biblioteca de ícones
- **React Native Gesture Handler** - Gestos nativos
- **React Native Safe Area Context** - Áreas seguras
- **React Native Screens** - Otimização de navegação

### Desenvolvimento
- **Jest** - Framework de testes
- **Babel** - Transpilador JavaScript

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Git**

### ⚙️ Configuração Rápida

#### 1. Clone e Instale
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd EUNOIA-App

# Instale as dependências
npm install
```

#### 2. Configure o Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative **Authentication** (Email/Password)
4. Crie um **Firestore Database** (modo de teste)
5. Obtenha as credenciais em **Project Settings**
6. Atualize `src/config/firebase.ts` com suas credenciais

**Para instruções detalhadas, consulte [SETUP.md](./SETUP.md)**

#### 3. Execute o Projeto
```bash
# Inicia o servidor de desenvolvimento
npm start

# Para executar no Android
npm run android

# Para executar no iOS
npm run ios

# Para executar na web
npm run web
```

### 📱 Testando no Dispositivo

1. Instale o **Expo Go**:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)

2. Execute `npm start`

3. Escaneie o QR Code com o Expo Go (Android) ou Câmera (iOS)

## 🏗️ Estrutura do Projeto

```
EUNOIA-App/
├── src/
│   ├── app/                    # Ponto de entrada (Expo Router)
│   │   └── index.tsx          # App principal
│   ├── components/             # Componentes reutilizáveis
│   │   ├── CustomButton.tsx   # Botão customizado
│   │   ├── CustomInput.tsx    # Input customizado
│   │   └── CustomToast.tsx    # Toast/notificação customizada
│   ├── config/                 # Configurações
│   │   └── firebase.ts        # Configuração do Firebase
│   ├── navigation/             # Sistema de navegação
│   │   ├── RootNavigator.tsx          # Navegador raiz
│   │   ├── MainTabsNavigator.tsx      # Tabs principais
│   │   └── CheckinStackNavigator.tsx  # Stack de check-in
│   ├── screens/                # Telas da aplicação
│   │   ├── LoginScreen.tsx            # Tela de login
│   │   ├── CadastroScreen.tsx         # Tela de cadastro
│   │   ├── HomeScreen.tsx             # Tela inicial
│   │   ├── ProgressoScreen.tsx        # Tela de progresso
│   │   └── checkin/                   # Fluxo de check-in
│   │       ├── PerguntasScreen.tsx    # Perguntas de autoavaliação
│   │       ├── FotoScreen.tsx         # Captura facial
│   │       └── AnaliseScreen.tsx      # Análise e sugestões
│   ├── services/               # Serviços e lógica de negócio
│   │   ├── authService.ts     # Serviço de autenticação
│   │   ├── moodService.ts     # Serviço de humor/check-ins
│   │   └── aiService.ts       # Simulação de IA
│   └── types/                  # Definições TypeScript
│       └── index.ts           # Tipos e interfaces
├── assets/                     # Recursos estáticos
│   └── images/                # Imagens
├── App.tsx                     # Componente raiz alternativo
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração TypeScript
├── babel.config.js            # Configuração Babel
├── README.md                  # Este arquivo
└── SETUP.md                   # Guia detalhado de configuração
```

## 📊 Status do Desenvolvimento

### ✅ Concluído

- [x] Configuração inicial do projeto
- [x] Estrutura de pastas completa
- [x] Dependências instaladas e configuradas
- [x] Sistema de autenticação (Login/Cadastro)
- [x] Navegação híbrida (Stack + Tabs)
- [x] Check-in diário completo
- [x] Integração com Firebase (Auth + Firestore)
- [x] Simulação de análise por IA
- [x] Tela de progresso e histórico
- [x] Componentes customizados (UI/UX)
- [x] Cálculo de streak e métricas
- [x] Feedback visual e notificações
- [x] Documentação completa

### 🎯 Funcionalidades Implementadas

#### Autenticação (100%)
- [x] Login com email/senha
- [x] Cadastro de novos usuários
- [x] Validação de formulários
- [x] Persistência de sessão
- [x] Logout

#### Check-in Diário (100%)
- [x] Formulário de autoavaliação (humor, energia, sono)
- [x] Campo de justificativa opcional
- [x] Simulação de captura facial
- [x] Análise personalizada por IA
- [x] Recomendações de atividades

#### Progresso e Métricas (100%)
- [x] Cálculo de streak (dias consecutivos)
- [x] Humor médio semanal
- [x] Histórico visual de check-ins
- [x] Mapa de sequência
- [x] Insights personalizados

#### UI/UX (100%)
- [x] Design moderno e responsivo
- [x] Componentes customizados
- [x] Navegação intuitiva
- [x] Feedback visual consistente
- [x] Toast customizado para notificações

## 🎯 Fluxo de Uso do Aplicativo

### 1️⃣ Primeiro Acesso
1. Abra o aplicativo
2. Clique em "Criar Conta"
3. Preencha: nome, email e senha
4. Sua conta será criada e você será autenticado automaticamente

### 2️⃣ Check-in Diário
1. Na tela inicial, visualize seu streak atual
2. Clique em "Fazer Check-in Diário"
3. Responda as perguntas sobre seu estado atual:
   - Como você está se sentindo? (humor)
   - Qual é seu nível de energia?
   - Como foi a qualidade do seu sono?
4. Adicione uma justificativa (opcional)
5. Continue para a captura facial (opcional)
6. Receba sua análise personalizada com:
   - Interpretação do seu estado atual
   - Sugestões de atividades
   - Trilhas de melhoria

### 3️⃣ Acompanhamento
1. Acesse a aba "Progresso"
2. Visualize seu humor médio da semana
3. Consulte o histórico de check-ins
4. Receba insights sobre seu progresso

## 🔐 Segurança e Privacidade

- ✅ Autenticação segura via Firebase
- ✅ Dados criptografados em trânsito
- ✅ Regras de segurança no Firestore
- ✅ Validação de dados no frontend
- ✅ Nenhum dado compartilhado com terceiros

## 🤖 Simulação de IA

A análise por IA é **simulada** localmente e não envia dados para servidores externos. O algoritmo considera:
- Nível de humor selecionado
- Energia reportada
- Qualidade do sono
- Palavras-chave na justificativa

Com base nesses dados, gera:
- Análise textual personalizada
- Recomendações de atividades
- Trilhas de melhoria
- Alertas quando necessário

## 🔗 Links Úteis

- [Documentação do React Native](https://reactnative.dev/)
- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)

## 📝 Padrões e Boas Práticas

### Código
- ✅ TypeScript para tipagem forte
- ✅ Componentes funcionais com Hooks
- ✅ Nomenclatura consistente (camelCase)
- ✅ Separação de responsabilidades
- ✅ Tratamento de erros adequado

### Arquitetura
- ✅ Modularização por funcionalidade
- ✅ Serviços isolados para lógica de negócio
- ✅ Navegação separada da lógica
- ✅ Componentes reutilizáveis
- ✅ Tipos TypeScript bem definidos

### UX/UI
- ✅ Feedback visual para todas as ações
- ✅ Loading states em operações assíncronas
- ✅ Tratamento de estados vazios
- ✅ Validação de formulários
- ✅ Mensagens de erro claras

## 🐛 Troubleshooting

### Problema: "Unable to resolve module"
**Solução:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Problema: Erro de Firebase
**Solução:**
- Verifique as credenciais em `src/config/firebase.ts`
- Certifique-se de que Authentication e Firestore estão habilitados
- Verifique as regras de segurança do Firestore

### Problema: App não conecta ao Expo Go
**Solução:**
- Certifique-se de estar na mesma rede Wi-Fi
- Execute `expo start --tunnel` se estiver em redes diferentes

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso da FIAP.
