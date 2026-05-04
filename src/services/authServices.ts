import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "./firebase";

// Registro con Email y Password
export const registerUser = (email: string, pass: string) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

// Login con Email y Password
export const loginUser = (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};

// Login con Google (Extra Credit)
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};