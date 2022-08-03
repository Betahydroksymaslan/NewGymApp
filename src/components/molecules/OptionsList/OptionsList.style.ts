import styled from "styled-components";

export const Wrapper = styled.div`
  grid-row: 1 / -1;
  grid-column: 3;
  justify-self: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

export const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.fontDark};
  position: relative;

  &::after, &::before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: inherit;
    position: absolute;
    left: 0;
  }

  &::before {
    top: 10px;
  }

  &::after {
    bottom: 10px;
  }
`;

export const List = styled.ol`
    height: 100px;
    width: 100px;
    background-color: red;
    position: absolute;
    top: 100%;
    right: 25%;
    z-index: 1000;
`