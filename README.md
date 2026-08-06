# Questionário — Biomédica Esteta (Espaço Suzuki Estética)

Questionário construído no mesmo padrão do modelo `questionario-coordcomercial`, para a vaga de Biomédica Esteta do Espaço Suzuki Estética, Campo Grande/MS.

## Passos para colocar no ar

1. Criar repositório no GitHub, dentro da organização `gentedagenthe`, por exemplo `questionario-biomedica-suzuki`, e enviar estes arquivos.
2. Criar a tabela no Supabase com o script `supabase_schema.sql` deste projeto (pode usar o mesmo projeto Supabase já existente, `wlfxwtzjlbuzyigzspms.supabase.co`).
3. Configurar as três variáveis de ambiente no Vercel, no momento do deploy:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
   - `REACT_APP_ADMIN_PASSWORD`
4. Publicar no Vercel a partir do repositório.
5. O painel administrativo fica disponível na rota `/admin`, protegido pela senha definida em `REACT_APP_ADMIN_PASSWORD`.

## Estrutura do questionário

Cinco etapas, seguindo o padrão Genthe:

1. Identificação
2. Formação e Qualificação
3. Experiência Técnica
4. Disponibilidade e Contratação
5. Perfil e Complemento

Os dados são gravados na tabela `candidatos_biomedica_suzuki`.
