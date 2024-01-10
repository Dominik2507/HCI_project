import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';

const Quiz = (props) => {
  const {quiz} = props;
  const navigate = useNavigate();

  return (
   
    <div className="bg-primary d-flex flex-row" 
        onClick={()=>{
            navigate(`/kviz/${quiz.title}?id=${quiz.id}`)
        }}

        style={
        {
            width: "41vw",
            height: "15vw",
            marginLeft: "6vw",
            cursor: "pointer"
        }
    }>
        <img src={quiz.image} style={{width: "30%"}}></img>
        <div className='d-flex flex-column justify-content-between' style={{width: "70%"}}>
            <div>
                <h1>{quiz.title}</h1>
                <div>{quiz.author}</div>
            </div>
            <div className='d-flex flex-row justify-content-between p-3'>
                <div>{quiz.category}</div>
                <div>{quiz.quizType}</div>
                <div><FontAwesomeIcon icon={faClock}/> {quiz.duration} s</div>
            </div>
            
        </div>
    </div>
   
  );
};

export default Quiz;
