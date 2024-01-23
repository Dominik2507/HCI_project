import React, { useEffect, useState } from 'react';
import { Quizes } from '../api/dummyData';
import Quiz from '../components/Quiz/Quiz';
import { useParams } from 'react-router-dom';
import { getQuizList } from '../api/api';

const ViewQuizzes = () => {
    const [quizList, setQuizList] = useState([])
    const {kategorija} = useParams();
    
    useEffect(()=>{
      //api call
      getQuizList(kategorija).then(data => {
        setQuizList(data);
      })
    },[])
  
    let quizComponents = []
  
    for(let i = 0; i < quizList.length; i+=2){
      if(i == (quizList.length-1)){
          quizComponents.push(
              <div key={"q-"+i} className="row row-cols-2 mt-2">
                  <Quiz quiz={quizList[i]}/>
              </div>
              )
      }else{
          quizComponents.push(
              <div key={"q-"+i} className="row row-cols-2 mt-4">
                  <Quiz quiz={quizList[i]}/>
                  <Quiz quiz={quizList[i+1]}/>
              </div>
              )
      }
    }
  
    return (
      <div className="w-100 pb-5" style={{width: "100%"}}>
          <div className="row">
              <h1 className='text-center'> {kategorija.toUpperCase()} </h1>
             
          </div>
          {quizComponents}
      </div>
    );
};

export default ViewQuizzes;
