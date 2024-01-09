import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BeforeCreateQuizPage = (props) => {
  const {isAuthenticated} = props;
  const navigate = useNavigate();
  return (
    <div>
        <div>Kreiraj novi kviz</div>
        <hr/>
        <div>
            <div>
                Za stvaranje kviza potrebno je definirati:
                <ul>
                    <li>
                        Ime kviza
                    </li>
                    <li>
                        Kategorija kviza
                    </li>
                    <li>
                        Tip kviza
                    </li>
                    <li>
                        Pitanja i odgovori, odnosno pojmovi za povezivanje
                    </li>
                </ul>
            </div>
        </div>
        {
            isAuthenticated ?
            <button onClick={()=>{navigate("/stvaranjeKviza")}}>Započni stvaranje</button>
            :
            <button onClick={()=>{navigate("/prijava")}}>Prijavi se</button>
        }
        
    </div>
  );
};

export default BeforeCreateQuizPage;
