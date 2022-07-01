import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginTypes, LoginSuccessType, CallbackPayload } from "models/authModel";
import { RootState } from "store/store";

const initialState: { user: LoginSuccessType | null } = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<LoginSuccessType>) => {
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
  register: createAction<LoginTypes>("auth/register"),
  login: createAction<LoginTypes>("auth/login"), // Is handled by saga
  loginWithGoogle: createAction<CallbackPayload>("auth/loginWithGoogle"),
  loginWithFacebook: createAction<CallbackPayload>("auth/loginWithFacebook"),
  loginSuccess: createAction<LoginSuccessType>("auth/loginSuccess"),
  loginFailure: createAction<unknown>("auth/loginFailure"),
  logout: createAction("auth/logout"), // Is handled by saga
  logoutSuccess: createAction("auth/logoutSuccess"),
  logoutFailure: createAction<unknown>("auth/logoutFailure"),
};

export const getUser = (store: RootState) => store.user.user;

export { authActions };

export default authSlice.reducer;
