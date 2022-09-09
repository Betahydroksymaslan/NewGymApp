import { ReactNode } from "react";
import { StyledModal } from "./Modal.style";

type ModalTypes = {
  children: ReactNode;
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  shouldCloseOnEsc?: boolean;
  handleClose: () => void;
};

const Modal = ({
  children,
  isOpen,
  shouldCloseOnOverlayClick = true,
  shouldCloseOnEsc = true,
  handleClose,
}: ModalTypes) => {
  return (
    <StyledModal
      closeTimeoutMS={
        100
      } /* Clases for transitions available in GlobalStyled */
      style={{
        overlay: {
          backgroundColor: "rgba(37, 0, 85, 0.3)",
          backdropFilter: "blur(3px)",
        },
      }}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      shouldCloseOnEsc={shouldCloseOnEsc}
      onRequestClose={handleClose}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
