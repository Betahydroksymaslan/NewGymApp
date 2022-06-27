import styled from "styled-components";

type LoginTypes = {
  useLines?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: space-evenly;
`;

export const Header = styled.h1`
  font-size: 35px;
  margin: 0;
`;

export const SubHeader = styled.h2`
  margin: 0;
  text-align: center;
  padding: 0 13%;
  font-weight: 500;
`;

export const StyledSpan = styled.span<LoginTypes>`
  position: relative;
  font-weight: 600;
  &::before,
  &::after {
    content: "";
    width: 20px;
    height: 2px;
    display: ${({ useLines }) => (useLines ? "block" : "none")};
    background-color: ${({ theme }) => theme.colors.fontDark};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &::before {
    left: -25px;
  }
  &::after {
    right: -25px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InlineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
