import React, { useState } from 'react';

const Question = (props) => {
    const {quizType, question, index} = props
  
  return (
    <>
    
    {
        quizType.id == 1 ? 
        <div>
          <div>{index + 1}. Pitanje: {question.q}</div>
          <div>&nbsp;&nbsp; Odgovor: {question.a}</div>
        </div>:
        quizType.id == 2 || quizType.id == 4 ? 
        <div>
          <div>{index + 1}. {question.q} - {question.a}</div>
        </div>:
        quizType.id == 3 ? 
        <div>
          <div>{index + 1}. Pitanje: {question.q}</div>
          <div>&nbsp;&nbsp;Točan odgovor: {question.a}</div>
          <div>&nbsp;&nbsp;Krivi odgovor: {question.wa1}</div>
          <div>&nbsp;&nbsp;Krivi odgovor: {question.wa2}</div>
          <div>&nbsp;&nbsp;Krivi odgovor: {question.wa3}</div>
        </div>:
        <></>
      }
    </>
  );
};

export default Question;
