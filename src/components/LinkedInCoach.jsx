import { useEffect, useState } from 'react';
import { ArrowRight, Check, Circle, Linkedin, Target } from 'lucide-react';

const steps = [
  { title: 'Título profissional', hint: 'Cargo-alvo + especialidade + valor que você entrega.', prompt: 'Ajude-me a escrever um título do LinkedIn para meu cargo-alvo. Faça perguntas antes de sugerir versões.' },
  { title: 'Sobre', hint: 'Resumo claro, evidências, especialidades e direção de carreira.', prompt: 'Vamos construir a seção Sobre do meu LinkedIn com foco em evidências, clareza e palavras-chave.' },
  { title: 'Experiência com impacto', hint: 'Contexto, ação e resultado; use métricas reais, sem inventá-las.', prompt: 'Ajude-me a reescrever uma experiência usando contexto, ação e resultado. Pergunte quais métricas são reais.' },
  { title: 'Competências e palavras-chave', hint: 'Competências relevantes para vagas específicas.', prompt: 'Ajude-me a mapear competências e palavras-chave de LinkedIn a partir de uma vaga-alvo.' },
  { title: 'Revisão final', hint: 'Consistência, legibilidade, evidências e alinhamento à vaga.', prompt: 'Faça uma auditoria qualitativa do meu perfil do LinkedIn com base no texto que vou fornecer.' },
];

export default function LinkedInCoach({ onStart }) {
  const [done, setDone] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('omni-recruit:linkedin-checklist') || '[]');
      return Array.isArray(saved) ? saved.filter((index) => Number.isInteger(index) && index >= 0 && index < steps.length) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem('omni-recruit:linkedin-checklist', JSON.stringify(done));
    } catch {
      // The checklist remains usable when browser storage is disabled.
    }
  }, [done]);
  const progress = Math.round(done.length / steps.length * 100);
  return <section className="coach-panel">
    <div className="section-heading"><div className="feature-icon linkedin-icon"><Linkedin size={19}/></div><div><h2>LinkedIn Coach</h2><p className="muted">Um perfil mais claro, relevante e encontrável.</p></div></div>
    <div className="progress-line"><span style={{ width: progress + '%' }}/></div>
    <div className="progress-caption"><span>{done.length} de {steps.length} etapas</span><strong>{progress}% concluído</strong></div>
    <div className="coach-steps">{steps.map((step, i) => <article className="coach-step" key={step.title}>
      <button className="step-check" aria-label={done.includes(i) ? 'Marcar como pendente' : 'Marcar como concluída'} onClick={() => setDone(old => old.includes(i) ? old.filter(n => n !== i) : [...old, i])}>{done.includes(i) ? <Check size={16}/> : <Circle size={16}/>}</button>
      <div className="step-copy"><h3>{step.title}</h3><p>{step.hint}</p></div>
      <button className="icon-button" aria-label={'Começar: ' + step.title} onClick={() => onStart(step.prompt)}><ArrowRight size={16}/></button>
    </article>)}</div>
    <div className="coach-note"><Target size={16}/><span>O percentual mede seu checklist nesta aplicação, não uma nota oficial do LinkedIn. Não existe garantia de “100%” de otimização.</span></div>
  </section>;
}