import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  StartTrainingWrapper,
  StartTrainingButton,
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
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { TRAININGS } from "constants/routes";

type ModalsNames =
  | "isAddingNewExerciseVisible"
  | "confirmDeleteExercise"
  | "confirmStartTraining";

const TrainingDay = () => {
  const navigate = useNavigate();
  const { trainingDay, trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);

  const [defaultValuesToUpdate, setDefaultValuesToUpdate] = useState<
    DefaultValuesToUpdate | undefined
  >();

  const [modals, setModals] = useState({
    isAddingNewExerciseVisible: false,
    confirmDeleteExercise: false,
    confirmStartTraining: false,
  });
  const openModal = (modal: ModalsNames) =>
    setModals({ ...modals, [modal]: true });
  const closeModal = (modal: ModalsNames, callback?: () => void) => {
    setModals({ ...modals, [modal]: false });
    callback && callback();
  };

  const renderExercises = training?.exercises?.map((item) => {
    const defaultValuesData = {
      defaultProgress: item.defaultProgress.toString(),
      exerciseName: item.exerciseName,
      numberOfSeries: item.numberOfSeries,
      repsOrWeight: item.repsOrWeight,
      repsQuantityFrom: item.repsQuantityFrom,
      repsQuantityTo: item.repsQuantityTo,
      startWeightOrReps: item.startWeightOrReps,
      order: item.order,
    };

    return (
      <Exercise key={item.trainingId}>
        <ListOrder>{item.order < 10 ? `0${item.order}` : item.order}</ListOrder>
        <ListTime>15 min</ListTime>
        <ListName>{item.exerciseName}</ListName>
        <OptionsList
          options={[
            { icon: <TbListDetails />, text: "Szczegóły", callback: () => {} },
            {
              icon: <FiEdit />,
              text: "Edytuj",
              callback: () => {
                setDefaultValuesToUpdate(defaultValuesData);
                openModal("isAddingNewExerciseVisible");
              },
            },
            {
              icon: <MdDeleteOutline />,
              text: "Usuń",
              callback: () => {
                setDefaultValuesToUpdate(defaultValuesData);
                openModal("confirmDeleteExercise");
              },
            },
          ]}
        />
      </Exercise>
    );
  });

  const removeExercise = () => {
    const payload = {
      path: `${trainingName}/trainingDays/${trainingDay}/exercises/${defaultValuesToUpdate?.exerciseName}`,
    };
    dispatch(trainingActions.deleteLocation(payload));
    setDefaultValuesToUpdate(undefined);
    closeModal("confirmDeleteExercise");
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
        <ol>{renderExercises}</ol>
        <AddNewTrainingButton
          onClick={() => openModal("isAddingNewExerciseVisible")}
        >
          Dodaj nowe ćwiczenie +
        </AddNewTrainingButton>
      </BottomSection>

      <StartTrainingWrapper>
        <StartTrainingButton onClick={() => openModal("confirmStartTraining")}>
          Rozpocznij trening!
        </StartTrainingButton>
      </StartTrainingWrapper>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Modal
        isOpen={modals.isAddingNewExerciseVisible}
        handleClose={() => closeModal("isAddingNewExerciseVisible")}
        shouldCloseOnOverlayClick={false}
      >
        <AddExercise
          type={defaultValuesToUpdate ? "update" : "add"}
          defaultValuesToUpdate={defaultValuesToUpdate}
          goToNextStep={trainingDay}
          planName={trainingName as string}
          closeModal={() =>
            closeModal("isAddingNewExerciseVisible", () =>
              setDefaultValuesToUpdate(undefined)
            )
          }
        />
      </Modal>

      <Modal
        isOpen={modals.confirmDeleteExercise}
        handleClose={() =>
          closeModal("confirmDeleteExercise", () =>
            setDefaultValuesToUpdate(undefined)
          )
        }
      >
        <ConfirmationDialog
          handleClose={() =>
            closeModal("confirmDeleteExercise", () =>
              setDefaultValuesToUpdate(undefined)
            )
          }
          callback={removeExercise}
          body={`Ćwiczenie ${defaultValuesToUpdate?.exerciseName} zostanie trwale usunięte, nie będzie możliwości cofnięcia tej akcji`}
        />
      </Modal>

      <Modal
        isOpen={modals.confirmStartTraining}
        handleClose={() =>
          closeModal("confirmStartTraining", () =>
            setDefaultValuesToUpdate(undefined)
          )
        }
      >
        <ConfirmationDialog
          handleClose={() =>
            closeModal("confirmStartTraining", () =>
              setDefaultValuesToUpdate(undefined)
            )
          }
          callback={() =>
            navigate(
              `${TRAININGS}/${trainingName}/${trainingDay}/new_training_session`
            )
          }
          body="Rozpoczynając trening zostaje też naliczany czas. Jeśli chcesz tylko zapoznać się ze ze szczegółami treningu wybierz opcję - szczegóły"
        />
      </Modal>
    </Wrapper>
  );
};

export default TrainingDay;
