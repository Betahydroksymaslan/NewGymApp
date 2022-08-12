import { call, put, takeEvery, select } from "redux-saga/effects";
import { trainingActions } from "slices/trainingsSlice";
import {
  TrainingsPayload,
  TrainingDaysPayload,
  TrainingPlanNamePayload,
  TrainingBodyPayload,
  DefaultValuesToUpdatePayload,
  DeleteLocationPayload,
} from "models/trainingsModel";
import { PayloadAction } from "@reduxjs/toolkit";
import { toggleSpinner } from "slices/apiCallSlice";
import { toast } from "react-toastify";
import { getErrorMessage } from "helpers/getErrorMessageWithTryCatch";
import {
  setDatabase,
  updateDatabase,
  pushDatabase,
  removeLocation,
} from "api/dbApi";
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
        `users/${user.uid}/trainingPlans/${action.payload.planNamePath}/trainingDays/${item.dayId}`,
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
    const ref = `users/${user.uid}/trainingPlans/${action.payload.planName}/trainingDays/${action.payload.trainingId}/exercises/${action.payload.trainingId}`;
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

export function* updateExercise(
  action: PayloadAction<DefaultValuesToUpdatePayload>
) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const exerciseRef = `users/${user.uid}/trainingPlans/${action.payload.planName}/trainingDays/${action.payload.dayName}/exercises/${action.payload.trainingId}`;
    const updateData = {
      [`${exerciseRef}/defaultProgress`]: action.payload.defaultProgress,
      [`${exerciseRef}/exerciseName`]: action.payload.exerciseName,
      [`${exerciseRef}/numberOfSeries`]: action.payload.numberOfSeries,
      [`${exerciseRef}/repsOrWeight`]: action.payload.repsOrWeight,
      [`${exerciseRef}/repsQuantityFrom`]: action.payload.repsQuantityFrom,
      [`${exerciseRef}/repsQuantityTo`]: action.payload.repsQuantityTo,
      [`${exerciseRef}/startWeightOrReps`]: action.payload.startWeightOrReps,
      [`${exerciseRef}/order`]: action.payload.order,
    };
    yield call(updateDatabase, { ...updateData });

    yield put(trainingActions.updateExerciseSuccess());
    yield toast.success("Zaktualizowano ćwiczenie!");
  } catch (error) {
    yield put(trainingActions.updateExerciseFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export function* deleteLocation(action: PayloadAction<DeleteLocationPayload>) {
  try {
    yield put(toggleSpinner(true));
    const user: User = yield select((store) => store.user.user);
    const exerciseRef = `users/${user.uid}/trainingPlans/${action.payload.path}`;
    yield call(removeLocation, exerciseRef);
    yield put(trainingActions.deleteLocationSuccess());
    yield toast.success("Usunięto ćwiczenie!");
  } catch (error) {
    yield put(trainingActions.deleteLocationFailure());
    yield toast.error(getErrorMessage(error));
  } finally {
    yield put(toggleSpinner(false));
  }
}

export default function* trainingSaga() {
  yield takeEvery(trainingActions.setPlanName.type, setPlanName);
  yield takeEvery(trainingActions.getTrainings.type, getTrainings);
  yield takeEvery(trainingActions.setTrainingDaysName.type, setTrainingDays);
  yield takeEvery(trainingActions.setTrainingBody.type, setTrainingBody);
  yield takeEvery(trainingActions.updateExercise.type, updateExercise);
  yield takeEvery(trainingActions.deleteLocation.type, deleteLocation);
}
