import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  width: 70px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & span {
    margin: auto;
    text-transform: uppercase;
  }
`;

const bounce = keyframes`
    from {
        transform: scaleX(1.25);
    } to {
        transform: translateY(-50px) scaleX(1)
    }
`;

export const Ball = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: ${({ theme }) => theme.colors.primaryGradient};
    animation: ${bounce} .5s alternate infinite;

    &:nth-child(2) {
        animation-delay: .16s;
    }
    &:nth-child(3) {
        animation-delay: .32s;
    }
`;
