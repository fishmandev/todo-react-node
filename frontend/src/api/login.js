import client from './client';

/**
 * Log in and gets access token
 *
 * @param name
 * @returns {Promise<Response>}
 */
const login = (username, password) => {
  return client('auth/access_token', {
    body: {
      username: username,
      password: password
    }
  }).then(result => {
    return result.accessToken;
  });
};

export default login;