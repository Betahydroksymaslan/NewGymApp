import styled from "styled-components";
import bgc_big_2 from "assets/images/bgc_big_2.svg";

export const TopSection = styled.header`
  width: 100%;
  height: 45vh;
  position: relative;
  background: url(${bgc_big_2});
  background-size: cover;
  padding: 70px 210px 0 30px;

  & > svg {
    width: 250px;
    position: absolute;
    bottom: 20px;
    right: -40px;
  }

  & > h1 {
    margin: 0 0 20px 0;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
  }
`;

export const BottomSection = styled.section`
  width: 100%;
  height: 65vh;
  background-color: #fdfdfd;
  border-top-left-radius: 55px;
  border-top-right-radius: 55px;
  transform: translateY(-55px);
  padding: 45px 20px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;

  & > ol {
    width: 100%;
    margin: 0 0 30px;
    padding: 0;
    list-style-type: none;

    & > h2 {
      font-size: ${({ theme }) => theme.fontSize.m};
      font-weight: 600;
      margin: 0;
    }
  }
`;

export const DetailsWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.white};
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;

  svg {
    width: 25px;
    fill: ${({ theme }) => theme.colors.white};
    path {
      fill: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const Exercise = styled.li`
  display: grid;
  grid-template: 25px 25px / 50px 1fr 50px;
  column-gap: 30px;
  align-items: center;
  margin-top: 20px;
`;

export const ListOrder = styled.span`
  grid-row: 1 / -1;
  grid-column: 1;
  justify-self: center;
  font-size: 30px;
  color: #f0ba73;
`;

export const ListName = styled.span`
  font-weight: 600;
  grid-row: 2;
  grid-column: 2;
`;

export const ListTime = styled.span`
  color: ${({ theme }) => theme.colors.fontGray};
  grid-row: 1;
  grid-column: 2;
`;

export const AddNewTrainingButton = styled.button`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  padding: 14px 20px;
  font-size: ${({ theme }) => theme.fontSize.m};
  border: 2px solid #f0ba73;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  transition: transform 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;
