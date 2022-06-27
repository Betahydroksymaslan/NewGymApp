
import { all, fork } from "redux-saga/effects";
import authSaga from 'sideeffects/authSaga'

const cimbinedSagas = [fork(authSaga)]

export default function* rootSaga() {
    yield all(cimbinedSagas)
}