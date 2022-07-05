import styled from "styled-components";

export const Wrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  max-height: 90vh;
  overflow-y: scroll;

  h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: 0 0 30px 0;
    font-weight: 500;
  }

  & > button {
    margin-top: 20px;
  }
`;

export const SmallArea = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  gap: 15px;
`;
