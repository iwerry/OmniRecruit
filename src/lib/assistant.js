export function extractAssistantText(result) {
  if (typeof result === 'string') return result.trim();
  const candidates = [
    result?.message?.content,
    result?.text,
    result?.content,
    result?.message,
  ];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
    if (Array.isArray(candidate)) {
      const text = candidate
        .map((part) => (typeof part === 'string' ? part : part?.text || ''))
        .filter(Boolean)
        .join('\n')
        .trim();
      if (text) return text;
    }
  }
  return 'Não consegui interpretar a resposta da IA. Tente novamente.';
}

export function getSpeechLanguage(language = 'Português (Brasil)') {
  if (language.startsWith('English')) return 'en-US';
  if (language.startsWith('Español')) return 'es-ES';
  if (language.startsWith('Français')) return 'fr-FR';
  if (language.startsWith('Italiano')) return 'it-IT';
  return 'pt-BR';
}

export function createMentorPrompt(language = 'Português (Brasil)') {
  return [
    'Você é Sophia, mentora de carreira do OmniRecruit AI.',
    'Seja acolhedora, exigente, prática e honesta.',
    'Idioma de resposta: ' + language + '.',
    'Ajude com currículo, LinkedIn, competências e entrevistas.',
    'Nunca invente métricas, experiências, credenciais ou resultados.',
    'Diferencie fatos fornecidos pelo usuário de hipóteses e sugestões.',
    'Faça perguntas objetivas quando faltar contexto e use Markdown conciso.',
    'Não tome decisões de contratação nem classifique o valor de uma pessoa.',
  ].join(' ');
}

export function createVisualReviewPrompt() {
  return [
    'Analise somente elementos observáveis úteis para uma entrevista remota:',
    'iluminação, enquadramento, fundo, nitidez e apresentação visual do ambiente.',
    'Não infira identidade, idade, saúde, personalidade, emoção, competência ou empregabilidade.',
    'Dê sugestões práticas, respeitosas e opcionais; não avalie o valor da pessoa.',
  ].join(' ');
}
