import { useState } from 'react';
import { supabase } from '../supabaseClient';

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

const TECNICOS = [
  { key: 'tec1', label: 'Aplicação de toxina botulínica (Botox)' },
  { key: 'tec2', label: 'Enzimas corporais e faciais' },
  { key: 'tec3', label: 'Preenchedores faciais' },
  { key: 'tec4', label: 'Microagulhamento' },
  { key: 'tec5', label: 'Drenagem linfática e drenagem modeladora' },
  { key: 'tec6', label: 'Massagem relaxante' },
  { key: 'tec7', label: 'Manuseio de equipamentos estéticos faciais e corporais' },
  { key: 'tec8', label: 'Avaliação estética e elaboração de protocolos personalizados' },
];
const DIFERENCIAIS = [
  { key: 'dif1', label: 'Harmonização facial' },
  { key: 'dif2', label: 'Ultrassom microfocado' },
  { key: 'dif3', label: 'Laser' },
  { key: 'dif4', label: 'Tratamentos regenerativos' },
];

async function loadCandidatos() {
  try {
    const { data, error } = await supabase.from('candidatos_biomedica_suzuki').select('*').order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data.map(r => ({ id: r.id, ts: r.created_at, ...r }));
  } catch (e) { console.error(e); return []; }
}

function Nivel({ valor }) {
  if (!valor) return <span style={{ padding: '3px 10px', borderRadius: 5, fontSize: 11, fontWeight: 700, background: '#ddd', color: '#888' }}>—</span>;
  const cores = { 'Sem experiência': '#D9534F', 'Básica': '#E8A838', 'Intermediária': '#2E75B6', 'Avançada': '#5BA85A' };
  return <span style={{ padding: '3px 10px', borderRadius: 5, fontSize: 11, fontWeight: 700, color: '#fff', background: cores[valor] || '#888', minWidth: 110, textAlign: 'center', display: 'inline-block' }}>{valor}</span>;
}

