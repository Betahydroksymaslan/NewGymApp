import { ReactNode } from "react";
import { Template } from "./MainPageTemplate.style";
import { motion } from "framer-motion";

type TemplateTypes = {
  children: ReactNode;
};

const MainPageTemplate = ({ children }: TemplateTypes) => {
  return (
    <Template
      as={motion.div}
      initial={{ x: -window.innerWidth}}
      animate={{ x: 0 }}
      transition={{ type: "linear" }}
      exit={{
        x: window.innerWidth,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </Template>
  );
};

export default MainPageTemplate;
