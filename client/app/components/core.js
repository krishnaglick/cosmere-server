
import Inferno from 'inferno';
import Component from 'inferno-component';

import NavBar from './nav-bar';
import { browserHistory } from '../routes';

const { bindActions } = require('../actions/index');

class Core extends Component {
  constructor(...args) {
    super(...args);
    this.state = this.state || {
      account: { moderator: false }
    };
    this.actions = bindActions(this.setState.bind(this));
  }

  render() {
    const { state, actions, props: { params } } = this;
    console.log('Core State: ', state);
    const child = this.props.children && Inferno.cloneVNode(this.props.children, { state, actions, params, browserHistory });

    return (
      <div>
        <NavBar {...{ state, actions, browserHistory }} />
        {child}
      </div>
    );
  }
}

export default Core;
