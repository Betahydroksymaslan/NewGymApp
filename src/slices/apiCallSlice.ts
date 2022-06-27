import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

const initialState: { isLoading: boolean } = {
  isLoading: false,
};

const apiCallSlice = createSlice({
  name: "apiCall",
  initialState,
  reducers: {
    toggleSpinner: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { toggleSpinner } = apiCallSlice.actions;
export const getLoadingState = (store: RootState) => store.apiCall.isLoading;

export default apiCallSlice.reducer;
