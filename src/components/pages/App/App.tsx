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
} from "constants/routes";
import Login from "components/pages/Login/Login";
import Register from "components/pages/Register/Register";
import Home from "components/pages/Home/Home";
import Navigation from "components/organisms/Navigation/Navigation";
import Account from "components/pages/Account/Account";
import Trainings from "components/pages/Trainings/Trainings";
import ChooseTrainingDay from "../ChooseTrainingDay/ChooseTrainingDay";
import TrainingDay from "components/pages/TrainingDay/TrainingDay";

function App() {
  const isLoading = useAppSelector(getLoadingState);
  const location = useLocation();
  
  return (
    <AppWrapper>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<Home />} />
          <Route path={ACCOUNT} element={<Account />} />
          <Route path={TRAININGS} element={<Trainings />} />
          <Route path={TRAINING_DAYS} element={<ChooseTrainingDay />} />
          <Route path={TRAINING_DAY} element={<TrainingDay />} />
        </Route>
        <Route path={SIGNIN} element={<Login />} />
        <Route path={SIGNUP} element={<Register />} />
      </Routes>
      {location.pathname !== SIGNIN && location.pathname !== SIGNUP && (
        <Navigation />
      )}

      {isLoading && <Loader />}
    </AppWrapper>
  );
}

export default App;
