import { useEffect } from "react";
import { AppWrapper } from "./App.styles";
import Register from "components/pages/Register/Register";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { auth, onAuthStateChanged } from 'assets/firebase/firebase';
import {authActions} from 'slices/authSlice';
import Login from "components/pages/Login/Login";
import {getLoadingState} from 'slices/apiCallSlice';
import Loader from "components/atoms/Loader/Loader";

function App() {
  const user = useAppSelector((state) => state.user.user);
  const isLoading = useAppSelector(getLoadingState)
  const dispatch = useAppDispatch()
  /* useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
      } else {
        dispatch(authActions.logout())
      }
    });
  }, []); */
console.log(user)
  return (
    
      <AppWrapper>
        
        
        {!user ? <Login /> : <button onClick={() => dispatch(authActions.logout())}>wyloguj</button>}
        {isLoading && <Loader />}
      </AppWrapper>
    
  );
}

export default App;
