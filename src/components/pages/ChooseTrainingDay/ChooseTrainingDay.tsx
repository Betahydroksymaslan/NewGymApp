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
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { trainingActions } from "slices/trainingsSlice";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import Modal from "components/templates/Modal/Modal";
import { useForm } from "react-hook-form";
import FormField from "components/molecules/FormField/FormField";
import { v4 as uuid } from "uuid";

type ModalsType = "isEdit" | "addNewDayModal" | "editDayName";

type InputsTypes = {
  dayName: string;
};

const ChooseTrainingDay = () => {
  let { trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const currentTraining = trainings?.find(
    (item) => item.planName === trainingName
  );

  const [choosenDay, setChoosenDay] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsTypes>();

  const [modals, setModals] = useState({
    isEdit: false,
    addNewDayModal: false,
    editDayName: false,
  });

  const openModal = (name: ModalsType) =>
    setModals({ ...modals, [name]: true });
  const closeModal = (name: ModalsType) =>
    setModals({ ...modals, [name]: false });

  const renderTrainingDays = currentTraining?.trainingDays.map((item) => {
    const deleteItem = () => {
      const payload = { path: `${trainingName}/trainingDays/${item.dayId}` };
      dispatch(trainingActions.deleteLocation(payload));
    };

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
            <ClockIcon /> <span>120 min</span>
          </DetailsWrapper>
          {modals.isEdit && (
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
              <EditDayNameButton
                as={motion.button}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openModal("editDayName")}
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

  const changeDayName = (data: { dayName: string }) => {
    const payload = {
      dayName: data.dayName,
      planName: trainingName as string,
      dayId: uuid(),
    };
    dispatch(trainingActions.addNewTrainingDay(payload));
    closeModal("addNewDayModal");
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
        ]}
        customPosition={{ top: 10, right: 10 }}
        dotsTheme="white"
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

      <Modal
        isOpen={modals.addNewDayModal}
        handleClose={() => closeModal("addNewDayModal")}
      >
        <StyledForm onSubmit={handleSubmit(changeDayName)}>
          <h2>Nazwij trening</h2>
          <FormField
            variant="secondary"
            id="dayName"
            {...register("dayName", { required: "to pole jest wymgane" })}
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
        handleClose={() => closeModal("addNewDayModal")}
      >
        <StyledForm onSubmit={handleSubmit(changeDayName)}>
          <h2>Wybierz nową nazwę</h2>
          <FormField
            variant="secondary"
            id="dayName"
            {...register("dayName", { required: "to pole jest wymgane" })}
            isError={!!errors.dayName}
            errorMessage={errors?.dayName?.message}
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
