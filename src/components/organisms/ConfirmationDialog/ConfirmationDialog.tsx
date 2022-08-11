import React from "react";
import { Wrapper } from "./ConfirmationDialog.style";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";

type ConfirmationDialogType = {
  header?: string;
  body: string;
  callback: () => void;
  handleClose: () => void;
};

const ConfirmationDialog = ({
  header = "Jesteś pewien?",
  body,
  callback,
  handleClose,
}: ConfirmationDialogType) => {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <p>{body}</p>
      <InlineWrapper>
        <Button rounded callback={callback} size="m">
          Zrób to!
        </Button>
        <Button rounded callback={handleClose} size="m" btnType="secondary">
          Wróć
        </Button>
      </InlineWrapper>
    </Wrapper>
  );
};

export default ConfirmationDialog;
