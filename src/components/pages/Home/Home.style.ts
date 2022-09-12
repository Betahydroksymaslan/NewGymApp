import styled from "styled-components";

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TRAINING IN PROGRESS BOX !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const TrainingInProgress = styled.div`
  background: ${({ theme }) => theme.colors.primaryLightBgc};
  width: 100%;
  height: 140px;
  border-radius: 25px;
  display: grid;
  grid-template: repeat(4, 1fr) / 1.5fr 1fr;
  padding: 15px 0 15px 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  font-size: ${({ theme }) => theme.fontSize.m};

  & > svg {
    height: 100%;
    grid-column: 2;
    grid-row: 1 / -1;
    align-self: center;
  }

  & > a {
    grid-column: 1;
    grid-row: 3/-1;
    align-self: end;
    justify-self: start;
  }
`;

export const StyledSpan = styled.span`
  align-self: end;
`;

export const TrainingNameSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  align-self: center;
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MAIN CONTENT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const MainContentWrapper = styled.div`
  width: 90%;
  display: grid;
  grid-template: 140px 190px 190px / 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
`;

export const MainBox = styled.div`
  grid-column: 1 / -1;
  background-color: #a164ff;
  border-radius: 30px;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  box-shadow: ${({theme}) => theme.boxShadow.inputShadow};
  display: grid;
  grid-template: 1fr 1fr / 1.3fr 1fr;

  & > h1 {
    translate: -10px;
    align-self: end;
  }

  & > span {
    align-self: center;
  }

  & > svg {
    width: 200px;
    align-self: flex-end;
    translate: -10%;
    grid-row: 1 /-1;
  }
`;

export const Tittle = styled.h1`
  margin: 0;
  font-size: ${({theme}) => theme.fontSize.m};
  color: ${({theme}) => theme.colors.white};
`

export const Text = styled.span`
  margin: 0;
  font-size: ${({theme}) => theme.fontSize.m};
  color: ${({theme}) => theme.colors.white};
`
