import styled from "styled-components";

export const Template = styled.section<{ padding?: string }>`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ padding }) => padding || "40px 0 100px"};
`;
