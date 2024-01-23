import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import { Button } from '@mui/material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(formData.password != formData.cpassword){
      
      return
    }
    // Add your registration logic here
    console.log('Registration data:', formData);
    register(formData)

    navigate("/prijava")
  };

  return (
    <div>
     
      <div class='container p-5' style={{minHeight:'100vh'}}>
      <div className='d-grid justify-content-center w-100 align-items-center' style={{minHeight:'50vh'}}>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input class="form-control p-2"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input class="form-control p-2"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input class="form-control p-2"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm password:</label>
          <input class="form-control p-2"
            type="password"
            id="cpassword"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div class="p-2">
        <Button variant="contained" style={{
        width: "15vw",
        color: "#000000",
        backgroundColor: '#95BD54'
    }} on type="submit">Register</Button>
    </div>
      </form>
      </div>
      </div>
    </div>
  );
};

export default RegisterPage;
