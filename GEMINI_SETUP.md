# 🤖 Configuração do Google Gemini Pro

## 📋 Visão Geral

O EUNOIA agora suporta análise por IA **real** usando o **Google Gemini Pro**! 

### Modos de Operação:

1. **Com Gemini (Recomendado)**: Análises personalizadas e contextuais geradas por IA real
2. **Sem Gemini (Fallback)**: Simulação local inteligente (funcionamento original)

---

## 🚀 Como Configurar (3 Passos)

### **Passo 1: Obter API Key do Gemini**

1. Acesse: https://makersuite.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em **"Create API Key"**
4. Copie a chave gerada (ela começa com `AIza...`)

> **💡 Dica:** O Gemini Pro tem um **tier gratuito generoso**!

---

### **Passo 2: Configurar no Projeto**

Abra o arquivo `app.json` e adicione sua API key:

```json
{
  "expo": {
    "name": "EUNOIA",
    // ... outras configurações ...
    "extra": {
      "geminiApiKey": "AIza...SUA_CHAVE_AQUI"
    }
  }
}
```

---

### **Passo 3: Reinstalar e Testar**

```bash
# Limpe o cache
rm -rf node_modules .expo
npm install

# Inicie o app
npm start
```

---

## ✅ Verificação

Quando você fizer um check-in, observe o console:

### **Com Gemini Configurado:**
```
🤖 Usando Google Gemini Pro para análise...
✅ Análise do Gemini gerada com sucesso
```

### **Sem Gemini (Fallback):**
```
ℹ️ Gemini não configurado, usando simulação local
```

---

## 🆚 Comparação: Gemini vs Simulação

### **Google Gemini Pro (IA Real)**

✅ **Vantagens:**
- Análises muito mais personalizadas e contextuais
- Entende nuances e contexto complexo
- Linguagem natural e empática
- Aprende com cada interação
- Sugestões mais criativas e específicas

❌ **Considerações:**
- Requer API key (gratuita com limites)
- Requer conexão com internet
- Pequeno delay adicional (~2-3s)

### **Simulação Local (Fallback)**

✅ **Vantagens:**
- Funciona offline
- Zero custo
- Resposta instantânea
- Privacidade total (não sai do dispositivo)

❌ **Limitações:**
- Análises mais genéricas
- Baseado em regras fixas
- Menos contextual

---

## 📊 Exemplo Comparativo

### **Input do Usuário:**
```javascript
{
  humor: "Cansado",
  energia: "Baixa", 
  sono: "Ruim",
  justificativa: "Esta semana foi muito intensa, tive que fazer horas extras
                  e sinto que não consegui descansar direito. Além disso,
                  tive alguns desentendimentos com colegas sobre prazos."
}
```

### **Resposta do Gemini Pro:**
```javascript
{
  analise: "Percebo que você está atravessando um período desafiador, com 
            sobrecarga de trabalho, sono inadequado e tensões interpessoais. 
            É crucial reconhecer esses sinais de esgotamento antes que se 
            agravem. Seu corpo está pedindo descanso urgente.",
  
  sugestoes: [
    "Priorize 7-8h de sono hoje, sem exceções - defina um alarme",
    "Converse com seu gestor sobre redistribuir tarefas urgentes",
    "Pratique a técnica 4-7-8 de respiração antes de dormir",
    "Agende uma conversa estruturada com colegas sobre expectativas",
    "Tire uma pausa de 15 min a cada 2h de trabalho amanhã"
  ]
}
```

### **Resposta da Simulação Local:**
```javascript
{
  analise: "Detectamos sinais de cansaço. É importante priorizar descanso
            e estabelecer limites saudáveis no trabalho. Sua energia está
            baixa. Considere revisar sua alimentação, hidratação e qualidade
            do sono. Qualidade de sono comprometida. O sono é fundamental
            para recuperação e performance. Situação de conflito identificada.
            A comunicação assertiva pode ajudar.",
  
  sugestoes: [
    "Trilha de Recuperação e Descanso",
    "Técnica de Relaxamento Progressivo (15 min)",
    "Reorganização de Prioridades",
    "Guia de Nutrição Energética",
    "Trilha de Higiene do Sono"
  ]
}
```

