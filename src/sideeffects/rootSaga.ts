import { all, fork } from "redux-saga/effects";
import authSaga from "sideeffects/authSaga";
import trainingSaga from "sideeffects/trainingSaga";

const cimbinedSagas = [fork(authSaga), fork(trainingSaga)];

export default function* rootSaga() {
  yield all(cimbinedSagas);
}
