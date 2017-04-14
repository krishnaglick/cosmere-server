
import Inferno from 'inferno';

import routes from './routes';

if(typeof window !== 'undefined')
  Inferno.render(routes, window.app);

if(window.potato && window.potato.sweetPotato)
  require('./templates/actions');
