import { createClient } from '@supabase/supabase-js';

// Substitua pelos valores do seu projeto Supabase
// (Project Settings → API → Project URL / anon public key)
const SUPABASE_URL = 'SUA_PROJECT_URL_AQUI';
const SUPABASE_ANON_KEY = 'SUA_ANON_KEY_AQUI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
