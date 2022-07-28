import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

export default Routes;