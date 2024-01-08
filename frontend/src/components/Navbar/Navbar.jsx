// Navbar.js
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarButton from './NavbarButton';

const Navbar = ({ isAuthenticated }) => {

  const [isSearchExpanded, setSearchExpanded] = useState(false);

  const toggleSearchExpanded = () => {
    setSearchExpanded(prev => !prev)
  }

  const handleSearch = () =>{

  }

  return (
    <nav>
      <div class="container-fluid navbar">
        <NavbarTitle/>
        <div className='d-flex flex-row justify-content-end border me-2 gap-5'>

          
          <button class="btn btn-outline-success position-relative" onClick={()=>{toggleSearchExpanded()}}>
            <FontAwesomeIcon icon={faSearch}/>
            {
            isSearchExpanded &&
            <form class="d-flex" style={{width: "20vw", position: "absolute", top: 0, right: "50px"}}>
              <input class="form-control me-2" lang='hr' type="search" placeholder="Traži..." aria-label="Traži"/>
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
  return <Link to="" class="navbar-brand m-1 ms-4"
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
      <button onClick={handleLogout}>Odjavi se</button>
  );
};

export default Navbar;
