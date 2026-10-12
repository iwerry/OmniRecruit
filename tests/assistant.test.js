import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createMentorPrompt,
  createVisualReviewPrompt,
  extractAssistantText,
  getSpeechLanguage,
} from '../src/lib/assistant.js';

test('extracts string and nested Puter response content', () => {
  assert.equal(extractAssistantText('  resposta  '), 'resposta');
  assert.equal(extractAssistantText({ message: { content: 'resposta aninhada' } }), 'resposta aninhada');
  assert.equal(extractAssistantText({ text: 'texto simples' }), 'texto simples');
});

test('extracts text blocks and returns a safe fallback', () => {
  assert.equal(extractAssistantText({ content: [{ text: 'Olá' }, { text: 'mundo' }] }), 'Olá\nmundo');
  assert.match(extractAssistantText(null), /Não consegui interpretar/);
});

test('maps supported interview languages to speech synthesis locales', () => {
  assert.equal(getSpeechLanguage('Português (Brasil)'), 'pt-BR');
  assert.equal(getSpeechLanguage('English (US)'), 'en-US');
  assert.equal(getSpeechLanguage('Español (España)'), 'es-ES');
  assert.equal(getSpeechLanguage('Français'), 'fr-FR');
  assert.equal(getSpeechLanguage('Italiano'), 'it-IT');
});

test('mentor and visual prompts include safety boundaries', () => {
  assert.match(createMentorPrompt('English (US)'), /English \(US\)/);
  assert.match(createMentorPrompt(), /Nunca invente métricas/);
  assert.match(createVisualReviewPrompt(), /Não infira identidade/);
});
