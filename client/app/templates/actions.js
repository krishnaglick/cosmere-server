
import _ from 'lodash';

const actions = [
  'actionsReplacer'
];

function bindActions(setState) {
  const boundActions = {};
  _.forEach(actions, (action) => {
    _.forEach(Object.keys(action), (key) => {
      if(typeof action[key] === 'function')
        boundActions[key] = async function() {
          setState(await action[key](...arguments));
        };
    });
  });
  return boundActions;
}

async function initializeData() {
  const initialState = await Promise.all(_.map(Object.keys(actions), async (key) => {
    return await Promise.all(_.map(Object.keys(actions[key]), async (actionKey) => {
      const action = actions[key][actionKey];
      if(typeof action === 'function' && action.initial) {
        try {
          const value = await action();
          return {
            key: actionKey,
            value
          };
        }
        catch(x) {
          console.error('Error loading initial data\n', x);
        }
      }
      return null;
    }));
  }));

  initialState.push({
    key: 'loaded',
    value: true
  });

  const cleanInitialStateArray = _.filter(_.flatten(initialState));

  const cleanInitialState = {};
  _.forEach(cleanInitialStateArray, ({key, value}) => cleanInitialState[key] = value);

  return cleanInitialState;
}

exports.bindActions = bindActions;
exports.initializeData = initializeData;
