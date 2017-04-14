
import Inferno from 'inferno';
import Component from 'inferno-component';

import NavBar from './nav-bar';
import { browserHistory } from '../routes';

const { bindActions/*, initializeData*/ } = require('../actions/index');

class Core extends Component {
  constructor(...args) {
    super(...args);
    this.actions = bindActions(this.setState.bind(this));
  }

  render() {
    const { state, actions } = this;
    const child = this.props.children && Inferno.cloneVNode(this.props.children, { state, actions, browserHistory });

    return (
      <div>
        <NavBar {...{ state, actions, browserHistory }} />
        {child}
      </div>
    );
  }
}

export default Core;
