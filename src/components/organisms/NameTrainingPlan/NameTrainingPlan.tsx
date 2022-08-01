import { StyledForm, Header } from "./NameTrainingPlan.style";
import Button from "components/atoms/Button/Button";
import { ModalsNamesTypes } from "components/pages/Trainings/Trainings";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import { trainingActions } from "slices/trainingsSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import FormField from "components/molecules/FormField/FormField";
import { useWatchDatabase } from "hooks/useWatchDatabase";
import { getUser } from "slices/authSlice";
import { v4 as uuid } from "uuid";

type NameTrainingPlanTypes = {
  closeModal: (val: ModalsNamesTypes) => void;
};

export type InputsTypes = { planName: string };

const NameTrainingPlan = ({ closeModal }: NameTrainingPlanTypes) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>();

  const planNameValue = watch("planName");
  const trainingPlansRef = `users/${user?.uid}/trainingPlans/${planNameValue}`;
  const checkIsPlanNameExists = useWatchDatabase(
    trainingPlansRef,
    planNameValue
  );

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    if (checkIsPlanNameExists) return;
    dispatch(
      trainingActions.setPlanName({
        planName: data.planName,
        step: 1,
        planId: uuid(),
      })
    );
    closeModal("firstModal");
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Header>Nazwij plan</Header>
      <FormField
        id="planName"
        variant="secondary"
        {...register("planName", { required: "To pole jest wymagane" })}
        isError={!!errors.planName || checkIsPlanNameExists}
        errorMessage={
          checkIsPlanNameExists
            ? "Taka nazwa już istnieje"
            : errors?.planName?.message
        }
      />

      <InlineWrapper>
        <Button type="submit" size="m">
          Dodaj
        </Button>
        <Button
          type="button"
          callback={() => closeModal("firstModal")}
          btnType="secondary"
          size="m"
        >
          Wróć
        </Button>
      </InlineWrapper>
    </StyledForm>
  );
};

export default NameTrainingPlan;
