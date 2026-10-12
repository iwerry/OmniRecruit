# PROMPT — Redesign e correções do OmniRecruit

OBJETIVO: 

## 1. PAPEL

Você é um(a) engenheiro(a) front-end sênior e designer de produto (UX/UI), com experiência em interfaces de chat com IA, animações de alta performance e acessibilidade. 
Vai trabalhar diretamente no meu repositório do GitHub. Cada push na branch principal faz deploy automático na Vercel.

## 2. CONTEXTO DO PROJETO

**OmniRecruit** é uma plataforma de "Career Intelligence": uma mentora de carreira com IA chamada **Sophia**. O site usa **Puter** (aparece "Sessão Puter ativa" na interface) 
para IA e sessão do usuário.

- Site em produção: https://omni-recruit-wheat.vercel.app/
- Repositório do projeto: https://github.com/iwerry/OmniRecruit.git
- Meu repositório de design (design system / UX-UI): https://github.com/iwerry/designerx.git (GOSTARIA QUE VOCE SEGUISSE AS REGRAS DA SKILL PRA GERAR UM MELHOR VISUAL, saindo 
deste 
IA SLOP - este site padrao criado por ai. 

- Repositório de referência técnica: https://github.com/morluto/rea.git (Se achar desnecessario nao use, e uma otima ferramenta, talvez para analisar os arquivos PDF do visual !
Seria massa! 
Queria muito a animacao da IA falando.... (Iniciando carregando, falando, ouvindo, carregando, offline) sabe parecendo que está viva!! Reagindo a medida que fala - creio que via 
programacao fique muito bom, estetica foda. 

**Anexos de referência:**
1. `BASE_Visual.pdf`: projeto de UX/UI de um assistente chamado "lüne". Mostra uma **esfera/orbe de partículas** que muda de estado (Iniciando e carregando, Falando, Ouvindo, 
Carregando, Offline), chat e voz **na mesma experiência**, em mobile, tablet e desktop.
2. Print do site atual: sidebar com Workspace (Mentoria IA, Simulador de entrevista, LinkedIn Coach, Impacto visual), conversas recentes, hero "Carreira não é acaso. 
É estratégia.", esfera central e painel de chat da Sophia à direita.
3. `chatgpt-v2.gif`: referência de **simplicidade e fluidez do compositor de mensagem** (barra de entrada, anexos, envio).
4. `puterExemplos.zip`: exemplos de uso do Puter. Use como base para as chamadas de IA, voz e armazenamento.

## 3. PROBLEMAS A RESOLVER

1. **Visual ruim.** O layout atual está pesado, desorganizado e sem hierarquia. Precisa de um redesign completo, seguindo o conceito do PDF (orbe viva + interface escura e 
elegante).
2. **Chat e áudio estão em telas separadas.** Quero **uma única tela**: o chat e a voz convivem juntos, e a orbe reflete o estado do sistema (como no PDF).
3. **Os itens do Workspace não funcionam.** Clicar em Mentoria IA, Simulador de entrevista, LinkedIn Coach e Impacto visual não faz nada.
4. **Não consigo renomear conversas.**
5. **Não consigo excluir conversas do histórico.**

## 4. COMO TRABALHAR (ordem obrigatória)

**Fase 0 — Auditoria (não altere código ainda).**
- Leia o repositório OmniRecruit inteiro e me diga: stack (framework, bundler, CSS), estrutura de pastas, como o Puter é usado, onde o estado das conversas é guardado, e por que
os 4 itens do Workspace não respondem (aponte arquivo e linha).
- Leia `designerx` e `rea` e liste o que é reaproveitável (tokens, componentes, padrões, utilitários). Se algo não for útil, diga por quê.
- Abra o `puterExemplos.zip` e liste quais exemplos serão usados (IA de texto, voz, armazenamento, etc.).
- Entregue um **plano em etapas** e espere minha confirmação antes de implementar.

**Fase 1 em diante — Implementação.** Trabalhe em etapas pequenas, uma por vez, cada uma com commit próprio e mensagem clara. Ao final de cada etapa, diga o que mudou, quais 
arquivos foram alterados e como testar.

**Regras gerais:**
- Não quebre o que já funciona (login/sessão Puter, envio de mensagens à Sophia).
- Não coloque chaves, tokens ou segredos no código ou no repositório.
- Não adicione dependências pesadas sem justificar. Prefira o que já existe no projeto.
- Se algo for ambíguo, escolha a opção mais simples e me avise em vez de travar.

