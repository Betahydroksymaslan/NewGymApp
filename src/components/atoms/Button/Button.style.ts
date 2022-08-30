import styled, { keyframes } from "styled-components";

type ButtonTypes = {
  btnType: string;
  rounded?: boolean;
  withArrow?: boolean;
  size?: "s" | "m" | "l";
  wide?: boolean;
};

export const StyledButton = styled.button<ButtonTypes>`
  width: ${({ wide }) => (wide ? "100%" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ btnType, theme }) => {
    if (btnType === "primary") return theme.colors.primaryGradient;
    if (btnType === "secondary") return theme.colors.primaryGradientBorder;
    return "transparent";
  }};
  border: ${({ btnType }) => {
    if (btnType === "secondary") return `2px solid transparent`;
    return "none";
  }};
  color: ${({ btnType, theme }) => {
    if (btnType === "primary") return theme.colors.white;
    return theme.colors.primary;
  }};
  font-size: ${({ theme, size }) => {
    if (size === "s") return theme.fontSize.m;
    return theme.fontSize.m;
  }};
  padding: ${({ btnType, size }) => {
    if (btnType === "tertiary") return "0";
    if (size === "s" && btnType === "primary") return "10px 17px"; //A FEW PIXELS ADDED AS AN EQUIVALENT FOR NO BORDER
    if (size === "s" && btnType === "secondary") return "8px 15px";
    if (size === "m" && btnType === "primary") return "14px 22px"; //A FEW PIXELS ADDED AS AN EQUIVALENT FOR NO BORDER
    if (size === "m" && btnType === "secondary") return "12px 20px";
    if (btnType === "primary") return "17px 32px"; //A FEW PIXELS ADDED AS AN EQUIVALENT FOR NO BORDER
    return "15px 30px;";
  }};
  border-radius: ${({ rounded }) => (rounded ? "50px" : "12px")};
  text-decoration: ${({ btnType, theme }) =>
    btnType === "tertiary" && `underline 2px ${theme.colors.primary}`};
  box-shadow: ${({ theme, btnType }) =>
    btnType !== "tertiary" && theme.boxShadow.blueShadow};
  position: relative;
  overflow: hidden;
  z-index: 2;
  white-space: nowrap;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.6;
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

export const Arrow = styled.div`
  height: 50%;
  aspect-ratio: 1/1;
  border-top: 3px solid ${({ theme }) => theme.colors.white};
  border-right: 3px solid ${({ theme }) => theme.colors.white};
  transform: rotate(45deg);
  margin-left: 10px;
`;
