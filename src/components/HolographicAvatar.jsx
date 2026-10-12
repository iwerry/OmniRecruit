import { AudioLines, BrainCircuit, MessageCircle, Sparkles, WifiOff, LoaderCircle } from 'lucide-react';

const states = {
  loading: { label: 'INICIANDO', icon: LoaderCircle },
  idle: { label: 'PRONTA PARA COMEÇAR', icon: Sparkles },
  listening: { label: 'OUVINDO VOCÊ', icon: MessageCircle },
  thinking: { label: 'PENSANDO', icon: BrainCircuit },
  speaking: { label: 'SOPHIA ESTÁ FALANDO', icon: AudioLines },
  offline: { label: 'OFFLINE', icon: WifiOff },
};

const particles = Array.from({ length: 46 }, (_, index) => ({
  id: index,
  angle: (index * 137.508) % 360,
  radius: 45 + ((index * 17) % 76),
  size: 2 + (index % 3),
  delay: (index % 11) * -0.37,
  opacity: 0.22 + ((index * 7) % 65) / 100,
}));

export default function HolographicAvatar({ state = 'idle' }) {
  const current = states[state] || states.idle;
  const Icon = current.icon;
  return <div className={'avatar-stage avatar-' + state} aria-label={current.label}>
    <div className="orb-field" aria-hidden="true">
      {particles.map(particle => <i key={particle.id} className="orb-particle" style={{
        '--angle': particle.angle + 'deg',
        '--radius': particle.radius + 'px',
        '--size': particle.size + 'px',
        '--delay': particle.delay + 's',
        '--opacity': particle.opacity,
      }} />)}
    </div>
    <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
    <div className="avatar-core"><div className="core-glow" /><div className="core-grid" /><Sparkles size={28} strokeWidth={1.3} /></div>
    <div className="avatar-status"><span className="status-dot" /><Icon size={13} /> {current.label}</div>
  </div>;
}