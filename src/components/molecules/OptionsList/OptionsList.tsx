import { useState, useRef } from "react";
import { Wrapper, Dot, List, Option } from "./OptionsList.style";
import { useOnOutsideClic } from "hooks/useOnOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

type OptionsListType = {
  options: {
    callback: () => void;
    text: string;
  }[];
};

const OptionsList = ({ options }: OptionsListType) => {
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
      {option.text}
    </Option>
  ));

  return (
    <Wrapper ref={listRef} onClick={openList}>
      <Dot />
      <AnimatePresence>
        {isOpen && (
          <List
            as={motion.ol}
            animate={{ opacity: 0.9, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            layout
          >
            {renderOptions}
          </List>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default OptionsList;
