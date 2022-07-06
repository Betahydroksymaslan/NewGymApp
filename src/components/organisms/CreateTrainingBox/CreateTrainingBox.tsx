import React, { useState } from "react";
import { Wrapper } from "./CreateTrainingBox.style";
import ProgressCard from "components/molecules/ProgressCard/ProgressCard";

interface StepsDataType {
    order: number;
    tittle: string;
    body: string;
}

const stepsData: StepsDataType[] = [
  {
    order: 1,
    tittle: "Nazwij plan",
    body: "Konkretny trening będzie można tu znaleźć pod nazwą jaką mu nadasz",
  },
  {
    order: 2,
    tittle: "Podaj specyfikę",
    body: "Dobierz odpowiednie parametry treningu, takie jak ilość dni treningowych czy rodzaj treningu",
  },
  {
    order: 3,
    tittle: "Dodaj ćwiczenie",
    body: "Dodaj swoje pierwsze ćwiczenie. Później będziesz mógł do tego wrócić i dodawać kolejne ćwiczenia",
  },
];

const CreateTrainingBox = () => {
  const [step, setStep] = useState(3);
  const setNextStep = () => setStep(prevState => prevState +1)

  const renderCards = stepsData.map(card => (
    <ProgressCard order={card.order} tittle={card.tittle} body={card.body} step={step} />
  ))

  return (
    <Wrapper step={step}>
      {renderCards}
    </Wrapper>
  );
};

export default CreateTrainingBox;
