import { useState, useRef } from "react";
import { TooltipWrapper, TooltipSymbol, TooltipMessage } from "./Tooltip.style";
import { useOnOutsideClic } from "hooks/useOnOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

type TooltipTypes = {
  children: JSX.Element;
  message: string;
};

const Tooltip = ({ children, message }: TooltipTypes) => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const openTooltip = () => setIsMessageVisible((prevState) => !prevState);
  const closeTooltip = () => setIsMessageVisible(false);

  const tooltipRef = useRef(null);
  const fn = {
    ref: tooltipRef,
    handler: closeTooltip,
  };
  useOnOutsideClic(fn);

  return (
    <TooltipWrapper>
      {children}
      <TooltipSymbol ref={tooltipRef} onClick={openTooltip}>
        ?
      </TooltipSymbol>
      <AnimatePresence>
        {isMessageVisible && (
          <TooltipMessage
            as={motion.div}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <p>
              {message}
            </p>
          </TooltipMessage>
        )}
      </AnimatePresence>
    </TooltipWrapper>
  );
};

export default Tooltip;
