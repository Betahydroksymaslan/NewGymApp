import { call, put, takeEvery } from "redux-saga/effects";
import { authActions } from "slices/authSlice";
import { LoginTypes, CallbackPayload } from "models/authModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "helpers/getErrorMessageWithTryCatch";
import {
  loginToApp,
  registerToApp,
  logoutFromApp,
  googleLogin,
  facebookLogin,
} from "api/authApi";
import { HOME } from "constants/routes";
/* import { GoogleAuthProvider } from "assets/firebase/firebase"; This gives you a Google Access Token. You can use it to access the Google API */

export function* login(action: PayloadAction<LoginTypes>) {
  try {
    yield put(toggleSpinner(true));
    const { user } = yield call(
      loginToApp,
      action.payload.email,
      action.payload.password
    );
    yield put(authActions.loginSuccess({ email: user.email, uid: user.uid }));
    yield action.payload.callback(HOME);
    yield toast.success("Pomyślnie zalogowano!");
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* loginWithGoogle(action: PayloadAction<CallbackPayload>) {
  try {
    yield put(toggleSpinner(true));
    const { user } = yield call(googleLogin);
    yield put(authActions.loginSuccess({ email: user.email, uid: user.uid }));
    yield action.payload.callback(HOME);
    yield toast.success("Pomyślnie zalogowano!");
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* loginWithFacebook(action: PayloadAction<CallbackPayload>) {
  try {
    yield put(toggleSpinner(true));
    const { user } = yield call(facebookLogin);
    yield put(authActions.loginSuccess({ email: user.email, uid: user.uid }));
    yield action.payload.callback(HOME);
    yield toast.success("Pomyślnie zalogowano!");
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* register(action: PayloadAction<LoginTypes>) {
  try {
    yield put(toggleSpinner(true));
    const { user } = yield call(
      registerToApp,
      action.payload.email,
      action.payload.password
    );
    yield put(authActions.loginSuccess({ email: user.email, uid: user.uid }));
    yield action.payload.callback(HOME);
    yield toast.success("Pomyślnie zarejestrowano!");
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* logout() {
  try {
    yield put(toggleSpinner(true));
    yield call(logoutFromApp);
    yield put(authActions.logoutSuccess());
    yield toast.success("Pomyślnie wylogowano!");
  } catch (error) {
    yield put(authActions.logoutFailure(error));
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export default function* authSaga() {
  yield takeEvery(authActions.register.type, register);
  yield takeEvery(authActions.login.type, login);
  yield takeEvery(authActions.loginWithGoogle.type, loginWithGoogle);
  yield takeEvery(authActions.loginWithFacebook.type, loginWithFacebook);
  yield takeEvery(authActions.logout.type, logout);
}
