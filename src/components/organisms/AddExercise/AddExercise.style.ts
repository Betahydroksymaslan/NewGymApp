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
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  background-color: ${({ theme }) => theme.colors.white};

  & > div {
    margin: 0;
  }

  & > div:last-child {
    margin-top: auto;
  }

  & > div:nth-child(8) {
    margin-bottom: 30px;
  }

  & > div:nth-child(10) {
    margin-bottom: 30px;
  }

  & > div:nth-child(13) {
    margin-bottom: 30px;
  }
`;

export const TrainingDaysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const StyledHeader = styled(Header)``;

export const Tittle = styled.span`
  font-weight: 600;
  text-align: center;
  margin: 30px 0 20px;
`;
