import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90vw;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;

  & > h1 {
    text-align: center;
    margin-top: 0;
  }

  & > p {
    margin: 5px 0 30px;
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;
