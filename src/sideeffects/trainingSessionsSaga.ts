import { call, put, takeEvery, select } from "redux-saga/effects";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "helpers/getErrorMessageWithTryCatch";
import {
  TrainingSessionPayload,
  TrainingSessions,
  UpdateSessionPayload
} from "models/trainingSessionsModel";
import {
  setDatabase,
  updateDatabase,
  pushDatabase,
  removeLocation,
} from "api/dbApi";
import { User } from "firebase/auth";

export function* getSessions(action: PayloadAction<TrainingSessions>) {
  try {
    yield put(toggleSpinner(true));
    yield put(trainingSessionsActions.getSessionsSuccess(action.payload));
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingSessionsActions.getSessionsFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* addNewSession(action: PayloadAction<TrainingSessionPayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const ref = `users/${user.uid}/trainingSessions/${action.payload.sessionData.trainingSessionId}`;
    yield call(setDatabase, ref, action.payload.sessionData);

    for (const item of action.payload.exercises) {
      const ref = `users/${user.uid}/trainingSessions/${action.payload.sessionData.trainingSessionId}/exercises/${item.exerciseId}`;
      yield call(setDatabase, ref, item);
    }

    yield put(trainingSessionsActions.addNewTrainingSessionSuccess());
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingSessionsActions.addNewTrainingSessionFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* updateSession(
  action: PayloadAction<UpdateSessionPayload>
) {
  try {
    yield put(toggleSpinner(true));
    yield call(updateDatabase, {...action.payload} );
    yield put(trainingSessionsActions.updateSessionSuccess());
  } catch (error) {
    yield put(trainingSessionsActions.updateSessionFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export default function* trainingSessionsSaga() {
  yield takeEvery(
    trainingSessionsActions.addNewTrainingSession.type,
    addNewSession
  );
  yield takeEvery(trainingSessionsActions.getSessions.type, getSessions);
  yield takeEvery(trainingSessionsActions.updateSession.type, updateSession)
}
