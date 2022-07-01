import {MouseEvent} from "react";
import { StyledSocialButton, ButtonIconWrapper } from "./SocialButton.style";
import { BsFacebook } from "react-icons/bs";

type SocialButtonTypes = {
  isGoogle?: boolean;
  src?: string;
  alt?: string;
  children: string;
  onClick?: any ;
};

const SocialButton = ({ isGoogle, src, alt, onClick, children}: SocialButtonTypes) => {
  return (
    <StyledSocialButton onClick={onClick} isGoogle={isGoogle}>
      <ButtonIconWrapper>
        {isGoogle ? <img src={src} alt={alt} /> : <BsFacebook />}
      </ButtonIconWrapper>
      {children}
    </StyledSocialButton>
  );
};

export default SocialButton;
