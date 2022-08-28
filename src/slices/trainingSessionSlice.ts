import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import {
  TrainingSessionPayload,
  TrainingSessions,
  SessionPayloadArrived,
  UpdateSessionPayload
} from "models/trainingSessionsModel";

const initialState: TrainingSessions = {
  trainingSessions: null,
};

const trainingSessionSlice = createSlice({
  name: "trainingSessions",
  initialState,
  reducers: {
    getSessionsSuccess: (
      state,
      { payload }: PayloadAction<SessionPayloadArrived>
    ) => {
      let payloadArray = [];
      let exerciseArray = [];
      for (let id in payload) {
        for (let idd in payload[id].exercises) {
          exerciseArray.push(payload[id].exercises[idd]);
        }
        payload[id].exercises = exerciseArray;
        exerciseArray = [];
        payloadArray.push(payload[id]);
      }
      state.trainingSessions = payloadArray;
    },
    getSessionsFailure: () => {
      console.log("Someting went wrong");
    },
    addNewTrainingSessionSuccess: () => {
      console.log("good");
    },
    addNewTrainingSessionFailure: () => {
      console.log("Someting went wrong");
    },
    updateSessionSuccess: () => {
      console.log("good");
    },
    updateSessionFailure: () => {
      console.log("Someting went wrong");
    },
  },
});

export const getTrainingSessions = (store: RootState) =>
  store.trainingSessions.trainingSessions;

const trainingSessionsActions = {
  getSessions: createAction<TrainingSessions>("trainingSessions/getSessions"),
  getSessionsSuccess: createAction<TrainingSessions>(
    "trainingSessions/getSessionsSuccess"
  ),
  getSessionsFailure: createAction("trainingSessions/getSessionsFailure"),
  addNewTrainingSession: createAction<TrainingSessionPayload>(
    "trainingSessions/addNewTrainingSession"
  ),
  addNewTrainingSessionSuccess: createAction(
    "trainingSessions/addNewTrainingSessionSuccess"
  ),
  addNewTrainingSessionFailure: createAction(
    "trainingSessions/addNewTrainingSessionFailure"
  ),
  updateSession: createAction<UpdateSessionPayload>("trainingSessions/updateSession"),
  updateSessionSuccess: createAction(
    "trainingSessions/updateSessionSuccess"
  ),
  updateSessionFailure: createAction(
    "trainingSessions/updateSessionFailure"
  ),
};

export { trainingSessionsActions };

export default trainingSessionSlice.reducer;
