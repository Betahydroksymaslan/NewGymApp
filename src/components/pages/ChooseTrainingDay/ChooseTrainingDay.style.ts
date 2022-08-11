import styled from "styled-components";
import bgc_1 from "assets/images/bgc_big_1.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${bgc_1});
  background-size: cover;
  display: flex;
`;

export const StyledSection = styled.section`
  width: 100%;
  height: 85%;
  align-self: flex-end;
  background: ${({ theme }) => theme.colors.backgroundGradient};
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 100px;
  gap: 20px;
  overflow-y: scroll;
  position: relative;

  & > a:nth-child(2n + 0) h2 {
    border-color: #6966bb;
  }
  & > a:nth-child(3n + 0) h2 {
    border-color: #5baf9c;
  }
  & > a:nth-child(4n + 0) h2 {
    border-color: #38b4e1;
  }
`;

export const TrainingDay = styled.div`
  padding: 20px 20px 10px;
  display: flex;
  flex-direction: column;
  width: 85vw;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }

  & > span {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    padding-bottom: 10px;
    color: ${({ theme }) => theme.colors.primary};
  }

  & > h2 {
    border-left: 4px solid #ea8271;
    padding-left: 10px;
    color: ${({ theme }) => theme.colors.fontDark};
    margin: 10px 0 0;
  }
`;

export const DetailsWrapper = styled.div`
  display: grid;
  grid-template: 50px / 40px auto 40px auto;
  width: 100%;
  align-items: center;
  column-gap: 10px;
  margin-top: 15px;

  & > svg {
    width: 60%;
    justify-self: end;

    path {
      fill: ${({ theme }) => theme.colors.fontDark};
    }
  }
`;

export const EditWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 25px;
`;
export const DeleteButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.errorLight};
  color: ${({ theme }) => theme.colors.error};
  padding: 7px 20px;
  font-size: ${({ theme }) => theme.fontSize.m};
  border-radius: 55px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  display: flex;
  gap: 15px;
  align-items: center;

  & > svg {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;
