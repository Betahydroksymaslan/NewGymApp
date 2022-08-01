import React from "react";
import { Wrapper, Marker } from "./GoBack.style";
import { useNavigate } from "react-router-dom";

type GoBackTypes = {
  children?: string;
};

const GoBack = ({ children }: GoBackTypes) => {
  let navigate = useNavigate();
  const goPreviousPage = () => navigate(-1);

  return (
    <Wrapper onClick={goPreviousPage}>
      <Marker />
      <span>{children}</span>
    </Wrapper>
  );
};

export default GoBack;
