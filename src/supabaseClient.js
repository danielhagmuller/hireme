import { createClient } from '@supabase/supabase-js'

console.log('Initializing Supabase client...');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://wjxhpfgrkkmkvjkogrtt.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeGhwZmdya2tta3Zqa29ncnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjI5NTcsImV4cCI6MjA3MzkzODk1N30.5KTfFCXp8kbgBSx0Sn1TQnopVOFSuwELw2sbH7q73GE'

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key present:', !!supabaseAnonKey);

if (!supabaseUrl) {
  throw new Error('Missing REACT_APP_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing REACT_APP_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('Supabase client initialized');