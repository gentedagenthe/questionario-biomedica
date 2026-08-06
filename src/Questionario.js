import { useState } from 'react';
import { supabase } from './supabaseClient';

// ─── DADOS DA VAGA ────────────────────────────────────────────────
const VAGA = {
  cargo: 'Biomédica Esteta',
  cliente: 'Espaço Suzuki Estética',
  contratacao: 'PJ — pagamento por execução de serviços',
  sabados: 'Sábados de manhã',
  semana: 'Durante a semana, principalmente até o final do expediente',
};

const LOGO = () => (
  <div style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.2rem' }}>Genthe</div>
);

// ─── SAVE / LOAD (Supabase) ───────────────────────────────────────
async function saveCandidato(data) {
  try {
    const { error } = await supabase.from('Candidatos_Suzuki').insert([{ data }]);
    if (error) console.error(error);
    return !error;
  } catch (e) { console.error(e); return false; }
}

// ─── STEPS ────────────────────────────────────────────────────────
const STEPS = [
  { title: 'Identificação', icon: '👤' },
  { title: 'Formação e Qualificação', icon: '🎓' },
  { title: 'Experiência Técnica', icon: '🧴' },
  { title: 'Disponibilidade e Contratação', icon: '📋' },
  { title: 'Perfil e Complemento', icon: '✍️' },
];

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

const NIVEIS = ['Sem experiência', 'Básica', 'Intermediária', 'Avançada'];

