import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import {
  Trainings,
  TrainingsPayload,
  TrainingDaysPayload,
  TrainingPlanNamePayload,
  TrainingDays,
  TrainingBodyPayload,
  DefaultValuesToUpdatePayload,
  DeleteLocationPayload
} from "models/trainingsModel";

const initialState: Trainings = {
  trainings: null,
};

const trainingsSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    getTrainingsSuccess: (
      state,
      { payload }: PayloadAction<TrainingsPayload>
    ) => {
      let arrayOfTrainingDays: TrainingDays[] = [];
      let arrayOfTrainingExercises: TrainingBodyPayload[] = [];
      payload.map((training) => {
        for (let id in training.trainingDays) {
          for (let idd in training.trainingDays[id].exercises) {
            arrayOfTrainingExercises.push(
              training.trainingDays[id].exercises[idd]
            );
          }
          training.trainingDays[id].exercises = arrayOfTrainingExercises.sort(
            (a, b) => a.order - b.order
          );
          arrayOfTrainingExercises = [];
          arrayOfTrainingDays.push(training.trainingDays[id]);
        }
        training.trainingDays = arrayOfTrainingDays;
        arrayOfTrainingDays = [];
      });

      state.trainings = payload;
    },
    getTrainingsFailure: (error) => {
      console.log(error);
    },
    setPlanNameSuccess: () => {
      console.log("good");
    },
    setTrainingDaysNameSuccess: () => {
      console.log("good");
    },
    setTrainingBodySuccess: () => {
      console.log("good");
    },
    updateExerciseSuccess: () => {
      console.log("updated successfully");
    },
    updateExerciseFailure: () => {
      console.log("updated faulure");
    },
    deleteLocationSuccess: () => {
      console.log("deleted successfully");
    },
    deleteLocationFailure: () => {
      console.log("deleted failure");
    },
  },
});

export const getTrainings = (store: RootState) => store.trainings.trainings;

const trainingActions = {
  getTrainings: createAction<TrainingsPayload>("trainings/getTrainings"),
  getTrainingsSuccess: createAction<TrainingsPayload>(
    "trainings/getTrainingsSuccess"
  ),
  getTrainingsFailure: createAction("trainings/getTrainingsFailure"),
  setPlanName: createAction<TrainingPlanNamePayload>("trainings/setPlanName"),
  setPlanNameSuccess: createAction("trainings/setPlanNameSuccess"),
  setPlanNameFailure: createAction("trainings/setPlanNameFailure"),
  setTrainingDaysName: createAction<TrainingDaysPayload>(
    "trainings/setTrainingDaysName"
  ),
  setTrainingDaysNameSuccess: createAction(
    "trainings/setTrainingDaysNameSuccess"
  ),
  setTrainingDaysNameFailure: createAction(
    "trainings/setTrainingDaysNameFailure"
  ),
  setTrainingBody: createAction<TrainingBodyPayload>(
    "trainings/setTrainingBody"
  ),
  setTrainingBodySuccess: createAction("trainings/setTrainingBodySuccess"),
  setTrainingBodyFailure: createAction("trainings/setTrainingBodyFailure"),
  updateExercise: createAction<DefaultValuesToUpdatePayload>(
    "trainings/updateExercise"
  ),
  updateExerciseSuccess: createAction("trainings/updateExerciseSuccess"),
  updateExerciseFailure: createAction("trainings/updateExerciseFailure"),
  deleteLocation: createAction<DeleteLocationPayload>("trainings/deleteLocation"),
  deleteLocationSuccess: createAction("trainings/deleteLocationSuccess"),
  deleteLocationFailure: createAction("trainings/deleteLocationFailure"),
};

export { trainingActions };

export default trainingsSlice.reducer;
