import styled from "styled-components";

type ButtonTypes = {
  isError: boolean;
};

export const InputWrapper = styled.div`
    position: relative;
`

export const StyledInput = styled.input<ButtonTypes>`
  font-size: ${({ theme }) => theme.fontSize.m};
  padding: 15px 30px 15px 15px;
  outline: 2px solid ${({ theme, isError }) => isError ? theme.colors.error : theme.colors.lightGray};
  border: none;
  border-radius: 8px;
  transition: outline 0.2s ease-in-out, background-color 0.2s ease-in-out;
  background-color: ${({ theme, isError }) =>
      isError ? theme.colors.errorLight : theme.colors.white};

  &:focus {
    outline: 2px solid
      ${({ theme, isError }) =>
        isError ? theme.colors.error : theme.colors.primary};
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
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  font-weight: 900;
`;
