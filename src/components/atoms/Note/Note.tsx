import { useState, useEffect } from "react";
import { lightFormat } from "date-fns";
import { useForm, SubmitHandler } from "react-hook-form";
import { StyledNote, DetailsWrapper } from "./Note.style";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getUser } from "slices/authSlice";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { trainingActions } from "slices/trainingsSlice";

type NoteTypes = {
  note: { message: string; date: number; id: string };
  pathSuffix: string;
};

type InputTypes = {
  note: string;
};

const Note = ({ note: { message, date, id }, pathSuffix }: NoteTypes) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const {
    register,
    formState: { errors },
    setFocus,
    handleSubmit,
  } = useForm<InputTypes>({ shouldUnregister: true });

  const [isEdited, setIsEdited] = useState(false);
  const edit = () => setIsEdited(true);

  const endEdit = () => setIsEdited(false);

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    if (!isEdited) {
      edit();
      return;
    }

    const dataToUpdate = {
      [`users/${user?.uid}/${pathSuffix}/${id}/message`]: data.note,
    };

    dispatch(trainingSessionsActions.updateSession(dataToUpdate));

    endEdit();
  };

  const deleteNote = () => {
    const payload = {
      path: `users/${user?.uid}/${pathSuffix}/${id}`,
      message: "Usunięto notatkę",
      isFullPath: true,
    };
    dispatch(trainingActions.deleteLocation(payload));
  };

  useEffect(() => {
    if (!isEdited) return;
    setFocus("note");
  }, [setFocus, isEdited]);

  return (
    <StyledNote
      as={motion.form}
      isError={!!errors.note}
      layout
      onSubmit={handleSubmit(onSubmit)}
    >
      {isEdited ? (
        <textarea
          
          {...register("note", {
            value: message,
            required: "To pole jest wymagane",
          })}
        />
      ) : (
        <p>{message}</p>
      )}
      <DetailsWrapper as={motion.div} layout>
        <button>{isEdited ? "Zakończ" : "Edytuj"}</button>
        <button type="button" onClick={deleteNote}>
          Usuń
        </button>
        <span>{lightFormat(new Date(date), "dd.MM.yyyy HH:mm")}</span>
      </DetailsWrapper>
    </StyledNote>
  );
};

export default Note;
