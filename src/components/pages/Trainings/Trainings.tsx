import { useState, useEffect } from "react";
import {
  SvgWrapper,
  StyledHeader,
  TrainingPlanButton,
  TrainingPlansWrapper,
  AddNewTrainingPlanButton,
} from "./Trainings.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { ReactComponent as ManWorkout } from "assets/images/manWorkout.svg";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getUser } from "slices/authSlice";
import { getUserName, checkGender } from "helpers/checkGender";
import CreateTrainingBox from "components/organisms/CreateTrainingBox/CreateTrainingBox";
import Modal from "components/templates/Modal/Modal";
import NameTrainingPlan from "components/organisms/NameTrainingPlan/NameTrainingPlan";
import NameTrainingDays from "components/organisms/NameTrainingDays/NameTrainingDays";
import AddExercise from "components/organisms/AddExercise/AddExercise";
import { getTrainings } from "slices/trainingsSlice";
import { ReactComponent as ManDoingWorkout } from "assets/images/manDoingExercise.svg";
import { ReactComponent as WomanDoingWorkout } from "assets/images/womanDoingExercise.svg";
import { ReactComponent as ThreeGirlsTraining } from "assets/images/threeGirlsDoingExercises.svg";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { TRAININGS } from "constants/routes";
import { motion } from "framer-motion";

export type ModalsNamesTypes = "firstModal" | "secondModal" | "thirdModal";

const Trainings = () => {
  const user = useAppSelector(getUser);
  const userName = getUserName(user?.displayName as string);

  const trainings = useAppSelector(getTrainings);
  const targetTraining = trainings?.find((training) => training.step !== 3);

  /* !!!!!!!!!!!!!!!!!!! ADD NEW TRAINING LOGIC !!!!!!!!!!!!!!!!!!! */

  /* let addNewPlanRef = useRef(null); */
  const [activeAddNewPlan, setActiveAddNewPlan] = useState(false);
  const addNewTrainingPlan = () => {
    setActiveAddNewPlan(true);
    /* if (addNewPlanRef.current) {
      addNewPlanRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    } */
  };

  const [modals, setModals] = useState({
    firstModal: false,
    secondModal: false,
    thirdModal: false,
  });
  const openModal = (modal: ModalsNamesTypes) =>
    setModals({ ...modals, [modal]: true });
  const closeModal = (modal: ModalsNamesTypes) =>
    setModals({ ...modals, [modal]: false });

  const headerString =
    trainings?.length === 1 && targetTraining
      ? `Hej ${userName}! Wygląda na to, że nie ${
          checkGender(userName) === "male" ? "dodałeś" : "dodałaś"
        } jeszcze
  treningu!`
      : `Hej ${userName}, wybierz plan!`;

  /* !!!!!!!!!!!!!!!!!!! RENDER TRAINING PLANS !!!!!!!!!!!!!!!!!!! */

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const renderTrainingPlans = trainings
    ?.filter((item) => item.step === 3)
    .map((item) => (
      <StyledLink to={`${TRAININGS}/${item.planName}`} key={item.planId}>
        <TrainingPlanButton>
          {checkGender(userName) === "male" ? (
            <ManDoingWorkout />
          ) : (
            <WomanDoingWorkout />
          )}
          <h1>{item.planName}</h1>
          <span>{item.shortDescription}</span>
        </TrainingPlanButton>
      </StyledLink>
    ));

  useEffect(() => {
    if (!targetTraining) return;

    addNewTrainingPlan();
  }, [targetTraining]);

  return (
    <MainPageTemplate>
      <SvgWrapper>
        <ManWorkout />
      </SvgWrapper>
      <StyledHeader>{headerString}</StyledHeader>

      <TrainingPlansWrapper
        as={motion.div}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {renderTrainingPlans}
        {activeAddNewPlan ? (
          <CreateTrainingBox
            targetTraining={targetTraining}
            openModals={openModal}
          />
        ) : (
          <AddNewTrainingPlanButton as={motion.div} variants={item} onClick={addNewTrainingPlan}>
            <ThreeGirlsTraining />
            <h1>Dodaj nowy trening</h1>
          </AddNewTrainingPlanButton>
        )}
      </TrainingPlansWrapper>

      {/* !!!!!!!!!!!! FIRST STEP !!!!!!!!!!!! */}

      <Modal
        isOpen={modals.firstModal}
        handleClose={() => closeModal("firstModal")}
        shouldCloseOnOverlayClick={false}
      >
        <NameTrainingPlan closeModal={closeModal} />
      </Modal>

      {/* !!!!!!!!!!!! SECOND STEP !!!!!!!!!!!! */}

      <Modal
        isOpen={modals.secondModal}
        handleClose={() => closeModal("secondModal")}
        shouldCloseOnOverlayClick={false}
      >
        <NameTrainingDays
          planName={targetTraining?.planName as string}
          closeModal={closeModal}
        />
      </Modal>

      {/* !!!!!!!!!!!! THIRD STEP !!!!!!!!!!!! */}

      <Modal
        isOpen={modals.thirdModal}
        handleClose={() => closeModal("thirdModal")}
        shouldCloseOnOverlayClick={false}
      >
        <AddExercise
          planName={targetTraining?.planName as string}
          training={targetTraining}
          closeModal={closeModal}
        />
      </Modal>
    </MainPageTemplate>
  );
};

export default Trainings;
