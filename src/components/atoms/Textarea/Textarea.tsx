import {forwardRef} from "react";
import { StyledTextarea } from "./Textarea.style";
import ErrorMessage from "components/atoms/ErrorMessage/ErrorMessage";

type TextareaTypes = {
  isError?: boolean;
  errorMessage?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaTypes>(({ isError, errorMessage, ...rest }, ref) => {
  return (
    <>
      <StyledTextarea ref={ref} isError={isError} {...rest} />
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
});

export default Textarea;
