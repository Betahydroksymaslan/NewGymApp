import styled from "styled-components";

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  background-color: transparent;
  top: 20px;
  left: 20px;
  border: none;
  gap: 8px;

  & > span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

export const Marker = styled.div`
  width: 18px;
  height: 18px;
  border-top: 3px solid ${({ theme }) => theme.colors.white};
  border-left: 3px solid ${({ theme }) => theme.colors.white};
  transform: rotate(-45deg);
`;
