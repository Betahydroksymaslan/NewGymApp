import React, {useState} from "react";
import { SvgWrapper, StyledHeader } from "./Trainings.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { ReactComponent as ManWorkout } from "assets/images/manWorkout.svg";
import { useAppSelector } from "store/hooks";
import { getUser } from "slices/authSlice";
import { getUserName, checkGender } from "helpers/checkGender";
import CreateTrainingBox from "components/organisms/CreateTrainingBox/CreateTrainingBox";

const Trainings = () => {
    const [trainingCreateProgress, setTrainingCreateProgress] = useState(0);

  const user = useAppSelector(getUser);
  const userName = getUserName(user?.displayName as string);
  const headerString = `Hej ${userName}! Wygląda na to, że nie ${
    checkGender(userName) === "male" ? "dodałeś" : "dodałaś"
  } jeszcze
  treningu!`;

  return (
    <MainPageTemplate>
      <SvgWrapper>
        <ManWorkout />
      </SvgWrapper>
      <StyledHeader>{headerString}</StyledHeader>
      <CreateTrainingBox />
    </MainPageTemplate>
  );
};

export default Trainings;
