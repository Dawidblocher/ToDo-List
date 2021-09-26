import MainTemplate from 'templates/MainTemplate';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import SortSelect from 'components/atoms/SortSelect/SortSelect';
import styled from 'styled-components';
import TaskListItem from 'components/molecules/TaskListItem/TaskListItem';
import Popup from 'components/organisms/Popup/Popup';

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TaskListWrapper = styled.div`
  max-width: 1175px;
  margin: 0 auto;
`;

const TaskListBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskListFooter = styled.div`
  height: 0px;
  position: fixed;
  bottom: 70px;
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  max-width: 1175px;
  transform: translateX(-50%);
`;

const ButtonAddNewList = styled.button`
  width: 104px;
  height: 104px;
  background: #fff;
  border-radius: 50%;
  border: 0;
  transform: translateY(-100%);
  cursor: pointer;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s;
  transition-timing-function: ease-in-out;

  &:hover {
    transform: translateY(-100%) rotate(180deg);
  }

  &::after {
    content: '';
    position: absolute;
    width: 78px;
    height: 0px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(90deg);

    border: 3px solid #ff9900;
  }

  &::before {
    content: '';
    position: absolute;
    width: 78px;
    height: 0px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    border: 3px solid #ff9900;
  }
`;

const TaskListView = () => (
  <MainTemplate>
    <TaskListWrapper>
      <TaskListHeader>
        <SearchInput placeholder="Search" />
        <SortSelect placeholder="Sort by" options={['Desc', 'By name', 'By date']} />
      </TaskListHeader>
      <TaskListBody>
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
        <TaskListItem />
      </TaskListBody>
      <TaskListFooter>
        <ButtonAddNewList />
      </TaskListFooter>
      <Popup />
    </TaskListWrapper>
  </MainTemplate>
);

export default TaskListView;
