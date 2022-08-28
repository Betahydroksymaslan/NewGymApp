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
  width: 45px;
  height: 45px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  box-shadow: ${({ theme, circular }) => circular && theme.boxShadow.inputShadow};
  background-color: ${({ circular }) => (circular ? "#f7f8f8" : "transparent")};
`;

export const Dot = styled.div<DotsTypes>`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${({ theme, dotsTheme }) =>
    dotsTheme === "black" ? theme.colors.fontDark : theme.colors.white};
  position: relative;
`;

export const List = styled.ol`
  min-width: 100px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  position: absolute;
  top: 150%;
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
