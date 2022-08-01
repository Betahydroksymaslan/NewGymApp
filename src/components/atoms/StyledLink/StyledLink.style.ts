import styled from "styled-components";
import { Link } from "react-router-dom";

export const NewLink = styled(Link)`
  width: max-content;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  color: ${({ theme }) => theme.colors.fontDark};
`;
