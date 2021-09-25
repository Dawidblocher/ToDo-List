import React from 'react';
import GlobalStyle from 'theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Logo from 'components/atoms/Logo/Logo';
import Button from 'components/atoms/Button/Button';
import { theme } from 'theme/mainTheme';
// import Headign from 'components/atoms/Heading/Heading';
import { Formik, Form } from 'formik';
import InputField from 'components/atoms/InputField/InputField';

const Root = () => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <div>
        <Logo />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
          }}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            console.log(values);
          }}
        >
          <Form>
            <InputField id="login" name="login" placeholder="Email or Username" />

            <InputField id="password" type="password" name="lastName" placeholder="Password" />

            <Button primary type="submit">
              Login
            </Button>
          </Form>
        </Formik>
      </div>
    </ThemeProvider>
  </div>
);

export default Root;
