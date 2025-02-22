import styled from 'styled-components'

type SocialButtonTypes = {
    isGoogle?: boolean;
  };

export const ButtonIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  font-size: 25px;
  display: grid;
  place-items: center;

  img {
    max-width: 30px;
  }
`;

export const StyledSocialButton = styled.button<SocialButtonTypes>`
  height: 50px;
  width: 35%;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  background: ${({ isGoogle, theme }) =>
    isGoogle ? theme.colors.white : '#1877f2'};
  color: ${({ isGoogle, theme }) =>
    isGoogle ? theme.colors.fontDark : theme.colors.white};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.m};
  box-shadow: ${({theme}) => theme.boxShadow.mainShadow};
`