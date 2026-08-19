"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignJWT, jwtVerify } from 'jose';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'stoic_admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'St0!cH3@lth#2024$Adm!n';
const JWT_SECRET = process.env.JWT_SECRET || 'stoic_home_care_secure_jwt_secret_key_2026';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = await new SignJWT({ role: 'admin', username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secretKey);

    cookies().set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return { success: true, redirect: '/admin' };
  }

  return { success: false, message: 'Invalid username or password.' };
}

export async function logoutAdmin() {
  cookies().delete('admin_session');
  redirect('/admin/login');
}

export async function verifyAdminAction(token: string) {
  try {
    if (!token) return false;
    const { payload } = await jwtVerify(token, secretKey);
    return payload.role === 'admin';
  } catch (err) {
    return false;
  }
}

