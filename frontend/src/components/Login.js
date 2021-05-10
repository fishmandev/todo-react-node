import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import useLogin from './../api/useLogin';
import './Login.css';

const Login = () => {
  const auth = useLogin();
  const history = useHistory();
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
    auth.login(username, password).then(() => {
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