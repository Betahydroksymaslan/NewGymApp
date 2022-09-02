import { ReactNode } from "react";
import { Wrapper } from "./InlineWrapper.style";

type InlineWrapperTypes = {
  children: ReactNode;
  justifyContent?: string;
};

const InlineWrapper = ({ children, justifyContent }: InlineWrapperTypes) => {
  return <Wrapper justifyContent={justifyContent}>{children}</Wrapper>;
};

export default InlineWrapper;
