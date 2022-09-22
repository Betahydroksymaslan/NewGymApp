import { StyledHeader, Form } from "./NameTrainingDays.style";
import { ModalsNamesTypes } from "components/pages/Trainings/Trainings";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import FormField from "components/molecules/FormField/FormField";
import { useAppDispatch } from "store/hooks";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Control,
} from "react-hook-form";
import { trainingActions } from "slices/trainingsSlice";
import { v4 as uuid } from "uuid";
import { withLatinCharsRegex } from "constants/regex";

type InputsTypes = {
  days: { dayName: string }[];
};

export type ControlDayNamesType = Control<InputsTypes>;

type NameTrainingDaysTypes = {
  closeModal: (val: ModalsNamesTypes) => void;
  planName: string;
};

const NameTrainingDays = ({ closeModal, planName }: NameTrainingDaysTypes) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputsTypes>({
    shouldUnregister: true,
    defaultValues: {
      days: [{ dayName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "days",
    control,
  });

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    const daysData = [
      ...data.days.map((item) => {
        return {
          dayName: item.dayName,
          dayId: uuid(),
        };
      }),
    ];
    console.log(data)
    dispatch(
      trainingActions.setTrainingDaysName({
        daysData,
        step: 2,
        planNamePath: planName,
      })
    );
    closeModal("secondModal");
    
  };
 
  const renderFields = fields.map((field, index) => (
    <FormField
      variant="secondary"
      control={control}
      label={`Trening ${index + 1}`}
      key={field.id}
      id={`dayName${index}`}
      {...register(`days.${index}.dayName` as const, {
        required: "To pole jest wymagane",
        pattern: {
          value: withLatinCharsRegex,
          message: "Wartość nie może zawierać znaków specjalnych",
        },
      })}
      isError={!!errors?.days?.[index]?.dayName}
      errorMessage={errors.days && errors?.days?.[index]?.dayName?.message}
    />
  ));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledHeader>Dodaj dni treningowe</StyledHeader>
      {renderFields}
      <InlineWrapper>
        <Button
          size="s"
          btnType="secondary"
          rounded
          type="button"
          callback={() => append({ dayName: "" })}
        >
          Dodaj
        </Button>
        <Button
          size="s"
          btnType="secondary"
          rounded
          type="button"
          callback={() => remove(fields.length - 1)}
        >
          Usuń ostatnie
        </Button>
      </InlineWrapper>

      <InlineWrapper>
        <Button size="m" type="submit">
          Dodaj
        </Button>
        <Button
          btnType="secondary"
          callback={() => closeModal("secondModal")}
          size="m"
          type="button"
        >
          Wróć
        </Button>
      </InlineWrapper>
    </Form>
  );
};

export default NameTrainingDays;
