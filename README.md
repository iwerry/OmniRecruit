# OmniRecruit AI — Career Intelligence

Plataforma de mentoria de carreira com IA, prática de entrevistas, orientação de perfil profissional e avaliação opcional de enquadramento para entrevistas remotas.

## Stack
- React 18 + Vite
- Tailwind CSS + CSS customizado (tema escuro DesignerX)
- Lucide React
- Puter.js para autenticação, IA e KV Store no cliente
- Web Speech API para síntese de voz
- MediaDevices API para captura consentida de câmera

## Funcionalidades da primeira versão
- Login pelo Puter.js sem senha própria do OmniRecruit.
- Conversa com a mentora Sophia e sugestões rápidas.
- Avatar holográfico animado com estados de interação.
- Síntese de voz do navegador.
- Simulador de entrevistas com cargo, empresa e idioma.
- Checklist de LinkedIn com cinco etapas.
- Modal de câmera com consentimento e captura de um quadro.
- Tentativa de salvar histórico por usuário no Puter KV.
- Layout responsivo e respeito a preferências de movimento reduzido.

## Requisitos
Node.js 20+ recomendado e npm. Para câmera, use HTTPS ou localhost e conceda permissão explicitamente.

## Desenvolvimento
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```
O build estático fica em `dist/`.

## Deploy na Vercel
1. Importe `https://github.com/iwerry/OmniRecruit` na Vercel.
2. Escolha o preset **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. O fluxo client-side do Puter não requer uma chave de IA própria no frontend.
6. Após o deploy, valide login, chat, voz, câmera e persistência com sua conta Puter.

Não coloque segredos no código cliente. Futuras APIs próprias devem manter credenciais em funções server-side.

## Integração Puter e privacidade
O SDK é carregado pelo script oficial incluído em `index.html`. O app verifica a sessão com `puter.auth.isSignedIn()`, chama `puter.auth.signIn()` e tenta obter o perfil via `puter.auth.getUser()`. O chat usa `puter.ai.chat`; a análise visual tenta `puter.ai.img2txt` quando disponível e tem fallback multimodal. Compatibilidade de assinatura/modelo deve ser validada no navegador com o SDK atual. O histórico usa KV quando a API estiver disponível.

A câmera não inicia automaticamente: é necessário abrir o módulo, consentir e ativá-la. O app envia uma captura estática, não um fluxo contínuo. A análise deve se limitar a iluminação, enquadramento, fundo e vestuário visível; não deve inferir identidade, saúde, personalidade ou empregabilidade.

O progresso do checklist é local à interface nesta versão. Seu percentual não representa uma nota oficial do LinkedIn nem garante resultado de recrutamento.

## Estrutura
```
index.html
package.json
vite.config.js
tailwind.config.js
postcss.config.js
src/
  main.jsx
  App.jsx
  lib/
    assistant.js
  components/
    ChatInterface.jsx
    HolographicAvatar.jsx
    CameraVisionModal.jsx
    LinkedInCoach.jsx
  styles/globals.css
tests/
  assistant.test.js
```

## Qualidade e validação
- Testes unitários nativos com `node --test` para resposta da IA, idiomas de voz e limites da análise visual.
- GitHub Actions executa `npm test` e `npm run build` em pushes e pull requests para `main`.
- O status do pipeline precisa ser conferido no GitHub; os commits, por si só, não significam que o build passou.

## Limitações conhecidas antes de produção
- O SDK Puter, login, chat multimodal e KV precisam de validação real no navegador com uma conta autorizada.
- O histórico de conversas é persistido quando o KV está disponível; o checklist do LinkedIn é salvo no armazenamento local do navegador.
- A aplicação é um protótipo funcional em evolução, não um sistema de recrutamento validado nem uma ferramenta de avaliação automatizada de candidatos.

## Licença
A definir pelo mantenedor.
