import React from "react";
import { StyledSocialButton, ButtonIconWrapper } from "./SocialButton.style";
import { BsFacebook } from "react-icons/bs";

type SocialButtonTypes = {
  isGoogle?: boolean;
  src?: string;
  alt?: string;
  children: string;
};

const SocialButton = ({ isGoogle, src, alt, children }: SocialButtonTypes) => {
  return (
    <StyledSocialButton isGoogle={isGoogle}>
      <ButtonIconWrapper>
        {isGoogle ? <img src={src} alt={alt} /> : <BsFacebook />}
      </ButtonIconWrapper>
      {children}
    </StyledSocialButton>
  );
};

export default SocialButton;
