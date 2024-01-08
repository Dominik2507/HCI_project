import React, { useEffect, useState } from 'react';
import { getPopularQuizes } from '../../api/api';
import { Quizes } from '../../api/dummyData';
import PopularQuiz from './PopularQuiz';

const PopularQuizes = () => {
  const [quizList, setQuizList] = useState([])

  useEffect(()=>{
    //api call
    //result = getPopularQuizes()
    const result = Quizes;
    setQuizList(result);
  },[])

  let quizComponents = []

  for(let i = 0; i < quizList.length; i+=2){
    if(i == (quizList.length-1)){
        quizComponents.push(
            <div class="row row-cols-2 mt-2">
                <PopularQuiz quiz={quizList[i]}/>
            </div>
            )
    }else{
        quizComponents.push(
            <div class="row row-cols-2 mt-4">
                <PopularQuiz quiz={quizList[i]}/>
                <PopularQuiz quiz={quizList[i+1]}/>
            </div>
            )
    }
  }

  return (
    <div class="bg-secondary w-100 pb-5" style={{width: "100%"}}>
        <div class="row">
            <h1> Popularni kvizovi </h1>
           
        </div>
        {quizComponents}
    </div>
  );
};

export default PopularQuizes;

