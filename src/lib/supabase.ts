import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'lead' | 'member';
  status: 'Working' | 'Break' | 'Meeting' | 'Offline';
  created_at: string;
};

export type Task = {
  id: string;
  member_id: string;
  title: string;
  due_date: string;
  progress: number;
  completed: boolean;
  created_at: string;
};