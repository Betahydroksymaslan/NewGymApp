import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "assets/firebase/firebase";
import { authActions } from "slices/authSlice";
import { useAppDispatch } from "store/hooks";


export type LoginTypes = {email: string, password: string}

export const signIn = async ({
  email,
  password,
}: LoginTypes): Promise<string | null | undefined> => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user.email;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
  } catch (error) {
    console.log(error);
  }
};

export const logoutOfApp = async () => {
  try {
    auth.signOut();
  } catch (error) {
    console.log(error);
  }
};
