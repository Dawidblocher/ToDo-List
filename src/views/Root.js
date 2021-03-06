import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthView from './AuthView';
import TaskListView from './TaskListView';

const Root = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/login" component={() => <AuthView formType="login" />} />
      <Route path="/register" component={() => <AuthView formType="register" />} />
      <Route path="/" exact component={TaskListView} />
      <Route component={() => <AuthView formType="login" />} />
    </Switch>
  </BrowserRouter>
);

export default Root;
