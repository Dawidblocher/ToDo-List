import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { authenticate, register } from 'actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as Yup from 'yup';

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
  max-width: 600px;
  width: 100%;
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

const ErrorMessageWrapper = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 200;
  margin-bottom: 5px;
`;

const AuthView = ({ formType, authenticate, register, user }) => {
  if (user) {
    return <Redirect to="/" />;
  }
  const validateRegister = Yup.object({
    login: Yup.string().max(30, 'Max 30 chararacters').required('Login is required'),
    email: Yup.string().email('Emial is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Min 6 chararacters').required('Passsowrd is required'),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm passsowrd is required'),
  });
  const validateLogin = Yup.object({
    login: Yup.string().max(30, 'Max 30 chararacters').required('Login is required'),
    password: Yup.string().min(6, 'Min 6 chararacters').required('Passsowrd is required'),
  });
  return (
    <MainTemplate>
      <FormWrapper>
        {formType === 'register' ? (
          <ArrowButton as={Link} to="/login">
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
            login: '',
            email: '',
            password: '',
            passwordRepeat: '',
          }}
          validationSchema={formType === 'register' ? validateRegister : validateLogin}
          onSubmit={(values) => {
            console.log(values);
            if (formType === 'register') {
              register(values.login, values.email, values.password);
            } else {
              console.log(values);
              authenticate(values.login, values.password);
            }
          }}
        >
          <StyledForm>
            <ErrorMessageWrapper>
              <ErrorMessage name="login" />
            </ErrorMessageWrapper>
            <InputField id="login" name="login" placeholder="Email or Username" width="100%" />

            {formType === 'register' ? (
              <div>
                <ErrorMessageWrapper>
                  <ErrorMessage name="email" />
                </ErrorMessageWrapper>
                <InputField id="email" type="email" name="email" placeholder="Email" width="100%" />
              </div>
            ) : null}

            <ErrorMessageWrapper>
              <ErrorMessage name="password" />
            </ErrorMessageWrapper>
            <InputField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              width="100%"
            />

            {formType === 'register' ? (
              <div>
                <ErrorMessageWrapper>
                  <ErrorMessage name="passwordRepeat" />
                </ErrorMessageWrapper>
                <InputField
                  id="passwordRepeat"
                  type="password"
                  name="passwordRepeat"
                  placeholder="Repeat password"
                  width="100%"
                />
              </div>
            ) : null}
            <SyledFooterForm formType={formType}>
              <Button to="/" type="submit">
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
};
AuthView.propTypes = {
  formType: PropTypes.string,
  authenticate: PropTypes.func,
  register: PropTypes.func,
  user: PropTypes.object,
};

AuthView.defaultProps = {
  formType: 'Login',
};

const mapDispatchToProps = (dispatch) => ({
  authenticate: (login, passowrd) => dispatch(authenticate(login, passowrd)),
  register: (login, email, passowrd, passwordRepeat) =>
    dispatch(register(login, email, passowrd, passwordRepeat)),
});

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
