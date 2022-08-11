import styled, { keyframes } from "styled-components";
import bgc_big_2 from "assets/images/bgc_big_2.svg";

const bikeAnimation = keyframes`
  to {
    opacity: 1;
    transform: translateX(-200px);
  }
`;

const startButtonAnimation = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const BikeWrapper = styled.div`
  & > svg {
    opacity: 0;
    width: 250px;
    position: absolute;
    animation: ${bikeAnimation} 0.3s 0.4s forwards ease-in-out;
    bottom: 20px;
    right: -244px;
  }
`;

export const TopSection = styled.header`
  width: 100%;
  height: 45vh;
  position: relative;
  background: url(${bgc_big_2});
  background-size: cover;
  padding: 70px 210px 0 30px;

  & > h1 {
    margin: 0 0 20px 0;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
  }
`;

export const BottomSection = styled.section`
  width: 100%;
  height: 65vh;
  background-color: #f9f9f9;
  border-top-left-radius: 55px;
  border-top-right-radius: 55px;
  transform: translateY(-55px);
  padding: 20px 20px 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  & > ol {
    width: 100%;
    margin: 0 0 30px;
    padding: 0;
    list-style-type: none;
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;

  svg {
    width: 25px;
    fill: ${({ theme }) => theme.colors.white};
    path {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const Exercise = styled.li`
  display: grid;
  grid-template: 25px 25px / 50px 1fr 50px;
  column-gap: 30px;
  align-items: center;
  margin-top: 20px;
`;

export const ListOrder = styled.span`
  grid-row: 1 / -1;
  grid-column: 1;
  justify-self: center;
  font-size: 30px;
  color: #f0ba73;
`;

export const ListName = styled.span`
  font-weight: 600;
  grid-row: 2;
  grid-column: 2;
`;

export const ListTime = styled.span`
  color: ${({ theme }) => theme.colors.fontGray};
  grid-row: 1;
  grid-column: 2;
`;

export const AddNewTrainingButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  padding: 14px 20px;
  font-size: ${({ theme }) => theme.fontSize.m};
  border: 2px solid #f0ba73;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;

export const StartTrainingWrapper = styled.div`
  padding: 20px 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: fixed;
  bottom: 0;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: 0 15px 30px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(100%);
  animation: ${startButtonAnimation} 0.2s 0.2s forwards ease-in-out;

  & > button {
    flex-shrink: 1;
  }
`;

export const StartTrainingButton = styled.button`
  border: none;
  background: rgb(231, 134, 95);
  font-size: ${({ theme }) => theme.fontSize.m};
  background: linear-gradient(
    40deg,
    rgba(231, 134, 95, 1) 0%,
    rgba(238, 215, 109, 1) 47%,
    rgba(240, 176, 114, 1) 100%
  );
  width: 100%;
  padding: 20px 0;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  border-radius: 100px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;
