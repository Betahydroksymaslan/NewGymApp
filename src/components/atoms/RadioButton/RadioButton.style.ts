import styled from "styled-components";

export const StyledLabel = styled.label<{
  small?: boolean;
}>`
  width: ${({ small }) => (small ? "60px" : "100px")};
  height: ${({ small }) => (small ? "60px" : "100px")};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ small }) => (small ? "9px" : "15px")};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  svg {
    width: 80%;
    height: 80%;
  }
`;

export const StyledRadioButton = styled.input.attrs({ type: "radio" })`
  display: none;

  &:checked + label {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;
