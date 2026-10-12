import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, CheckCircle2, LoaderCircle, X } from 'lucide-react';

export default function CameraVisionModal({ onClose, onAnalyze }) {
 const videoRef=useRef(null), streamRef=useRef(null);
 const [error,setError]=useState(''),[busy,setBusy]=useState(false),[consent,setConsent]=useState(false),[active,setActive]=useState(false);
 useEffect(()=>()=>streamRef.current?.getTracks().forEach(track=>track.stop()),[]);
 async function startCamera(){
  setError('');
  if(!consent){setError('Confirme o consentimento antes de ativar a câmera.');return;}
  if(!navigator.mediaDevices?.getUserMedia){setError('Este navegador não oferece suporte à câmera. Use HTTPS ou localhost.');return;}
  try{const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});streamRef.current=stream;if(videoRef.current)videoRef.current.srcObject=stream;setActive(true);}
  catch{setError('Não foi possível acessar a câmera. Confira a permissão do navegador e use HTTPS ou localhost.');}
 }
 async function analyze(){
  if(!videoRef.current||!streamRef.current)return;
  setBusy(true);setError('');
  try{const canvas=document.createElement('canvas');canvas.width=videoRef.current.videoWidth||640;canvas.height=videoRef.current.videoHeight||480;canvas.getContext('2d').drawImage(videoRef.current,0,0,canvas.width,canvas.height);const image=canvas.toDataURL('image/jpeg',0.82);streamRef.current.getTracks().forEach(track=>track.stop());setActive(false);await onAnalyze(image);onClose();}
  catch(e){setError(e?.message||'A análise não foi concluída. Você pode tentar novamente.');}
  finally{setBusy(false);}
 }
 return <div className="modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="vision-modal" role="dialog" aria-modal="true" aria-labelledby="vision-title"><button className="icon-button modal-close" onClick={onClose} aria-label="Fechar"><X size={18}/></button><div className="eyebrow"><Camera size={14}/> VISÃO COMPUTACIONAL</div><h2 id="vision-title">Avaliação de impacto visual</h2><p className="muted">Com seu consentimento, a IA pode comentar iluminação, enquadramento e elementos visíveis do ambiente. A análise não determina competência, personalidade ou empregabilidade.</p><div className="camera-preview">{!active&&<div className="camera-placeholder"><CameraOff size={30}/><span>Sua câmera aparecerá aqui</span></div>}<video ref={videoRef} autoPlay muted playsInline /></div><label className="consent-row"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/> Entendo que um quadro será enviado ao serviço de IA para análise quando eu solicitar.</label>{error&&<p className="error-text" role="alert">{error}</p>}<div className="modal-actions"><button className="button-secondary" onClick={startCamera}><Camera size={16}/> Ativar câmera</button><button className="button-primary" disabled={busy||!active} onClick={analyze}>{busy?<LoaderCircle className="spin" size={16}/>:<CheckCircle2 size={16}/>} Analisar quadro</button></div><p className="tiny muted">A câmera só é ativada após sua ação. O vídeo não é gravado por este componente; a captura enviada é um único quadro.</p></section></div>;
}