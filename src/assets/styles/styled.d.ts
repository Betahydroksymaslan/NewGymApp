import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      backgroundGradient: string;
      fontDark: string;
      fontGray: string;
      darkBlue: string;
      lightGreen: string;
      lightGray: string;
      white: string;
      black: string;
      success: string;
      error: string;
      errorLight: string;
      warning: string;
    };

    fontSize: {
      xl: string;
      l: string;
      m: string;
      s: string;
    };

    /* fontSize: {
      headers: string;
      xl: string;
      l: string;
      m: string;
      s: string;
      xs: string;
      xxs: string;
    }*/

    boxShadow: {
      mainShadow: string;
      inputShadow: string;
    };

    media: {
      phone: string;
      phoneKeyboard: string;
      tablet: string;
      desktop: string;
    };
  }
}
