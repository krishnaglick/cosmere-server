
import { browserHistory } from '../routes';
import cookies from 'cookies-js';
/* globals $ */
export async function login(username, password) {
  const loginResult = await $.get(`/api/user/login?username=${username}&password=${password}`);
  const { token, moderator, admin } = loginResult;
  cookies.set('token', token);
  browserHistory.push('/search');
  return {
    account: {
      moderator,
      admin
    }
  };
}

export async function register(username, password) {
  const { token, moderator, admin } = await $.post(`/api/user/register`, {
    username,
    password
  });
  cookies.set('token', token);
  browserHistory.push('/search');
  return {
    account: {
      moderator,
      admin
    }
  };
}
