import { useState } from "react";
import {
  Form,
  TrainingDaysWrapper,
  StyledHeader,
  Tittle,
} from "./AddExercise.style";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import { TrainingPlan, TrainingBodyPayload } from "models/trainingsModel";
import FormField from "components/molecules/FormField/FormField";
import { useForm, SubmitHandler } from "react-hook-form";
import { ReactComponent as WeightImage } from "assets/images/weightImage.svg";
import { ReactComponent as RepsImage } from "assets/images/repsImage.svg";
import RadioButton from "components/atoms/RadioButton/RadioButton";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { trainingActions, getTrainings } from "slices/trainingsSlice";
import { v4 as uuid } from "uuid";

type InputsTypes = {
  exerciseName: string;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  numberOfSeries: number;
  defaultProgress: string;
  startWeightOrReps: number;
};

type DefaultValueOfProgressDataType = {
  id: string;
  group: string;
  value?: number;
  inputType?: "custom";
}[];

type AddExerciseType = {
  closeModal: ((val: "thirdModal") => void) | (() => void);
  training?: TrainingPlan | undefined;
  planName: string;
  goToNextStep?: string;
};

const AddExercise = ({
  closeModal,
  training,
  planName,
  goToNextStep = "",
}: AddExerciseType) => {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>({
    defaultValues: {
      repsOrWeight: "weight",
      defaultProgress: "2.5",
      startWeightOrReps: 0,
    },
  });

  const [isTrainingDayChoosen, setIsTrainingDayChoosen] =
    useState(goToNextStep);
  const chooseTrainingDay = (day: string) => setIsTrainingDayChoosen(day);

  const [customProgressValue, setCustomProgressValue] = useState(false);
  const showCustomProgressValueInput = () => setCustomProgressValue(true);

  const isWeightProgress = watch("repsOrWeight");

  const renderTrainingDays = training?.trainingDays.map((item) => (
    <Button
      key={item.dayName}
      callback={() => chooseTrainingDay(item.dayName)}
      size="m"
      type="button"
      btnType="secondary"
    >
      {item.dayName}
    </Button>
  ));

  const defaultValueOfProgressData: DefaultValueOfProgressDataType = [
    { id: "progress_1", group: "defaultProgress", value: 1 },
    { id: "progress_1.25", group: "defaultProgress", value: 1.25 },
    { id: "progress_2", group: "defaultProgress", value: 2 },
    { id: "progress_2.5", group: "defaultProgress", value: 2.5 },
  ];
  const defaultValueOfProgressRepsData: DefaultValueOfProgressDataType = [
    { id: "progress_rep_1", group: "defaultProgress", value: 1 },
    { id: "progress_rep_2", group: "defaultProgress", value: 2 },
    { id: "progress_rep_3", group: "defaultProgress", value: 3 },
  ];
  const renderDefaultValueOfProgressBoxes =
    isWeightProgress === "weight"
      ? defaultValueOfProgressData.map((item) => (
          <RadioButton
            {...register("defaultProgress")}
            small
            key={item.id}
            id={item.id}
            name="defaultProgress"
            value={item.value}
            text={item.value}
          />
        ))
      : defaultValueOfProgressRepsData.map((item) => (
          <RadioButton
            {...register("defaultProgress")}
            small
            key={item.id}
            id={item.id}
            name="defaultProgress"
            value={item.value}
            text={item.value}
          />
        ));

  const exerciseForm = (
    <>
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! NAME EXERCISE !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <FormField
        id="exerciseName"
        variant="secondary"
        label="Nazwa ćwiczenia"
        {...register("exerciseName", {
          required: "To pole jest wymagane",
        })}
        isError={!!errors?.exerciseName}
        errorMessage={errors?.exerciseName?.message}
      />

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! CHOOSE PROGRESS TYPE !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Tittle>Wybierz sposób progresji</Tittle>
      <InlineWrapper>
        <RadioButton
          {...register("repsOrWeight")}
          id="weight"
          value="weight"
          name="repsOrWeight"
          text="ciężar"
        >
          <WeightImage />
        </RadioButton>
        <RadioButton
          {...register("repsOrWeight")}
          id="reps"
          value="reps"
          name="repsOrWeight"
          text="powtórzenia"
        >
          <RepsImage />
        </RadioButton>
      </InlineWrapper>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! TYPE REPS QUANTITY !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Tittle>Dobierz ilość serii i zakres powtórzeń</Tittle>
      <InlineWrapper>
        <FormField
          {...register("numberOfSeries", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
          })}
          id="numberOfSeries"
          variant="secondary"
          short
          type="number"
          isError={!!errors?.numberOfSeries}
          placeholder="serie"
          suffix="s"
        />
        <FormField
          {...register("repsQuantityFrom", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
          })}
          id="repsQuantityFrom"
          variant="secondary"
          short
          type="number"
          isError={!!errors?.repsQuantityFrom}
          placeholder="od"
        />
        _
        <FormField
          {...register("repsQuantityTo", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
          })}
          isError={!!errors?.repsQuantityTo}
          type="number"
          id="repsQuantityTo"
          variant="secondary"
          short
          placeholder="do"
          suffix="p"
        />
      </InlineWrapper>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! DEFAULT PROGRESS !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Tittle>
        {isWeightProgress === "weight"
          ? "Wybierz wartość domyślnej progresji (kg)"
          : "Wybierz wartość domyślnej progresji w powtórzeniach"}
      </Tittle>
      {customProgressValue ? (
        <InlineWrapper>
          <FormField
            id="customProgressValue"
            short
            type="number"
            variant="secondary"
            suffix={isWeightProgress === "weight" ? "kg" : "p"}
            isError={!!errors?.defaultProgress}
            errorMessage={errors?.defaultProgress?.message}
            {...register("defaultProgress", {
              required: "To pole jest wymagane",
              min: 0,
            })}
          />
        </InlineWrapper>
      ) : (
        <>
          <InlineWrapper>{renderDefaultValueOfProgressBoxes}</InlineWrapper>
          <Button
            btnType="tertiary"
            type="button"
            callback={showCustomProgressValueInput}
          >
            Dobierz inną wartość
          </Button>
        </>
      )}

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! STARTING WEIGHT OR REPS !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Tittle>
        {isWeightProgress === "weight"
          ? "Ustal ciężar początkowy (kg)"
          : "Ustal początkową ilość powtórzeń"}
      </Tittle>
      <InlineWrapper>
        <FormField
          id="startWeightOrReps"
          short
          type="number"
          variant="secondary"
          suffix={isWeightProgress === "weight" ? "kg" : "p"}
          isError={!!errors?.startWeightOrReps}
          errorMessage={errors?.startWeightOrReps?.message}
          {...register("startWeightOrReps", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
            min: 0,
          })}
        />
      </InlineWrapper>
    </>
  );

  const currentTraining = trainings
    ?.find((item) => item.planName === planName)
    ?.trainingDays.find((item) => item.dayName === isTrainingDayChoosen)
    ?.exercises?.length;

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    const submitData: TrainingBodyPayload = {
      defaultProgress: Number(data.defaultProgress),
      exerciseName: data.exerciseName,
      numberOfSeries: data.numberOfSeries,
      repsOrWeight: data.repsOrWeight,
      repsQuantityFrom: data.repsQuantityFrom,
      repsQuantityTo: data.repsQuantityTo,
      startWeightOrReps: data.startWeightOrReps,
      trainingId: uuid(),
      virtualProgress: data.startWeightOrReps,
      planName: planName,
      planDay: isTrainingDayChoosen,
      order: (currentTraining as number) + 1,
    };
    dispatch(trainingActions.setTrainingBody(submitData));
    closeModal("thirdModal");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledHeader>
        {isTrainingDayChoosen ? "Dodaj ćwiczenie" : "Wybierz dzień"}
      </StyledHeader>
      {!isTrainingDayChoosen ? (
        <TrainingDaysWrapper>
          {training && renderTrainingDays}
        </TrainingDaysWrapper>
      ) : (
        exerciseForm
      )}
      <InlineWrapper>
        {isTrainingDayChoosen && <Button size="m">Dodaj</Button>}
        <Button
          type="button"
          btnType="secondary"
          size="m"
          callback={() => closeModal("thirdModal")}
        >
          Wróć
        </Button>
      </InlineWrapper>
    </Form>
  );
};

export default AddExercise;
