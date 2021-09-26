import styled from 'styled-components';
import { Formik, Form, FieldArray } from 'formik';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import TaskItem from 'components/molecules/TaskItem/TaskItem';

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
  display: flex;
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

const Popup = () => (
  <PopupWrapper>
    <PopupContent>
      <Formik
        initialValues={{
          name: 'My to do list name',
          tasks: [
            {
              name: 'task 1',
              isDone: false,
            },
            {
              name: 'task 2',
              isDone: true,
            },
          ],
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <PopupHeader>
              <InputField
                id="login"
                name="login"
                placeholder="List name"
                width="100%"
                value={values.name}
              />
            </PopupHeader>
            <PopupBody>
              <FieldArray
                name="tasks"
                render={(arrayHelpers) => (
                  <div>
                    {values.tasks.map((task, index) => (
                      <div key={task.name}>
                        <TaskItem name={`tasks.${index}.name`} />
                      </div>
                    ))}
                    <AddTaskWrapper>
                      <Button
                        small
                        red
                        uppercase
                        type="button"
                        onClick={() => arrayHelpers.remove(values.tasks.length - 1)}
                      >
                        Cancel
                      </Button>
                      <Button
                        small
                        uppercase
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            name: `Task Name ${values.tasks.length}`,
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
              <Button type="submit">Cancel</Button>
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
export default Popup;
