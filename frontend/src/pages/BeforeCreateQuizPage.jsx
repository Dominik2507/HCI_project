import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BeforeCreateQuizPage = (props) => {
  const {isAuthenticated} = props;
  const navigate = useNavigate();
  return (
    <div class='container p-4'>
        <div class='col'><h1>Kreiraj novi kviz</h1></div>
        <hr/>
        <div>
            <div class='col' style={{fontSize:'30px'}}>
                Za stvaranje kviza potrebno je definirati:
                <ul>
                    <li>
                        Ime kviza
                    </li>
                    <li>
                        Kategoriju kviza
                    </li>
                    <li>
                        Tip kviza
                    </li>
                    <li>
                        Pitanja i odgovore, odnosno pojmove za povezivanje
                    </li>
                </ul>
            </div>
        </div>
        {
            isAuthenticated ?
            <Button variant="contained" style={{
                color: "#000000",
                backgroundColor: 'rgba(143, 191, 4, 0.5)'
            }} onClick={()=>{navigate("/stvaranjeKviza")}}><h4>Započni stvaranje</h4></Button>
            :
            <Button variant="contained" style={{
                color: "#000000",
                backgroundColor: 'rgba(143, 191, 4, 0.5)'
            }} onClick={()=>{navigate("/prijava")}}><h4>Prijavi se</h4></Button>
        }
        
    </div>
  );
};

export default BeforeCreateQuizPage;
