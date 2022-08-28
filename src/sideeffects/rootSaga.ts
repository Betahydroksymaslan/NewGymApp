import { all, fork } from "redux-saga/effects";
import authSaga from "sideeffects/authSaga";
import trainingSaga from "sideeffects/trainingSaga";
import trainingSessionsSaga from "sideeffects/trainingSessionsSaga"

const cimbinedSagas = [fork(authSaga), fork(trainingSaga), fork(trainingSessionsSaga)];

export default function* rootSaga() {
  yield all(cimbinedSagas);
}
