import {DefaultTheme} from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: "#8458ff",
    secondary: "#e5ddff",
    fontDark: "#3f3f3f",
    fontGray: "#b9bec3",
    darkBlue: '#4f98c9',
    lightGreen: '#effbf7',
    backgroundGradient: "linear-gradient(320deg, #e8f0f9 0%, #f4eeff 100%)",
    lightGray: '#f2f2f3',
    white: '#ffffff',
    black: "#111111",
    success: "#8FCB81",
    error: "#df4856",
    errorLight: "#fef1f2",
    warning: "#E1D888",
  },
  fontSize: {
    xl: '25px',
    l: '22px',
    m: '18px',
    s: '14px',
  },
  boxShadow: {
    mainShadow: '0 4px 5px 0 rgba(0,0,0,0.25)',
    inputShadow: '-2px 4px 10px rgba(115, 124, 142, 0.09)',
  },
  media: {
    phone: '@media (max-width: 600px)',
    phoneKeyboard: '@media (max-height: 600px)',
    tablet: '@media (min-width: 601px)',
    desktop: '@media (min-width: 992px)',
  },
};
