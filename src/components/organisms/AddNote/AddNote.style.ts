import styled from "styled-components";

export const StyledForm = styled.form`
  width: 90vw;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 15px;
`;
export const StyledHeader = styled.header`
  margin: 0;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.l};
`;
