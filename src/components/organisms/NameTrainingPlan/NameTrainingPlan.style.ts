import styled from "styled-components";

export const StyledForm = styled.form`
  width: 90vw;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;

  & > div {
    margin-top: 20px;
  }
`;

export const Header = styled.h1`
  text-align: center;
  margin: 0 0 20px;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 400;
`;
