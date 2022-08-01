import styled, { keyframes } from "styled-components";
import bgc1 from "assets/images/bgc_3.svg";
import bgc2 from "assets/images/bgc_1.svg";
import bgc3 from "assets/images/bgc_2.svg";

const armAnimation = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(5deg);
    }
`;

export const SvgWrapper = styled.div`
  width: 150px;

  svg {
    [data-name="arm"] {
      animation: ${armAnimation} 2s infinite alternate ease-in-out;
    }
  }
`;

export const StyledHeader = styled.h1`
  font-weight: 600;
  padding: 0 10%;
  text-align: center;
  line-height: 1.4em;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const TrainingPlansWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  & > a:nth-child(2n + 0) > div {
    background: url(${bgc2});
    background-size: cover;
  }

  & > a:nth-child(3n + 0) > div {
    background: url(${bgc3});
    background-size: cover;
  }
`;

export const TrainingPlanButton = styled.div`
  width: 85vw;
  height: 130px;
  border-radius: 15px;
  overflow: hidden;
  background: url(${bgc1});
  background-size: cover;
  padding: 10px;
  display: grid;
  grid-template: 1fr 1fr/ 1fr 1fr 1fr;
  color: ${({ theme }) => theme.colors.white};
  transition: transform 0.2s ease-in-out;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};

  &:active {
    transform: scale(0.95);
  }

  & > svg {
    grid-column: 1;
    grid-row: 1 / -1;
    justify-self: center;
    height: 100%;
  }

  & > h1 {
    grid-column: 2 / -1;
    grid-row: 1;
    margin: 0;
    justify-self: center;
    align-self: end;
    text-align: center;
  }

  & > span {
    grid-column: 2 / -1;
    grid-row: 2;
    justify-self: center;
  }
`;

export const AddNewTrainingPlanButton = styled(TrainingPlanButton)`
  background: url(${bgc3});
  background-size: cover;
  grid-template: 1fr 1fr / 1fr 1fr 1fr 1fr;
  padding-right: 20px;

  & > svg {
    grid-column: 3/-1;
    justify-self: end;
  }

  & > h1 {
    grid-column: 1 / 3;
    grid-row: 1 / -1;
    font-size: 24px;
    align-self: center;
    text-align: center;
  }
`;
