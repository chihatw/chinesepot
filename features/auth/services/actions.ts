'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AUTH_EMAIL = process.env.AUTH_EMAIL;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  if (!AUTH_EMAIL || !AUTH_PASSWORD) {
    return 'server auth not configured';
  }

  if (email === AUTH_EMAIL && password === AUTH_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth',
      value: 'logged-in',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    return;
  }

  return 'invalid credentials';
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'auth', value: '', maxAge: 0, path: '/' });
  redirect('/login');
}
