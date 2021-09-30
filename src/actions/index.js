import axios from 'axios';

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const TODOLIST_REQUEST = 'TODOLIST_REQUEST';
export const TODOLIST_SUCCESS = 'TODOLIST_SUCCESS';
export const TODOLIST_FAILURE = 'TODOLIST_FAILURE';

export const CREATE_TODOLIST_REQUEST = 'CREATE_TODOLISTREQUEST';
export const CREATE_TODOLIST_SUCCESS = 'CREATE_TODOLIST_SUCCESS';
export const CREATE_TODOLIST_FAILURE = 'CREATE_TODOLISTFAILURE';

export const EDIT_TODOLIST_REQUEST = 'EDIT_TODOLISTREQUEST';
export const EDIT_TODOLIST_SUCCESS = 'EDIT_TODOLIST_SUCCESS';
export const EDIT_TODOLIST_FAILURE = 'EDIT_TODOLISTFAILURE';

export const DELETE_TODOLIST_REQUEST = 'DELETE_TODOLISTREQUEST';
export const DELETE_TODOLIST_SUCCESS = 'DELETE_TODOLIST_SUCCESS';
export const DELETE_TODOLIST_FAILURE = 'DELETE_TODOLISTFAILURE';

export const authenticate = (login, pass) => (dispatch) => {
  dispatch({ type: AUTHENTICATE_REQUEST });

  return axios
    .post('https://recruitment.ultimate.systems/auth/local', {
      identifier: login,
      password: pass,
    })
    .then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('jwt', JSON.stringify(response.data.jwt));
      dispatch({ type: AUTHENTICATE_SUCCESS, payload: response });
    })
    .catch((error) => {
      dispatch({ type: AUTHENTICATE_FAILURE, error });
    });
};

export const register = (login, youremail, pass) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post('https://recruitment.ultimate.systems/auth/local/register', {
      username: login,
      email: youremail,
      password: pass,
    })
    .then((response) => {
      dispatch({ type: REGISTER_SUCCESS, payload: response });
    })
    .catch((error) => {
      dispatch({ type: REGISTER_FAILURE, payload: error });
    });
};

export const getToDoList = () => (dispatch) => {
  dispatch({ type: TODOLIST_REQUEST });
  return axios
    .get('https://recruitment.ultimate.systems/to-do-lists', {
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`,
      },
    })
    .then((response) => {
      dispatch({ type: TODOLIST_SUCCESS, payload: response });
    })
    .catch((error) => {
      dispatch({ type: TODOLIST_FAILURE, payload: error });
    });
};

export const createToDoList = (todolist) => (dispatch) => {
  dispatch({ type: CREATE_TODOLIST_REQUEST });

  return axios
    .post(
      'https://recruitment.ultimate.systems/to-do-lists',
      {
        ...todolist,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`,
        },
      },
    )
    .then((response) => {
      dispatch({ type: CREATE_TODOLIST_SUCCESS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: CREATE_TODOLIST_FAILURE, payload: err });
    });
};

export const editToDoList = (todolist, id) => (dispatch) => {
  dispatch({ type: EDIT_TODOLIST_REQUEST });

  return axios
    .put(
      `https://recruitment.ultimate.systems/to-do-lists/${id}`,
      {
        ...todolist,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`,
        },
      },
    )
    .then((response) => {
      dispatch({ type: EDIT_TODOLIST_SUCCESS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: EDIT_TODOLIST_FAILURE, payload: err });
    });
};

export const deleteToDoList = (id) => (dispatch) => {
  dispatch({ type: DELETE_TODOLIST_REQUEST });

  return axios
    .delete(
      `https://recruitment.ultimate.systems/to-do-lists/${id}`,

      {
        headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('jwt'))}`,
        },
      },
    )
    .then((response) => {
      dispatch({ type: DELETE_TODOLIST_SUCCESS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: DELETE_TODOLIST_FAILURE, payload: err });
    });
};
