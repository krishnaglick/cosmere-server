
import { browserHistory } from '../routes';
import cookies from 'cookies-js';
/* globals $ */
export async function login(username, password) {
  const { token, moderator } = await Promise.resolve(
    $.get(`/user/login?username=${username}&password=${password}`)
  );
  cookies.set('token', token);
  browserHistory.push('/songs');
  return {
    account: {
      moderator
    }
  };
}

export async function register(username, password) {
  const { token, moderator } = await Promise.resolve(
    $.post(`/user/register`, {
      username,
      password
    })
  );
  cookies.set('token', token);
  browserHistory.push('/songs');
  return {
    account: {
      moderator
    }
  };
}
