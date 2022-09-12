import styled from "styled-components";

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TRAINING IN PROGRESS BOX !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const TrainingInProgress = styled.div`
  background: ${({ theme }) => theme.colors.primaryLightBgc};
  width: 100%;
  height: 140px;
  border-radius: 25px;
  display: grid;
  grid-template: repeat(4, 1fr) / 1.5fr 1fr;
  margin-bottom: 40px;
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

export const MainBox = styled.div`
  width: 90%;
  height: 140px;
  background-color: #a164ff;
  border-radius: 30px;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  display: grid;
  grid-template: 1fr 1fr / 1.3fr 1fr;

  & > span {
    grid-row: 1;
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.colors.white};
    align-self: end;
    text-align: center;
    translate: -20%;
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
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  align-self: start;
  grid-row: 2;
  translate: -20%;
  text-align: center;
`;

export const StyledSubHeader = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.l};
  margin: 40px 0 30px;
`;

export const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template: 100px 120px / repeat(3, 1fr);
  row-gap: 15px;
  column-gap: 5%;
`;

export const LastTrainingBox = styled.div`
  grid-column: 1 / -1;
  grid-row: 1;
  background-color: #ff9374;
  border-radius: 20px;
  display: grid;
  grid-template: 1fr 1fr / 40px 1fr;
  justify-items: center;
  row-gap: 10px;
  box-shadow: -2px 4px 10px rgba(255, 147, 116, 0.15);

  & > svg {
    width: 65px;
    grid-column: 1;
    grid-row: 1 / -1;
    justify-self: start;
    align-self: end;
    translate: -10%;
  }

  & > span {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.m};

    &:nth-child(2) {
      align-self: end;
    }

    &:nth-child(3) {
      font-weight: 600;
    }
  }
`;

export const StatsTile = styled.div`
  border-radius: 20px;
  background-color: #ff79a1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: -2px 4px 10px rgba(255, 121, 161, 0.15);

  & > h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.s};
    margin-bottom: auto;
  }

  & > span {
    font-size: 50px;
  }

  &:nth-child(2) {
    background-color: #6adbc9;
    box-shadow: -2px 4px 10px rgba(106, 219, 201, 0.15);
  }

  &:nth-child(3) {
    background-color: #fedc7a;
    box-shadow: -2px 4px 10px rgba(254, 220, 122, 0.15);
  }
`;
