import React from "react";
import Login from "components/pages/Login/Login";
import Register from "components/pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import { SIGNIN, SIGNUP } from "constants/routes";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path={SIGNIN} element={<Login />} />
      <Route path={SIGNUP} element={<Register />} />
    </Routes>
  );
};

export default UnauthenticatedApp;