function Candidatura({ c }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 14px rgba(0,0,0,.07)', marginBottom: 18, overflow: 'hidden', border: '1px solid #E8E8E8' }}>
      <div style={{ background: '#1A3C5E', padding: '18px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '.95rem' }}>{c.nome || 'Candidata'}</div>
          <div style={{ color: 'rgba(255,255,255,.65)', fontSize: '.78rem', marginTop: 2 }}>{c.email || '—'} • {c.telefone || '—'}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 6, padding: '3px 10px', color: 'rgba(255,255,255,.85)', fontSize: '.72rem' }}>📍 {c.cidade || '—'}</span>
          <span style={{ background: 'rgba(255,255,255,.15)', borderRadius: 6, padding: '3px 10px', color: 'rgba(255,255,255,.85)', fontSize: '.72rem' }}>🕐 {c.ts ? new Date(c.ts).toLocaleString('pt-BR') : '—'}</span>
        </div>
      </div>
      {aberto && (
        <div style={{ padding: '22px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', marginBottom: 10, borderBottom: '2px solid #EAF3FB', paddingBottom: 6 }}>Formação</div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Formação em estética: <strong>{c.formacao || '—'}</strong></p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Instituição: {c.instituicao || '—'} — Conclusão: {c.ano_conclusao || '—'}</p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Registro CRBM: {c.crbm || '—'} — Tempo de experiência: {c.tempo_experiencia || '—'}</p>
          {c.cursos && <p style={{ fontSize: 13, background: '#F5F5F5', borderRadius: 7, padding: '8px 10px', marginTop: 6 }}>{c.cursos}</p>}

          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', margin: '18px 0 10px', borderBottom: '2px solid #EAF3FB', paddingBottom: 6 }}>Experiência técnica</div>
          {TECNICOS.map(t => (
            <div key={t.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13 }}>
              <span>{t.label}</span><Nivel valor={c[t.key]} />
            </div>
          ))}
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', margin: '14px 0 6px' }}>Diferenciais</div>
          {DIFERENCIAIS.map(d => (
            <div key={d.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13 }}>
              <span>{d.label}</span><Nivel valor={c[d.key]} />
            </div>
          ))}

          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', margin: '18px 0 10px', borderBottom: '2px solid #EAF3FB', paddingBottom: 6 }}>Disponibilidade e contratação</div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>De acordo com modelo PJ (pagamento por execução de serviços): <strong>{c.pj || '—'}</strong></p>
          <p style={{ fontSize: 13, marginBottom: 4 }}>CNPJ: {c.cnpj || '—'} — Início: {c.disponibilidade_inicio || '—'} — Valor de referência: {c.valor_referencia || '—'}</p>
          {c.disponibilidade_tempo && <p style={{ fontSize: 13, background: '#F5F5F5', borderRadius: 7, padding: '8px 10px', marginTop: 6 }}><strong>Disponibilidade de tempo (seg a sáb, manhã):</strong> {c.disponibilidade_tempo}</p>}

          {(c.motivacao || c.situacao_paciente || c.trabalho_equipe || c.perfil_comercial) && <>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', margin: '18px 0 10px', borderBottom: '2px solid #EAF3FB', paddingBottom: 6 }}>Perfil comportamental</div>
            {c.motivacao && <p style={{ fontSize: 13, marginBottom: 8 }}><strong>Motivação:</strong> {c.motivacao}</p>}
            {c.situacao_paciente && <p style={{ fontSize: 13, marginBottom: 8 }}><strong>Situação com paciente:</strong> {c.situacao_paciente}</p>}
            {c.trabalho_equipe && <p style={{ fontSize: 13, marginBottom: 8 }}><strong>Trabalho em equipe:</strong> {c.trabalho_equipe}</p>}
            {c.perfil_comercial && <p style={{ fontSize: 13, marginBottom: 8 }}><strong>Perfil comercial:</strong> {c.perfil_comercial}</p>}
          </>}

          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', margin: '18px 0 10px', borderBottom: '2px solid #EAF3FB', paddingBottom: 6 }}>Complementar</div>
          <p style={{ fontSize: 13, marginBottom: 4 }}>Portfólio: {c.portfolio || '—'} — Currículo: {c.curriculo || '—'}</p>
          {c.observacoes && <p style={{ fontSize: 13, background: '#F5F5F5', borderRadius: 7, padding: '8px 10px', marginTop: 6 }}>{c.observacoes}</p>}
        </div>
      )}
      <div style={{ padding: '0 24px 16px' }}>
        <button onClick={() => setAberto(a => !a)} style={{ background: 'none', border: '1.5px solid #E8E8E8', borderRadius: 8, padding: '7px 16px', fontSize: 13, color: '#666', cursor: 'pointer' }}>
          {aberto ? 'Recolher ↑' : 'Ver candidatura completa ↓'}
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [logado, setLogado] = useState(false);
  const [senha, setSenha] = useState('');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (senha !== ADMIN_PASSWORD) { alert('Senha incorreta.'); return; }
    setLogado(true);
    setCarregando(true);
    setLista(await loadCandidatos());
    setCarregando(false);
  }

  if (!logado) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,.07)', padding: 40, width: 320 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", color: '#1A3C5E', fontSize: '1.2rem', marginBottom: 18, textAlign: 'center' }}>Painel Administrativo</div>
          <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && entrar()}
            style={{ width: '100%', border: '1.5px solid #E8E8E8', borderRadius: 8, padding: '11px 14px', marginBottom: 14, fontFamily: 'Inter, sans-serif' }} />
          <button onClick={entrar} style={{ width: '100%', background: '#1A3C5E', color: '#fff', border: 'none', borderRadius: 10, padding: 12, fontWeight: 700, cursor: 'pointer' }}>Entrar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <header style={{ background: '#1A3C5E', padding: '20px 32px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.2rem' }}>Genthe</div>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '.68rem', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>Painel Administrativo</div>
      </header>
      <div style={{ background: 'linear-gradient(135deg,#1A3C5E 0%,#1d4d7a 100%)', padding: '32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.4rem' }}>Candidaturas — Biomédica Esteta</h1>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '.85rem' }}>Espaço Suzuki Estética</p>
        </div>
        <a href="/" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, padding: '9px 18px', color: '#fff', fontSize: '.82rem', textDecoration: 'none' }}>← Ir ao Questionário</a>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: '#1A3C5E' }}>{lista.length} candidatura(s) recebida(s)</div>
          <button onClick={async () => { setCarregando(true); setLista(await loadCandidatos()); setCarregando(false); }}
            style={{ background: 'none', border: '1.5px solid #E8E8E8', borderRadius: 8, padding: '7px 16px', fontSize: 13, cursor: 'pointer' }}>
            {carregando ? 'Atualizando...' : '↻ Atualizar'}
          </button>
        </div>
        {lista.length === 0 && !carregando && (
          <div style={{ background: '#fff', borderRadius: 14, padding: '60px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📋</div>
            <h3 style={{ color: '#1A3C5E' }}>Nenhuma candidatura registrada ainda</h3>
          </div>
        )}
        {lista.map(c => <Candidatura key={c.id} c={c} />)}
      </div>
    </div>
  );
}
