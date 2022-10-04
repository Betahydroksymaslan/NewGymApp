import Modal from "components/templates/Modal/Modal";
import {
  StyledForm,
  Header,
  StyledParagraph,
} from "./ChangeMinMaxFilter.style";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "components/molecules/FormField/FormField";
import Button from "components/atoms/Button/Button";
import ErrorMessage from "components/atoms/ErrorMessage/ErrorMessage";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import { useLocalStorage } from "hooks/useLocalStorage";

type ChangeMinMaxType = {
  isOpen: boolean;
  handleClose: () => void;
};
type Inputs = {
  min: number;
  max: number;
};

const ChangeMinMaxFilter = ({ isOpen, handleClose }: ChangeMinMaxType) => {
  const [minMaxVal, setMinMaxVal] = useLocalStorage("minMaxVal", {
    minVal: 20,
    maxVal: 180,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      min: minMaxVal.minVal,
      max: minMaxVal.maxVal,
    },
    shouldUnregister: true,
  });

  const minValue = watch("min");
  const maxValue = watch("max");

  const text = `Treningi, które będą trwały krócej niż ${minValue} min i dłużej niż ${maxValue} min, nie będą brane pod uwagę w statystykach.`;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setMinMaxVal({ minVal: data.min, maxVal: data.max });
    handleClose()
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Header>Zmień filtr</Header>
        <StyledParagraph>{text}</StyledParagraph>
        <InlineWrapper>
          <FormField
            {...register("min", {
              valueAsNumber: true,
              required: "To pole jest wymagane",
              min: 1,
              validate: {
                check: (v) => v < maxValue,
              },
            })}
            label="min"
            isError={!!errors.min}
            errorMessage={errors.min?.message}
            short
            type="number"
            id="minValue"
            placeholder="min"
            suffix="min"
          />
          _
          <FormField
            {...register("max", {
              valueAsNumber: true,
              required: "To pole jest wymagane",
              min: 1,
            })}
            isError={!!errors.max}
            errorMessage={errors.max?.message}
            label="max"
            type="number"
            short
            id="minValue"
            placeholder="max"
            suffix="min"
          />
        </InlineWrapper>

        {(errors?.min?.type === "check" || errors?.max?.type === "check") && (
          <ErrorMessage>
            Wartość minimalna musi być mniejsza od maksymalnej!
          </ErrorMessage>
        )}
        <Button wide>Zmień</Button>
      </StyledForm>
    </Modal>
  );
};

export default ChangeMinMaxFilter;
