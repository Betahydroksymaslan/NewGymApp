import { forwardRef } from "react";
import { Label, Checkbox } from "./StyledCheckbox.style";

interface CheckboxType {
  label: string;
  id: string;
  isChecked: boolean;
}

const StyledCheckbox = forwardRef<HTMLInputElement, CheckboxType>(
  ({ label, id, isChecked, ...rest }, ref) => {
    return (
      <>
        <Label htmlFor={id} isChecked={isChecked}>{label}</Label>
        <Checkbox ref={ref} name={id} id={id} {...rest} />
      </>
    );
  }
);

export default StyledCheckbox;
