import { useAuth } from './../useAuth';
import useClient from './useClient';

const useLogin = () => {
  const auth = useAuth();
  const client = useClient();
  const login = (username, password) => {
    return client.fetch('auth/access_token', {
      body: {
        username: username,
        password: password
      }
    }).then(result => {
      auth.login(result.accessToken, result.refreshToken)
      return true;
    });
  }

  return { login };
}

export default useLogin;