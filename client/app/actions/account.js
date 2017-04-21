
import { browserHistory } from '../routes';
import cookies from 'cookies-js';
/* globals $ */
export async function login(username, password, searchTerm) {
  const { token, moderator, admin } = await $.get(`/api/user/login?username=${username}&password=${password}`);
  const cookie = {
    token,
    moderator,
    admin
  };
  cookies.set('token', JSON.stringify(cookie));
  browserHistory.push(`/search${searchTerm ? '/' + searchTerm : ''}`);
  return {
    account: {
      moderator,
      admin
    }
  };
}

export async function register(username, password, searchTerm) {
  const { token, moderator, admin } = await $.post(`/api/user/register`, {
    username,
    password
  });
  const cookie = {
    token,
    moderator,
    admin
  };
  cookies.set('token', JSON.stringify(cookie));
  browserHistory.push(`/search${searchTerm ? '/' + searchTerm : ''}`);
  return {
    account: {
      moderator,
      admin
    }
  };
}

export async function logout() {
  cookies.expire('token');
  browserHistory.push('/');
  return {
    searchResults: undefined,
    searchTerm: undefined
  };
}

export async function getAccountInfoFromCookie() {
  const cookie = cookies.get('token');
  if(cookie)
    return {
      account: JSON.parse(cookie)
    };
}
