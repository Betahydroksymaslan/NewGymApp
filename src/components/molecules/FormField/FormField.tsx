import React, { forwardRef } from "react";
import { FormFieldWrapper, StyledLabel } from "./FormField.style";
import Input from "components/atoms/Input/Input";
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';

type FormFieldTypes = {
  label: string;
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
};

const FormField = forwardRef<HTMLInputElement, FormFieldTypes>(
  ({ label, id, name, type, placeholder, isError, errorMessage, ...rest }: FormFieldTypes, ref) => {
    return (
      <FormFieldWrapper>
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
        <Input
          ref={ref}
          placeholder={placeholder}
          type={type}
          id={id}
          name={name}
          isError={isError}
          {...rest}
        />
        {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormFieldWrapper>
    );
  }
);

export default FormField;
