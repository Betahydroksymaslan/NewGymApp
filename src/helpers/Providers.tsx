import { ReactNode } from "react";
import { store } from "store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "assets/styles/GlobalStyle";
import { theme } from "assets/styles/theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ProvidersTypes = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersTypes) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ToastContainer position="top-center"/>
        {children}
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;
