import React from "react";
import { useAppSelector } from "store/hooks";
import { getUser } from "slices/authSlice";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";

const Home = () => {
  const user = useAppSelector(getUser);
  return (
    <MainPageTemplate>
      <span>{user?.email}</span>
    </MainPageTemplate>
  );
};

export default Home;
