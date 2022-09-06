import {
  TrainingInProgress,
  TrainingNameSpan,
  StyledSpan,
  MainBox,
  MainContentWrapper,
  SideBox
} from "./Home.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import Button from "components/atoms/Button/Button";
import { ReactComponent as MoonSleeping } from "assets/images/moonSleeping.svg";
import { useLocalStorage } from "hooks/useLocalStorage";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { checkGender } from "helpers/checkGender";
import { getUser } from "slices/authSlice";
import { useAppSelector } from "store/hooks";

const Home = () => {
  const user = useAppSelector(getUser);
  const [isSessionActive, setIsSessionActive] = useLocalStorage(
    "activeTrainingSession",
    {
      isActive: false,
      path: "none",
      dayName: "",
      trainingName: "",
    }
  );

  return (
    <MainPageTemplate padding="40px 5% 100px">
      {isSessionActive.isActive && (
        <TrainingInProgress>
          <StyledSpan>{`${
            checkGender(user?.displayName as string) === "male"
              ? "Rozpocząłeś"
              : "Rozpoczęłaś"
          } trening!`}</StyledSpan>
          <TrainingNameSpan>{`${isSessionActive.dayName} (${isSessionActive.trainingName})`}</TrainingNameSpan>
          <MoonSleeping />
          <StyledLink to={isSessionActive.path}>
            <Button withArrow rounded size="s">
              Kontynuuj
            </Button>
          </StyledLink>
        </TrainingInProgress>
      )}

      <MainContentWrapper>
        <MainBox />
        <SideBox />
        <SideBox />
        <SideBox />
        <SideBox />
      </MainContentWrapper>
    </MainPageTemplate>
  );
};

export default Home;
