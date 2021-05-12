import { useAuth } from './../useAuth';

const useClient = () => {
  const auth = useAuth();
  const fetch = (endpoint, { body, ...customConfig } = {}) => {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL || 'http://localhost';
    const headers = { 'Content-Type': 'application/json' };
    const config = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    };
    if (body) {
      config.body = JSON.stringify(body)
    }

    return window
      .fetch(`${apiUrl}/${endpoint}`, config)
      .then(response => {
        if (response.ok) {
          if (response.status === 200 || response.status === 201)
            return response.json();
          return '';
        } else {
          return response.text().then(err => {
            if (response.status === 401) {
              if (endpoint !== 'auth/access_token'
                && endpoint !== 'auth/token'
                && config.headers.hasOwnProperty('x-access-token'))
                return updateTokens(endpoint, { body, ...customConfig });
              throw new Error('401');
            }

            throw new Error(err);
          });
        }
      });
  };

  const updateTokens = (endpoint, { body, ...customConfig }) => {
    return fetch('auth/token', {
      body: {
        refreshToken: auth.getRefreshToken()
      }
    }).then(result => {
      auth.login(result.accessToken, result.refreshToken);
      const authHeader = { 'x-access-token': result.accessToken };
      customConfig.headers = { ...customConfig.headers, ...authHeader };

      return fetch(endpoint, { body, ...customConfig });
    });
  };

  return { fetch };
}

export default useClient;