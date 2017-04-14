
import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

import Core from './components/core';
import Songs from './components/songs';
import Login from './components/login';
import Register from './components/register';

const routes = (
  <Router history={ browserHistory }>
    <Route component={ Core }>
      <IndexRoute component={ Login }/>
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />
      <Route path='/songs' component= { Songs } />
    </Route>
  </Router>
);

export default routes;
export { browserHistory };
