import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';

import Game from 'src/components/Game';

import './App.scss';

export const Routes = [
  {
      path: '/:view?',
      component: Game,
      exact: false,
  },
]
const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App" ref={el => this.$node = el}>
          {
            Routes.map((route, key) => (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={key}
              />
            ))
          }
        </div>
      </Router>
    )
  }
}

export default App;
