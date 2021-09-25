import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import Button from 'components/atoms/Button/Button';
import { theme } from 'theme/mainTheme';

const Root = () => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div>
        <Logo />
        <Button primary>Login</Button>
        <Button>create an account</Button>

        <Button small uppercase>
          Login
        </Button>

        <Button small red>
          Login
        </Button>
      </div>
    </ThemeProvider>
  </div>
);

export default Root;
