# Questionário de Candidatura — Biomédica Esteta | Espaço Suzuki Estética

Projeto React (create-react-app) com Supabase, no mesmo padrão dos demais questionários da Genthe.

## Estrutura

- `/` → questionário de candidatura
- `/admin` → painel administrativo (senha: `Genthe2026`, defina a sua em `src/Admin.js`)
- Dados salvos na tabela `Candidatos_Suzuki` do Supabase

## Passo a passo

### 1. Criar o projeto React

```
npx create-react-app genthe-suzuki-biomedica
cd genthe-suzuki-biomedica
npm install react-router-dom @supabase/supabase-js
```

### 2. Substituir os arquivos

Copie os arquivos deste pacote para dentro da pasta criada, substituindo:

- `src/index.js`
- `src/index.css`
- `src/App.js`
- `src/supabaseClient.js`
- `src/Questionario.js`
- `src/Admin.js`

### 3. Criar a tabela no Supabase

1. Acesse **supabase.com** e entre no seu projeto (ou crie um novo)
2. Vá em **Table Editor → New table**
3. Nome da tabela: `Candidatos_Suzuki`
4. Adicione uma coluna: `data`, tipo **jsonb**
5. Salve

### 4. Preencher as credenciais

Vá em **Project Settings → API** e copie:

- **Project URL**
- **anon public key**

Abra `src/supabaseClient.js` e substitua `SUA_PROJECT_URL_AQUI` e `SUA_ANON_KEY_AQUI` pelos valores copiados.

### 5. Testar localmente

```
npm start
```

Acesse `http://localhost:3000` (questionário) e `http://localhost:3000/admin` (painel).

### 6. Publicar no Vercel

```
npx vercel --prod
```

Na primeira publicação, responda:
- **Set up and deploy?** → `Y`
- **Link to existing project?** → `N`
- **Project name?** → `genthe-suzuki-biomedica`
- Demais perguntas → Enter

Ao final, você terá o link de produção, por exemplo `genthe-suzuki-biomedica.vercel.app`, com o painel em `/admin`.
