import { call, put, takeEvery } from "redux-saga/effects";
import { authActions } from "slices/authSlice";
import { LoginTypes, CallbackPayload, ChangeCredentialsType } from "models/authModel";
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
  setNewDisplayName,
  setNewEmail,
  setNewPassword,
} from "api/authApi";
import { HOME } from "constants/routes";
/* import { GoogleAuthProvider } from "assets/firebase/firebase"; This gives you a Google Access Token. You can use it to access the Google API */
import { updateProfile } from "assets/firebase/firebase";



export function* login(action: PayloadAction<LoginTypes>) {
  try {
    yield put(toggleSpinner(true));
    const { user } = yield call(
      loginToApp,
      action.payload.email,
      action.payload.password
    );
    yield put(authActions.loginSuccess(user));
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
    console.log(user);
    yield put(authActions.loginSuccess(user));
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
    yield put(authActions.loginSuccess(user));
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
    yield updateProfile(user, { displayName: action.payload.name });
    yield put(authActions.loginSuccess(user));
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

export function* changeEmail(action: PayloadAction<ChangeCredentialsType>) {
  try {
    yield put(toggleSpinner(true));
    yield call(setNewEmail, action.payload.newCredential);
    yield put(authActions.changeCredentialsSuccess());
    yield toast.success("Zmieniono adres email!");
  } catch (error) {
    yield put(authActions.changeCredentialsFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* changePassword(action: PayloadAction<ChangeCredentialsType>) {
  try {
    yield put(toggleSpinner(true));
    yield call(setNewPassword, action.payload.newCredential);
    yield put(authActions.changeCredentialsSuccess());
    yield toast.success("Zmieniono hasło!");
  } catch (error) {
    yield put(authActions.changeCredentialsFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* changeDisplayName(action: PayloadAction<ChangeCredentialsType>) {
  try {
    yield put(toggleSpinner(true));
    yield call(setNewDisplayName, action.payload.newCredential);
    yield put(authActions.changeCredentialsSuccess());
    yield toast.success("Zmieniono imię!");
  } catch (error) {
    yield put(authActions.changeCredentialsFailure());
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
  yield takeEvery(authActions.changeCredentialsEmail.type, changeEmail);
  yield takeEvery(authActions.changeCredentialsPassword.type, changePassword);
  yield takeEvery(authActions.changeCredentialsName.type, changeDisplayName);
}
