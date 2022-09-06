import Modal from "components/templates/Modal/Modal";
import React from "react";
import { StyledForm, StyledHeader } from "./AddNote.style";
import Textarea from "components/atoms/Textarea/Textarea";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import { ReactComponent as XIcon } from "assets/icons/XIcon.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "store/hooks";
import StyledCheckbox from "components/atoms/StyledCheckbox/StyledCheckbox";
import Tooltip from "components/atoms/Tooltip/Tooltip";
import { trainingSessionsActions } from "slices/trainingSessionSlice";
import { v4 as uuid } from "uuid";
import { getTime } from "date-fns";

type AddNoteTypes = {
  isOpen: boolean;
  handleClose: () => void;
  pathPrimary: string;
  pathSecondary?: string;
  checkbox?: {
    label: string;
    isChecked?: boolean;
    tooltip?: {
      message: string;
    };
  };
};

type InputType = {
  note: string;
  checkbox: boolean;
};

const AddNote = ({
  isOpen,
  handleClose,
  checkbox,
  pathPrimary,
  pathSecondary,
}: AddNoteTypes) => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<InputType>({
    defaultValues: {
      checkbox: checkbox?.isChecked,
    },
  });

  const watchCheckbox = watch("checkbox");

  const renderCheckbox = checkbox?.tooltip ? (
    <Tooltip message={checkbox.tooltip.message}>
      <StyledCheckbox
        {...register("checkbox")}
        label={checkbox.label}
        id="checkbox"
        isChecked={watchCheckbox}
      />
    </Tooltip>
  ) : (
    <StyledCheckbox
      {...register("checkbox")}
      label={checkbox?.label as string}
      id="checkbox"
      isChecked={watchCheckbox}
    />
  );

  const onSubmit: SubmitHandler<InputType> = (data) => {
    console.log(data);
    const date = new Date();
    const noteId = uuid()

    const noteData = {
      path: data.checkbox ? (`${pathSecondary}/${noteId}` as string) : `${pathPrimary}/${noteId}`,
      message: {
        message: data.note,
        id: noteId,
        date: getTime(date),
      },
    };

    dispatch(trainingSessionsActions.addNote(noteData));
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InlineWrapper justifyContent="space-around">
          <XIcon onClick={handleClose} />
          <StyledHeader>Dodaj notatkę</StyledHeader>
        </InlineWrapper>
        <Textarea
          {...register("note", { required: "Pole jest wymagane" })}
          isError={!!errors.note}
          errorMessage={errors.note?.message}
        />
        {checkbox && renderCheckbox}
        <Button size="m" wide>
          Dodaj
        </Button>
      </StyledForm>
    </Modal>
  );
};

export default AddNote;
