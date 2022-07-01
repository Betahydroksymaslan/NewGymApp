import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  googleProvider,
  signInWithPopup,
  facebookProvider
} from "assets/firebase/firebase";



export const loginToApp = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleLogin = () => {
  return signInWithPopup(auth, googleProvider)
}

export const facebookLogin = () => {
  return signInWithPopup(auth, facebookProvider)
}

export const registerToApp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutFromApp = () => {
    return signOut(auth)
}