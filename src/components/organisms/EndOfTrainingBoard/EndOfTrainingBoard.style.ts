import styled from "styled-components";
type TimeType = {
  suffix: "g" | "min";
};

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 70px 20px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > h2 {
    margin-top: 40px;
  }

  & > button {
    margin-top: auto;
  }
`;

export const TimeWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & > svg {
    width: 45px;
  }
`;

export const TimeSpan = styled.span<TimeType>`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
  margin-top: 10px;
  &::after {
    content: "${({ suffix }) => suffix}";
    font-size: ${({ theme }) => theme.fontSize.s};
    margin-left: 1px;
  }
`;
