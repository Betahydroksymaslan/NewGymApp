import { useState } from "react";
import {
  Wrapper,
  StyledSection,
  TrainingDay,
  DetailsWrapper,
  EditWrapper,
  ButtonWrapper,
  DeleteButton,
  StyledForm,
  EditDayNameButton,
  TimeSpan,
} from "./ChooseTrainingDay.style";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import GoBack from "components/atoms/GoBack/GoBack";
import { ReactComponent as ClockIcon } from "assets/icons/clockIcon.svg";
import { ReactComponent as ExerciseIcon } from "assets/icons/exerciseIcon.svg";
import { HOME, TRAININGS } from "constants/routes";
import { motion } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";
import OptionsList from "components/molecules/OptionsList/OptionsList";
import { FiEdit } from "react-icons/fi";
import Button from "components/atoms/Button/Button";
import { AnimatePresence } from "framer-motion";
import {
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { trainingActions } from "slices/trainingsSlice";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import Modal from "components/templates/Modal/Modal";
import { useForm } from "react-hook-form";
import FormField from "components/molecules/FormField/FormField";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { v4 as uuid } from "uuid";
import { calcAverageTime } from "helpers/calcTimeLength";
import ConfirmationDialog from "components/organisms/ConfirmationDialog/ConfirmationDialog";
import { useLocalStorage } from "hooks/useLocalStorage";
import { calcTimeLength, calcHoursAndMinutes } from "helpers/calcTimeLength";

type ModalsType =
  | "isEdit"
  | "addNewDayModal"
  | "editDayName"
  | "deleteTrainingDay"
  | "deleteTrainingPlan";

type InputsTypes = {
  dayName: string;
};

type InputDayNameType = { updatedDayName: string };

const ChooseTrainingDay = () => {
  const navigate = useNavigate();
  let { trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const sessions = useAppSelector(getTrainingSessions);
  const currentTraining = trainings?.find(
    (item) => item.planName === trainingName
  );

  const [minMaxVal, setMinMaxVal] = useLocalStorage("minMaxVal", {
    minVal: 20,
    maxVal: 180,
  });

  const filterSessions = (startSession: number, endSession: number) => {
    const sessionTime = calcTimeLength(startSession, endSession);

    return sessionTime <= minMaxVal.maxVal && sessionTime >= minMaxVal.minVal;
  };

  const [choosenDay, setChoosenDay] = useState<
    undefined | { dayId: string; dayName: string }
  >(undefined);
  console.log(choosenDay);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsTypes>();

  const {
    register: registerDayName,
    handleSubmit: handleSubmitDayName,
    formState: { errors: errorsDayName },
  } = useForm<InputDayNameType>({
    defaultValues: { updatedDayName: choosenDay?.dayName },
    shouldUnregister: true,
  });

  const [modals, setModals] = useState({
    isEdit: false,
    addNewDayModal: false,
    editDayName: false,
    deleteTrainingDay: false,
    deleteTrainingPlan: false,
  });

  const openModal = (name: ModalsType) =>
    setModals({ ...modals, [name]: true });
  const closeModal = (name: ModalsType) =>
    setModals({ ...modals, [name]: false });

  const renderTrainingDays = currentTraining?.trainingDays.map((item) => {
    const filteredSessions = sessions?.filter(
      (session) =>
        session.endTrainingDate &&
        session.dayName === item.dayName &&
        filterSessions(session.startTrainingDate, session.endTrainingDate)
    );
    const averageData = filteredSessions?.map((item) => ({
      timeFrom: item.startTrainingDate,
      timeTo: item.endTrainingDate,
    }));
    const averageTrainingTime = calcAverageTime(averageData);
    const averageTimeConverted = calcHoursAndMinutes(averageTrainingTime);

    return (
      <StyledLink
        to={
          modals.isEdit ? "#" : `${TRAININGS}/${trainingName}/${item.dayName}`
        }
        key={item.dayName}
      >
        <TrainingDay as={motion.div}>
          <span>{trainingName}</span>
          <h2>{item.dayName}</h2>
          <DetailsWrapper>
            <ExerciseIcon /> <span>{item.exercises.length} ćwiczeń</span>
            <ClockIcon />{" "}
            <div>
              <TimeSpan suffix="g">{averageTimeConverted.hours}</TimeSpan>{" "}
              <TimeSpan suffix="min">{averageTimeConverted.minutes}</TimeSpan>
            </div>
          </DetailsWrapper>
          {modals.isEdit && (
            <EditWrapper>
              <DeleteButton
                onClick={() => {
                  setChoosenDay({
                    dayId: item.dayId as string,
                    dayName: item.dayName as string,
                  });
                  openModal("deleteTrainingDay");
                }}
                as={motion.button}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AiTwotoneDelete />
                usuń
              </DeleteButton>

              <EditDayNameButton
                as={motion.button}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setChoosenDay({
                    dayId: item.dayId as string,
                    dayName: item.dayName as string,
                  });
                  openModal("editDayName");
                }}
              >
                <AiTwotoneEdit />
                zmień nazwę
              </EditDayNameButton>
            </EditWrapper>
          )}
        </TrainingDay>
      </StyledLink>
    );
  });

  const deleteTrainingPlan = () => {
    const payload = {
      path: `${trainingName}`,
    };
    dispatch(trainingActions.deleteLocation(payload));
    closeModal("deleteTrainingPlan");
    navigate(HOME);
  };

  const deleteTrainingDay = () => {
    const payload = {
      path: `${trainingName}/trainingDays/${choosenDay?.dayId}`,
    };
    dispatch(trainingActions.deleteLocation(payload));
    closeModal("deleteTrainingDay");
  };

  const addNewDayName = (data: { dayName: string }) => {
    const payload = {
      dayName: data.dayName,
      planName: trainingName as string,
      dayId: uuid(),
    };
    dispatch(trainingActions.addNewTrainingDay(payload));
    closeModal("addNewDayModal");
  };

  const changeDayName = (data: { updatedDayName: string }) => {
    const payload = {
      dayName: data.updatedDayName,
      planName: trainingName as string,
      dayId: choosenDay?.dayId as string,
    };
    dispatch(trainingActions.updateDayName(payload));
    closeModal("editDayName");
  };

  return (
    <Wrapper
      as={motion.div}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
    >
      <OptionsList
        options={[
          {
            text: "Edytuj",
            icon: <FiEdit />,
            callback: () => openModal("isEdit"),
          },
          {
            text: "Usuń plan",
            icon: <AiOutlineDelete />,
            callback: () => openModal("deleteTrainingPlan"),
          },
        ]}
        customPosition={{ top: 15, right: 15 }}
        circular
        dotsTheme="black"
      />
      <GoBack>Plany</GoBack>
      <StyledSection>
        {renderTrainingDays}

        <AnimatePresence>
          {modals.isEdit && (
            <InlineWrapper>
              <ButtonWrapper
                positionType="static"
                as={motion.div}
                key="addNewDay"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
              >
                <Button
                  btnType="secondary"
                  callback={() => openModal("addNewDayModal")}
                  size="m"
                  rounded
                >
                  Dodaj nowy
                </Button>
              </ButtonWrapper>
            </InlineWrapper>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {modals.isEdit && (
            <ButtonWrapper
              as={motion.div}
              key="endEditBtn"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <Button rounded size="m" callback={() => closeModal("isEdit")}>
                Zakończ edycję
              </Button>
            </ButtonWrapper>
          )}
        </AnimatePresence>
      </StyledSection>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <ConfirmationDialog
        isOpen={modals.deleteTrainingPlan}
        handleClose={() => closeModal("deleteTrainingPlan")}
        body="Spowoduje to usunięcie całego planu treningowego"
        callback={deleteTrainingPlan}
      />

      <ConfirmationDialog
        isOpen={modals.deleteTrainingDay}
        handleClose={() => closeModal("deleteTrainingDay")}
        body={`Jesteś pewien, że chcesz usunąć ${choosenDay?.dayName}?`}
        callback={deleteTrainingDay}
      />

      <Modal
        isOpen={modals.addNewDayModal}
        handleClose={() => closeModal("addNewDayModal")}
      >
        <StyledForm onSubmit={handleSubmit(addNewDayName)}>
          <h2>Nazwij trening</h2>
          <FormField
            variant="secondary"
            id="dayName"
            {...register("dayName", {
              required: "to pole jest wymgane",
              pattern: {
                value: /^[A-Za-z0-9-ąśćżźęóń]+$/,
                message: "Wartość nie może zawierać znaków specjalnych",
              },
            })}
            isError={!!errors.dayName}
            errorMessage={errors?.dayName?.message}
          />
          <InlineWrapper>
            <Button rounded size="m">
              Dodaj
            </Button>
            <Button
              rounded
              size="m"
              btnType="secondary"
              type="button"
              callback={() => closeModal("addNewDayModal")}
            >
              Wróć
            </Button>
          </InlineWrapper>
        </StyledForm>
      </Modal>

      <Modal
        isOpen={modals.editDayName}
        handleClose={() => closeModal("editDayName")}
      >
        <StyledForm onSubmit={handleSubmitDayName(changeDayName)}>
          <h2>Wybierz nową nazwę</h2>
          <FormField
            variant="secondary"
            id="dayName"
            {...registerDayName("updatedDayName", {
              required: "to pole jest wymgane",
              pattern: {
                value: /^[A-Za-z0-9-ąśćżźęóń]+$/,
                message: "Wartość nie może zawierać znaków specjalnych",
              },
            })}
            isError={!!errorsDayName.updatedDayName}
            errorMessage={errorsDayName?.updatedDayName?.message}
          />
          <InlineWrapper>
            <Button rounded size="m">
              Zmień
            </Button>
            <Button
              rounded
              size="m"
              btnType="secondary"
              type="button"
              callback={() => closeModal("editDayName")}
            >
              Wróć
            </Button>
          </InlineWrapper>
        </StyledForm>
      </Modal>
    </Wrapper>
  );
};

export default ChooseTrainingDay;
