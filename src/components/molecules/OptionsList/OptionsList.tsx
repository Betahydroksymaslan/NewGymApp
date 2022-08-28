import { useState, useRef } from "react";
import { Wrapper, Dot, List, Option } from "./OptionsList.style";
import { useOnOutsideClic } from "hooks/useOnOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

type OptionsListType = {
  options: {
    callback: () => void;
    text: string;
    icon: JSX.Element;
  }[];
  circular?: boolean;
  dotsTheme?: "white" | "black";
  customPosition?: {
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
  };
};

const OptionsList = ({
  options,
  circular = false,
  dotsTheme = "black",
  customPosition,
}: OptionsListType) => {
  const [isOpen, setIsOpen] = useState(false);
  const openList = () => setIsOpen((prevState) => !prevState);
  const closeList = () => setIsOpen(false);

  const listRef = useRef(null);
  const fn = {
    ref: listRef,
    handler: closeList,
  };
  useOnOutsideClic(fn);

  const renderOptions = options.map((option) => (
    <Option key={option.text} onClick={option.callback}>
      {option.icon}
      {option.text}
    </Option>
  ));

  return (
    <Wrapper
      ref={listRef}
      customPosition={customPosition}
      circular={circular}
      onClick={openList}
    >
      <Dot dotsTheme={dotsTheme}>
        <AnimatePresence>
          {isOpen && (
            <List
              as={motion.ol}
              animate={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              layout
            >
              {renderOptions}
            </List>
          )}
        </AnimatePresence>
      </Dot>
      <Dot dotsTheme={dotsTheme}></Dot>
    </Wrapper>
  );
};

export default OptionsList;
