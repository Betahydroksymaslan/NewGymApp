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
  DeleteLocationPayload,
  AddNewTrainingDayPayload,
  UpdateDayNamePayload,
  TrainingBodyToAdd
} from "models/trainingsModel";

const initialState: Trainings = {
  trainings: null,
};

type NoteType = {
  date: number;
  message: string;
  id: string;
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
      let notesArray: NoteType[] = [];
      payload.map((training) => {
        for (let id in training.trainingDays) {
          for (let idd in training.trainingDays[id].exercises) {
            for (let iddd in training.trainingDays[id].exercises[idd].notes) {
              notesArray.push(
                training.trainingDays[id].exercises[idd].notes[iddd]
              );
            }

            training.trainingDays[id].exercises[idd].notes = notesArray;
            notesArray = [];
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
    addNewTrainingDaySuccess: () => {
      console.log("good");
    },
    addNewTrainingDayFailure: () => {
      console.log("something went wrong");
    },
    updateDayNameSuccess: () => {
      console.log("good");
    },
    updateDayNameFailure: () => {
      console.log("something went wrong");
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
  setTrainingBody: createAction<TrainingBodyToAdd>(
    "trainings/setTrainingBody"
  ),
  setTrainingBodySuccess: createAction("trainings/setTrainingBodySuccess"),
  setTrainingBodyFailure: createAction("trainings/setTrainingBodyFailure"),
  updateExercise: createAction<DefaultValuesToUpdatePayload>(
    "trainings/updateExercise"
  ),
  updateExerciseSuccess: createAction("trainings/updateExerciseSuccess"),
  updateExerciseFailure: createAction("trainings/updateExerciseFailure"),
  deleteLocation: createAction<DeleteLocationPayload>(
    "trainings/deleteLocation"
  ),
  deleteLocationSuccess: createAction("trainings/deleteLocationSuccess"),
  deleteLocationFailure: createAction("trainings/deleteLocationFailure"),
  addNewTrainingDay: createAction<AddNewTrainingDayPayload>(
    "trainings/addNewTrainingDay"
  ),
  addNewTrainingDaySuccess: createAction("trainings/addNewTrainingDaySuccess"),
  addNewTrainingDayFailure: createAction("trainings/addNewTrainingDayFailure"),
  updateDayName: createAction<UpdateDayNamePayload>("trainings/updateDayName"),
  updateDayNameSuccess: createAction("trainings/updateDayNameSuccess"),
  updateDayNameFailure: createAction("trainings/updateDayNameFailure"),
};

export { trainingActions };

export default trainingsSlice.reducer;
