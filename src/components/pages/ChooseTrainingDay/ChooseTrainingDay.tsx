import { useState } from "react";
import {
  Wrapper,
  StyledSection,
  TrainingDay,
  DetailsWrapper,
  EditWrapper,
  ButtonWrapper,
  DeleteButton,
} from "./ChooseTrainingDay.style";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import GoBack from "components/atoms/GoBack/GoBack";
import { ReactComponent as ClockIcon } from "assets/icons/clockIcon.svg";
import { ReactComponent as ExerciseIcon } from "assets/icons/exerciseIcon.svg";
import { TRAININGS } from "constants/routes";
import { motion } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";
import OptionsList from "components/molecules/OptionsList/OptionsList";
import { FiEdit } from "react-icons/fi";
import Button from "components/atoms/Button/Button";
import { AnimatePresence } from "framer-motion";
import { AiTwotoneDelete } from "react-icons/ai";
import { trainingActions } from "slices/trainingsSlice";

const ChooseTrainingDay = () => {
  let { trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const currentTraining = trainings?.find(
    (item) => item.planName === trainingName
  );

  const [isEdit, setIsEdit] = useState(false);
  const startEdit = () => setIsEdit(true);
  const endEdit = () => setIsEdit(false);

  const renderTrainingDays = currentTraining?.trainingDays.map((item) => {
    const deleteItem = () => {
      const payload = { path: `${trainingName}/trainingDays/${item.dayName}` };
      dispatch(trainingActions.deleteLocation(payload));
    };

    return (
      <StyledLink
        to={isEdit ? "#" : `${TRAININGS}/${trainingName}/${item.dayName}`}
        key={item.dayName}
      >
        <TrainingDay as={motion.div}>
          <span>{trainingName}</span>
          <h2>{item.dayName}</h2>
          <DetailsWrapper>
            <ExerciseIcon /> <span>{item.exercises.length} ćwiczeń</span>
            <ClockIcon /> <span>120 min</span>
          </DetailsWrapper>
          {isEdit && (
            <EditWrapper>
              <DeleteButton
                onClick={deleteItem}
                as={motion.button}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AiTwotoneDelete />
                usuń
              </DeleteButton>
            </EditWrapper>
          )}
        </TrainingDay>
      </StyledLink>
    );
  });
  return (
    <Wrapper
      as={motion.div}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
    >
      <OptionsList
        options={[{ text: "Edytuj", icon: <FiEdit />, callback: startEdit }]}
        customPosition={{ top: 10, right: 10 }}
        dotsTheme="white"
      />
      <GoBack>Plany</GoBack>
      <StyledSection>
        {renderTrainingDays}
        <AnimatePresence>
          {isEdit && (
            <ButtonWrapper
              as={motion.div}
              key="endEditBtn"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <Button rounded size="m" callback={endEdit}>
                Zakończ edycję
              </Button>
            </ButtonWrapper>
          )}
        </AnimatePresence>
      </StyledSection>
    </Wrapper>
  );
};

export default ChooseTrainingDay;
