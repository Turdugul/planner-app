// import Link from 'next/link';  // Import Next.js Link

// export default function Home() {
//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8">
//       <h2 className="text-3xl font-bold text-center">Welcome to Your Planner!</h2>
//       <p className="text-center mt-4">Set your goals, plan your days, and reflect on the season. Explore the app:</p>
      
//       <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
//         <Link
//           className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
//           href="/dashboard"
//         >
//           Go to Dashboard
//         </Link>
//         <Link
//           className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
//           href="/goals"
//         >
//           Set Your Goals
//         </Link>
//         <Link
//           className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
//           href="/planner"
//         >
//           Plan Your Days
//         </Link>
//         <Link
//           className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
//           href="/diary"
//         >
//           Your Diary
//         </Link>
//       </div>
//     </div>
//   );
// }
'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export default function Home() {
  const [user, setUser] = useState<{
    displayName: string | null;
    photoURL: string | null;
  } | null>(null);

  const provider = new GoogleAuthProvider();

  // Handle Login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser({
        displayName: loggedInUser.displayName,
        photoURL: loggedInUser.photoURL,
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
        setUser({
          displayName: loggedInUser.displayName,
          photoURL: loggedInUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center">
        {user ? `Welcome, ${user.displayName}!` : "Welcome to Your Planner!"}
      </h2>
      <p className="text-center mt-4">
        {user
          ? "Access your planner features below:"
          : "Sign in to set goals, plan tasks, and more!"}
      </p>

      {user ? (
        // Show navigation buttons for logged-in users
        <>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6">
            <Link
              className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
              href="/dashboard"
            >
              Go to Dashboard
            </Link>
            <Link
              className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
              href="/goals"
            >
              Set Your Goals
            </Link>
            <Link
              className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
              href="/planner"
            >
              Plan Your Days
            </Link>
            <Link
              className="bg-rose-500 text-white p-4 rounded hover:bg-rose-600 w-full sm:w-64"
              href="/diary"
            >
              Your Diary
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 block mx-auto"
          >
            Log Out
          </button>
        </>
      ) : (
        // Show login button for unauthenticated users
        <button
          onClick={handleLogin}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 block mx-auto"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
