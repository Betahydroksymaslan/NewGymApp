import { useState, useRef } from "react";
import { Wrapper, Dot, List } from "./OptionsList.style";
import { useOnOutsideClic } from "hooks/useOnOutsideClick";

const OptionsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  
  const listRef = useRef(null)
  const fn = {
    ref: listRef,
    handler: closeList,
  }
    useOnOutsideClic(fn)

  return (
    <Wrapper onClick={openList}>
      <Dot />
      {isOpen && <List ref={listRef}></List>}
    </Wrapper>
  );
};

export default OptionsList;
