'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

interface LoginLogicProps {
  onUserChange: (user: { displayName: string | null; photoURL: string | null } | null) => void;
}

export default function LoginLogic({ onUserChange }: LoginLogicProps) {
  const provider = new GoogleAuthProvider();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      onUserChange({
        displayName: loggedInUser.displayName,
        photoURL: loggedInUser.photoURL,
      });
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <button
      onClick={login}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sign in with Google
    </button>
  );
}
