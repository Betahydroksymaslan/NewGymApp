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
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};

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
    min-height: 130%;
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
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  grid-row: 5 / -1;
  z-index: 2;
  overflow-x: hidden;
  overflow-y: scroll;

  & > button:last-child {
    margin-top: 20px;
  }
`;

export const InlineGridWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 50px 1fr 50px;
  align-items: center;
  justify-items: center;
`;

export const TrainingName = styled.h2`
  text-align: center;
  font-weight: 400;
  margin: 0;
`;

export const NextPrevBtton = styled.button<{ right?: boolean }>`
  width: 45px;
  height: 45px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primaryGradient};
  transition: scale 0.2s ease-in-out;
  transform: ${({ right }) => right && "rotate(180deg)"};
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  justify-self: ${({ right }) => (right ? "end" : "start")};
  border: none;
  padding: 0;

  &:active {
    scale: 0.9;
  }

  &:disabled {
    opacity: 0.4;
    scale: 1;
  }

  & > div {
    width: 30%;
    height: 30%;
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    transform: translateX(20%) rotate(-45deg);
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

export const SeriesWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: -1.25rem 0 -2.25rem;

  & > svg {
    width: 80px;
    margin-inline: -0.75rem;
  }

  & strong {
    font-size: 25px;
  }
`

export const UpdateMainScoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.primary};
  width: 70px;
  height: 70px;
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  transition: transform 0.2s ease-in-out;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};

  &:active {
    transform: scale(0.95);
  }
`;

export const RepsButtonBoxName = styled.div`
  max-width: 100%;
  position: relative;
  margin-top: 20px;

  &::after {
    height: 20px;
    padding: 0 5px;
    content: "powtórzenia";
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    position: absolute;
    top: -10px;
    left: 25px;
  }
`;

export const RepsButtonsWrapper = styled.div`
  max-width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  display: flex;
  gap: 15px;
  flex-shrink: 0;
  /* gap: 15px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto; */
  padding: 15px;
  align-items: center;

  overflow-y: scroll;
  scroll-behavior: smooth;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
  scroll-snap-align: start;
  scroll-padding-inline: 14px;
`;

export const RepsButton = styled.button<{ isActive: boolean }>`
  width: 65px;
  height: 65px;
  flex-shrink: 0;
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

  scroll-snap-align: start;

  &:active {
    transform: scale(0.9);
  }
`;

