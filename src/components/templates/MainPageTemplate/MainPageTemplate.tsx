import { ReactNode } from "react";
import { Template } from "./MainPageTemplate.style";
import { motion } from "framer-motion";
import { slidePageAnimation } from "assets/animations/pageAnimation";

type TemplateTypes = {
  children: ReactNode;
  padding?: string;
};

const MainPageTemplate = ({ children, padding }: TemplateTypes) => {
  return (
    <Template
      as={motion.div}
      variants={slidePageAnimation}
      initial="hidden"
      animate="slideIn"
      exit="slideOut"
      padding={padding}
    >
      {children}
    </Template>
  );
};

export default MainPageTemplate;
