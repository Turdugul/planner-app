import { NextResponse } from 'next/server';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

export async function middleware(req: Request) {
  const user: User | null = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => resolve(user));
  });

  if (!user) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}