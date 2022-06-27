import { call, put, takeLatest } from "redux-saga/effects";
import { logoutOfApp, signIn } from "services/authService";
import { authActions } from "slices/authSlice";
import { LoginTypes } from "services/authService";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from 'react-toastify';

export function* login(action: PayloadAction<LoginTypes>) {
  try {
    yield put(toggleSpinner(true))
    const user: string = yield call(signIn, action.payload);
    yield put(authActions.loginSuccess(user));
    yield toast.success('Pomyślnie zalogowano!')
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield toast.error('coś poszło nie tak')
  } finally {
    yield put(toggleSpinner(false))
  }
}

export function* logout() {
  try {
    yield put(toggleSpinner(true))
    yield call(logoutOfApp);
    yield put(authActions.logoutSuccess());
    yield toast.success('Pomyślnie wylogowano!')
  } catch (error) {
    yield put(authActions.logoutFailure(error));
    yield toast.error('coś poszło nie tak')
  } finally {
    yield put(toggleSpinner(false))
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, login);
  yield takeLatest(authActions.logout.type, logout);
}
