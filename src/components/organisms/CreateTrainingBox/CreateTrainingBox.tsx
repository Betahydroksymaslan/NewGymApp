import { forwardRef, ForwardedRef } from "react";
import { Wrapper } from "./CreateTrainingBox.style";
import ProgressCard from "components/molecules/ProgressCard/ProgressCard";
import { ModalsNamesTypes } from "components/pages/Trainings/Trainings";
import { TrainingPlan } from "models/trainingsModel";

type CreateTrainingBoxType = {
  openModals: (val: ModalsNamesTypes) => void;
  targetTraining: TrainingPlan | undefined;
};

interface StepsDataType {
  order: number;
  tittle: string;
  body: string;
  ref?: ForwardedRef<HTMLDivElement>;
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
    body: "Ustal ilość dni treningoowych w tygodniu i nazwij je",
  },
  {
    order: 3,
    tittle: "Dodaj ćwiczenie",
    body: "Dodaj swoje pierwsze ćwiczenie. Później będziesz mógł do tego wrócić i dodawać kolejne",
  },
];

const CreateTrainingBox = forwardRef<HTMLDivElement, CreateTrainingBoxType>(
  ({ openModals, targetTraining }, ref) => {
    const renderCards = stepsData.map((card, index) => {
      const openSpecifyModal = () => {
        if (index === 0) return openModals("firstModal");
        if (index === 1) return openModals("secondModal");
        if (index === 2) return openModals("thirdModal");
      };

      return (
        <ProgressCard
          callback={openSpecifyModal}
          key={card.order}
          order={card.order}
          tittle={card.tittle}
          body={card.body}
          step={targetTraining ? targetTraining.step : 0}
        />
      );
    });

    return (
      <Wrapper ref={ref} step={targetTraining ? targetTraining.step : 0}>
        <span>{targetTraining && targetTraining.planName}</span>
        {renderCards}
      </Wrapper>
    );
  }
);

export default CreateTrainingBox;
