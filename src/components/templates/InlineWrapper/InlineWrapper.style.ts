import styled from "styled-components";

export const Wrapper = styled.div<{ justifyContent?: string }>`
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "space-evenly"};
  align-items: center;
  flex-wrap: wrap;
`;
