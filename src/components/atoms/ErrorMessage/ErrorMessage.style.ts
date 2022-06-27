import styled from "styled-components";

export const StyledSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.error};
`;
