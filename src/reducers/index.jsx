import {
  AUTHENTICATE_SUCCESS,
  TODOLIST_SUCCESS,
  CREATE_TODOLIST_SUCCESS,
  EDIT_TODOLIST_SUCCESS,
  DELETE_TODOLIST_SUCCESS,
} from 'actions';

const user = JSON.parse(sessionStorage.getItem('user'));

const initialState = { user };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOLIST_SUCCESS:
      return {
        ...state,
        todoList: action.payload.data,
      };

    case CREATE_TODOLIST_SUCCESS:
      return {
        ...state,
        todoList: [...state.todoList, action.payload.data],
      };

    case EDIT_TODOLIST_SUCCESS:
      return {
        ...state,
        todoList: [
          action.response.data,
          ...state.todoList.filter((item) => item.id !== action.payload.data.id),
        ],
      };
    case DELETE_TODOLIST_SUCCESS:
      return {
        ...state,
        todoList: [...state.todoList.filter((item) => item.id !== action.payload.data.id)],
      };

    case AUTHENTICATE_SUCCESS:
      const { user, jwt } = action.payload.data;

      return {
        ...state,
        user,
        jwt,
      };
    default:
      return state;
  }
};

export default rootReducer;
