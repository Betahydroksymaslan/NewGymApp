import styled, { keyframes } from "styled-components";

type ButtonTypes = {
  btnType: string;
};

export const StyledButton = styled.button<ButtonTypes>`
  display: ${({ btnType }) => (btnType === "tertiary" ? "inline" : "block")};
  background-color: ${({ btnType, theme }) => {
    if (btnType === "primary") return theme.colors.primary;
    if (btnType === "secondary") return theme.colors.white;
    return "transparent";
  }};
  border: ${({ btnType, theme }) => {
    if (btnType === "secondary") return `2px solid ${theme.colors.primary}`;
    return "none";
  }};
  color: ${({ btnType, theme }) => {
    if (btnType === "primary") return theme.colors.white;
    return theme.colors.primary;
  }};
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: ${({ btnType }) => {
    if (btnType === "tertiary") return "0";
    if (btnType === "primary") return "17px 32px"; //A FEW PIXELS ADDED AS AN EQUIVALENT FOR NO BORDER
    return "15px 30px;";
  }};
  border-radius: ${({ btnType }) => {
    if (btnType !== "tertiary") return "5px";
  }};
  text-decoration: ${({ btnType, theme }) =>
    btnType === "tertiary" && `underline 2px ${theme.colors.primary}`};
  box-shadow: ${({ theme, btnType }) =>
    btnType !== "tertiary" && theme.boxShadow.mainShadow};
  position: relative;
  overflow: hidden;
  z-index: 2;

  &:disabled {
    opacity: .6;
  }
`;

const rippleEffect = keyframes`
    0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(15);
    opacity: 0.375;
  }
  100% {
    transform: scale(45);
    opacity: 0;
  }
`;

export const RippleSpan = styled.span<ButtonTypes>`
  width: 20px;
  height: 20px;
  position: absolute;
  background: ${({ theme, btnType }) =>
    btnType === "tertiary" ? "transparent" : theme.colors.secondary};
  display: block;
  border-radius: 100%;
  opacity: 1;
  z-index: -1;
  transform: translate(-50%, -50%);
  animation: 1s ease 1 forwards ${rippleEffect};
`;
