import { AppWrapper } from "./App.styles";
import { useAppSelector } from "store/hooks";
import { getLoadingState } from "slices/apiCallSlice";
import Loader from "components/atoms/Loader/Loader";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "helpers/PrivateRoute";
import { HOME, SIGNIN, SIGNUP } from "constants/routes";
import Login from "components/pages/Login/Login";
import Register from "components/pages/Register/Register";
import Home from "components/pages/Home/Home";
import Navigation from "components/organisms/Navigation/Navigation";
import { getUser } from "slices/authSlice";

function App() {
  const user = useAppSelector(getUser);
  const isLoading = useAppSelector(getLoadingState);
  const location = useLocation();

  console.log(user);

  return (
    <AppWrapper>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={HOME} element={<Home />} />
        </Route>
        <Route path={SIGNIN} element={<Login />} />
        <Route path={SIGNUP} element={<Register />} />
      </Routes>
      {location.pathname !== SIGNIN && location.pathname !== SIGNUP && <Navigation />
        }

      {isLoading && <Loader />}
    </AppWrapper>
  );
}

export default App;
