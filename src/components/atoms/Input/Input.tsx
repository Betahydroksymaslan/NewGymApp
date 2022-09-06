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
  step?: string;
  ref?: ForwardedRef<HTMLInputElement>;
  suffix?: string;
  textarea?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputTypes>(
  (
    {
      type = "text",
      placeholder,
      short,
      control,
      step,
      isError = false,
      id,
      variant = "primary",
      name,
      suffix,
      textarea,
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
          step={step}
          placeholder={placeholder}
          isError={isError}
          textarea={textarea}
          {...rest}
        />
        {isError && !short && <ErrorSymbol>!</ErrorSymbol>}
      </InputWrapper>
    );
  }
);

export default Input;
