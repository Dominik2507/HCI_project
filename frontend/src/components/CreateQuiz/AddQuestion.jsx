import React, { useState } from 'react';

const AddQuestion = (props) => {
  const [newQuestion, setNewQuestion] = useState({})
  const {handleAddQuestion, quizType} = props;

  console.log(quizType)

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    handleAddQuestion(newQuestion)
    setNewQuestion({q: "", a: "", wa1: "", wa2: "", wa3: ""})
  }

  return (
    <div className='d-flex flex-column p-3'>
        <div>Dodaj novo pitanje</div>
        <form className='d-flex flex-column w-25' onSubmit={handleSubmit}>
        {console.log(quizType.id)}
        {
          quizType.name == 'Pitanje - odgovor' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Pitanje</label><input value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Odgovor</label><input value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
          quizType.name == 'Asocijacija' || quizType.name == 'Memory' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Prvi pojam</label><input value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Drugi pojam</label><input value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
          quizType.name == 'Višestruki odgovor' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Pitanje</label><input value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Točan odgovor</label><input value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input value={newQuestion.wa1} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa1: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input value={newQuestion.wa2} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa2: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input value={newQuestion.wa3} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa3: e.target.value}})}}></input>
            </div>
          </>:
          <></>
        }
        <button type='submit'>Dodaj</button>
        </form>
    </div>
  );
};


export default AddQuestion;
