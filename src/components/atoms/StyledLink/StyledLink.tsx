import { ReactNode } from "react";
import { NewLink } from "./StyledLink.style";

type LinkTypes = {
  children: string | ReactNode;
  to: string;
};

const StyledLink = ({ children, to, ...rest }: LinkTypes) => {
  return (
    <NewLink to={to} {...rest}>
      {children}
    </NewLink>
  );
};

export default StyledLink;
