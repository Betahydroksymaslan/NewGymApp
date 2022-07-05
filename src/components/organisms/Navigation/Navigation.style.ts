import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavWrapper = styled.nav`
  width: 90%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  border-radius: 25px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;

const isActiveClass = "active";
const heartStroke = "heart-stroke";
const heartFill = "heart-fill";
const heart = "heart";


export const NavItem = styled(NavLink)`
  width: 50px;
  height: 50px;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.fontDark};
  position: relative;

  svg {
    position: absolute;
    transition: transform 0.2s ease-in-out;
  }

  span {
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  &.${isActiveClass} {
    color: ${({ theme }) => theme.colors.primary};

    svg:not(.${heart}) > path,
    circle {
      stroke: ${({ theme, id }) =>
        id !== "heart" ? theme.colors.primary : "none"};
    }

    .${heartStroke} {
      stroke: ${({ theme }) => theme.colors.primary};
    }

    .${heartFill} {
      fill: ${({ theme }) => theme.colors.primary};
    }

    svg {
      transform: translateY(-10px);
    }

    span {
      opacity: 1;
      transform: translateY(15px);
    }
  }
`;
