import Select from "react-select";
import { forwardRef } from "react";

type SelectTypes = {
  options: { label: string; value: string }[];
  onChange: (...event: any[]) => void
  value: any;
};

const StyledSelect = forwardRef<any, SelectTypes>(
  ({ options, onChange, value }, ref) => {
    const customStyles = {
      control: (provided: any) => ({
        ...provided,
        background:
          "linear-gradient(270deg, rgba(146,163,253,1) 0%, rgba(157,206,255,1) 100%)",
        borderRadius: "30px",
        padding: "5px 10px",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "white",
      }),
      menu: (provided: any) => ({
        ...provided,
        background:
          "linear-gradient(270deg, rgba(146,163,253,1) 0%, rgba(157,206,255,1) 100%)",
        color: "white",
        borderRadius: "10px",
        overflow: "hidden",
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        background: state.isSelected && "#e5ddff",
        color: state.isSelected && "rgba(146,163,253,1)",
      }),
    };
    return (
      <Select
        styles={customStyles}
        defaultValue={options[0]}
        options={options}
        isSearchable={false}
        ref={ref}
        value={options.find((c) => c.value === value)}
        onChange={val => onChange(val?.value)}
      />
    );
  }
);

export default StyledSelect;
