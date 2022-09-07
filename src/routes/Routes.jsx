import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';
import Apresentation from '../pages/Apresentation';
import ProfileEdit from '../pages/ProfileEdit';

import '../style/style.css';

function Routes() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Apresentation } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/wallet" component={ Wallet } />
          <Route exact path="/profileEdit" component={ ProfileEdit } />
        </Switch>
      </div>
    );
}

export default Routes;
