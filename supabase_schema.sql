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
  ano_conclusao text,
  crbm text,
  tempo_experiencia text,
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
  pj text,
  cnpj text,
  disponibilidade_tempo text,
  disponibilidade_inicio text,
  valor_referencia text,

  -- Perfil Comportamental
  motivacao text,
  situacao_paciente text,
  trabalho_equipe text,
  perfil_comercial text,

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

-- Caso a tabela ja tenha sido criada anteriormente (com a estrutura antiga,
-- coluna jsonb "data", ou colunas em camelCase que quebram no Supabase),
-- apague a tabela antiga e rode o CREATE TABLE e as policies acima:
--
-- drop table if exists candidatos_biomedica_suzuki;
