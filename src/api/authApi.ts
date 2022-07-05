import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  googleProvider,
  signInWithPopup,
  facebookProvider,
  updatePassword,
  updateEmail,
  updateProfile,
} from "assets/firebase/firebase";
import { User } from "firebase/auth";

export const loginToApp = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};

export const facebookLogin = () => {
  return signInWithPopup(auth, facebookProvider);
};

export const registerToApp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutFromApp = () => {
  return signOut(auth);
};

export const setNewEmail = (newEmail: string) => {
  return updateEmail(auth.currentUser as User, newEmail);
};

export const setNewPassword = (password: string) => {
  return updatePassword(auth.currentUser as User, password);
};

export const setNewDisplayName = (newName: string) => {
  return updateProfile(auth.currentUser as User, {
    displayName: newName,
  });
};
