import {
  TrainingInProgress,
  TrainingNameSpan,
  StyledSpan,
  MainBox,
  MainContentWrapper,
  SideBox,
  Tittle,
  Text
} from "./Home.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import Button from "components/atoms/Button/Button";
import { ReactComponent as MoonSleeping } from "assets/images/moonSleeping.svg";
import { useLocalStorage } from "hooks/useLocalStorage";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { checkGender } from "helpers/checkGender";
import { getUser } from "slices/authSlice";
import { useAppSelector } from "store/hooks";
import { ReactComponent as HomeImageOne } from "assets/images/homeImage_1.svg";
import { ReactComponent as HomeImageTwoo } from "assets/images/homeImage_2.svg";
import { ReactComponent as HomeImageThree } from "assets/images/homeImage_3.svg";
import { ReactComponent as HomeImageFour } from "assets/images/homeImage_4.svg";
import { ReactComponent as HomeImageFive } from "assets/images/homeImage_5.svg";

const Home = () => {
  const user = useAppSelector(getUser);
  const [lastSession, setLastSession] = useLocalStorage("lastTrainingSession", {lastSession: "nieznany", planName: " "})
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
        <MainBox>
          
          <HomeImageOne />
          <Tittle>Ostatni trening:</Tittle>
          <Text>{`${lastSession.lastSession} (${lastSession.planName})`}</Text>
        </MainBox>

        <SideBox>
          <HomeImageTwoo />
        </SideBox>

        <SideBox>
          <HomeImageThree />
        </SideBox>

        <SideBox>
          <HomeImageFive />
        </SideBox>

        <SideBox>
          <HomeImageFour />
        </SideBox>

      </MainContentWrapper>
    </MainPageTemplate>
  );
};

export default Home;
