import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-y: scroll;

  & > button {
    margin-top: auto;
  }
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HEADER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const SessionHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 3px;

  h1 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! EXERCISES !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

export const ExercisesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 30px;
  width: 100%;
`;

export const Exercise = styled.div<{
  progressType: "success" | "error" | "info";
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.inputShadow};
  padding: 15px;
  gap: 10px;
  background-color: ${({ theme: { colors }, progressType }) => {
    if (progressType === "success") return colors.success;
    if (progressType === "info") return colors.infoLight;
    return colors.errorLight;
  }};
`;

export const ExerciseName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 600;
`;

export const ExerciseScores = styled.span<{ suffix: "p" | "kg" }>`
  &::after {
    margin-left: 3px;
    font-size: ${({ theme }) => theme.fontSize.m};
    content: "${({ suffix }) => suffix || ""}";
  }
`;

export const StyledParagraph = styled.p<{
  progressType: "success" | "error" | "info";
}>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme: { colors }, progressType }) => {
    if (progressType === "success") return colors.successDark;
    if (progressType === "info") return colors.infoDark;
    return colors.error;
  }};
`;

export const Entity = styled.span`
  margin: 0 10px;
`;
