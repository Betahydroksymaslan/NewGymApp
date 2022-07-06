import styled, { keyframes } from "styled-components";

const armAnimation = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(5deg);
    }
`;

export const SvgWrapper = styled.div`
  width: 150px;

  svg {
    [data-name="arm"] {
      animation: ${armAnimation} 2s infinite alternate ease-in-out;
    }
  }
`;

export const StyledHeader = styled.h1`
  font-weight: 600;
  padding: 0 10%;
  text-align: center;
  line-height: 1.4em;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;
