import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TopSection,
  BottomSection,
  DetailsWrapper,
  Exercise,
  ListName,
  ListOrder,
  AddNewTrainingButton,
  Wrapper,
  BikeWrapper,
  StartTrainingWrapper,
  StartTrainingButton,
  ExerciseDetalis,
  StyledSpan,
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
import {
  getTrainingSessions,
  trainingSessionsActions,
} from "slices/trainingSessionSlice";
import { v4 as uuid } from "uuid";
import { TrainingSessionPayload } from "models/trainingSessionsModel";
import { getTime } from "date-fns";
import { useLocalStorage } from "hooks/useLocalStorage";
import { calcAverageTime } from "helpers/calcTimeLength";
import Button from "components/atoms/Button/Button";

type ModalsNames =
  | "isAddingNewExerciseVisible"
  | "confirmDeleteExercise"
  | "confirmStartTraining"
  | "isSessionActive"
  | "exerciseDetalis";

const TrainingDay = () => {
  const [isSessionActive, setIsSessionActive] = useLocalStorage(
    "activeTrainingSession",
    {
      isActive: false,
      path: "none",
    }
  );
  
  const navigate = useNavigate();
  const { trainingDay, trainingName } = useParams();
  const dispatch = useAppDispatch();

  const sessions = useAppSelector(getTrainingSessions)?.filter(
    (item) => item.endTrainingDate && item.dayName === trainingDay
  );
  const averageData = sessions?.map((item) => ({
    timeFrom: item.startTrainingDate,
    timeTo: item.endTrainingDate,
  }));
  const averageTrainingTime = calcAverageTime(averageData);

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
    isSessionActive: false,
    exerciseDetalis: false,
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
      trainingId: item.trainingId,
      dayId: item.dayId,
      actualRep: item.actualRep,
    };

    return (
      <Exercise key={item.trainingId}>
        <ListOrder>{item.order < 10 ? `0${item.order}` : item.order}</ListOrder>
        <ListName>{item.exerciseName}</ListName>
        <OptionsList
          options={[
            {
              icon: <TbListDetails />,
              text: "Szczegóły",
              callback: () => {
                setDefaultValuesToUpdate(defaultValuesData);
                openModal("exerciseDetalis");
              },
            },
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
      path: `${trainingName}/trainingDays/${training?.dayId}/exercises/${defaultValuesToUpdate?.trainingId}`,
    };
    dispatch(trainingActions.deleteLocation(payload));
    setDefaultValuesToUpdate(undefined);
    closeModal("confirmDeleteExercise");
  };

  const startTrainingSession = () => {
    if (!training) return;
    const sessionId = uuid();
    const date = new Date();
    const exercisesPayload = training?.exercises.map((item) => {
      return {
        exerciseName: item.exerciseName,
        exerciseId: item.trainingId,
        weightFrom: item.startWeightOrReps,
        repsFrom: item.actualRep,
        weightOrReps: item.repsOrWeight,
      };
    });

    const data: TrainingSessionPayload = {
      sessionData: {
        trainingSessionId: sessionId,
        dayId: training?.dayId,
        dayName: training?.dayName,
        trainingName: trainingName as string,
        startTrainingDate: getTime(date),
      },

      exercises: exercisesPayload,
    };

    const localStorageData = {
      isActive: true,
      path: `${TRAININGS}/${trainingName}/${trainingDay}/${sessionId}`,
      dayName: trainingDay,
      trainingName: trainingName,
    };

    dispatch(trainingSessionsActions.addNewTrainingSession(data));
    setIsSessionActive(localStorageData);
    navigate(`${TRAININGS}/${trainingName}/${trainingDay}/${sessionId}`);
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
          <ClockIcon /> <span>{`${averageTrainingTime} min`}</span>
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
        <StartTrainingButton
          disabled={!training?.exercises.length}
          onClick={() =>
            isSessionActive.isActive
              ? openModal("isSessionActive")
              : openModal("confirmStartTraining")
          }
        >
          Rozpocznij trening!
        </StartTrainingButton>
      </StartTrainingWrapper>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS AREA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Modal
        isOpen={modals.exerciseDetalis}
        handleClose={() => closeModal("exerciseDetalis")}
      >
        <ExerciseDetalis>
          <h1>{defaultValuesToUpdate?.exerciseName}</h1>
          <StyledSpan size="s">Planowo</StyledSpan>
          <StyledSpan suffix="s">
            {defaultValuesToUpdate?.numberOfSeries}
          </StyledSpan>
          <StyledSpan suffix="p">{`${defaultValuesToUpdate?.repsQuantityFrom} - ${defaultValuesToUpdate?.repsQuantityTo}`}</StyledSpan>
          <StyledSpan size="s">Aktualny wynik</StyledSpan>
          <StyledSpan
            suffix={
              defaultValuesToUpdate?.repsOrWeight === "weight" ? "kg" : "p"
            }
          >
            {defaultValuesToUpdate?.startWeightOrReps}
          </StyledSpan>
          <StyledSpan suffix="p">{defaultValuesToUpdate?.actualRep}</StyledSpan>
          <Button size="m" wide callback={() => closeModal("exerciseDetalis")}>
            Wróć
          </Button>
        </ExerciseDetalis>
      </Modal>

      <Modal
        isOpen={modals.isAddingNewExerciseVisible}
        handleClose={() => closeModal("isAddingNewExerciseVisible")}
        shouldCloseOnOverlayClick={false}
      >
        <AddExercise
          type={defaultValuesToUpdate ? "update" : "add"}
          defaultValuesToUpdate={defaultValuesToUpdate}
          goToNextStep={{
            dayName: trainingDay as string,
            dayId: training?.dayId as string,
          }}
          planName={trainingName as string}
          closeModal={() =>
            closeModal("isAddingNewExerciseVisible", () =>
              setDefaultValuesToUpdate(undefined)
            )
          }
        />
      </Modal>

      <ConfirmationDialog
        isOpen={modals.confirmDeleteExercise}
        handleClose={() =>
          closeModal("confirmDeleteExercise", () =>
            setDefaultValuesToUpdate(undefined)
          )
        }
        callback={removeExercise}
        body={`Ćwiczenie ${defaultValuesToUpdate?.exerciseName} zostanie trwale usunięte, nie będzie możliwości cofnięcia tej akcji`}
      />

      <ConfirmationDialog
        isOpen={modals.confirmStartTraining}
        handleClose={() =>
          closeModal("confirmStartTraining", () =>
            setDefaultValuesToUpdate(undefined)
          )
        }
        callback={startTrainingSession}
        body="Rozpoczynając trening zostaje też naliczany czas. Jeśli chcesz tylko zapoznać się ze ze szczegółami treningu wybierz opcję - szczegóły"
      />

      <ConfirmationDialog
        isOpen={modals.isSessionActive}
        header="Masz już trwający trening"
        body="Został już rozpoczęty trening, czy chcesz go kontynuować?"
        handleClose={() => closeModal("isSessionActive")}
        callback={() => navigate(isSessionActive.path)}
      />
    </Wrapper>
  );
};

export default TrainingDay;