## 5. DESIGN E UX/UI

**5.1 Identidade.** Use o PDF como inspiração de **conceito e estrutura**, sem copiar a marca "lüne" (nome, logo, textos). Mantenha a identidade **OmniRecruit**: fundo escuro,
acento em verde-água (teal/mint) já presente hoje. Se quiser propor um gradiente secundário (ex.: roxo suave, como no PDF), apresente como opção e não aplique sem eu aprovar. 
Extraia tokens (cores, tipografia, espaçamento, raios, sombras, motion) do `designerx` e centralize em variáveis CSS.

**5.2 Layout de tela única (desktop).**
- Sidebar esquerda enxuta: logo, "Nova conversa", Workspace (4 modos), conversas recentes, estado de privacidade e sessão do usuário. Colapsável.
- Área principal única: a **orbe** em destaque (centro ou topo) e o **chat** integrado, sem painéis duplicados e sem rolar entre duas telas.
- Quando a conversa é longa, a orbe encolhe e fixa no topo do chat (ou vira um indicador compacto), liberando espaço para as mensagens. Quando a conversa está vazia, a orbe e o
 hero ganham destaque.
- Compositor de mensagem inspirado no GIF do ChatGPT: um campo limpo, botão de anexo, botão de **microfone**, botão de enviar, e atalhos (Enter envia, Shift+Enter quebra linha).
- Sugestões rápidas (chips) por modo, por exemplo "Preparar entrevista", "Melhorar currículo", "Mapear competências".

**5.3 Mobile e tablet.** Mobile-first: sidebar vira drawer, orbe compacta, compositor fixo no rodapé respeitando a safe area do iPhone, alvos de toque de pelo menos 44px. Teste
em 360px, 768px e 1280px+.

**5.4 Orbe de estados (conceito do PDF).** Implemente a orbe como componente reutilizável com os estados:

| Estado | Quando acontece | Comportamento visual |
|---|---|---|
| `loading` | Iniciando / carregando sessão | Partículas se formando |
| `idle` | Pronta | Respiração suave, brilho constante |
| `listening` | Microfone ativo | Reage ao volume da voz do usuário |
| `thinking` | Aguardando resposta da IA | Partículas agitadas, rotação mais rápida |
| `speaking` | Sophia respondendo (texto em streaming e/ou áudio) | Pulsa no ritmo da fala |
| `offline` | Sem conexão ou erro de sessão | Partículas dispersas e apagadas |

Requisitos: canvas 2D ou WebGL leve (use CSS/SVG como fallback), 60fps em celular médio, pausa quando a aba está oculta, e respeito a `prefers-reduced-motion` (versão estática). 
Mostre também um rótulo textual do estado (ex.: "PRONTA PARA COMEÇAR", "OUVINDO", "PENSANDO") para não depender só de cor.

**5.5 Acessibilidade.** Contraste mínimo WCAG AA, foco visível, navegação 100% por teclado, `aria-label` nos botões de ícone, `aria-live="polite"` para novas mensagens, e estados
de erro e vazio bem explicados.

## 6. CHAT + VOZ UNIFICADOS

- Um único fluxo de conversa: o que o usuário fala vira texto no chat e a resposta da Sophia aparece no chat (e pode ser lida em voz alta).
- Botão de microfone no compositor: clique para começar e clique para parar (ou segurar para falar). Mostre a transcrição parcial em tempo real.
- Botão "Ouvir" em cada resposta, e uma opção global para leitura automática.
- Use primeiro o que o Puter oferecer para voz (veja `puterExemplos.zip`). Se não houver, use a **Web Speech API** (`SpeechRecognition` e `speechSynthesis`) com fallback claro 
para navegadores sem suporte (somente texto) e mensagem amigável.
- Trate permissões: microfone negado, sem dispositivo, sem rede. Nunca deixe a interface travada.
- Respostas em streaming quando possível, com botão "Parar geração".

## 7. WORKSPACE — CADA MODO DEVE FUNCIONAR

Cada item do Workspace deve (a) ficar visualmente ativo, (b) trocar o contexto da conversa, (c) ter seu próprio prompt de sistema, mensagem de boas-vindas, chips de sugestão e 
estado vazio, e (d) manter o histórico separado por modo ou por conversa, conforme a arquitetura que você propuser na auditoria.

