import styled from "styled-components";

export const TrainingInProgress = styled.div`
  background: ${({ theme }) => theme.colors.primaryLightBgc};
  width: 90%;
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
