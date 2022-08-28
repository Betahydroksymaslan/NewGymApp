import { configureStore } from "@reduxjs/toolkit";
import authReducer from "slices/authSlice";
import apiCallReducer from "slices/apiCallSlice";
import trainingsReducer from "slices/trainingsSlice";
import trainingSessionReducer from "slices/trainingSessionSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "sideeffects/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: authReducer,
    apiCall: apiCallReducer,
    trainings: trainingsReducer,
    trainingSessions: trainingSessionReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
