import React from "react";
import { StyledSpan } from "./ErrorMessage.style";

type ErrorMessageTypes = {
  children?: string;
};

const ErrorMessage = ({ children }: ErrorMessageTypes) => {
  return <StyledSpan>{children}</StyledSpan>;
};

export default ErrorMessage;
