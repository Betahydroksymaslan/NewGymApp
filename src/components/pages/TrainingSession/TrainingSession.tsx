import React, { useState } from "react";
import { ExerciseWrapper } from "./TrainingSession.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getTrainings } from "slices/trainingsSlice";
import { motion, AnimatePresence, MotionValue } from "framer-motion";

const TrainingSession = () => {
  const { trainingDay, trainingName } = useParams();
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const training = trainings
    ?.find((item) => item.planName === trainingName)
    ?.trainingDays.find((item) => item.dayName === trainingDay);

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
  console.log("previous:", prev, "current:", value);
  return (
    <MainPageTemplate>
      <AnimatePresence exitBeforeEnter>
        <ExerciseWrapper
          as={motion.section}
          key={training?.exercises[value].exerciseName}
          initial={{ x: value > prev ? window.innerWidth : -window.innerWidth }}
          animate={{ x: 0, transition: { duration: 0.15, type: "linear" } }}
          exit={{
            x: value > prev || value === 0 ? -window.innerWidth : window.innerWidth,
            transition: { duration: 0.15, type: "linear" },
          }}
        >
          {training?.exercises[value].exerciseName}
        </ExerciseWrapper>
      </AnimatePresence>

      <button onClick={previous}>previous</button>
      <button onClick={next}>next</button>
    </MainPageTemplate>
  );
};

export default TrainingSession;
