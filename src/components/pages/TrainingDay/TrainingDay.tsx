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
  AddNewTrainingButton
} from "./TrainingDay.style";
import { ReactComponent as WomanRideBike } from "assets/images/womanRideBike.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clockIcon.svg";
import { ReactComponent as ExerciseIcon } from "assets/icons/exerciseIcon.svg";
import GoBack from "components/atoms/GoBack/GoBack";
import { useAppSelector } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import Modal from "components/templates/Modal/Modal";
import AddExercise from "components/organisms/AddExercise/AddExercise";
import OptionsList from "components/molecules/OptionsList/OptionsList";

const TrainingDay = () => {
  const { trainingDay, trainingName } = useParams();
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);
  console.log(training);

  const [isAddingNewExerciseVisible, setIsAddingNewExerciseVisible] =
    useState(false);
  const activateAddingNewExercise = () => setIsAddingNewExerciseVisible(true);
  const closeAddingNewExercise = () => setIsAddingNewExerciseVisible(false);

  const renderExercises = training?.exercises?.map((item) => (
    <Exercise key={item.trainingId}>
      <ListOrder>{item.order < 10 ? `0${item.order}` : item.order}</ListOrder>
      <ListTime>15 min</ListTime>
      <ListName>{item.exerciseName}</ListName>
      <OptionsList />
    </Exercise>
  ));

  return (
    <>
      <TopSection>
        <GoBack>Treningi</GoBack>
        <h1>{trainingDay}</h1>
        <DetailsWrapper>
          <ExerciseIcon /> <span>{training?.exercises.length} ćwiczeń</span>
        </DetailsWrapper>

        <DetailsWrapper>
          <ClockIcon /> <span>120 min</span>
        </DetailsWrapper>

        <WomanRideBike />
      </TopSection>
      <BottomSection>
        <ol>
          <h2>Ćwiczenia</h2>
          { renderExercises }
        </ol>
        <AddNewTrainingButton onClick={activateAddingNewExercise}>Dodaj nowe ćwiczenie +</AddNewTrainingButton>
      </BottomSection>

      <Modal
        isOpen={isAddingNewExerciseVisible}
        handleClose={closeAddingNewExercise}
        shouldCloseOnOverlayClick={false}
      >
        <AddExercise
          goToNextStep={trainingDay}
          planName={trainingName as string}
          closeModal={closeAddingNewExercise}
        />
      </Modal>
    </>
  );
};

export default TrainingDay;
