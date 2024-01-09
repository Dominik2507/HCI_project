import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById } from '../api/api';
import { Quizes } from '../api/dummyData';

const SolveQuiz = () => {
  const {imeKviza} = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const kvizId = queryParams.get('id');

  const [quiz, setQuiz] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleStartQuiz = () => {
    setIsRunning(true)
  }

  console.log(quiz)

  useEffect(()=>{
   if(kvizId){
    //const result = getQuizById(kvizId)

    const result = Quizes.find(q=> q.id)
    setQuiz(result)
   } 
  }, [])

  return (
    quiz ? <div className='d-flex flex-column'>
      <div>{quiz.title}</div>
      <div className='d-flex flex-row'>
        <div>{quiz.author}</div>
        <div>{quiz.category}</div>
        <div>{quiz.quizType}</div>
        <div>{quiz.duration}</div>
        <div><button>Kreni rješavanje</button></div>
      </div>
      <div>
        {
          isRunning ? <></>:
          <>
            <div>{quiz.image}</div>
            <div> Pokreni kviz kako bi se prikazala pitanja</div>
          </>
        }
         
      </div>
    </div> : <></>
  );
};

export default SolveQuiz;
