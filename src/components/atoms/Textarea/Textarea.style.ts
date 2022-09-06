import styled from "styled-components";

type TextareaTypes = {
  isError?: boolean;
};

export const StyledTextarea = styled.textarea<TextareaTypes>`
  width: 100%;
  height: 120px;
  border-radius: 10px;
  resize: none;
  padding: 15px;
  outline: ${({ theme: { colors }, isError }) =>
    `2px solid ${isError ? colors.error : colors.secondary}`};
  border: none;
  font-size: ${({ theme }) => theme.fontSize.l};
  transition: outline 0.2s ease-in-out, background-color 0.2s ease-in-out;
  background-color: ${({ theme: { colors }, isError }) =>
    isError ? colors.errorLight : colors.white};

  &:focus {
    outline: ${({ theme: { colors }, isError }) =>
      `2px solid ${isError ? colors.error : colors.primary}`};
    background-color: ${({ theme, isError }) =>
      isError ? theme.colors.errorLight : theme.colors.secondary};
  }
`;
