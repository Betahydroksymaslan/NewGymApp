import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90vw;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  gap: 15px;

  & h1 {
    text-align: center;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.l};
  }

  & > p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

export const ExitWrapper = styled.div`
  display: grid;
  place-items: center;
`;
