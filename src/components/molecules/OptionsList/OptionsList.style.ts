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
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 100%;
  right: 25%;
  z-index: 1000;
  list-style-type: none;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Option = styled.li`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.m};
`;
