import { AudioLines, BrainCircuit, MessageCircle, Sparkles } from 'lucide-react';

const states = {
  idle: { label: 'PRONTA PARA COMEÇAR', icon: Sparkles },
  thinking: { label: 'ANALISANDO CONTEXTO', icon: BrainCircuit },
  speaking: { label: 'SOPHIA ESTÁ FALANDO', icon: AudioLines },
  listening: { label: 'ESCUTANDO VOCÊ', icon: MessageCircle },
};

export default function HolographicAvatar({ state = 'idle' }) {
  const current = states[state] || states.idle;
  const Icon = current.icon;
  return <div className={`avatar-stage avatar-${state}`} aria-label={current.label}>
    <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
    <div className="avatar-core"><div className="core-glow" /><div className="core-grid" /><Sparkles size={31} strokeWidth={1.4} /></div>
    <div className="avatar-status"><span className="status-dot" /><Icon size={13} /> {current.label}</div>
  </div>;
}