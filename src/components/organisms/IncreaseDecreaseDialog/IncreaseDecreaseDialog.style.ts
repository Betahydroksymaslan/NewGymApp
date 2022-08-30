import styled from "styled-components";

export const Wrapper = styled.form`
  width: 90vw;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  overflow: hidden;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

export const InputWrapper = styled.div<{ valueType: "+" | "-" }>`
  width: 100px;
  display: flex;
  align-items: center;

  & > input {
    width: 100%;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    padding: 5px;
    outline: none;
    text-align: center;
    font-size: 40px;
  }

  &::before {
    content: "${({ valueType }) => valueType && valueType}";
    display: inline;
    margin: 0 0 10px 5px;
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

export const TopPanel = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  & > label {
    width: 50%;
    display: grid;
    place-items: center;
    font-size: ${({ theme }) => theme.fontSize.m};
    transition: background-image 0.2s ease-in-out;
  }
`;

export const StyledRadioButton = styled.input.attrs({ type: "radio" })`
  display: none;

  &:checked + label {
    background-image: ${({ theme }) => theme.colors.primaryGradient};
    color: ${({ theme }) => theme.colors.white};
  }
`;
