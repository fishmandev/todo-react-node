import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import login from './../api/login';
import { useAuth } from './../useAuth';
import './Login.css';

const Login = () => {
  let auth = useAuth();
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password).then(accessToken => {
      auth.login(accessToken);
      history.push('/');
    }).catch(err => {
      // TODO Add error handler
    });
  }

  return <div>
    <div className='todo'>
      <div className='container'>
        <div className='login-box'>
          <input type="text"
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
          <input type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
          <button className='login-button' onClick={handleLogin}>Log in</button>
        </div>
      </div>
    </div>
  </div>
};

export default Login;