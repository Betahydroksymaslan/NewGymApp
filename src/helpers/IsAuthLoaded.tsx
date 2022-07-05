import { useEffect, useState } from "react";
import Loader from "components/atoms/Loader/Loader";
import { auth, onAuthStateChanged } from "assets/firebase/firebase";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authActions } from "slices/authSlice";
import { getUser } from "slices/authSlice";

type AuthIsLoadedType = ({ children }: { children: any }) => any;

const IsAuthLoaded: AuthIsLoadedType = ({ children }) => {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector(getUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoggedIn) return;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.loginSuccess(user));
      }
      setIsLoading(false);
    });
  }, [isUserLoggedIn]);

  if (isLoading) return <Loader />;
  return children;
};

export default IsAuthLoaded;
