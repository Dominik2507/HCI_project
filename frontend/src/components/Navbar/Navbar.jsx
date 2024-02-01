// Navbar.js
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarButton from './NavbarButton';
import { Button } from '@mui/material';

const Navbar = ({ isAuthenticated }) => {

  const [isSearchExpanded, setSearchExpanded] = useState(false);

  const toggleSearchExpanded = () => {
    setSearchExpanded(prev => !prev)
  }

  //const handleSearch = () =>{

  //}

  return (
    <nav style={{background: 'linear-gradient(to bottom, #7bb51e, #b0d077)', color:'Background'}}>
      <div className="container-fluid navbar">
        <NavbarTitle/>
        <div className='d-flex flex-row justify-content-end me-2 gap-5'>

          
          <button className="btn btn-outline-success position-relative" onClick={()=>{toggleSearchExpanded()}}>
            <FontAwesomeIcon icon={faSearch} color='black'/>
            {
            isSearchExpanded &&
            <form className="d-flex" style={{width: "20vw", position: "absolute", top: 0, right: "50px"}}>
              <input className="form-control me-2" lang='hr' type="search" placeholder="Traži..." aria-label="Traži"/>
            </form>
          }
          </button>
          {
            isAuthenticated ? 
            <>
              <NavbarButton text="Kategorije" link="/kategorije"/>
              <NavbarButton text="Stvori kviz" link="/stvoriKviz"/>
              <NavbarButton text="Profil" link="/profil"/>
              <LogoutButton />
            </>
            :
            <>
              <NavbarButton text="Kategorije" link="/kategorije"/>
              <NavbarButton text="Stvori kviz" link="/stvoriKviz"/>
              <NavbarButton text="Prijava" link="/prijava"/>
            </>
          }
        </div>
      </div>
    </nav>
  );
};

const NavbarTitle = ()=>{
  return <Link to="" className="navbar-brand m-1 ms-4"
    style={{
      fontSize: "2em"
    }}
  >KVIZ</Link>
}

const LogoutButton = () => {
  const handleLogout = () => {
    // Implement your logout logic, e.g., clear local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.href = '/prijava';
  };

  return (
      <Button variant="contained" style={{
        width: "15vw",
        color: "#000000",
        backgroundColor: '#95BD54'
    }} onClick={handleLogout}>Odjavi se</Button>
  );
};

export default Navbar;