---

## 🔧 Arquitetura Técnica

### **Fluxo de Decisão:**

```
┌──────────────────────┐
│  Usuário faz check-in │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│  aiService           │
│  fetchAIAnalysis()   │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     │ Gemini    │
     │configurado?│
     └─────┬─────┘
           │
    ┌──────┴──────┐
    │             │
   SIM           NÃO
    │             │
    ↓             ↓
┌───────────┐ ┌─────────────────┐
│ Gemini    │ │  Simulação      │
│ API Call  │ │  Local          │
└─────┬─────┘ └────────┬────────┘
      │                │
      ↓                │
┌───────────┐          │
│ Sucesso?  │          │
└─────┬─────┘          │
      │                │
 ┌────┴────┐           │
SIM       NÃO          │
 │          │          │
 ↓          ↓          ↓
┌────────────────────────┐
│   Retorna Análise      │
└────────────────────────┘
```

### **Código:**

```typescript
// src/services/aiService.ts
async fetchAIAnalysis(moodData, facialData): Promise<AIAnalysis> {
  // Tenta Gemini primeiro
  if (isGeminiConfigured()) {
    try {
      const result = await geminiAIService.fetchGeminiAnalysis(moodData, facialData);
      if (result) return result; // ✅ Sucesso
    } catch (error) {
      console.warn('Erro no Gemini, usando fallback');
    }
  }
  
  // Fallback: Simulação local
  return await this.fetchSimulatedAnalysis(moodData, facialData);
}
```

---

## 🔐 Segurança e Privacidade

### **Dados Enviados ao Gemini:**
- Humor, energia, sono (categorias)
- Texto da justificativa (se fornecido)
- Status da foto (não envia a foto real)

### **Dados NÃO Enviados:**
- Nome do usuário
- Email
- Histórico anterior
- Localização
- Imagem facial real

### **Recomendações:**
- ✅ Mantenha sua API key segura
- ✅ Não comite a chave no Git
- ✅ Use variáveis de ambiente
- ✅ Informe usuários sobre o uso de IA

---

## 📝 Custos do Gemini Pro

### **Tier Gratuito:**
- **60 requisições/minuto**
- **1.500 requisições/dia**
- **1.5 milhões tokens/mês**

Para o EUNOIA, cada check-in usa ~200-300 tokens.

**Cálculo:**
- 1 check-in = ~250 tokens
- 1.5M tokens = **~6.000 check-ins/mês GRÁTIS**

💡 **Mais que suficiente para desenvolvimento e uso pessoal!**

---

## 🐛 Troubleshooting

### **Problema: "Gemini não configurado"**

**Solução:**
1. Verifique se a API key está em `app.json` > `extra` > `geminiApiKey`
2. Reinicie o servidor Expo: `npx expo start --clear`
3. Verifique se instalou as dependências: `npm install`

### **Problema: Erro 403 - API Key inválida**

**Solução:**
1. Verifique se copiou a chave completa
2. Gere uma nova chave em https://makersuite.google.com/app/apikey
3. Confirme que a API está habilitada no Google Cloud Console

### **Problema: Timeout ou erro de rede**

**Solução:**
- Verifique sua conexão com internet
- O app vai automaticamente usar a simulação local como fallback

---

## 🎯 Próximos Passos

Depois de configurar o Gemini, você pode:

1. **Testar as diferenças**: Faça check-ins e compare as análises
2. **Ajustar o prompt**: Edite `src/services/aiService.gemini.ts` para personalizar
3. **Adicionar histórico**: Enviar check-ins anteriores para contexto
4. **Implementar cache**: Cachear respostas similares
5. **Analytics**: Rastrear uso e qualidade das análises

---

## 📚 Recursos

- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Pricing do Gemini](https://ai.google.dev/pricing)
- [Best Practices](https://ai.google.dev/docs/best_practices)

---

**✅ Configuração completa! Seu EUNOIA agora usa IA de verdade!** 🚀

