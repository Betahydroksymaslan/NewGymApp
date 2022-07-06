import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

type TrainingsType = {trainings: null}

const initialState: TrainingsType= {
  trainings: null,
};

const trainingsSlice = createSlice({
  name: "trainings",
  initialState,
  reducers: {
    getTrainings: (state, { payload }: PayloadAction<null>) => {
      state.trainings = payload;
    },
  },
});


export const getTrainings = (store: RootState) => store.trainings.trainings;

export default trainingsSlice.reducer;
