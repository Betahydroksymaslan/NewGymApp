import { useState } from "react";
import {
  Form,
  TrainingDaysWrapper,
  StyledHeader,
  Tittle,
} from "./AddExercise.style";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import {
  TrainingPlan,
  TrainingBodyPayload,
  DefaultValuesToUpdate,
  DefaultValuesToUpdatePayload,
} from "models/trainingsModel";
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
  order: number;
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
  type?: "add" | "update";
  defaultValuesToUpdate?: DefaultValuesToUpdate | undefined;
};

const AddExercise = ({
  closeModal,
  training,
  planName,
  goToNextStep = "",
  type = "add",
  defaultValuesToUpdate,
}: AddExerciseType) => {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);

  const [isTrainingDayChoosen, setIsTrainingDayChoosen] =
    useState<string | {dayName: string, dayId: string}>(goToNextStep);
  const chooseTrainingDay = (dayName:string, dayId: string) => setIsTrainingDayChoosen({dayName: dayName, dayId: dayId});
console.log(isTrainingDayChoosen)

  const currentTraining = trainings
    ?.find((item) => item.planName === planName)
    ?.trainingDays.find((item) => item.dayName === isTrainingDayChoosen)
    ?.exercises?.length;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>({
    defaultValues:
      type === "add"
        ? {
            repsOrWeight: "weight",
            defaultProgress: "2.5",
            startWeightOrReps: 0,
            order: (currentTraining as number) + 1,
          }
        : defaultValuesToUpdate,
  });


  const isWeightProgress = watch("repsOrWeight");

  const renderTrainingDays = training?.trainingDays.map((item) => (
    <Button
      key={item.dayName}
      callback={() => chooseTrainingDay(item.dayName, item.dayId)}
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

  /* CHECK IF DEFAULT PROGRESS IS CUSTOM OR NOT */

  const initialCustomProgressValue =
    (defaultValuesToUpdate?.repsOrWeight === "weight" &&
      defaultValueOfProgressData.every(
        (item) => item.value !== Number(defaultValuesToUpdate.defaultProgress)
      )) ||
    (defaultValuesToUpdate?.repsOrWeight === "reps" &&
      defaultValueOfProgressRepsData.every(
        (item) => item.value !== Number(defaultValuesToUpdate.defaultProgress)
      ));

  const [customProgressValue, setCustomProgressValue] = useState(
    initialCustomProgressValue
  );
  const showCustomProgressValueInput = () => setCustomProgressValue(true);

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

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!! EXERCISE ORDER !!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Tittle>Ustal kolejność ćwiczenia w planie</Tittle>
      <InlineWrapper>
        <FormField
          short
          id="order"
          type="number"
          variant="secondary"
          isError={!!errors?.order}
          errorMessage={errors?.order?.message}
          {...register("order", {
            required: "To pole jest wymagane",
            valueAsNumber: true,
            min: 1,
          })}
        />
      </InlineWrapper>
    </>
  );

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
      planDay: isTrainingDayChoosen.dayName as string,
      order: data.order,
    };

    const dataToUpdate: DefaultValuesToUpdatePayload = {
      defaultProgress: Number(data.defaultProgress),
      exerciseName: data.exerciseName,
      numberOfSeries: data.numberOfSeries,
      repsOrWeight: data.repsOrWeight,
      repsQuantityFrom: data.repsQuantityFrom,
      repsQuantityTo: data.repsQuantityTo,
      startWeightOrReps: data.startWeightOrReps,
      planName: planName,
      dayName: isTrainingDayChoosen.dayName as string,
      order: data.order,
      trainingId: defaultValuesToUpdate?.trainingId as string,
    };

    if (defaultValuesToUpdate) {
      dispatch(trainingActions.updateExercise(dataToUpdate));
    } else {
      dispatch(trainingActions.setTrainingBody(submitData));
    }

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
        {isTrainingDayChoosen && (
          <Button size="m">
            {type === "update" || defaultValuesToUpdate
              ? "Aktualizuj"
              : "Dodaj"}
          </Button>
        )}
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
