import React, { useEffect, useState } from 'react';
import { Quizes } from '../api/dummyData';
import PopularQuiz from '../components/HomePage/PopularQuiz';
import { useParams } from 'react-router-dom';

const ViewQuizzes = () => {
    const [quizList, setQuizList] = useState([])
    const {kategorija} = useParams();
    
    console.log(kategorija)
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
              <h1 className='text-center'> {kategorija.toUpperCase()} </h1>
             
          </div>
          {quizComponents}
      </div>
    );
};

export default ViewQuizzes;
