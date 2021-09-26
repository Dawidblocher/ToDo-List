import React from 'react';
import { Formik, Form } from 'formik';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormWrapper = styled.div`
  padding: 78px 0px;
  background: ${({ theme }) => theme.gray};
  margin: 0 auto;
  margin-top: 100px;
  height: 1045px;
  max-width: 893px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  position: relative;
`;

const StyledForm = styled(Form)`
  padding: 0px 146px;
`;

const SyledFooterForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ formType }) => (formType === 'register' ? '98px' : '64px')};
`;

const StyledText = styled.p`
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #fff;
  margin: 64px 0;
`;

const ArrowButton = styled(Button)`
  position: absolute;
  left: 45px;
  top: 25px;
  min-width: inherit;
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const AuthView = ({ formType }) => (
  <MainTemplate>
    <FormWrapper>
      {formType === 'register' ? (
        <ArrowButton as={Link} to="/">
          <svg
            width="69"
            height="24"
            viewBox="0 0 69 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92894 13.1924 1.97919 12.6066 1.3934C12.0208 0.807616 11.0711 0.807617 10.4853 1.3934L0.939339 10.9393ZM69 10.5L2 10.5L2 13.5L69 13.5L69 10.5Z"
              fill="white"
            />
          </svg>
        </ArrowButton>
      ) : null}

      {formType === 'register' ? (
        <Heading marginBottom="100px">Create an new account</Heading>
      ) : (
        <Heading marginBottom="187px">Login</Heading>
      )}

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
        <StyledForm>
          <InputField id="login" name="login" placeholder="Email or Username" width="100%" />

          {formType === 'register' ? (
            <InputField id="email" type="email" name="email" placeholder="Email" width="100%" />
          ) : null}

          <InputField
            id="password"
            type="password"
            name="lastName"
            placeholder="Password"
            width="100%"
          />

          {formType === 'register' ? (
            <InputField
              id="password-repeat"
              type="password-repeat"
              name="password-repeat"
              placeholder="Repeat password"
              width="100%"
            />
          ) : null}
          <SyledFooterForm formType={formType}>
            <Button primary type="submit">
              {formType === 'register' ? 'Create' : 'Login'}
            </Button>
          </SyledFooterForm>
        </StyledForm>
      </Formik>
      {formType !== 'register' ? (
        <>
          <StyledText>or</StyledText>
          <Button as={Link} to="/register">
            create an account
          </Button>
        </>
      ) : null}
    </FormWrapper>
  </MainTemplate>
);

AuthView.propTypes = {
  formType: PropTypes.string,
};

AuthView.defaultProps = {
  formType: 'Login',
};
export default AuthView;
