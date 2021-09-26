import React from 'react';
import { Formik, Form } from 'formik';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import MainTemplate from 'templates/MainTemplate';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import styled from 'styled-components';

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

const AuthView = ({ formType }) => (
  <MainTemplate>
    <FormWrapper>
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
          <Button>create an account</Button>
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
