import React, { useState } from 'react';
import { Button } from 'bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarButton = (props) => {
  const {text, link} = props;
  const navigate = useNavigate();


  return (
    <button onClick={()=>navigate(link)} style={{
        width: "15vw"
    }}>
        {text}
    </button>
  );
};

export default NavbarButton;
