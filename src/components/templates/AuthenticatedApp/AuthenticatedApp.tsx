import React from "react";
import Home from "components/pages/Home/Home";
import { HOME } from "constants/routes";
import { Route, Routes } from "react-router-dom";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
    </Routes>
  );
};

export default AuthenticatedApp;
