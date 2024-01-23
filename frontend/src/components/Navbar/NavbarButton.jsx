import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavbarButton = (props) => {
  const {text, link} = props;
  const navigate = useNavigate();


  return (
    <Button variant="contained" onClick={()=>navigate(link)} style={{
        width: "15vw",
        color: "#000000",
        backgroundColor: '#95BD54'
    }}>
        {text}
    </Button>
  );
};

export default NavbarButton;
