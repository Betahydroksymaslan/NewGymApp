import styled from "styled-components";

export const StyledNote = styled.form<{ isError: boolean }>`
  width: 100%;
  background-color: ${({ isError, theme }) =>
    isError ? theme.colors.errorLight : "#f2f7ff"};
  border: 1px solid
    ${({ isError, theme }) => (isError ? theme.colors.error : "#ff8c66")};
  border-radius: 15px;
  padding: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  transition: all 0.2s ease-in-out;

  & > p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.m};
  }

  & > textarea {
    border: none;
    padding: 0;
    font-size: ${({ theme }) => theme.fontSize.m};
    resize: none;
    width: 100%;
    height: 120px;
    outline: none;
    color: ${({ theme }) => theme.colors.fontDark};
    background-color: transparent;
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  margin-top: 15px;

  & > button {
    border: none;
    padding: none;
    color: ${({ theme }) => theme.colors.fontDark};
    background-color: transparent;
  }

  & > button:nth-child(1) {
    padding-right: 10px;
    border-right: 1px solid ${({ theme }) => theme.colors.fontDark};
  }

  & > button:nth-child(2) {
    padding-left: 10px;
  }

  & > span {
    margin-left: auto;
  }
`;
