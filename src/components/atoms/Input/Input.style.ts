import styled from "styled-components";
import { ControlDayNamesType } from "components/organisms/NameTrainingDays/NameTrainingDays";

type ButtonTypes = {
  isError: boolean;
  variant?: "primary" | "secondary";
  short?: boolean;
  control?: ControlDayNamesType;
  suffix?: string;
};

export const InputWrapper = styled.div<{ suffix?: string }>`
  position: relative;
  display: flex;

  &::after {
    content: "${({ suffix }) => suffix && suffix}";
    display: inline;
    margin: 0 0 10px 5px;
    align-self: flex-end;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const StyledInput = styled.input<ButtonTypes>`
  width: ${({ short }) => (short ? "70px" : "100%")};
  text-align: ${({ short }) => short && "center"};
  font-size: ${({ theme: { fontSize }, variant }) => {
    if (variant === "primary") return fontSize.m;
    return fontSize.xl;
  }};
  padding: ${({ variant, short }) => {
    if (variant === "primary" && short) return "15px 10px";
    if (variant === "secondary" && short) return "15px 0";
    if (variant === "primary") return "15px 30px 15px 15px";
    return "10px 30px 10px 15px";
  }};
  outline: ${({ theme: { colors }, isError, variant }) => {
    if (variant === "secondary") return "none";
    if (isError) return `2px solid ${colors.error}`;
    return `2px solid ${colors.secondary}`;
  }};
  border: none;
  border-bottom: ${({ theme: { colors }, variant, isError }) => {
    if (variant === "secondary" && isError) return `2px solid ${colors.error}`;
    if (variant === "secondary") return `2px solid ${colors.primary}`;
  }};
  border-radius: ${({ variant }) => variant === "primary" && "8px"};
  transition: outline 0.2s ease-in-out, background-color 0.2s ease-in-out;
  background-color: ${({ theme: { colors }, isError, variant }) => {
    if (isError) return colors.errorLight;
    if (variant === "primary") return colors.white;
    if (variant === "secondary") return colors.secondary;
  }};

  &:focus {
    outline: ${({ theme: { colors }, isError, variant }) => {
      if (variant === "secondary") return "none";
      if (isError) return `2px solid ${colors.error}`;
      return `2px solid ${colors.primary}`;
    }};
    background-color: ${({ theme, isError }) =>
      isError ? theme.colors.errorLight : theme.colors.secondary};
  }
`;

export const ErrorSymbol = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  right: 15px;
  width: 18px;
  height: 18px;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  font-weight: 900;
`;
