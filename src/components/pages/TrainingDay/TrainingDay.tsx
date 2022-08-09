import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  TopSection,
  BottomSection,
  DetailsWrapper,
  Exercise,
  ListName,
  ListOrder,
  ListTime,
  AddNewTrainingButton,
  Wrapper,
  BikeWrapper,
} from "./TrainingDay.style";
import { trainingActions } from "slices/trainingsSlice";
import { ReactComponent as WomanRideBike } from "assets/images/womanRideBike.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clockIcon.svg";
import { ReactComponent as ExerciseIcon } from "assets/icons/exerciseIcon.svg";
import GoBack from "components/atoms/GoBack/GoBack";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import Modal from "components/templates/Modal/Modal";
import AddExercise from "components/organisms/AddExercise/AddExercise";
import OptionsList from "components/molecules/OptionsList/OptionsList";
import { motion } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";
import { DefaultValuesToUpdate } from "models/trainingsModel";
import ConfirmationDialog from "components/organisms/ConfirmationDialog/ConfirmationDialog";

const TrainingDay = () => {
  const { trainingDay, trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);
  console.log(training);

  const [defaultValuesToUpdate, setDefaultValuesToUpdate] = useState<
    DefaultValuesToUpdate | undefined
  >();
  const [isAddingNewExerciseVisible, setIsAddingNewExerciseVisible] =
    useState(false);
  const activateAddingNewExercise = () => setIsAddingNewExerciseVisible(true);
  const closeAddingNewExercise = () => {
    setDefaultValuesToUpdate(undefined);
    setIsAddingNewExerciseVisible(false);
  };

  const [isConfirmBoxVisible, setIsConfirmBoxVisible] = useState(false);
  const openConfirmationBox = () => setIsConfirmBoxVisible(true);
  const closeConfirmationBox = () => {
    setIsConfirmBoxVisible(false);
    setDefaultValuesToUpdate(undefined);
  };

  const renderExercises = training?.exercises?.map((item) => (
    <Exercise key={item.trainingId}>
      <ListOrder>{item.order < 10 ? `0${item.order}` : item.order}</ListOrder>
      <ListTime>15 min</ListTime>
      <ListName>{item.exerciseName}</ListName>
      <OptionsList
        options={[
          { text: "szczegóły", callback: () => {} },
          {
            text: "edytuj",
            callback: () => {
              setDefaultValuesToUpdate({
                defaultProgress: item.defaultProgress.toString(),
                exerciseName: item.exerciseName,
                numberOfSeries: item.numberOfSeries,
                repsOrWeight: item.repsOrWeight,
                repsQuantityFrom: item.repsQuantityFrom,
                repsQuantityTo: item.repsQuantityTo,
                startWeightOrReps: item.startWeightOrReps,
              });
              activateAddingNewExercise();
            },
          },
          {
            text: "usuń",
            callback: () => {
              setDefaultValuesToUpdate({
                defaultProgress: item.defaultProgress.toString(),
                exerciseName: item.exerciseName,
                numberOfSeries: item.numberOfSeries,
                repsOrWeight: item.repsOrWeight,
                repsQuantityFrom: item.repsQuantityFrom,
                repsQuantityTo: item.repsQuantityTo,
                startWeightOrReps: item.startWeightOrReps,
              });
              openConfirmationBox();
            },
          },
        ]}
      />
    </Exercise>
  ));
  
  const removeExercise = () => {
    const payload = {
      path: `${trainingName}/trainingDays/${trainingDay}/exercises/${defaultValuesToUpdate?.exerciseName}`,
    };
    console.log(payload.path)
    dispatch(trainingActions.deleteLocation(payload));
    setDefaultValuesToUpdate(undefined);
    closeConfirmationBox();
  };

  return (
    <Wrapper
      as={motion.section}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
    >
      <TopSection>
        <GoBack>Treningi</GoBack>
        <h1>{trainingDay}</h1>
        <DetailsWrapper>
          <ExerciseIcon /> <span>{training?.exercises.length} ćwiczeń</span>
        </DetailsWrapper>

        <DetailsWrapper>
          <ClockIcon /> <span>120 min</span>
        </DetailsWrapper>
        <BikeWrapper>
          <WomanRideBike />
        </BikeWrapper>
      </TopSection>
      <BottomSection>
        <ol>
          <h2>Ćwiczenia</h2>
          {renderExercises}
        </ol>
        <AddNewTrainingButton onClick={activateAddingNewExercise}>
          Dodaj nowe ćwiczenie +
        </AddNewTrainingButton>
      </BottomSection>

      <Modal
        isOpen={isAddingNewExerciseVisible}
        handleClose={closeAddingNewExercise}
        shouldCloseOnOverlayClick={false}
      >
        <AddExercise
          type={defaultValuesToUpdate ? "update" : "add"}
          defaultValuesToUpdate={defaultValuesToUpdate}
          goToNextStep={trainingDay}
          planName={trainingName as string}
          closeModal={closeAddingNewExercise}
        />
      </Modal>

      <Modal isOpen={isConfirmBoxVisible} handleClose={closeConfirmationBox}>
        <ConfirmationDialog
          handleClose={closeConfirmationBox}
          callback={removeExercise}
          body={`Ćwiczenie ${defaultValuesToUpdate?.exerciseName} zostanie trwale usunięte, nie będzie możliwości cofnięcia tej akcji`}
        />
      </Modal>
    </Wrapper>
  );
};

export default TrainingDay;
