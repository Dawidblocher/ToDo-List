import styled from 'styled-components';
import PropType from 'prop-types';
import { deleteToDoList } from 'actions';
import { connect } from 'react-redux';

const ListItemContent = styled.div`
  padding: 36px;
  background: ${({ theme }) => theme.gray};
  border-radius: 8px;
  display: flex;
  width: ${({ minwidth }) => minwidth};
  justify-content: space-between;

  cursor: pointer;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  color: #fff;
  margin: 0;
  @media (max-width: 768px) {
    & span {
      display: block;
    }
  }
`;

const ListItemName = styled.p`
  font-size: 24px;
  font-weight: ${({ bold }) => (bold ? '700' : '400')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  color: #fff;
  width: 171px;
  margin: 0;
`;

const RemoveListButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: 0;
  opacity: 0;
  border-radius: 0 8px 0 8px;
  cursor: pointer;
  padding: 6px 10px;

  &:hover {
    background: ${({ theme }) => theme.red};
  }
`;

const ListItemWrapper = styled.div`
  position: relative;
  margin-bottom: 36px;
  transition: box-shadow 0.3s, transform 0.2s;
  &:hover {
    box-shadow: 2px 2px 7px 0px #000;
    transform: scale(1.01);
  }
  &:hover button {
    opacity: 1;
  }
`;

const TaskListItem = ({ name, publishedAt, task, handlePopup, deleteToDoList, id }) => {
  const handleRemoveButton = () => {
    deleteToDoList(id);
  };
  return (
    <ListItemWrapper>
      <ListItemContent onClick={() => handlePopup()}>
        <ListItemName bold>{name}</ListItemName>
        <Text italic>Created at: {publishedAt.substring(0, 10)}</Text>
        <Text>
          <span>Completed: {task.filter((item) => item.isDone).length}</span>
          <span>Uncompleted: {task.filter((item) => !item.isDone).length}</span>
          <span>All: {task.length}</span>
        </Text>
      </ListItemContent>
      <RemoveListButton type="button" onClick={() => handleRemoveButton()}>
        X
      </RemoveListButton>
    </ListItemWrapper>
  );
};
TaskListItem.propTypes = {
  name: PropType.string,
  publishedAt: PropType.string,
  task: PropType.array,
  id: PropType.number,
  handlePopup: PropType.func,
  deleteToDoList: PropType.func,
};

// TaskListItem.propTypes = {
//   name: PropType.string,
//   published_at: PropType.string,
//   task: PropType.array,
// };

const mapDispatchTopProps = (dispatch) => ({
  deleteToDoList: (id) => dispatch(deleteToDoList(id)),
});

export default connect(null, mapDispatchTopProps)(TaskListItem);
