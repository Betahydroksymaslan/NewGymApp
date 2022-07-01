import { NavigateFunction } from "react-router-dom";

export type CallbackPayload = { callback: NavigateFunction };

export type LoginTypes = {
  email: string;
  password: string;
  callback: NavigateFunction;
};

export type LoginSuccessType = { email: string; uid: string };
