create table candidatos_biomedica_suzuki (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Identificação
  nome text,
  cpf text,
  telefone text,
  email text,
  cidade text,
  nascimento text,

  -- Formação e Qualificação
  formacao text,
  instituicao text,
  anoConclusao text,
  crbm text,
  tempoExp text,
  cursos text,

  -- Experiência Técnica (requisitos da vaga)
  tec1 text, -- Aplicação de toxina botulínica (Botox)
  tec2 text, -- Enzimas corporais e faciais
  tec3 text, -- Preenchedores faciais
  tec4 text, -- Microagulhamento
  tec5 text, -- Drenagem linfática e drenagem modeladora
  tec6 text, -- Massagem relaxante
  tec7 text, -- Manuseio de equipamentos estéticos faciais e corporais
  tec8 text, -- Avaliação estética e elaboração de protocolos personalizados

  -- Diferenciais
  dif1 text, -- Harmonização facial
  dif2 text, -- Ultrassom microfocado
  dif3 text, -- Laser
  dif4 text, -- Tratamentos regenerativos

  -- Disponibilidade e Contratação
  sabado text,
  semana text,
  pj text,
  cnpj text,
  disponibInicio text,
  valorReferencia text,

  -- Perfil Comportamental
  motivacao text,
  situacaoPaciente text,
  trabalhoEquipe text,
  perfilComercial text,

  -- Complementar
  portfolio text,
  curriculo text,
  observacoes text,

  lgpd_aceite boolean default false
);

alter table candidatos_biomedica_suzuki enable row level security;

create policy "Permitir insercao publica"
  on candidatos_biomedica_suzuki
  for insert
  to anon
  with check (true);

create policy "Permitir leitura publica"
  on candidatos_biomedica_suzuki
  for select
  to anon
  using (true);

-- Caso a tabela ja tenha sido criada anteriormente com a estrutura antiga (coluna jsonb "data"),
-- execute os comandos abaixo em vez do CREATE TABLE acima, apos apagar a tabela antiga:
--
-- drop table if exists candidatos_biomedica_suzuki;
-- (em seguida rode o CREATE TABLE e as policies acima)

-- Caso a tabela ja tenha sido criada sem a coluna lgpd_aceite, rode:
--
-- alter table candidatos_biomedica_suzuki add column if not exists lgpd_aceite boolean default false;
