'use client';

import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';
import { isMobile } from 'react-device-detect';

interface LoginProps {
  onUserChange: (user: { displayName: string | null; photoURL: string | null } | null) => void;
}

export function LoginLogic({ onUserChange }: LoginProps) {
  const provider = new GoogleAuthProvider();

  // Handle Login
  const login = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        const loggedInUser = result.user;
        onUserChange({
          displayName: loggedInUser.displayName,
          photoURL: loggedInUser.photoURL,
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Handle Logout
  const logout = async () => {
    try {
      await signOut(auth);
      onUserChange(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        onUserChange({
          displayName: loggedInUser.displayName,
          photoURL: loggedInUser.photoURL,
        });
      } else {
        onUserChange(null);
      }
    });

    return () => unsubscribe();
  }, [onUserChange]);

  return { login, logout };
}
