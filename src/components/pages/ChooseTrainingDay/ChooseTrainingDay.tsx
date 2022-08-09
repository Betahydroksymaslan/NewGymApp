import {
  Wrapper,
  StyledSection,
  TrainingDay,
  DetailsWrapper,
} from "./ChooseTrainingDay.style";
import { useParams } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import GoBack from "components/atoms/GoBack/GoBack";
import { ReactComponent as ClockIcon } from "assets/icons/clockIcon.svg";
import { ReactComponent as ExerciseIcon } from "assets/icons/exerciseIcon.svg";
import { TRAININGS } from "constants/routes";
import { motion } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";

const ChooseTrainingDay = () => {
  let { trainingName } = useParams();
  const trainings = useAppSelector(getTrainings);
  const currentTraining = trainings?.find(
    (item) => item.planName === trainingName
  );

  const renderTrainingDays = currentTraining?.trainingDays.map((item) => (
    <StyledLink
      to={`${TRAININGS}/${trainingName}/${item.dayName}`}
      key={item.dayName}
    >
      <TrainingDay>
        <span>{trainingName}</span>
        <h2>{item.dayName}</h2>
        <DetailsWrapper>
          <ExerciseIcon /> <span>{item.exercises.length} ćwiczeń</span>
          <ClockIcon /> <span>120 min</span>
        </DetailsWrapper>
      </TrainingDay>
    </StyledLink>
  ));
  return (
    <Wrapper
      as={motion.div}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
    >
      <GoBack>Plany</GoBack>
      <StyledSection>{renderTrainingDays}</StyledSection>
    </Wrapper>
  );
};

export default ChooseTrainingDay;
