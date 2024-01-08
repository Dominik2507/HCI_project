// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav>
      {isAuthenticated ? (
        <AuthenticatedNavbar />
      ) : (
        <UnauthenticatedNavbar />
      )}
    </nav>
  );
};

const AuthenticatedNavbar = () => {
  return (
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <LogoutButton />
    </div>
  );
};

const UnauthenticatedNavbar = () => {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

const LogoutButton = () => {
  const handleLogout = () => {
    // Implement your logout logic, e.g., clear local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Navbar;
