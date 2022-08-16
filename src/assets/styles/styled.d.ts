import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primaryGradient: string;
      primaryGradientBorder: string;
      primaryLightBgc: string;
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
      infoDark: string;
      infoLight: string;
    };

    fontSize: {
      xxl: string;
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
      blueShadow: string;
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
