import styled from "styled-components";

type CreateTrainingBoxType = {
  step: number;
};

export const Wrapper = styled.div<CreateTrainingBoxType>`
  width: 100%;
  padding: 20px 0;
  transition: background-image 3s ease;
  background-image: ${({ step }) => {
    if (step === 0)
      return "linear-gradient(to bottom, #eef6ff , #eef6ff 50%)";
    if (step === 1)
      return "linear-gradient(to bottom, #effbf7, #eef6ff 33%)";
    if (step === 2)
      return "linear-gradient(to bottom ,#effbf7 , #eef6ff 66%)";
    if (step === 3)
      return "linear-gradient(to bottom, #effbf7 0 100%)";
  }};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

/* #effbf7 - green  #eef6ff - blue */
