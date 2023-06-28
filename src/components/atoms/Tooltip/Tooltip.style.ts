import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
`;

export const TooltipSymbol = styled.div`
  position: absolute;
  top: -80%;
  right: -20px;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  border: 2px solid ${({ theme }) => theme.colors.fontDark};
  display: grid;
  font-weight: 600;
  font-size: 14px;
  place-items: center;
  line-height: 1;
`;

export const TooltipMessage = styled.div`
  min-width: 300px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  z-index: 1000;

  & > p {
    margin: 0;
    color: ${({ theme }) => theme.colors.white};
    line-height: 1;
  }
`;
