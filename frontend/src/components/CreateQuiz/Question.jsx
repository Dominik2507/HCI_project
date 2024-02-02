import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Question = (props) => {
    const {quizType, question, index, handleEdit, handleDelete} = props
  
  return (
    <>
    <div className='d-flex flex-row w-50 gap-3 m-2'>
      {
         quizType.name == 'Pitanje - odgovor' ? 
          <div>
            <div>{index + 1}. Pitanje: {question.q}</div>
            <div>&nbsp;&nbsp; Odgovor: {question.a}</div>
          </div>:
          quizType.name == 'Asocijacija' || quizType.name == 'Memory' ? 
          <div>
            <div>{index + 1}. {question.q} - {question.a}</div>
          </div>:
          quizType.name == 'Višestruki odgovor' ? 
          <div>
            <div>{index + 1}. Pitanje: {question.q}</div>
            <div>&nbsp;&nbsp;Točan odgovor: {question.a}</div>
            <div>&nbsp;&nbsp;Krivi odgovor: {question.wa1}</div>
            <div>&nbsp;&nbsp;Krivi odgovor: {question.wa2}</div>
            <div>&nbsp;&nbsp;Krivi odgovor: {question.wa3}</div>
          </div>:
          <></>
        }
        <div className='d-flex flex-row gap-2 m-2'>
          <FontAwesomeIcon onClick={() => handleEdit(index)} icon={faEdit}/>
          <FontAwesomeIcon onClick={() => handleDelete(index)} icon={faTrash}/>
        </div>
      </div>
    </>
  );
};

export default Question;
