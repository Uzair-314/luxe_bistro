import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvdqebadwgppyciaiich.supabase.co';
const supabaseKey = 'sb_publishable_IkK78c6t1Nz9lusTe8wjaQ_KtnRE63G';

export const supabase = createClient(supabaseUrl, supabaseKey);