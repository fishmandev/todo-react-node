import { useAuth } from './../useAuth';
import client from './client';

const useLogin = () => {
  const auth = useAuth();
  const login = (username, password) => {
    return client('auth/access_token', {
      body: {
        username: username,
        password: password
      }
    }).then(result => {
      auth.login(result.accessToken)
      return true;
    });
  }

  return {login}
}

export default useLogin;