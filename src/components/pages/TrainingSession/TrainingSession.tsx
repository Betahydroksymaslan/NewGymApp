import { useState } from "react";
import {
  ExerciseWrapper,
  PageWrapper,
  ArrowsWrapper,
  Back,
  Circle,
  MainImageWrapper,
  ActualScore,
  RepsButton,
  RepsButtonsWrapper,
  EndSessionBoard,
} from "./TrainingSession.style";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { getTrainings } from "slices/trainingsSlice";
import { getUser } from "slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";
import { ReactComponent as ManJumping } from "assets/images/manJumping.svg";
import { ReactComponent as WomanDoingSquats } from "assets/images/womanDoingSquats.svg";
import { ReactComponent as EndOfTrainingImage } from "assets/images/endTrainingImage.svg";
import OptionsList from "components/molecules/OptionsList/OptionsList";
import { BiMessageAltAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "components/atoms/Button/Button";
import { useLocalStorage } from "hooks/useLocalStorage";
import ConfirmationDialog from "components/organisms/ConfirmationDialog/ConfirmationDialog";
import Modal from "components/templates/Modal/Modal";
import { HOME } from "constants/routes";
import { getTime } from "date-fns";

type ModalsTypes = "confirmEndSession" | "endOfTrainingBoard";

const TrainingSession = () => {
  const { trainingDay, trainingName, sessionId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);

  let navigate = useNavigate();
  const goPreviousPage = () => navigate(-1);

  const [isSessionActive, setIsSessionActive] = useLocalStorage(
    "activeTrainingSession",
    {
      isActive: true,
      path: "none",
    }
  );
  const [value, setValue] = useState(0);
  const [prev, setPrev] = useState(0);

  const next = () => {
    if (value === (training?.exercises.length as number) - 1) return;

    setValue((prevState) => {
      setPrev(prevState);
      return prevState + 1;
    });
  };

  const previous = () => {
    if (value === 0) return;

    setValue((prevState) => {
      setPrev(prevState);
      return prevState - 1;
    });
  };

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const [modals, setModals] = useState({
    confirmEndSession: false,
    endOfTrainingBoard: false,
  });

  const openModal = (modalName: ModalsTypes) =>
    setModals((prevState) => ({ ...prevState, [modalName]: true }));

  const closeModal = (modalName: ModalsTypes) =>
    setModals((prevState) => ({ ...prevState, [modalName]: false }));

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REPS BUTTONS AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const buttonsNumber =
    training?.exercises &&
    training?.exercises[value].repsQuantityTo -
      training?.exercises[value].repsQuantityFrom +
      1;

  const updateReps = (repsNumber: number) => {
    if (!user || !training) return;
    const ref = `users/${user.uid}/trainingPlans/${trainingName}/trainingDays/${training?.dayId}/exercises/${training?.exercises[value].trainingId}/actualRep`;

    const updates = { [ref]: repsNumber };

    dispatch(trainingSessionsActions.updateSession(updates));
  };

  const renderRepsButtons = Array.from(
    { length: buttonsNumber as number },
    (_, i) => i + (training?.exercises[value].repsQuantityFrom as number)
  ).map((item) => (
    <RepsButton
      key={item}
      isActive={item <= (training?.exercises[value].actualRep as number)}
      onClick={() => updateReps(item)}
    >
      {item}
    </RepsButton>
  ));

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! END SESSION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const handleEndSession = () => {
    setIsSessionActive({ isActive: false, path: "none" });
    openModal("confirmEndSession");
  };

  const goToCloseSessionBoard = () => {
    openModal("endOfTrainingBoard");
    closeModal("confirmEndSession");

    if (user && training) {
      const ref = `users/${user.uid}/trainingSessions/${sessionId}`;
      const date = new Date();
      const updates = { [`${ref}/endTrainingDate`]: getTime(date) };

      dispatch(trainingSessionsActions.updateSession(updates));

      for (let item of training?.exercises) {
        const updates = {
          [`${ref}/exercises/${item.trainingId}/repsTo`]: item.actualRep,
          [`${ref}/exercises/${item.trainingId}/weightTo`]:
            item.startWeightOrReps,
        };

        dispatch(trainingSessionsActions.updateSession(updates));
      }
    }
  };

  const closeSessionBoard = () => {
    closeModal("endOfTrainingBoard");
    navigate(HOME);
  };

  return (
    <PageWrapper
      as={motion.section}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
    >
      <ArrowsWrapper>
        <Back onClick={goPreviousPage}>
          <div></div>
        </Back>
        <OptionsList
          circular
          dotsTheme="black"
          options={[
            {
              text: "dodaj notatkę",
              callback: () => {},
              icon: <BiMessageAltAdd />,
            },
          ]}
        />
      </ArrowsWrapper>

      <AnimatePresence exitBeforeEnter>
        <MainImageWrapper
          as={motion.div}
          key={training?.exercises[value].exerciseName}
          initial={{ x: window.innerWidth, y: -50 }}
          animate={{ x: 0, transition: { delay: 0.3 } }}
          exit={{ x: -window.innerWidth }}
        >
          <ManJumping />
        </MainImageWrapper>
        <Circle
          as={motion.div}
          key={training?.exercises[value].exerciseName}
          initial={{ x: -window.innerWidth }}
          animate={{ x: 0, transition: { delay: 0.3 } }}
          exit={{ x: window.innerWidth }}
        />
      </AnimatePresence>

      <AnimatePresence exitBeforeEnter>
        <ExerciseWrapper
          as={motion.section}
          key={training?.exercises[value].exerciseName}
          initial={{ y: "120%" }}
          animate={{ y: 0, transition: { duration: 0.2, type: "linear" } }}
          exit={{
            y: "120%",
            transition: { duration: 0.2, type: "linear" },
          }}
        >
          <h2>{training?.exercises[value].exerciseName}</h2>
          <ActualScore suffix={training?.exercises[value].repsOrWeight}>
            {training?.exercises[value].startWeightOrReps}
          </ActualScore>

          <RepsButtonsWrapper>{renderRepsButtons}</RepsButtonsWrapper>
          <Button callback={handleEndSession}>Zakończ trening</Button>
        </ExerciseWrapper>
      </AnimatePresence>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Modal
        isOpen={modals.confirmEndSession}
        handleClose={() => closeModal("confirmEndSession")}
      >
        <ConfirmationDialog
          body="Jesteś pewien, że chcesz zakończyć obecnie trwającą sesję treningową?"
          handleClose={() => closeModal("confirmEndSession")}
          callback={goToCloseSessionBoard}
        />
      </Modal>

      <Modal
        isOpen={modals.endOfTrainingBoard}
        handleClose={() => closeModal("endOfTrainingBoard")}
      >
        <EndSessionBoard>
          <EndOfTrainingImage />
          <h2>Gratulacje! Ukończyłeś swój trening :)</h2>
          <Button size="l" rounded wide callback={closeSessionBoard}>
            Wróć do menu
          </Button>
        </EndSessionBoard>
      </Modal>
    </PageWrapper>
  );
};

export default TrainingSession;
