
import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

import Core from './components/core';
import Search from './components/search';
import Login from './components/login';
import Register from './components/register';

const routes = (
  <Router history={ browserHistory }>
    <Route component={ Core }>
      <IndexRoute component={ Search }/>
      <Route path='/login' component={ Login } />
      <Route path='/register' component={ Register } />
      <Route path='/search/:term' component= { Search } />
    </Route>
  </Router>
);

export default routes;
export { browserHistory };
