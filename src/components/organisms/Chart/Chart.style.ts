import styled from "styled-components";

export const TooltipWrapper = styled.div<{active: boolean}>`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primaryGradient};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};

  & > p {
    font-size: ${({ theme }) => theme.fontSize.l};
    color: ${({ theme }) => theme.colors.white};
    margin: 0;
  }
`;
