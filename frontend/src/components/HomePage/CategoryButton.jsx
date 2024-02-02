import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';


const CategoryButton = (props) => {
  const category = props.category;
  const navigate = useNavigate();
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'
     onClick={() => {navigate(category.pagelink)}}
     style={{
        width: "30vh", 
        height: "30vh",
        cursor: "pointer",
        background: 'linear-gradient(to bottom, rgba(143, 191, 4, 0.4), rgba(143, 191, 4, 0.06))'
        
    }}>
        <div style={{width: "fit-content"}}>
            <FontAwesomeIcon icon={category.icon} color={category.color} size='10x' />
        </div>
        <div className='text-center'>
            <h1>{category.title}</h1>
        </div>
    </div>
  );
};

export default CategoryButton;
