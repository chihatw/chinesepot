'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PROJECT_URL } from '../constants';

const isProduction = process.env.VERCEL_ENV === 'production';
const url = (isProduction ? PROJECT_URL : 'http://127.0.0.1:3000') + '/welcome';
// const url = (isProduction ? PROJECT_URL:'http://localhost:3000' ) + '/welcome';

export async function signInWithMagicLink(email: string) {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: url },
  });
  return result;
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string
) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return error.message;
  }
  return;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
