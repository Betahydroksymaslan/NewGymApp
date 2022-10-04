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
  grid-row: 1/3;
  display: flex;
  gap: 10px;
  align-items: center;
  align-self: center;

  svg {
    width: 30px;
  }
`;

export const StyledTimeSpan = styled.span<{ suffix: "min" | "g" }>`
  font-size: ${({ theme }) => theme.fontSize.l};

  &::after {
    content: "${({ suffix }) => suffix}";
    font-size: ${({ theme }) => theme.fontSize.s};
    margin-left: 3px;
  }
`;

export const ExercisesProgressWrapper = styled.div`
  grid-column: 2;
  grid-row: 3/ -1;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
  align-self: center;
  justify-content: center;
`;

export const ExerciseProgressItem = styled.div<{
  progressType: "success" | "error" | "info";
}>`
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: ${({ theme: { colors }, progressType }) => {
    if (progressType === "success") return colors.successDark;
    if (progressType === "error") return colors.error;
    return colors.infoDark;
  }};
`;
