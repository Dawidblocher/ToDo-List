import { createStore, applyMiddleware } from 'redux';
import ToDoApp from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(ToDoApp, applyMiddleware(thunk));

export default store;
