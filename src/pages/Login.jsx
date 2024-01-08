// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './api';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      // Store the token in local storage or session storage
      localStorage.setItem('token', response.access_token);
      // Redirect to a protected route
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
