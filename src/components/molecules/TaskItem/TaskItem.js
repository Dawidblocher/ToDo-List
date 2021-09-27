import styled from 'styled-components';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import checkedSrc from 'assets/img/checked.png';

const TaskItemWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;
  align-items: center;
`;

const TaskInputField = styled(Field)`
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  width: 100%;
  padding: 6px 16px;
  font-size: 24px;
  color: #fff;
  font-weight: 400;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.textGray};
  }
`;

const TaskCheckboxField = styled(Field)`
  width: 24px;
  height: 24px;
  outline: none;
  border: 1px solid #000;
  background: transparent;
  position: absolute;
  opacity: 0;

  &:checked + span:after {
    content: '';
    width: 22px;
    height: 22px;
    display: block;
    transform: translate(5px, -5px);
    background: url(${checkedSrc});
    background-repeat: no-repeat;
  }
  &:checked + span {
    border-color: green;
  }
`;

const CustomCheckbox = styled.span`
  width: 24px;
  height: 24px;
  display: block;
  outline: none;
  border: 2px solid #000;
  background: transparent;
  position: relative;
`;

const CheckboxWrapper = styled.label`
  width: 24px;
  height: 24px;
  margin-right: 16px;
  cursor: pointer;
`;

const TaskItem = ({ name, checkboxName }) => (
  <TaskItemWrapper>
    <CheckboxWrapper htmlFor={checkboxName}>
      <TaskCheckboxField type="checkbox" id={checkboxName} name={checkboxName} />
      <CustomCheckbox />
    </CheckboxWrapper>

    <TaskInputField type="text" id={name} name={name} placeholder="Task Name" />
  </TaskItemWrapper>
);

TaskItem.propTypes = {
  name: PropTypes.string,
  checkboxName: PropTypes.string,
};

TaskItem.defaultProps = {
  name: '',
  checkboxName: '',
};

export default TaskItem;
