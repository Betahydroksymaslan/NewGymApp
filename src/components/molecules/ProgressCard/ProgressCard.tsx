import React from "react";
import {
  CardWrapper,
  Indicator,
  Tittle,
  Text,
  ProgressIndicator,
} from "./ProgressCard.style";
import { AiFillLock } from "react-icons/ai";

type ProgressCardType = {
  tittle: string;
  body: string;
  order: number;
  step: number;
  callback: () => void;
};

const countState = (step: number, order: number) => {
  if (step + 1 === order) return "start";
  if (step + 1 > order) return "complete";
  return "locked";
};

const ProgressCard = ({
  tittle,
  body,
  order,
  step,
  callback,
}: ProgressCardType) => {
  const callPropsFunction = () => {
    if (countState(step, order) === "start") {
      callback();
    }
  };

  return (
    <CardWrapper state={countState(step, order)} onClick={callPropsFunction}>
      <Tittle state={countState(step, order)}>{tittle}</Tittle>
      <Text state={countState(step, order)}>{body}</Text>
      <ProgressIndicator state={countState(step, order)}>
        {countState(step, order) === "locked" ? (
          <AiFillLock />
        ) : (
          <span>
            {countState(step, order) === "complete" ? "Ukończono" : "Start"}
          </span>
        )}
      </ProgressIndicator>
      <Indicator state={countState(step, order)}>{order}</Indicator>
    </CardWrapper>
  );
};

export default ProgressCard;
