
import Inferno from 'inferno';
import _ from 'lodash';

import User from './manage-pieces/user';

function ManageUsers({ actions, state }) {
  const { getUsers, saveUser } = actions;
  const { users } = state;

  if(!users) {
    getUsers();
    return (
      <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      Loading Users
      </div>
    );
  }

  return (
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
    {
      _.map(users, (user, i) => (
        <User user={user} saveUser={saveUser} key={i} />
      ))
    }
    </div>
  );
}

export default ManageUsers;
