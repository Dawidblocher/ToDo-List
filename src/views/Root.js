import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthView from './AuthView';

const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={() => <AuthView formType="login" />} />
      <Route path="/register" component={() => <AuthView formType="register" />} />
    </Switch>
  </BrowserRouter>
);

export default Root;