1. **Mentoria IA (Sophia).** Mentora de carreira: estratégia, evidências e prática, sem fórmulas mágicas. Currículo, posicionamento, plano de carreira, mapeamento de competências.
2. **Simulador de entrevista.** Fluxo guiado: o usuário informa cargo, senioridade e empresa (opcional); a Sophia faz **uma pergunta por vez** (comportamental, técnica e 
situacional), avalia a resposta (método STAR, clareza, evidências, pontos fortes e melhorias) e sugere uma resposta melhor. Ao final, resumo da sessão com notas por critério. 
Permita voz nesse modo.
3. **LinkedIn Coach.** Otimização de perfil: diagnóstico, headline (3 opções), Sobre, experiências com resultados mensuráveis e seleção das até 50 competências (3 fixadas), 
usando nomes padronizados da taxonomia do LinkedIn. **Use como prompt de sistema o conteúdo do meu `SKILL.md` "linkedin-profile-optimizer"** (vou anexar), incluindo as regras: 
nunca inventar métricas, cargos ou competências, e marcar estimativas como `[confirmar]`. Os arquivos de referência dessa skill podem ser incorporados como base de conhecimento.
4. **Impacto visual.** Feedback sobre imagem profissional: foto de perfil, banner do LinkedIn, layout de currículo e portfólio. O usuário envia uma imagem, e a Sophia avalia 
enquadramento, fundo, iluminação, hierarquia visual e coerência com o posicionamento, com sugestões práticas. Verifique se o Puter permite entrada de imagem. Se não permitir, 
implemente um fallback honesto (explicar a limitação e oferecer checklist textual) em vez de simular uma análise que não aconteceu.

Cada modo precisa de: título, descrição curta, ícone, atalho de teclado opcional e indicador do modo ativo no cabeçalho do chat. Troca de modo no meio de uma conversa deve 
perguntar se o usuário quer iniciar uma nova conversa naquele modo.

## 8. HISTÓRICO DE CONVERSAS (renomear e excluir)

- **Renomear:** menu de três pontos em cada conversa (e/ou duplo clique) com edição inline. Enter salva, Esc cancela, limite de caracteres, nome vazio volta ao anterior. Gere
 um título automático a partir da primeira mensagem e permita sobrescrever.
- **Excluir:** ação com confirmação, e um aviso "Desfazer" por alguns segundos. Se a conversa excluída é a ativa, abra uma nova conversa vazia. Também ofereça "Limpar todo o 
histórico" em configurações, com confirmação mais forte.
- **Persistência:** salve as conversas de forma durável (armazenamento do Puter, se disponível; senão `localStorage`/IndexedDB) e carregue ao abrir. Cada conversa tem `id`, 
`title`, `mode`, `createdAt`, `updatedAt` e `messages`.
- Ordene por atividade recente, agrupe por "Hoje", "Últimos 7 dias" e "Anteriores", e mostre o estado vazio quando não houver conversas.
- A mensagem "Seus dados, seu controle" deve ser verdadeira: explique em uma frase onde os dados ficam e como apagá-los.

## 9. QUALIDADE E ENTREGA

**Critérios de aceite (verifique cada um e me responda com um checklist):**
- [ ] Chat e voz funcionam na mesma tela, sem navegar entre telas.
- [ ] A orbe muda corretamente entre os 6 estados e respeita `prefers-reduced-motion`.
- [ ] Os 4 modos do Workspace abrem, mudam o contexto e respondem de acordo com o seu papel.
- [ ] Renomear e excluir conversas funcionam e persistem após recarregar a página.
- [ ] Layout correto em 360px, 768px e 1280px+, sem rolagem horizontal.
- [ ] Sem erros no console, e o build passa sem warnings críticos.
- [ ] Lighthouse: Performance e Acessibilidade acima de 90 no desktop.
- [ ] Nenhum segredo no repositório, e o deploy da Vercel continua funcionando.

**Entrega final:** lista de arquivos criados e alterados, o que foi reaproveitado do `designerx` e do `rea`, como rodar localmente, como testar cada correção, limitações 
conhecidas e próximos passos sugeridos.

**Comece agora pela Fase 0 (auditoria e plano). Não implemente nada antes de eu aprovar o plano.**
