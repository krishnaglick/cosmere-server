
import Inferno from 'inferno';
import { Link } from 'inferno-router';

function NavBar({ browserHistory }) {
  const loggedIn = Cookies.get('token');

  const logout = () => {
    Cookies.expire('token');
    browserHistory.push('/login');
  };

  return (
    <nav className='navbar navbar-toggleable-md navbar-light bg-faded'>
      <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo02' aria-controls='navbarTogglerDemo02' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <Link className='navbar-brand'>
        <img src='http://placehold.it/100x100' style={{width: '50px', height: '50px'}} />
      </Link>

      <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
        <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
          { loggedIn &&
          <li className='nav-item'>
            <Link className='nav-link' to='/songs'>Songs</Link>
          </li>
          }
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
