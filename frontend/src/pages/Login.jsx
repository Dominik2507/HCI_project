// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { Button } from '@mui/material';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const {refresh} = props
  
  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      // Store the token in local storage or session storage
      console.log(response)
      localStorage.setItem('token', response.token);
      // Redirect to a protected route
      navigate('/');
      refresh()
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div class='container p-5' style={{minHeight:'100vh'}}>
      <div className='d-grid justify-content-center w-100 align-items-center' style={{minHeight:'50vh'}}>
      <div>
      <input class="form-control"
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
     </div>
     <div>
      <input class="form-control"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      </div>
      <div>
      <Button variant="contained" style={{
        width: "15vw",
        color: "#000000",
        backgroundColor: '#95BD54'
    }} onClick={handleLogin}>Prijava</Button>
     </div>
      <div> Nemaš račun? <Link to="/registracija">Registriraj se</Link></div>
    </div>
    </div>
    
  );
};

export default Login;
