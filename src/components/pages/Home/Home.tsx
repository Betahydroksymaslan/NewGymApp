import {
  TrainingInProgress,
  TrainingNameSpan,
  StyledSpan,
  MainBox,
  Tittle,
  StatsTile,
  StyledSubHeader,
  StatsGrid,
  LastTrainingBox,
} from "./Home.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import Button from "components/atoms/Button/Button";
import { ReactComponent as MoonSleeping } from "assets/images/moonSleeping.svg";
import { useLocalStorage } from "hooks/useLocalStorage";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { checkGender } from "helpers/checkGender";
import { getUser } from "slices/authSlice";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";
import { ReactComponent as HomeImageOne } from "assets/images/homeImage_1.svg";
import { pl } from "date-fns/locale";
import { isThisWeek, isThisMonth, format } from "date-fns";
import { ReactComponent as HomeImageTwoo } from "assets/images/homeImage_2.svg";
/* import { ReactComponent as HomeImageThree } from "assets/images/homeImage_3.svg"; */

const Home = () => {
  const user = useAppSelector(getUser);
  const userName = (user?.displayName as string).split(" ")[0]
  const sessions = useAppSelector(getTrainingSessions)?.filter(
    (item) => item.endTrainingDate
  );
  const sessionsThisWeek = sessions?.filter((item) =>
    isThisWeek(item.startTrainingDate, { weekStartsOn: 1 })
  ).length;
  const sessionsThisMonth = sessions?.filter((item) =>
    isThisMonth(item.startTrainingDate)
  ).length;
  const nameOfThisMonth = format(new Date(), "LLLL", {locale: pl})
  const [lastSession, setLastSession] = useLocalStorage("lastTrainingSession", {
    lastSession: "-",
    planName: "-",
  });
  const [isSessionActive, setIsSessionActive] = useLocalStorage(
    "activeTrainingSession",
    {
      isActive: false,
      path: "none",
      dayName: "",
      trainingName: "",
    }
  );
  console.log(sessions);
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

      <MainBox>
        <HomeImageOne />
        <span>Witaj</span>
        <Tittle>{`${userName}!`}</Tittle>
      </MainBox>

      <StyledSubHeader>Ukończone treningi</StyledSubHeader>
      <StatsGrid>
        <LastTrainingBox>
          <HomeImageTwoo />
          <span>Ostatni ukończony trening</span>
          <span>{`${lastSession.lastSession} (${lastSession.planName})`}</span>
        </LastTrainingBox>
        <StatsTile>
          <h3>tydzień</h3>
          <span>{sessionsThisWeek}</span>
        </StatsTile>
        <StatsTile>
          <h3>{nameOfThisMonth}</h3>
          <span>{sessionsThisMonth}</span>
        </StatsTile>
        <StatsTile>
          <h3>Wszystkie</h3>
          <span>{sessions?.length}</span>
        </StatsTile>
      </StatsGrid>
    </MainPageTemplate>
  );
};

export default Home;
