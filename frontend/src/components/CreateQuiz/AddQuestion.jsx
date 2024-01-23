import { Button } from '@mui/material';
import React, { useState } from 'react';

const AddQuestion = (props) => {
  const [newQuestion, setNewQuestion] = useState({})
  const {handleAddQuestion, quizType} = props;

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    handleAddQuestion(newQuestion)
    setNewQuestion({q: "", a: "", wa1: "", wa2: "", wa3: ""})
  }

  return (
    <div className='d-flex flex-column p-3' style={{fontSize:'20px'}}>
        <div>Dodaj novo pitanje</div>
        <form className='d-flex flex-column w-25' onSubmit={handleSubmit}>

        {
          quizType.id == 1 ? 
          <>
            <div className='d-flex flex-column'>
              <label>Pitanje</label><input class="form-control" value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Odgovor</label><input class="form-control" value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
          quizType.id == 2 || quizType.id == 4 ? 
          <>
            <div className='d-flex flex-column'>
              <label>Prvi pojam</label><input class="form-control" value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Drugi pojam</label><input class="form-control" value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
          quizType.id == 3 ? 
          <>
            <div className='d-flex flex-column p-3'>
              <label>Pitanje</label><input class="form-control" value={newQuestion.q} onChange={(e) => {setNewQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Točan odgovor</label><input class="form-control" value={newQuestion.a} onChange={(e) => {setNewQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={newQuestion.wa1} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa1: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={newQuestion.wa2} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa2: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={newQuestion.wa3} onChange={(e) => {setNewQuestion(prev => {return {...prev, wa3: e.target.value}})}}></input>
            </div>
          </>:
          <></>
        }
        <Button variant="contained" style={{
              width: "15vw",
              color: "#000000",
              backgroundColor: '#95BD54',
              
              }}  type='submit'>Dodaj</Button>
        </form>
    </div>
  );
};


export default AddQuestion;
