import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {LoginTypes} from 'services/authService';

const initialState: {user: string | null} = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state,  {payload}: PayloadAction<string> ) => {
        
      state.user = payload;
    },
    loginFailure: () => {
      console.log("Something went wrong");
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    logoutFailure: () => {
      console.log("Something went wrong");
    },
  },
});



const authActions = {
  login: createAction<LoginTypes>("auth/login"), // Is handled by saga
  loginSuccess: createAction<string>("auth/loginSuccess"),
  loginFailure: createAction<unknown>("auth/loginFailure"),
  logout: createAction("auth/logout"), // Is handled by saga
  logoutSuccess: createAction("auth/logoutSuccess"),
  logoutFailure: createAction<unknown>("auth/logoutFailure"),
};

export { authActions };

export default authSlice.reducer;
