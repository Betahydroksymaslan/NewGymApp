import { call, put, takeEvery, select } from "redux-saga/effects";
import { trainingActions } from "slices/trainingsSlice";
import {
  TrainingsPayload,
  TrainingDaysPayload,
  TrainingPlanNamePayload,
  TrainingBodyPayload,
} from "models/trainingsModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "helpers/getErrorMessageWithTryCatch";
import { setDatabase, updateDatabase, pushDatabase } from "api/dbApi";
import { User } from "firebase/auth";

export function* getTrainings(action: PayloadAction<TrainingsPayload>) {
  try {
    yield put(toggleSpinner(true));
    yield put(trainingActions.getTrainingsSuccess(action.payload));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* setPlanName(action: PayloadAction<TrainingPlanNamePayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const ref = `users/${user.uid}/trainingPlans/${action.payload.planName}`;
    yield call(setDatabase, ref, action.payload);
    yield put(trainingActions.setPlanNameSuccess());
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingActions.setPlanNameFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* setTrainingDays(action: PayloadAction<TrainingDaysPayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const planRef = `users/${user.uid}/trainingPlans/${action.payload.planNamePath}/step`;
    yield call(updateDatabase, { [planRef]: action.payload.step });

    for (const item of action.payload.daysData) {
      yield call(
        setDatabase,
        `users/${user.uid}/trainingPlans/${action.payload.planNamePath}/trainingDays/${item.dayName}`,
        item
      );
    }

    yield put(trainingActions.setTrainingDaysNameSuccess());
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingActions.setTrainingDaysNameFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* setTrainingBody(action: PayloadAction<TrainingBodyPayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const ref = `users/${user.uid}/trainingPlans/${action.payload.planName}/trainingDays/${action.payload.planDay}/exercises/${action.payload.exerciseName}`;
    yield call(setDatabase, ref, action.payload);
    const planRef = `users/${user.uid}/trainingPlans/${action.payload.planName}/step`;
    yield call(updateDatabase, { [planRef]: 3 });
    yield put(trainingActions.setTrainingBodySuccess());
    yield toast.success("Dodano ćwiczenie!");
  } catch (error) {
    yield toast.error(getErrorMessage(error));
    yield put(trainingActions.setTrainingBodyFailure());
  } finally {
    yield put(toggleSpinner(false));
  }
}

export default function* trainingSaga() {
  yield takeEvery(trainingActions.setPlanName.type, setPlanName);
  yield takeEvery(trainingActions.getTrainings.type, getTrainings);
  yield takeEvery(trainingActions.setTrainingDaysName.type, setTrainingDays);
  yield takeEvery(trainingActions.setTrainingBody.type, setTrainingBody);
}
