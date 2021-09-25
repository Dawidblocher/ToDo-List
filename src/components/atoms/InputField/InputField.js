import styled from 'styled-components';
import { Field } from 'formik';

const InputField = styled(Field)`
  min-height: 50px;
  border: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
  color: ${({ theme }) => theme.textGray};
  padding: 10px 18px;
  width: 100%;
  margin-bottom: 36px;
`;

export default InputField;
