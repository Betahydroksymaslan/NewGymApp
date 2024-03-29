import { useMemo, useState, useRef, useEffect } from "react";
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
  UpdateMainScoreButton,
  TrainingName,
  NextPrevBtton,
  InlineGridWrapper,
  RepsButtonBoxName,
  SeriesWrapper,
} from "./TrainingSession.style";
import { useParams } from "react-router-dom";
import { increment } from "firebase/database";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { getTrainings } from "slices/trainingsSlice";
import { getUser } from "slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";
import { ReactComponent as ManJumping } from "assets/images/manJumping.svg";
import { ReactComponent as WomanDoingSquats } from "assets/images/womanDoingSquats.svg";
import { ReactComponent as ManDoingPullUp } from "assets/images/manDoingPullUp.svg";
import { ReactComponent as ManDoingOHP } from "assets/images/manDoingOHP.svg";
import { ReactComponent as ManRunning } from "assets/images/manRunning.svg";
import { ReactComponent as ManRunningTwoo } from "assets/images/manRunning2.svg";
import { ReactComponent as SeriesIcon } from "assets/icons/series_icon.svg";
import OptionsList from "components/molecules/OptionsList/OptionsList";
import { useNavigate } from "react-router-dom";
import Button from "components/atoms/Button/Button";
import { useLocalStorage } from "hooks/useLocalStorage";
import ConfirmationDialog from "components/organisms/ConfirmationDialog/ConfirmationDialog";
import Modal from "components/templates/Modal/Modal";
import { HOME } from "constants/routes";
import { getTime } from "date-fns";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import IncreaseDecreaseDialog from "components/organisms/IncreaseDecreaseDialog/IncreaseDecreaseDialog";
import { AiOutlineComment } from "react-icons/ai";
import AddNote from "components/organisms/AddNote/AddNote";
import Note from "components/molecules/Notes/Notes";
import { db, ref, onValue } from "assets/firebase/firebase";
import EndOfTrainingBoard from "components/organisms/EndOfTrainingBoard/EndOfTrainingBoard";

type ModalsTypes =
  | "confirmEndSession"
  | "endOfTrainingBoard"
  | "updateMainScoreByCustomValue"
  | "addNote";

