
import Inferno from 'inferno';
import { Link } from 'inferno-router';
import cookies from 'cookies-js';

function NavBar({ browserHistory, actions: { logout }, state: { account: { admin, moderator } } }) {
  const loggedIn = cookies.get('token');

  const { pathname } = browserHistory.location;

  return (
    <nav className='navbar navbar-toggleable-md navbar-inverse bg-primary'>
      <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <Link className='navbar-brand' to='/'>
        <img src='/assets/cosmere-symbol.png' style={{width: '50px', height: '50px'}} />
        {' Wordbringers'}
      </Link>

      <div className='collapse navbar-collapse' id='navbarToggler'>
        <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
          <li className={`nav-item ${pathname === '/' && 'active'}`}>
            <Link className='nav-link' to='/'>Home</Link>
          </li>
          <li className={`nav-item ${pathname.includes('search') && 'active'}`}>
            <Link className='nav-link' to='/search'>Search</Link>
          </li>
          { loggedIn && moderator &&
            <li className={`nav-item ${pathname.includes('wobs/add') && 'active'}`}>
              <Link className='nav-link' to='/wobs/add'>Add Word</Link>
            </li>
          }
          { loggedIn && admin &&
            <li className={`nav-item ${pathname.includes('manage/users') && 'active'}`}>
              <Link className='nav-link' to='/manage/users'>Manage Users</Link>
            </li>
          }
          { loggedIn &&
            <li className='nav-item'>
              <Link onClick={logout} className='nav-link'>Logout</Link>
            </li>
          }
          { !loggedIn &&
            <li className={`nav-item ${pathname.includes('login') && 'active'}`}>
              <Link className='nav-link' to='/login'>Login</Link>
            </li>
          }
          { !loggedIn &&
            <li className={`nav-item ${pathname.includes('register') && 'active'}`}>
              <Link className='nav-link' to='/register'>Register</Link>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
