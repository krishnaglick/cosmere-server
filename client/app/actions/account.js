
import { browserHistory } from '../routes';
import cookies from 'cookies-js';
/* globals $ */
export async function login(username, password) {
  const { token } = await Promise.resolve(
    $.get(`/user/login?username=${username}&password=${password}`)
  );
  cookies.set('token', token);
  browserHistory.push('/songs');
}

export async function register(username, password) {
  const { token } = await Promise.resolve(
    $.post(`/user/register`, {
      username,
      password
    })
  );
  cookies.set('token', token);
  browserHistory.push('/songs');
}
