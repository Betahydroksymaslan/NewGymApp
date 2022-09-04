import React from "react";
import {
  Wrapper,
  SessionHeader,
  ExercisesWrapper,
  Exercise,
  ExerciseName,
  ExerciseScores,
  StyledParagraph,
  Entity,
} from "./SessionReport.style";
import Button from "components/atoms/Button/Button";
import { TrainingSessionsHistory } from "models/trainingSessionsModel";
import { lightFormat } from "date-fns";

type SessionReportTypes = {
  handleClose: () => void;
  choosenSession: TrainingSessionsHistory;
};

const SessionReport = ({ handleClose, choosenSession }: SessionReportTypes) => {
  console.log(choosenSession);

  const checkProgress = (
    weightFrom: number,
    weightTo: number,
    repsFrom: number,
    repsTo: number
  ) => {
    if (weightFrom === weightTo && repsFrom === repsTo) return "info";
    if (weightTo > weightFrom || repsTo > repsFrom) return "success";
    return "error";
  };

  const checkProgressByValues = (x: number, y: number) => {
    if (x === y) return "info";
    if (y > x) return "success";
    return "error";
  };

  const renderExercises = choosenSession?.exercises.map((item) => {
    const progressType = checkProgress(
      item.weightFrom,
      item.weightTo as number,
      item.repsFrom,
      item.repsTo as number
    );

    return (
      <Exercise key={item.exerciseId} progressType={progressType}>
        <ExerciseName>{item.exerciseName}</ExerciseName>

        <StyledParagraph
          progressType={checkProgressByValues(
            item.weightFrom,
            item.weightTo as number
          )}
        >
          <ExerciseScores suffix="kg">{item.weightFrom}</ExerciseScores>
          {item.weightFrom !== item.weightTo && (
            <>
              <Entity>&#10230;</Entity>
              <ExerciseScores suffix="kg">{item.weightTo}</ExerciseScores>
            </>
          )}
        </StyledParagraph>

        <StyledParagraph
          progressType={
            item.weightFrom < (item.weightTo as number)
              ? "success"
              : checkProgressByValues(item.repsFrom, item.repsTo as number)
          }
        >
          <ExerciseScores suffix="p">
            {item.weightFrom < (item.weightTo as number)
              ? item.repsTo
              : item.repsFrom}
          </ExerciseScores>

          {item.repsFrom !== item.repsTo &&
            item.weightFrom >= (item.weightTo as number) && (
              <>
                <Entity>&#10230;</Entity>
                <ExerciseScores suffix="p">{item.repsTo}</ExerciseScores>
              </>
            )}
        </StyledParagraph>
      </Exercise>
    );
  });

  return (
    <Wrapper>
      <SessionHeader>
        <h1>{`${choosenSession?.dayName} (${choosenSession?.trainingName})`}</h1>
        <span>
          {lightFormat(
            new Date(choosenSession?.startTrainingDate as number),
            "dd.MM.yyyy"
          )}
        </span>
        <span>
          {lightFormat(
            new Date(choosenSession?.startTrainingDate as number),
            "HH:mm"
          )}{" "}
          -{" "}
          {lightFormat(
            new Date(choosenSession?.endTrainingDate as number),
            "HH:mm"
          )}
        </span>
      </SessionHeader>

      <ExercisesWrapper>{renderExercises}</ExercisesWrapper>

      <Button callback={handleClose} wide size="m" rounded>
        Wróć
      </Button>
    </Wrapper>
  );
};

export default SessionReport;
