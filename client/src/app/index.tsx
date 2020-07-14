import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomeContainer } from 'app/containers/HomeContainer';

import './index.css';

// render react DOM
export const App = hot(({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomeContainer} />
      </Switch>
    </Router>
  );
});
