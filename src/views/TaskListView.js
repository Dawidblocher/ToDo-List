import MainTemplate from 'templates/MainTemplate';
import SearchInput from 'components/atoms/SearchInput/SearchInput';
import SortSelect from 'components/molecules/SortSelect/SortSelect';
import styled from 'styled-components';
import TaskListItem from 'components/molecules/TaskListItem/TaskListItem';
import Popup from 'components/organisms/Popup/Popup';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getToDoList } from 'actions';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TaskListWrapper = styled.div`
  max-width: 1175px;
  margin: 0 auto;
`;

const TaskListBody = styled(TransitionGroup)`
  display: flex;
  flex-direction: column;

  & .item-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-out;
  }

  & .item-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-out;
  }

  & .item-enter {
    opacity: 1;
    transition: opacity 300ms ease-out;
  }
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

const TaskListView = ({ user, getToDoList, todoList = [] }) => {
  const [popupStatus, setPopupStatus] = useState(false);
  const [editList, setEditList] = useState({ name: '', task: [] });
  const [sort, setSort] = useState('default');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getToDoList();
  }, []);

  const handlePopup = (taskItem) => {
    setPopupStatus(!popupStatus);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (taskItem) {
      setEditList(taskItem);
    } else {
      setEditList({ name: '', task: [] });
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (type) => {
    setSort(type);
  };

  const sortBy = () => {
    switch (sort) {
      case 'Name, A to Z':
        return todoList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
      case 'Name, Z to A':
        return todoList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1));
      case 'sort by latest':
        return todoList.sort((a, b) => (a.published_at > b.published_at ? -1 : 1));
      case 'Sort by oldest':
        return todoList.sort((a, b) => (a.published_at > b.published_at ? 1 : -1));
      case 'By completed':
        return todoList.sort((a, b) =>
          a.task.filter((item) => item.isDone).length > b.task.filter((item) => item.isDone).length
            ? -1
            : 1,
        );
      case 'By uncompleted':
        return todoList.sort((a, b) =>
          a.task.filter((item) => !item.isDone).length >
          b.task.filter((item) => !item.isDone).length
            ? -1
            : 1,
        );
      default:
        return todoList;
    }
  };

  const search = (list) => list.filter((item) => item.name.includes(searchValue));

  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <MainTemplate>
      <TaskListWrapper>
        <TaskListHeader>
          <SearchInput placeholder="Search" onChange={(e) => handleSearch(e)} />
          <SortSelect
            placeholder="Sort by"
            options={[
              'Name, A to Z',
              'Name, Z to A',
              'Sort by latest',
              'Sort by oldest',
              'By completed',
              'By uncompleted',
            ]}
            handleSort={handleSort}
          >
            {sort}
          </SortSelect>
        </TaskListHeader>
        <TaskListBody component="div">
          {todoList.length > 0
            ? search(sortBy()).map((list) => (
                <CSSTransition key={list.id} timeout={700} classNames="item">
                  <TaskListItem
                    id={list.id}
                    name={list.name}
                    task={list.task}
                    publishedAt={list.published_at}
                    handlePopup={() => handlePopup(list)}
                  />
                </CSSTransition>
              ))
            : null}
        </TaskListBody>
        <TaskListFooter>
          <ButtonAddNewList onClick={() => handlePopup(false)} />
        </TaskListFooter>
        {popupStatus ? (
          <Popup popupStatus={popupStatus} handlePopup={handlePopup} editList={editList} />
        ) : null}
      </TaskListWrapper>
    </MainTemplate>
  );
};

TaskListView.propTypes = {
  user: PropTypes.object,
  getToDoList: PropTypes.func,
  todoList: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = ({ user, todoList }) => ({ user, todoList });

const mapDispatchToProps = (dispatch) => ({
  getToDoList: () => dispatch(getToDoList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListView);
