import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';


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
            <FontAwesomeIcon icon={category.icon} color={category.color} size='10x'/>
        </div>
        <div className='w-100 text-center'>
            <h1>{category.title}</h1>
        </div>
    </div>
  );
};

export default CategoryButton;
