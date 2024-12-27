import { auth } from "@/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User Info:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      // Optional: Store user info in Firestore
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Logout failed:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Login;
