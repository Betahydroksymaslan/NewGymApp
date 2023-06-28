import styled from "styled-components";
import {
  StyledForm,
  Header,
} from "components/organisms/NameTrainingPlan/NameTrainingPlan.style";

export const Form = styled(StyledForm)`
  width: 100vw;
  padding: 20px;
  height: 100vh;
  border-radius: 0;
  gap: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  & > div {
    margin: 0;
  }
`;

export const TrainingDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledHeader = styled(Header)`
  margin: 0;
`;

export const Tittle = styled.p`
  font-weight: 600;
  text-align: center;
  margin: 0;
  width: fit-content;
`;
