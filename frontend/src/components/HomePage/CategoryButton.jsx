import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';


const CategoryButton = (props) => {
  const category = props.category;
  const navigate = useNavigate();
  return (
    <div className='bg-primary d-flex flex-column justify-content-center align-items-center'
     onClick={() => {navigate(category.pagelink)}}
     style={{
        width: "30vh", 
        height: "30vh",
        cursor: "pointer"
    }}>
        <div className='bg-secondary' style={{width: "min-content"}}>
            <FontAwesomeIcon icon={category.icon} size='10x'/>
        </div>
        <div className='w-100 bg-secondary text-center'>
            <h1>{category.title}</h1>
        </div>
    </div>
  );
};

export default CategoryButton;