// ─── FIELD COMPONENTS ─────────────────────────────────────────────
const Field = ({ label, name, value, onChange, type = 'text', placeholder = '', required = false }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A3C5E', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
      {label} {required && <span style={{ color: '#D9534F' }}>*</span>}
    </label>
    <input
      type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder}
      style={{ width: '100%', border: '1.5px solid #E8E8E8', borderRadius: 8, padding: '11px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, background: '#F5F5F5', outline: 'none' }}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder = '' }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A3C5E', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>{label}</label>
    <textarea
      name={name} value={value || ''} onChange={onChange} placeholder={placeholder} rows={4}
      style={{ width: '100%', border: '1.5px solid #E8E8E8', borderRadius: 8, padding: '11px 14px', fontFamily: 'Inter, sans-serif', fontSize: 14, background: '#F5F5F5', outline: 'none', resize: 'vertical' }}
    />
  </div>
);

const Radio = ({ label, name, value, onChange, opts, required = false }) => (
  <div style={{ marginBottom: 20 }}>
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A3C5E', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
      {label} {required && <span style={{ color: '#D9534F' }}>*</span>}
    </label>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {opts.map(op => (
        <label key={op} style={{
          display: 'flex', alignItems: 'center', gap: 7, background: value === op ? '#EAF3FB' : '#F5F5F5',
          border: value === op ? '1.5px solid #2E75B6' : '1.5px solid #E8E8E8', borderRadius: 8, padding: '9px 16px',
          fontSize: 13, cursor: 'pointer', fontWeight: value === op ? 600 : 400, color: value === op ? '#1A3C5E' : '#2D2D2D'
        }}>
          <input type="radio" name={name} value={op} checked={value === op} onChange={onChange} style={{ accentColor: '#2E75B6' }} />
          {op}
        </label>
      ))}
    </div>
  </div>
);

const NivelRow = ({ label, name, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 4px', borderBottom: '1px solid #E8E8E8' }}>
    <div style={{ fontSize: 14, flex: 1 }}>{label}</div>
    <select name={name} value={value || ''} onChange={onChange}
      style={{ border: '1.5px solid #E8E8E8', borderRadius: 7, padding: '8px 10px', fontFamily: 'Inter, sans-serif', fontSize: 13, background: '#F5F5F5' }}>
      <option value="">Selecione</option>
      {NIVEIS.map(n => <option key={n} value={n}>{n}</option>)}
    </select>
  </div>
);

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────
export default function Questionario() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({});

  const hf = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  function validarEtapa() {
    if (step === 0) return form.nome && form.cpf && form.telefone && form.email && form.cidade;
    if (step === 1) return form.formacao;
    if (step === 3) return form.sabado && form.semana && form.pj;
    return true;
  }

  async function next() {
    if (!validarEtapa()) { alert('Preencha os campos obrigatórios antes de continuar.'); return; }
    if (step < STEPS.length - 1) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    setSaving(true);
    const ok = await saveCandidato(form);
    setSaving(false);
    if (ok) { setEnviado(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else alert('Não foi possível enviar sua candidatura agora. Tente novamente em instantes.');
  }

  if (enviado) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,.07)', padding: '56px 32px', textAlign: 'center', maxWidth: 460 }}>
          <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#1A3C5E', fontSize: '1.5rem', marginBottom: 8 }}>Candidatura enviada com sucesso</h2>
          <p style={{ color: '#666', fontSize: '.9rem', lineHeight: 1.6 }}>
            Obrigado pelo seu interesse na vaga de {VAGA.cargo} do {VAGA.cliente}. Suas informações foram registradas e serão analisadas pela equipe de Recrutamento e Seleção da Genthe.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <header style={{ background: '#1A3C5E', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <LOGO />
          <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '.68rem', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>RH e Desenvolvimento Organizacional</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.22)', borderRadius: 20, padding: '5px 14px', color: 'rgba(255,255,255,.85)', fontSize: '.72rem', fontWeight: 500 }}>Processo Seletivo</div>
      </header>

      <div style={{ background: 'linear-gradient(135deg,#1A3C5E 0%,#1d4d7a 100%)', padding: '40px 32px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.7rem', marginBottom: 8 }}>Questionário de Candidatura</h1>
        <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '.88rem', maxWidth: 520, margin: '0 auto' }}>
          {VAGA.cargo} — {VAGA.cliente}. Contratação: {VAGA.contratacao}.
        </p>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
          {STEPS.map((s, i) => (
            <div key={i} title={s.title} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i <= step ? '#2E75B6' : '#cbd5e1', transition: 'all .3s' }} />
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 16px rgba(0,0,0,.07)', padding: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#2E75B6', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 22 }}>
            {STEPS[step].icon} {STEPS[step].title}
          </div>

          {step === 0 && <>
            <Field label="Nome completo" name="nome" value={form.nome} onChange={hf} required />
            <Field label="CPF" name="cpf" value={form.cpf} onChange={hf} placeholder="000.000.000-00" required />
            <Field label="Telefone / WhatsApp" name="telefone" value={form.telefone} onChange={hf} placeholder="(67) 90000-0000" required />
            <Field label="E-mail" name="email" value={form.email} onChange={hf} type="email" required />
            <Field label="Cidade / Estado" name="cidade" value={form.cidade} onChange={hf} placeholder="Campo Grande / MS" required />
            <Field label="Data de nascimento" name="nascimento" value={form.nascimento} onChange={hf} placeholder="dd/mm/aaaa" />
          </>}

          {step === 1 && <>
            <Radio label="Possui formação em Biomedicina com habilitação em Estética?" name="formacao" value={form.formacao} onChange={hf} opts={['Sim', 'Não']} required />
            <Field label="Instituição de formação" name="instituicao" value={form.instituicao} onChange={hf} />
            <Field label="Ano de conclusão" name="anoConclusao" value={form.anoConclusao} onChange={hf} placeholder="Ex: 2022" />
            <Field label="Registro no Conselho (CRBM) — número" name="crbm" value={form.crbm} onChange={hf} />
            <Field label="Tempo de experiência na área de estética" name="tempoExp" value={form.tempoExp} onChange={hf} placeholder="Ex: 3 anos" />
            <TextArea label="Cursos de pós-graduação, especializações ou capacitações relevantes" name="cursos" value={form.cursos} onChange={hf} />
          </>}

          {step === 2 && <>
            <p style={{ fontSize: 13, color: '#666', marginBottom: 14 }}>Classifique seu nível de experiência em cada procedimento.</p>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>Requisitos técnicos</div>
              {TECNICOS.map(t => <NivelRow key={t.key} label={t.label} name={t.key} value={form[t.key]} onChange={hf} />)}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1A3C5E', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 6 }}>Diferenciais</div>
              {DIFERENCIAIS.map(d => <NivelRow key={d.key} label={d.label} name={d.key} value={form[d.key]} onChange={hf} />)}
            </div>
          </>}

          {step === 3 && <>
            <div style={{ background: '#FFF8EC', borderLeft: '4px solid #E8A838', borderRadius: '0 8px 8px 0', padding: '10px 14px', marginBottom: 18, fontSize: 13, color: '#7D5000', fontStyle: 'italic' }}>
              A contratação para esta vaga será exclusivamente como Pessoa Jurídica (PJ), com pagamento por execução de serviços realizados.
            </div>
            <Radio label="Tem disponibilidade para trabalhar aos sábados de manhã?" name="sabado" value={form.sabado} onChange={hf} opts={['Sim', 'Não']} required />
            <Radio label="Tem disponibilidade para trabalhar durante a semana até o final do expediente?" name="semana" value={form.semana} onChange={hf} opts={['Sim', 'Não']} required />
            <Radio label="Está de acordo com a contratação PJ, com pagamento por execução de serviços?" name="pj" value={form.pj} onChange={hf} opts={['Sim, estou de acordo', 'Tenho dúvidas ou restrições']} required />
            <Radio label="Possui CNPJ aberto?" name="cnpj" value={form.cnpj} onChange={hf} opts={['Sim, já possuo', 'Não, mas posso providenciar', 'Não possuo e não desejo abrir']} />
            <Field label="Disponibilidade para início" name="disponibInicio" value={form.disponibInicio} onChange={hf} placeholder="Ex: Imediata, em 15 dias..." />
            <Field label="Valor de referência pretendido por procedimento (opcional)" name="valorReferencia" value={form.valorReferencia} onChange={hf} />
          </>}

          {step === 4 && <>
            <TextArea label="O que te motiva a atuar na área de estética e por que deseja fazer parte do Espaço Suzuki Estética?" name="motivacao" value={form.motivacao} onChange={hf} />
            <TextArea label="Descreva uma situação em que precisou lidar com um paciente insatisfeito ou com queixas específicas" name="situacaoPaciente" value={form.situacaoPaciente} onChange={hf} />
            <TextArea label="Como avalia sua facilidade para trabalhar em equipe e receber orientações e treinamentos?" name="trabalhoEquipe" value={form.trabalhoEquipe} onChange={hf} />
            <TextArea label="Tem perfil comercial para indicação de protocolos e fidelização de pacientes?" name="perfilComercial" value={form.perfilComercial} onChange={hf} />
            <Field label="Link do portfólio ou Instagram profissional" name="portfolio" value={form.portfolio} onChange={hf} placeholder="https://..." />
            <Field label="Link do currículo" name="curriculo" value={form.curriculo} onChange={hf} placeholder="https://..." />
            <TextArea label="Observações adicionais" name="observacoes" value={form.observacoes} onChange={hf} />
          </>}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, gap: 12 }}>
            {step > 0
              ? <button onClick={() => setStep(s => s - 1)} style={{ padding: '12px 22px', background: 'transparent', color: '#64748b', border: '1.5px solid #E8E8E8', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>← Voltar</button>
              : <div />}
            <button onClick={next} disabled={saving} style={{
              flex: 1, maxWidth: 260, padding: '13px 22px', background: saving ? '#94a3b8' : 'linear-gradient(135deg,#1A3C5E,#1d4d7a)',
              color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif'
            }}>
              {saving ? 'Enviando...' : step < STEPS.length - 1 ? 'Continuar →' : '✅ Enviar candidatura'}
            </button>
          </div>
        </div>
      </div>

      <footer style={{ background: '#1A3C5E', textAlign: 'center', padding: 18, color: 'rgba(255,255,255,.45)', fontSize: '.72rem', letterSpacing: .4 }}>
        Genthe RH e Desenvolvimento Organizacional &nbsp;•&nbsp; Campo Grande, MS<br />
        <span style={{ color: 'rgba(255,255,255,.65)', fontStyle: 'italic' }}>Gente que Seleciona, Desenvolve, Integra e Valoriza.</span>
      </footer>
    </div>
  );
}