const TrainingSession = () => {
  const { trainingDay, trainingName, sessionId } = useParams();
  const [lastSession, setLastSession] = useLocalStorage("lastTrainingSession", {
    lastSession: "",
    planName: "",
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);

  let navigate = useNavigate();
  const goPreviousPage = () => navigate(-1);

  /* !!!!!!!!!!!!!!!! GET ACTUAL TREINING SESSION !!!!!!!!!!!!!!!!!!!!!!!!*/

  useEffect(() => {
    if (!user) return
    const sessionRef = `users/${user.uid}/trainingSessions/${sessionId}`;
    const referenceSession = ref(db, sessionRef);
    onValue(referenceSession, (snapshot) => {
      const data = snapshot.val();
      dispatch(trainingSessionsActions.getSession(data));
    });
    
  }, []);

  const [isSessionActive, setIsSessionActive] = useLocalStorage(
    "activeTrainingSession",
    {
      isActive: true,
      path: "none",
      dayName: "",
      trainingName: "",
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

  const mainImages = [
    <ManJumping />,
    <ManRunning />,
    <ManDoingPullUp />,
    <ManDoingOHP />,
    <ManRunningTwoo />,
  ];
  const getRandom = useMemo(
    () => Math.floor(Math.random() * (0 + mainImages.length) + 0),
    [value]
  );
  const renderMainImage = mainImages[getRandom];

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REPS SCROLLER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const scrollerRef = useRef<HTMLDivElement>(null);

  const moveRepsToLastCompleteItem = () => {
    const numberOfActiveElements =
      training?.exercises &&
      training?.exercises[value].actualRep -
        training?.exercises[value].repsQuantityFrom;
    const elementsConvertedToPixels =
      typeof numberOfActiveElements === "number" && numberOfActiveElements * 65;

    const offset = elementsConvertedToPixels;

    if (scrollerRef.current && typeof offset === "number") {
      scrollerRef.current.scrollLeft += offset;
    }
  };

  const moveRepsToStart = () => {
    if (!scrollerRef.current) return;

    scrollerRef.current.scrollLeft = 0;
  };

  const moveRepsByOneBox = () => {
    if (!scrollerRef.current) return;

    scrollerRef.current.scrollLeft += 65;
  };

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const [modals, setModals] = useState({
    confirmEndSession: false,
    endOfTrainingBoard: false,
    updateMainScoreByCustomValue: false,
    addNote: false,
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

    /* moveRepsByOneBox(); */
  };

  const repsArray = Array.from(
    { length: buttonsNumber as number },
    (_, i) => i + (training?.exercises[value].repsQuantityFrom as number)
  );

  const renderRepsButtons = repsArray.map((item) => (
    <RepsButton
      key={item}
      isActive={item <= (training?.exercises[value].actualRep as number)}
      onClick={() => updateReps(item)}
    >
      {item}
    </RepsButton>
  ));

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! UPDATE ACTUAL MAIN SCORE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const updateMainScoreByDefaultValue = () => {
    if (!user || !training) return;

    const ref = `users/${user.uid}/trainingPlans/${trainingName}/trainingDays/${training?.dayId}/exercises/${training?.exercises[value].trainingId}`;

    const updates = {
      [`${ref}/startWeightOrReps`]: increment(
        training.exercises[value].defaultProgress
      ),
      [`${ref}/actualRep`]: training.exercises[value].repsQuantityFrom,
    };

    dispatch(trainingSessionsActions.updateSession(updates));

    moveRepsToStart();
  };

  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! END SESSION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

  const handleEndSession = () => {
    setIsSessionActive({
      isActive: false,
      path: "",
      dayName: "",
      trainingName: "",
    });
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
    setLastSession({
      lastSession: trainingDay as string,
      planName: trainingName as string,
    });
    closeModal("endOfTrainingBoard");
    navigate(HOME);
  };
  if (!training) return null;
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
              callback: () => openModal("addNote"),
              icon: <AiOutlineComment />,
            },
          ]}
        />
      </ArrowsWrapper>

      <AnimatePresence exitBeforeEnter>
        <MainImageWrapper
          as={motion.div}
          key={training?.exercises[value].exerciseName}
          initial={{ x: window.innerWidth, y: -50 }}
          animate={{ x: 0 /* , transition: { delay: 0.3 }  */ }}
          exit={{ x: -window.innerWidth }}
        >
          {renderMainImage}
        </MainImageWrapper>
        <Circle
          as={motion.div}
          key={training?.exercises[value].exerciseName}
          initial={{ x: -window.innerWidth }}
          animate={{ x: 0 /* , transition: { delay: 0.3 }  */ }}
          exit={{ x: window.innerWidth }}
        />
      </AnimatePresence>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EXERCISE AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <AnimatePresence exitBeforeEnter>
        <ExerciseWrapper
          as={motion.section}
          key={training?.exercises[value].exerciseName}
          initial={{ y: "120%" }}
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          animate={{
            y: 0,
            transition: {
              duration: 0.2,
              type: "linear",
              onComplete: moveRepsToLastCompleteItem,
            },
          }}
          exit={{
            y: "120%",
            transition: { duration: 0.2, type: "linear" },
          }}
        >
          <InlineGridWrapper>
            <NextPrevBtton onClick={previous} disabled={value === 0}>
              <div></div>
            </NextPrevBtton>

            <TrainingName>
              {training?.exercises[value].exerciseName}
            </TrainingName>

            <NextPrevBtton
              right
              onClick={next}
              disabled={value === (training?.exercises.length as number) - 1}
            >
              <div></div>
            </NextPrevBtton>
          </InlineGridWrapper>

          <SeriesWrapper>
            <SeriesIcon />
            <span>
              Serie:{" "}
              <strong>{training?.exercises[value].numberOfSeries}</strong>
            </span>
          </SeriesWrapper>

          <ActualScore suffix={training?.exercises[value].repsOrWeight}>
            {training?.exercises[value].startWeightOrReps}
          </ActualScore>

          {training.exercises[value].notes.length > 0 && (
            <Note
              pathSuffix={`trainingPlans/${trainingName}/trainingDays/${training?.dayId}/exercises/${training?.exercises[value].trainingId}/notes`}
              notes={training?.exercises[value].notes}
            />
          )}

          <InlineWrapper>
            <UpdateMainScoreButton onClick={updateMainScoreByDefaultValue}>
              +{training?.exercises[value].defaultProgress}
            </UpdateMainScoreButton>
            <UpdateMainScoreButton
              onClick={() => openModal("updateMainScoreByCustomValue")}
            >
              +/-
            </UpdateMainScoreButton>
          </InlineWrapper>

          <RepsButtonBoxName>
            <RepsButtonsWrapper ref={scrollerRef}>
              {renderRepsButtons}
            </RepsButtonsWrapper>
          </RepsButtonBoxName>

          <Button callback={handleEndSession} wide>
            Zakończ trening
          </Button>
        </ExerciseWrapper>
      </AnimatePresence>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <AddNote
        isOpen={modals.addNote}
        pathPrimary={`trainingPlans/${trainingName}/trainingDays/${training?.dayId}/exercises/${training?.exercises[value].trainingId}/notes`}
        pathSecondary={`trainingSessions/${sessionId}/exercises/${training?.exercises[value].trainingId}/notes`}
        checkbox={{
          label: "dodaj wyłącznie dla tej sesji",
          tooltip: {
            message:
              "Notatka zostanie dołączona wyłącznie dla obecnie trwającej sesji i będzie widoczna tylko w historii treningów",
          },
        }}
        handleClose={() => closeModal("addNote")}
      />

      <ConfirmationDialog
        isOpen={modals.confirmEndSession}
        body="Jesteś pewien, że chcesz zakończyć obecnie trwającą sesję treningową?"
        handleClose={() => closeModal("confirmEndSession")}
        callback={goToCloseSessionBoard}
      />

      <Modal
        isOpen={modals.updateMainScoreByCustomValue}
        handleClose={() => closeModal("updateMainScoreByCustomValue")}
      >
        <IncreaseDecreaseDialog
          refPath={`users/${user?.uid}/trainingPlans/${trainingName}/trainingDays/${training?.dayId}/exercises/${training?.exercises[value].trainingId}`}
          handleClose={() => closeModal("updateMainScoreByCustomValue")}
          repsQuantityFrom={training.exercises[value].repsQuantityFrom}
        />
      </Modal>

      <Modal
        isOpen={modals.endOfTrainingBoard}
        handleClose={() => closeModal("endOfTrainingBoard")}
      >
       <EndOfTrainingBoard closeSessionBoard={closeSessionBoard} />
      </Modal>
    </PageWrapper>
  );
};

export default TrainingSession;
