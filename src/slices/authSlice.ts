import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginTypes, CallbackPayload, ChangeCredentialsType } from "models/authModel";
import { RootState } from "store/store";
import { User } from "firebase/auth";

const initialState: { user: User | null } = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<User>) => {
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
    changeCredentialsSuccess: () => {
      console.log("success");
    },
    changeCredentialsFailure: () => {
      console.log("Something went wrong");
    },
  },
});

const authActions = {
  register: createAction<LoginTypes>("auth/register"),
  login: createAction<LoginTypes>("auth/login"), // Is handled by saga
  loginWithGoogle: createAction<CallbackPayload>("auth/loginWithGoogle"),
  loginWithFacebook: createAction<CallbackPayload>("auth/loginWithFacebook"),
  loginSuccess: createAction<User>("auth/loginSuccess"),
  loginFailure: createAction<unknown>("auth/loginFailure"),
  logout: createAction("auth/logout"), // Is handled by saga
  logoutSuccess: createAction("auth/logoutSuccess"),
  logoutFailure: createAction<unknown>("auth/logoutFailure"),
  changeCredentialsEmail: createAction<ChangeCredentialsType>("auth/changeCredentialsEmail"),
  changeCredentialsPassword: createAction<ChangeCredentialsType>("auth/changeCredentialsPassword"),
  changeCredentialsName: createAction<ChangeCredentialsType>("auth/changeCredentialsName"),
  changeCredentialsSuccess: createAction("auth/changeCredentialsSuccess"),
  changeCredentialsFailure: createAction("auth/changeCredentialsFailure"),
};

export const getUser = (store: RootState) => store.user.user;

export { authActions };

export default authSlice.reducer;
