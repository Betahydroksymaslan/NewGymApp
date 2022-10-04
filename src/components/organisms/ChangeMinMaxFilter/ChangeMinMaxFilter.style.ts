import styled from "styled-components";

export const StyledForm = styled.form`
  width: 85vw;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export const Header = styled.h1`
    margin: 0;
    font-size: ${({theme}) => theme.fontSize.xl};
`

export const StyledParagraph = styled.p`
    font-size: ${({theme}) => theme.fontSize.m};
    text-align: center;
    margin: 0;
`