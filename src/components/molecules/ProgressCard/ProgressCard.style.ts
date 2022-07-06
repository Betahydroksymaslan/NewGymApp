import styled from "styled-components";

type ProgressCardType = {
  state?: "complete" | "start" | "locked";
};

export const CardWrapper = styled.div<ProgressCardType>`
  width: 85%;
  padding: 25px 30px;
  transition: all 0.3s ease-in-out;
  background-color: ${({ state, theme }) =>
    state === "complete" ? theme.colors.lightGreen : theme.colors.white};
  border: 3px solid
    ${({ state, theme }) => {
      if (state === "complete") return theme.colors.success;
      if (state === "locked") return "transparent";
      if (state === "start") return theme.colors.darkBlue;
    }};
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-row-gap: 15px;
  transform: translateX(5px);
`;

export const Indicator = styled.span<ProgressCardType>`
  display: grid;
  place-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -21px;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease-in-out;
  border-radius: 100%;
  background-color: ${({ state, theme }) => {
    if (state === "complete") return theme.colors.success;
    return theme.colors.white;
  }};
  border: 3px solid ${({ state, theme }) => {
    if (state === "complete") return theme.colors.success;
    if (state === "locked") return "#e6eaee";
    if (state === "start") return theme.colors.darkBlue;
  }};
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ state, theme }) => {
    if (state === "complete") return theme.colors.success;
    if (state === "locked") return "#e6eaee";
    if (state === "start") return theme.colors.darkBlue;
  }};
  font-weight: 600;
  color: ${({ state, theme }) => {
    if (state === "complete") return "transparent";
    if (state === "locked") return "#e6eaee";
    if (state === "start") return theme.colors.darkBlue;
  }};
  position; relative;

  &::after {
    content: '';
    display: ${({ state }) => (state === "complete" ? "block" : "none")};
    width: 42%;
    height: 18%;
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%) rotate(-45deg);
  }
`;

export const Tittle = styled.span<ProgressCardType>`
  grid-row: 1;
  grid-column: 1/2;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ state, theme }) => {
    if (state === "complete") return theme.colors.success;
  }};
`;

export const Text = styled.span<ProgressCardType>`
  grid-row: 2;
  grid-column: 1/-1;
  line-height: 1.5em;
  transition: all 0.3s ease-in-out;
  color: ${({ state, theme }) => {
    if (state === "complete") return theme.colors.success;
    return theme.colors.fontGray;
  }};
`;

export const ProgressIndicator = styled.div<ProgressCardType>`
  grid-row: 1;
  grid-column: 2/3;
  transition: all 0.3s ease-in-out;
  font-size: ${({ state }) => (state === "locked" ? "30px" : "16px")};
  position: ${({ state }) => (state === "locked" ? "absolute" : "static")};
  top: -5px;
  right: 0;
  color: #e6eaee;
  justify-self: end;

  & > span {
    transition: all 0.3s ease-in-out;
    color: ${({ state, theme }) => {
      if (state === "complete") return theme.colors.success;
      return theme.colors.darkBlue;
    }};
    font-weight: 600;
  }
`;
