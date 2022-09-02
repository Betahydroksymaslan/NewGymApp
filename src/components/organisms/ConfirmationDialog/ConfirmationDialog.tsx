import React from "react";
import { Wrapper, ExitWrapper } from "./ConfirmationDialog.style";
import Button from "components/atoms/Button/Button";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import { ReactComponent as XIcon } from "assets/icons/XIcon.svg";

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
      <InlineWrapper>
        <ExitWrapper onClick={handleClose}>
          <XIcon />
        </ExitWrapper>

        <h1>{header}</h1>
      </InlineWrapper>

      <p>{body}</p>
      <InlineWrapper>
        <Button rounded callback={callback} wide size="m">
          Zrób to!
        </Button>
      </InlineWrapper>
    </Wrapper>
  );
};

export default ConfirmationDialog;
