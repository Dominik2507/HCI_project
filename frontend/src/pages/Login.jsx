// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const {refresh} = props
  
  const handleLogin = async () => {
      login(credentials).then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem('token'))
        navigate('/');
        refresh()
      });
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
      <button onClick={handleLogin}>Prijava</button>
      <div> Nemaš račun? <Link to="/registracija">Registriraj se</Link></div>
    </div>
  );
};

export default Login;
