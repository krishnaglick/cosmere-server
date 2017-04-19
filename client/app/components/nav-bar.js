
import Inferno from 'inferno';
import { Link } from 'inferno-router';
import cookies from 'cookies-js';

function NavBar({ browserHistory }) {
  const loggedIn = cookies.get('token');

  const logout = () => {
    cookies.expire('token');
    browserHistory.push('/');
  };

  return (
    <nav className='navbar navbar-toggleable-md navbar-inverse bg-primary'>
      <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <Link className='navbar-brand'>
        <img src='/assets/cosmere-symbol.png' style={{width: '50px', height: '50px'}} />
        {' Ars Arcanum'}
      </Link>

      <div className='collapse navbar-collapse' id='navbarToggler'>
        <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/search'>Search</Link>
          </li>
          { loggedIn &&
            <li className='nav-item'>
              <Link onClick={logout} className='nav-link'>Logout</Link>
            </li>
          }
          { !loggedIn &&
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>Login</Link>
            </li>
          }
          { !loggedIn &&
            <li className='nav-item'>
              <Link className='nav-link' to='/register'>Register</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
