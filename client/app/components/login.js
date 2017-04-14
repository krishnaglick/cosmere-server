
import Inferno from 'inferno';

function Login({ actions, browserHistory }) {

  if(Cookies.get('token'))
    browserHistory.push('/songs');
  const login = () => actions.login($('#username')[0].value, $('#password')[0].value);

  return (
    <div className='form-group' style={{width: '60%', marginLeft: '20%'}}>
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
