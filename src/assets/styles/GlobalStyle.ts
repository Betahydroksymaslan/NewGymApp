import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}

    
    html {
        box-sizing: border-box;
        color: ${({ theme }) => theme.colors.fontDark};
    }
    
    *, *::after, *::before {
        box-sizing: inherit;
    }

    input {
        color: ${({ theme }) => theme.colors.fontDark};
    }

    body {
        font-family: 'Montserrat', sans-serif;
        color: ${({ theme }) => theme.colors.fontDark};
        height: 100vh;
        background: ${({ theme }) => theme.colors.backgroundGradient};
    }

    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! TOAST ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

    .Toastify__toast-container {
        margin-top: 10px;
        transform: translateX(5%)
    }

    .Toastify__toast {
        width: 90%;
        border-radius: 8px;
    }

    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODAL ZONE !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */

    .ReactModal__Overlay.ReactModal__Overlay--after-open {
        z-index: 1000;
    }

    .ReactModal__Overlay {
        opacity: 0;
        transition: all 200ms ease-in-out;
    }

    .ReactModal__Overlay--after-open{
        opacity: 1;
    }

    .ReactModal__Overlay--before-close{
        opacity: 0;
    }

    .ReactModal__Content {
        opacity: 0;
        transform: translate(-50%,-50%) ;
        transition: all 200ms ease-in-out;
    }

    .ReactModal__Content--after-open{
        opacity: 1;
        transform: translate(-50%,-50%) ;
    }

    .ReactModal__Content--before-close{
        opacity: 0;
        transform: translate(-50%,-50%) ;
    }

`;
