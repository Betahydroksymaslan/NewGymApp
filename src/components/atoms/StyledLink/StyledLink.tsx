import { ReactNode } from "react";
import { NewLink } from "./StyledLink.style";

type LinkTypes = {
  children: string | ReactNode;
  to: string;
};

const StyledLink = ({ children, to }: LinkTypes) => {
  return <NewLink to={to}>{children}</NewLink>;
};

export default StyledLink;
