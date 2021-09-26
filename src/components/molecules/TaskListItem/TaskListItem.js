import styled from 'styled-components';

const ListItemWrapper = styled.div`
  padding: 36px;
  background: ${({ theme }) => theme.gray};
  border-radius: 8px;
  display: flex;
  width: ${({ minwidth }) => minwidth};
  justify-content: space-between;
  margin-bottom: 36px;
  transition: box-shadow 0.3s, transform 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 7px 0px #000;
    transform: scale(1.01);
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  color: #fff;
  margin: 0;
`;

const ListItemName = styled.p`
  font-size: 24px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  color: #fff;
  width: 171px;
  margin: 0;
`;

const TaskListItem = () => (
  <ListItemWrapper>
    <ListItemName bold>ToDo List Name</ListItemName>
    <Text italic>Created at: 18-03-2021</Text>
    <Text>Completed: 15 Uncompleted: 10 All: 25</Text>
  </ListItemWrapper>
);

export default TaskListItem;
