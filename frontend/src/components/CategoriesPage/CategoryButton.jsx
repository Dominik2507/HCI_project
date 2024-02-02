import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faEarthEurope, faBook, faBasketball,faMusic,faBurger,faFilm,faFlask,faBookOpen} from '@fortawesome/free-solid-svg-icons';



const CategoryButton = (props) => {
  const category = props.category;
  const navigate = useNavigate();
  return (
    <div className='d-flex flex-row justify-content-center align-items-center'
     onClick={() => {navigate(category.pagelink)}}
     style={{
        width: "40vw", 
        height: "30vh",
        cursor: "pointer",
        marginBottom: "10px",
        background:"linear-gradient(to bottom, rgba(116, 169, 29, 0.6), rgba(128, 171, 4, 0.35))"
    }}>
        <div style={{width: "min-content", padding:"50px"}}>
            {getIcon(category)}
        </div>
        <div className='w-100 text-center'>
            <h1>{category.title}</h1>
        </div>
    </div>
  );
};

const getIcon = (category) => {
  if (category.icon == "faEarthEurope") {
    return <FontAwesomeIcon icon={faEarthEurope} color="darkblue" size='10x'/>
  }
  if (category.icon == "faBook") {
    return <FontAwesomeIcon icon={faBook} color="green" size='10x'/>
  }
  if (category.icon == "faBasketball") {
    return <FontAwesomeIcon icon={faBasketball} color="red" size='10x'/>
  }
  if (category.icon == "faMusic") {
    return <FontAwesomeIcon icon={faMusic}  size='10x'/>
  }
  if (category.icon == "faBurger") {
    return <FontAwesomeIcon icon={faBurger} color="orange" size='10x'/>
  }  if (category.icon == "faFilm") {
    return <FontAwesomeIcon icon={faFilm} color={category.color} size='10x'/>
  }  if (category.icon == "faFlask") {
    return <FontAwesomeIcon icon={faFlask} color={category.color} size='10x'/>
  }  if (category.icon == "faBookOpen") {
    return <FontAwesomeIcon icon={faBookOpen}  size='10x'/>
  }


};
export default CategoryButton;
