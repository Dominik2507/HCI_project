import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
const EditQuestion = (props) => {
  const {handleEditQuestion, quizType, question, index} = props;
  const [editedQuestion, setEditedQuestion] = useState(question)

  useEffect(()=>{
    setEditedQuestion(question)
  }, [index])

  const handleSubmit = (e) =>{
    e.preventDefault(); 
    handleEditQuestion(editedQuestion)
    setEditedQuestion({q: "", a: "", wa1: "", wa2: "", wa3: ""})
  }

  return (
    <div className='d-flex flex-column p-3'>
        <div>Uredi pitanje</div>
        <form className='d-flex flex-column w-25' onSubmit={handleSubmit}>

        {
          quizType.name == 'Pitanje - odgovor' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Pitanje</label><input class="form-control"  value={editedQuestion.q} onChange={(e) => {setEditedQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Odgovor</label><input class="form-control" value={editedQuestion.a} onChange={(e) => {setEditedQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
         quizType.name == 'Asocijacija' || quizType.name == 'Memory' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Prvi pojam</label><input class="form-control" value={editedQuestion.q} onChange={(e) => {setEditedQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Drugi pojam</label><input class="form-control" value={editedQuestion.a} onChange={(e) => {setEditedQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
            </div>
          </>:
            quizType.name == 'Višestruki odgovor' ? 
          <>
            <div className='d-flex flex-column'>
              <label>Pitanje</label><input class="form-control" value={editedQuestion.q} onChange={(e) => {setEditedQuestion(prev => {return {...prev, q: e.target.value}})}}></input>
              <label>Točan odgovor</label><input class="form-control" value={editedQuestion.a} onChange={(e) => {setEditedQuestion(prev => {return {...prev, a: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={editedQuestion.wa1} onChange={(e) => {setEditedQuestion(prev => {return {...prev, wa1: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={editedQuestion.wa2} onChange={(e) => {setEditedQuestion(prev => {return {...prev, wa2: e.target.value}})}}></input>
              <label>Krivi odgovor</label><input class="form-control" value={editedQuestion.wa3} onChange={(e) => {setEditedQuestion(prev => {return {...prev, wa3: e.target.value}})}}></input>
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


export default EditQuestion;
