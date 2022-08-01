import { forwardRef } from "react";
import { StyledRadioButton, StyledLabel } from "./RadioButton.style";

export interface RadioButtonTypes {
  name: string;
  id: string;
  checked?: boolean;
  text?: string | number;
  value?: string | number;
  children?: JSX.Element | JSX.Element[];
  small?: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonTypes>(
  ({ name, id, checked, text, value, small, children, ...rest }, ref) => {
    return (
      <>
        <StyledRadioButton
          ref={ref}
          {...rest}
          checked={checked}
          value={value}
          id={id}
          name={name}
        />
        <StyledLabel htmlFor={id} small={small}>
          {children}
          <span>{text}</span>
        </StyledLabel>
      </>
    );
  }
);

export default RadioButton;
