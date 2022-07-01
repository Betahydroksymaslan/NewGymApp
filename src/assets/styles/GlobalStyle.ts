import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}

    html{ color: ${({ theme }) => theme.colors.fontDark};}

    body {
        font-family: 'Montserrat', sans-serif;
        color: ${({ theme }) => theme.colors.fontDark};
        height: 100vh;
        background: ${({ theme }) => theme.colors.backgroundGradient};
    }

    .Toastify__toast-container {
        margin-top: 10px;
        transform: translateX(5%)
    }

    .Toastify__toast {
        width: 90%;
        border-radius: 8px;
    }

`;
