import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primaryGradient:
      "linear-gradient(270deg, rgba(146,163,253,1) 0%, rgba(157,206,255,1) 100%)",
    primaryGradientBorder:
      "linear-gradient(270deg, white 0%, white 100%) padding-box, linear-gradient(270deg, rgba(146,163,253,1) 0%, rgba(157,206,255,1) 100%) border-box",
    primaryLightBgc: " linear-gradient(270deg, rgba(146,163,253,0.2) 0%, rgba(157,206,255,0.2) 100%), linear-gradient(270deg, white 0%, white 100%) ",
    primary: "rgba(146,163,253,1)",
    secondary: "#e5ddff",
    fontDark: "#3f3f3f",
    fontGray: "#e6e6f1",
    darkBlue: "#4f98c9",
    lightGreen: "#effbf7",
    backgroundGradient: "linear-gradient(320deg, #e8f0f9 0%, #f4eeff 100%)",
    lightGray: "#f2f2f3",
    white: "#ffffff",
    black: "#111111",
    success: "#8FCB81",
    error: "#df4856",
    errorLight: "#fef1f2",
    warning: "#E1D888",
    infoLight: "#e5f6fd",
    infoDark: "#014361",
  },
  fontSize: {
    xxl: "28px",
    xl: "25px",
    l: "22px",
    m: "18px",
    s: "14px",
  },
  boxShadow: {
    mainShadow: "0 4px 5px 0 rgba(0,0,0,0.25)",
    blueShadow: "0 10px 22px 0 rgba(149,173,254,0.3)",
    inputShadow: "-2px 4px 10px rgba(115, 124, 142, 0.09)",
  },
  media: {
    phone: "@media (max-width: 600px)",
    phoneKeyboard: "@media (max-height: 600px)",
    tablet: "@media (min-width: 601px)",
    desktop: "@media (min-width: 992px)",
  },
};
