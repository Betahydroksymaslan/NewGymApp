import styled from "styled-components";

export const PageWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primaryGradient};
  display: grid;
  grid-template-rows: repeat(10, 1fr);
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!! TOP ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const ArrowsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
  grid-row: 1;
  z-index: 3;
`;

export const Back = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background-color: #f7f8f8;
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  & > div {
    width: 30%;
    height: 30%;
    border-top: 2px solid ${({ theme }) => theme.colors.fontDark};
    border-left: 2px solid ${({ theme }) => theme.colors.fontDark};
    transform: translateX(20%) rotate(-45deg);
  }
`;

export const Circle = styled.div`
  width: 75%;
  aspect-ratio: 1/1;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.4;
  grid-row: 2 / 5;
  grid-column: 1;
  justify-self: center;
`;

export const MainImageWrapper = styled.div`
  grid-row: 2 / 5;
  grid-column: 1;
  z-index: 1;

  & > svg {
    width: 100%;
  }
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!! EXERCISE ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const ExerciseWrapper = styled.section`
  width: 100%;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  grid-row: 5 / -1;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  z-index: 2;
  overflow-x: hidden;

  & > h2 {
    margin-top: 10px;
    text-align: center;
    font-weight: 400;
  }
`;

export const ActualScore = styled.span<{
  suffix: "reps" | "weight" | undefined;
}>`
  font-size: 70px;

  &::after {
    content: "${({ suffix }) => (suffix === "weight" ? "kg" : "p")}";
    font-size: 30px;
  }
`;

export const RepsButtonsWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  gap: 10px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-evenly;
  position: relative;

  &::after {
    height: 20px;
    padding: 0 5px;
    content: "powtórznia";
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: -10px;
    left: 25px;
  }
`;

export const RepsButton = styled.button<{ isActive: boolean }>`
  width: 65px;
  height: 65px;
  border-radius: 15px;
  padding: ${({ isActive }) => (isActive ? "2px" : "0")};
  border: ${({ isActive }) => (isActive ? `none` : "2px solid transparent")};
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme: { colors }, isActive }) =>
    isActive ? colors.white : colors.primary};
  display: grid;
  place-items: center;
  background: ${({ theme: { colors }, isActive }) =>
    isActive ? colors.primaryGradient : colors.primaryGradientBorder};
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.9);
  }
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!! END SESSION BOARD !!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const EndSessionBoard = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 70px 20px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > h2 {
    margin-top: 40px;
  }

  & > button {
    margin-top: auto;
  }
`;
