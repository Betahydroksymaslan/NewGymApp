import styled from "styled-components";

export const StyledPageArea = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  z-index: 1;

  svg {
    width: 100px;
    margin: 0 0 10px 0;
  }

  h1 {
    margin: 0 0 5px 0;
    font-weight: 500;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.l};
    margin-bottom: 20px;
  }
`;

export const MinMaxSessionTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & p {
    margin: 0;
    font-size: ${({theme}) => theme.fontSize.m};
  }
`