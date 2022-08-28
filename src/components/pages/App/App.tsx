import { AppWrapper } from "./App.styles";
import { useAppSelector } from "store/hooks";
import { getLoadingState } from "slices/apiCallSlice";
import Loader from "components/atoms/Loader/Loader";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "helpers/PrivateRoute";
import {
  HOME,
  SIGNIN,
  SIGNUP,
  ACCOUNT,
  TRAININGS,
  TRAINING_DAYS,
  TRAINING_DAY,
  TRAINING_SESSION,
  STATS,
} from "constants/routes";
import Login from "components/pages/Login/Login";
import Register from "components/pages/Register/Register";
import Home from "components/pages/Home/Home";
import Navigation from "components/organisms/Navigation/Navigation";
import Account from "components/pages/Account/Account";
import Trainings from "components/pages/Trainings/Trainings";
import ChooseTrainingDay from "../ChooseTrainingDay/ChooseTrainingDay";
import TrainingDay from "components/pages/TrainingDay/TrainingDay";
import TrainingSession from "components/pages/TrainingSession/TrainingSession";
import Stats from "components/pages/Stats/Stats";
import { AnimatePresence } from "framer-motion";

function App() {
  const isLoading = useAppSelector(getLoadingState);
  const location = useLocation();

  function checkPath(input: string) {
    let regex = /NewGymApp\/trainings\/[a-zA-Z]+/i;
    return !regex.test(input);
  }

  return (
    <AppWrapper>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route element={<PrivateRoute />}>
            <Route path={HOME} element={<Home />} />
            <Route path={ACCOUNT} element={<Account />} />
            <Route path={TRAININGS} element={<Trainings />} />
            <Route path={STATS} element={<Stats />} />
            <Route path={TRAINING_DAYS} element={<ChooseTrainingDay />} />
            <Route path={TRAINING_DAY} element={<TrainingDay />} />
            <Route path={TRAINING_SESSION} element={<TrainingSession />} />
          </Route>
          <Route path={SIGNIN} element={<Login />} />
          <Route path={SIGNUP} element={<Register />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {location.pathname !== SIGNIN &&
          location.pathname !== SIGNUP &&
          checkPath(location.pathname) && <Navigation />}
      </AnimatePresence>

      {isLoading && <Loader />}
    </AppWrapper>
  );
}

export default App;
