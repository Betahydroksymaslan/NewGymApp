import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";

const Stats = () => {
  const sessions = useAppSelector(getTrainingSessions);

  console.log(sessions);

  return <MainPageTemplate>statystyki</MainPageTemplate>;
};

export default Stats;
