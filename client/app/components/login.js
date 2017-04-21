
import Inferno from 'inferno';
import cookies from 'cookies-js';

function Login({ actions, browserHistory, state: { searchTerm } }) {

  if(cookies.get('token'))
    browserHistory.push('/search');
  const login = () => actions.login($('#username')[0].value, $('#password')[0].value, searchTerm);

  return (
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      <div className='form-group row'>
        <label>Username: </label>
        <input type='text' id='username' className='form-control' placeholder='Username' />
      </div>
      <div className='form-group row'>
        <label>Password: </label>
        <input type='password' id='password' className='form-control' placeholder='Password' />
      </div>
      <div className='form-group row'>
        <button type='button' className='btn btn-primary' onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
