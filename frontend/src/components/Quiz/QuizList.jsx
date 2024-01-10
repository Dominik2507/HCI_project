import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';

const QuizList = ({quizList}) => {
  let quizComponents = []

  for(let i = 0; i < quizList.length; i+=2){
    if(i == (quizList.length-1)){
        quizComponents.push(
            <div key={"popq-"+i} className="row row-cols-2 mt-2">
                <Quiz quiz={quizList[i]}/>
            </div>
            )
    }else{
        quizComponents.push(
            <div key={"popq-"+i} className="row row-cols-2 mt-4">
                <Quiz quiz={quizList[i]}/>
                <Quiz quiz={quizList[i+1]}/>
            </div>
            )
    }
  }

  return (
    <div className="w-100 pb-5" style={{width: "100%"}}>
        {quizComponents}
    </div>
  );
};

export default QuizList;

