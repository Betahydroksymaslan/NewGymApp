import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import {
  TrainingSessionPayload,
  TrainingSessions,
  SessionPayloadArrived,
  UpdateSessionPayload,
  AddNotePayload,
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
      let notesArray = [];
      for (let id in payload) {
        for (let idd in payload[id].exercises) {
          for (let iddd in payload[id].exercises[idd].notes) {
            notesArray.push(payload[id].exercises[idd].notes[iddd]);
          }

          payload[id].exercises[idd].notes = notesArray;
          notesArray = [];
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
    addNoteSuccess: () => {
      console.log("good");
    },
    addNoteFailure: () => {
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
  updateSession: createAction<UpdateSessionPayload>(
    "trainingSessions/updateSession"
  ),
  updateSessionSuccess: createAction("trainingSessions/updateSessionSuccess"),
  updateSessionFailure: createAction("trainingSessions/updateSessionFailure"),
  addNote: createAction<AddNotePayload>("trainingSessions/addNote"),
  addNoteSuccess: createAction("trainingSessions/addNoteSuccess"),
  addNoteFailure: createAction("trainingSessions/addNoteFailure"),
};

export { trainingSessionsActions };

export default trainingSessionSlice.reducer;
