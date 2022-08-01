import { ReactNode } from "react";
import { Wrapper } from "./InlineWrapper.style";

type InlineWrapperTypes = {
  children: ReactNode;
};

const InlineWrapper = ({ children }: InlineWrapperTypes) => {
  return <Wrapper>{children}</Wrapper>;
};

export default InlineWrapper;
