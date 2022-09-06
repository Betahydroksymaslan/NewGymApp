import { forwardRef } from "react";
import { FormFieldWrapper, StyledLabel } from "./FormField.style";
import Input from "components/atoms/Input/Input";
import ErrorMessage from "components/atoms/ErrorMessage/ErrorMessage";
import { InputTypes } from "components/atoms/Input/Input";

interface FormFieldTypes extends InputTypes {
  label?: string;
  errorMessage?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldTypes>(
  (
    {
      label,
      id,
      name,
      type,
      placeholder,
      isError,
      control,
      short,
      variant,
      errorMessage,
      step,
      textarea,
      ...rest
    }: FormFieldTypes,
    ref
  ) => {
    return (
      <FormFieldWrapper>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <Input
          ref={ref}
          control={control}
          placeholder={placeholder}
          variant={variant}
          short={short}
          type={type}
          id={id}
          step={step}
          name={name}
          isError={isError}
          textarea={textarea}
          {...rest}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormFieldWrapper>
    );
  }
);

export default FormField;
