import styled from "styled-components";

type OptionsType = {
  circular: boolean;
  customPosition?: {
    left?: number;
    right?: number;
    bottom?: number;
    top?: number;
  };
};

type DotsTypes = {
  dotsTheme: "black" | "white";
};

export const Wrapper = styled.div<OptionsType>`
  grid-row: 1 / -1;
  grid-column: 3;
  position: ${({ customPosition }) => (customPosition ? "absolute" : "static")};
  top: ${({ customPosition }) =>
    customPosition?.top && `${customPosition?.top}px`};
  bottom: ${({ customPosition }) =>
    customPosition?.bottom && `${customPosition?.bottom}px`};
  left: ${({ customPosition }) =>
    customPosition?.left && `${customPosition?.left}px`};
  right: ${({ customPosition }) =>
    customPosition?.right && `${customPosition?.right}px`};
  justify-self: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: grid;
  place-items: center;
  background-color: ${({ theme, circular }) =>
    circular ? theme.colors.lightGray : "transparent"};
`;

export const Dot = styled.div<DotsTypes>`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: ${({ theme, dotsTheme }) =>
    dotsTheme === "black" ? theme.colors.fontDark : theme.colors.white};
  position: relative;

  &::after,
  &::before {
    content: "";
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
  min-width: 100px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  position: absolute;
  top: 100%;
  right: 25%;
  z-index: 1000;
  list-style-type: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Option = styled.li`
  color: ${({ theme }) => theme.colors.fontDark};
  font-size: ${({ theme }) => theme.fontSize.m};
  display: flex;
  gap: 15px;
  padding: 5px;
  align-items: center;

  & > svg {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;
