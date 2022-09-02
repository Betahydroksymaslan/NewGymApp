import styled from "styled-components";
import bgc_4 from "assets/images/bgc_4.svg";

export const StatsHeader = styled.header`
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 600;
`;

export const TrainingItemsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const TrainingItem = styled.div`
  background: url(${bgc_4});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 160px;
  padding: 15px 15px 15px 25px;
  border-radius: 30px;
  display: grid;
  grid-template: repeat(4, 1fr) / 2fr 1fr;
  justify-items: start;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.blueShadow};
  z-index: 0;

  & > span {
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 600;
    align-self: end;
  }

  & > p {
    grid-row: 2;
    align-self: start;
    margin: 5px 0 0;
    font-size: ${({ theme }) => theme.fontSize.m};
  }

  & > button {
    grid-column: 1;
    grid-row: 3/-1;
    align-self: center;
  }
`;

export const AlarmIconWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  align-self: center;
  justify-self: center;

  svg {
    width: 50px;
  }
  span {
    font-size: ${({ theme }) => theme.fontSize.l};

    &::after {
      content: "min";
      font-size: ${({ theme }) => theme.fontSize.s};
      margin-left: 3px;
    }
  }
`;
