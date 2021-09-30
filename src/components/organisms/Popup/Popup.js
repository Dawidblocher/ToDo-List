import styled from 'styled-components';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import TaskItem from 'components/molecules/TaskItem/TaskItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createToDoList, editToDoList } from 'actions';
import * as Yup from 'yup';

const PopupHeader = styled.header`
  border-bottom: 4px solid #ff9900;
  margin-bottom: 32px;
`;

const SyledFooterForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopupWrapper = styled.div`
  position: absolute;
  width: 100%;

  top: 0;
  left: 0;
  z-index: 97;
  display: ${({ popupStatus }) => (popupStatus ? 'flex' : 'none')};
  justify-content: center;

  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: fixed;
    display: block;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.65);
  }
`;

const PopupContent = styled.div`
  max-width: 1162px;
  width: calc(100% - 30px);
  background: ${({ theme }) => theme.gray};
  padding: 36px;
  min-height: calc(100vh - 200px);
  margin: 100px 15px;
  position: relative;
  z-index: 99;

  & form {
    height: 100%;
  }
`;

const PopupBody = styled.div`
  height: calc(100% - 280px);
  margin-bottom: 80px;
`;

const AddTaskWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & button {
    margin-left: 84px;
  }
`;

const TaskItemWrapper = styled.div`
  position: relative;

  &:hover button {
    opacity: 1;
  }
`;

const RemoveItem = styled.button`
  position: absolute;
  border: 0;
  top: 0;
  right: 0;
  background: transparent;
  font-size: 20px;
  color: white;
  padding: 11px;
  opacity: 0;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const validate = Yup.object({
  name: Yup.string().required('Name is required'),
});
const validateEdit = Yup.object({
  name: Yup.string(),
});
const ErrorMessageWrapper = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 200;
  margin-bottom: 5px;
`;
const Popup = ({ popupStatus, handlePopup, createToDoList, editList, editToDoList }) => (
  <PopupWrapper popupStatus={popupStatus}>
    <PopupContent>
      <Formik
        initialValues={{
          name: editList.name,
          task: editList.task,
        }}
        validationSchema={editList.id ? validateEdit : validate}
        onSubmit={(values) => {
          if (editList.id) {
            editToDoList(values, editList.id);
          } else {
            createToDoList(values);
          }
          handlePopup();
        }}
      >
        {({ values }) => (
          <Form>
            <PopupHeader>
              <ErrorMessageWrapper>
                <ErrorMessage name="name" />
              </ErrorMessageWrapper>
              <InputField type="text" id="name" name="name" placeholder="List name" width="100%" />
            </PopupHeader>
            <PopupBody>
              <FieldArray
                name="task"
                render={(arrayHelpers) => (
                  <div>
                    {values.task && values.task.length > 0
                      ? values.task.map((task, index) => (
                          <TaskItemWrapper key={index}>
                            <TaskItem
                              name={`task.${index}.name`}
                              checkboxName={`task.${index}.isDone`}
                            />
                            <RemoveItem
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              X
                            </RemoveItem>
                          </TaskItemWrapper>
                        ))
                      : null}
                    <AddTaskWrapper>
                      <Button
                        small
                        red
                        uppercase
                        type="button"
                        onClick={() => arrayHelpers.remove(values.task.length - 1)}
                      >
                        Cancel
                      </Button>
                      <Button
                        small
                        uppercase
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: ``,
                            isDone: false,
                          })
                        }
                      >
                        Add
                      </Button>
                    </AddTaskWrapper>
                  </div>
                )}
              />
            </PopupBody>

            <SyledFooterForm>
              <Button type="button" onClick={() => handlePopup()}>
                Cancel
              </Button>
              <Button primary type="submit">
                SAVE
              </Button>
            </SyledFooterForm>
          </Form>
        )}
      </Formik>
    </PopupContent>
  </PopupWrapper>
);

Popup.propTypes = {
  popupStatus: PropTypes.bool,
  handlePopup: PropTypes.func,
  createToDoList: PropTypes.func,
  editList: PropTypes.object,
  editToDoList: PropTypes.func,
};

const mapStateToProps = ({ task }) => ({ task });

const mapDispatchToProps = (dispatch) => ({
  createToDoList: (list) => dispatch(createToDoList(list)),
  editToDoList: (list, id) => dispatch(editToDoList(list, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
