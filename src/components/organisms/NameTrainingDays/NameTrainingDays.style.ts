import styled from "styled-components";
import {
  StyledForm,
  Header,
} from "components/organisms/NameTrainingPlan/NameTrainingPlan.style";

export const Form = styled(StyledForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 95vh;
  overflow-y: scroll;

  & > button {
    margin-top: 20px;
  }
`;
export const StyledHeader = styled(Header)``;
