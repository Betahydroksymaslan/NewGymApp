import { forwardRef, ForwardedRef } from "react";
import { StyledInput, ErrorSymbol, InputWrapper } from "./Input.style";

type InputTypes = {
  type?: string;
  placeholder?: string;
  isError?: boolean;
  id: string;
  name?: string;
  ref?: ForwardedRef<HTMLInputElement>;
};

const Input = forwardRef<HTMLInputElement, InputTypes>(
  ({ type = "text", placeholder, isError = false, id, name, ...rest }, ref) => {
    return (
      <InputWrapper>
        <StyledInput
          ref={ref}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          isError={isError}
          {...rest}
        />
        {isError && <ErrorSymbol>!</ErrorSymbol>}
      </InputWrapper>
    );
  }
);

export default Input;
