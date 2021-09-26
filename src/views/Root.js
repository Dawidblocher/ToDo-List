import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthView from './AuthView';
import TaskListView from './TaskListView';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Login" component={() => <AuthView formType="login" />} />
      <Route path="/register" component={() => <AuthView formType="register" />} />
      <Route path="/" exact component={TaskListView} />
    </Switch>
  </BrowserRouter>
);

export default Root;
