import { call, put, takeLatest, select } from "redux-saga/effects";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "helpers/getErrorMessageWithTryCatch";
import {
  TrainingSessionPayload,
  TrainingSessions,
  UpdateSessionPayload,
  AddNotePayload,
  TrainingSession
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

export function* getSession(action: PayloadAction<TrainingSession>) {
  try {
    yield put(toggleSpinner(true));
    yield put(trainingSessionsActions.getSessionSuccess(action.payload));
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingSessionsActions.getSessionFailure());
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

export function* updateSession(action: PayloadAction<UpdateSessionPayload>) {
  try {
    yield put(toggleSpinner(true));
    yield call(updateDatabase, { ...action.payload });
    yield put(trainingSessionsActions.updateSessionSuccess());
  } catch (error) {
    yield put(trainingSessionsActions.updateSessionFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* addNote(action: PayloadAction<AddNotePayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const ref = `users/${user.uid}/${action.payload.path}`;
    yield call(setDatabase, ref, action.payload.message);
    yield put(trainingSessionsActions.addNoteSuccess());
    yield toast.success("Pomyślnie dodano notatkę!");
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingSessionsActions.addNoteFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export default function* trainingSessionsSaga() {
  yield takeLatest(
    trainingSessionsActions.addNewTrainingSession.type,
    addNewSession
  );
  yield takeLatest(trainingSessionsActions.getSessions.type, getSessions);
  yield takeLatest(trainingSessionsActions.getSession.type, getSession);
  yield takeLatest(trainingSessionsActions.updateSession.type, updateSession);
  yield takeLatest(trainingSessionsActions.addNote.type, addNote);
}
