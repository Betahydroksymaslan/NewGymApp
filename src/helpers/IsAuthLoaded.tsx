import { useEffect, useState } from "react";
import Loader from "components/atoms/Loader/Loader";
import {
  auth,
  onAuthStateChanged,
  db,
  ref,
  onValue,
} from "assets/firebase/firebase";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authActions } from "slices/authSlice";
import { trainingActions } from "slices/trainingsSlice";
import { getUser } from "slices/authSlice";
import { trainingSessionsActions } from "slices/trainingSessionSlice";

type AuthIsLoadedType = ({ children }: { children: any }) => any;

const IsAuthLoaded: AuthIsLoadedType = ({ children }) => {
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector(getUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoggedIn) return;

    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.loginSuccess(user));

        const userRef = `users/${user.uid}/trainingPlans`;
        const reference = ref(db, userRef);
        onValue(reference, (snapshot) => {
          const data = snapshot.val();
          const array = [];

          for (let id in data) {
            array.push(data[id]);
          }
          dispatch(trainingActions.getTrainings(array));
        });

        const sessionsRef = `users/${user.uid}/trainingSessions`;
        const referenceSession = ref(db, sessionsRef);
        onValue(referenceSession, (snapshot) => {
          const data = snapshot.val();

          dispatch(trainingSessionsActions.getSessions(data));
        });
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isUserLoggedIn]);

  if (isLoading) return <Loader />;
  return children;
};

export default IsAuthLoaded;
