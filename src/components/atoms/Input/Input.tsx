import { forwardRef, ForwardedRef } from "react";
import { StyledInput, ErrorSymbol, InputWrapper } from "./Input.style";
import { ControlDayNamesType } from "components/organisms/NameTrainingDays/NameTrainingDays";

export interface InputTypes {
  type?: string;
  placeholder?: string;
  variant?: "primary" | "secondary";
  isError?: boolean;
  id: string;
  name?: string;
  control?: ControlDayNamesType;
  short?: boolean;
  ref?: ForwardedRef<HTMLInputElement>;
  suffix?: string;
};

const Input = forwardRef<HTMLInputElement, InputTypes>(
  (
    {
      type = "text",
      placeholder,
      short,
      control,
      isError = false,
      id,
      variant = "primary",
      name,
      suffix,
      ...rest
    },
    ref
  ) => {
    return (
      <InputWrapper suffix={suffix}>
        <StyledInput
          ref={ref}
          id={id}
          name={name}
          control={control}
          short={short}
          variant={variant}
          type={type}
          placeholder={placeholder}
          isError={isError}
          {...rest}
        />
        {isError && !short && <ErrorSymbol>!</ErrorSymbol>}
      </InputWrapper>
    );
  }
);

export default Input;
