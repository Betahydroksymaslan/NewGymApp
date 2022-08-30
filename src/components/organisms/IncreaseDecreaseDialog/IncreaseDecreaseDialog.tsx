import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import {
  Wrapper,
  TopPanel,
  StyledRadioButton,
  InputWrapper,
} from "./IncreaseDecreaseDialog.style";
import { useForm, SubmitHandler } from "react-hook-form";
import { increment } from "assets/firebase/firebase";
import { useAppDispatch } from "store/hooks";
import { trainingSessionsActions } from "slices/trainingSessionSlice";

type IncreaseDecreasTypes = {
  handleClose: () => void;
  refPath: string;
};

type InputsTypes = {
  increaseOrDecrease: "add" | "subtract";
  custommValueToChange: number;
};

const IncreaseDecreaseDialog = ({
  handleClose,
  refPath,
}: IncreaseDecreasTypes) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>({
    defaultValues: { custommValueToChange: 0, increaseOrDecrease: "add" },
  });

  const valueType = watch("increaseOrDecrease");

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    if (!refPath) return;

    const updates = {
      [refPath]: increment(
        valueType === "add"
          ? data.custommValueToChange
          : -data.custommValueToChange
      ),
    };

    dispatch(trainingSessionsActions.updateSession(updates));
    handleClose();
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <TopPanel>
        <StyledRadioButton
          {...register("increaseOrDecrease")}
          value="add"
          id="add"
          name="increaseOrDecrease"
        />
        <label htmlFor="add">+ Dodaj</label>

        <StyledRadioButton
          {...register("increaseOrDecrease")}
          value="subtract"
          id="subtract"
          name="increaseOrDecrease"
        />
        <label htmlFor="subtract">- Odejmij</label>
      </TopPanel>

      <InputWrapper valueType={valueType === "add" ? "+" : "-"}>
        <input
          {...register("custommValueToChange", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
            min: 0,
          })}
          step="0.1"
          type="number"
        />
      </InputWrapper>

      <InlineWrapper>
        <Button size="m">Zmień</Button>
        <Button
          size="m"
          btnType="secondary"
          type="button"
          callback={handleClose}
        >
          Wróć
        </Button>
      </InlineWrapper>
    </Wrapper>
  );
};

export default IncreaseDecreaseDialog;
