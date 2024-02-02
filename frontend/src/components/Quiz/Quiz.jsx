import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faEdit} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';

const Quiz = (props) => {
  const {quiz, allowEdit} = props;
  const navigate = useNavigate();

  return (
   
    <div className="d-flex flex-row p-0" 
        onClick={()=>{
            navigate(`/kviz/${quiz.title}?id=${quiz.id}`)
        }}

        style={
        {
            width: "41vw",
            height: "15vw",
            marginLeft: "6vw",
            cursor: "pointer",
            background:"linear-gradient(to bottom, rgba(116, 169, 29, 0.8), rgba(128, 171, 4, 0.35))"
        }
    }>
        <img src={quiz.image} style={{width: "40%"}}></img>
        <div className='d-flex flex-column justify-content-between' style={{width: "70%"}}>
            <div class='p-3'>
                <h1>{quiz.title} {allowEdit ? <FontAwesomeIcon icon={faEdit} onClick={(e)=>{e.stopPropagation(); navigate(`/urediKviz/${quiz.title}/${quiz.id}`)}}/>: <></>}</h1>
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
