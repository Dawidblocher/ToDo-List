import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AuthView from './AuthView';
import TaskListView from './TaskListView';

const Root = () => (
  <HashRouter>
    <Switch>
      <Route path="/login" component={() => <AuthView formType="login" />} />
      <Route path="/register" component={() => <AuthView formType="register" />} />
      <Route path="/" exact component={TaskListView} />
    </Switch>
  </HashRouter>
);

export default Root;
