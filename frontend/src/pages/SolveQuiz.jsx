import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizById, saveQuizResults } from '../api/api';
import { Pitanja, Quizes } from '../api/dummyData';
import ResultsDialog from '../components/SolveQuiz/ResultsDialog';

const SolveQuiz = ({isAuthenticated}) => {
  const {imeKviza} = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const kvizId = queryParams.get('id');

  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [isViewingResults, setIsViewingResults] = useState(false)
  const [timer, setTimer] = useState(0)
  const [givenAnswers, setGivenAnswers] = useState([])

  const [openResultsDialog, setResultsDialogOpen] = useState(false)

  if(quiz && timer >= quiz.duration){
    handleEndQuiz()
  }
  const handleStartQuiz = () => {
    setIsRunning(true)
  }

  const handleEndQuiz = () => {
    setIsRunning(false)
    setIsViewingResults(true)
    setResultsDialogOpen(true)
  
    if(isAuthenticated) saveQuizResults(quiz, questions, givenAnswers)
  }

  const handleRestartQuiz = () => {
    setGivenAnswers(Array(questions.length).fill(''));
    setTimer(0)
    setResultsDialogOpen(false)
    setIsViewingResults(false)
    setIsRunning(true)
  }

  useEffect(()=>{
   if(kvizId){
    //const quizResponse = getQuizById(kvizId)

    const quizResponse = Quizes.find(q=> q.id == kvizId)
    setQuiz(quizResponse)

    //const questionsResponse = getQuestionsForQuiz(kvizId)
    const questionsResponse = Pitanja[0].questions
    setQuestions(questionsResponse)

    setGivenAnswers(Array(questionsResponse.length).fill(''));
   } 
  }, [])

  // useEffect(() => {
  //   if(isRunning){
  //     const intervalId = setInterval(() => {
  //       setTimer((prevSeconds) => (prevSeconds !== undefined ? prevSeconds + 1 : 0));
  //     }, 1000);
  
  //     return () => clearInterval(intervalId);
  //   }
    
  // }, [isRunning]);

  return (
    quiz ? <div className='d-flex flex-column'>
      <div className='ps-3'><h1>{quiz.title}</h1></div>
      <div className='d-flex flex-row justify-content-evenly align-items-center border border-3 border-primary' 
        style={
          {
            height: "10vh"
          }
        }
      >
        <div>{quiz.author}</div>
        <div>{quiz.category}</div>
        <div>{quiz.quizType}</div>
        <div>{isRunning ? timer + " / " : ""}{quiz.duration} s</div>
        <div>
          {
            isRunning ? 
            <button onClick={handleEndQuiz}>Završi</button>
            :
            isViewingResults ? 
            <button onClick={handleRestartQuiz}>Ponovi kviz</button>
            :
            <button onClick={handleStartQuiz}>Kreni rješavanje</button>
          }
        </div>
      </div>
      <div className='d-flex flex-row justify-content-center w-100 align-items-center'>
        <ResultsDialog open={openResultsDialog} questions={questions} givenAnswers={givenAnswers} onConfirm={handleRestartQuiz} onClose={()=>{setResultsDialogOpen(false)}}/>
        {
          isRunning || isViewingResults? 
          <>
            {
              quiz.quizTypeId == 1 ? <SolvingQA viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quizTypeId == 2 ? <SolvingAsoc viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quizTypeId == 3 ? <SolvingQMA viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quizTypeId == 4 ? <SolvingMem viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              <></>

            }
          </>:
          <>
            <div style={
              {
                width: "50vh",
                height: "50vh",
                backgroundColor: 'gray'
              }
            }>{quiz.image}</div>

            <div> Pokreni kviz kako bi se prikazala pitanja</div>
          </>
        }
         
      </div>
    </div> : <></>
  );
};

const SolvingQA = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  const [qIndex, setQuestionIndex] = useState(0)
  const question = questions[qIndex]
  
  const handleAnswerChange = (e) => {
    // Create a new array with the updated answer for the current question
    const updatedAnswers = [...givenAnswers];
    updatedAnswers[qIndex] = e.target.value;
    setGivenAnswers(updatedAnswers);
  };

  useEffect(()=>{
    setQuestionIndex(0)
  }, [viewOnly])
  
  const navigateToQuestion = questions.map((q, index) => (
    <button key={"navToQ" + index} 
    style={
      { 
        width: "5vh", 
        height: "5vh",
        background: viewOnly ? (q.a.toUpperCase() == givenAnswers[index].toUpperCase() ? "green" : "red"): index == qIndex ? "green" : givenAnswers[index] !== "" ? "yellow" : "lightgray"
      }} 
    onClick={() => setQuestionIndex(index)}>
      {index + 1}
    </button>
  ));

  return (
  <div>
    <div>{question.q}</div>
    <div><input disabled={viewOnly} value={givenAnswers[qIndex]} onChange={handleAnswerChange}/></div>
    <div className='d-flex flex-row'>
      {navigateToQuestion}
    </div>
  </div>
  )
}

const SolvingAsoc = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  const [clickedPair, setClickedPair] = useState({first: null, second: null})
  const [correctlyPaired, setCorrectlyPaired] = useState([])
  const [answerButtons, setAnswerButtons] = useState(<></>)
  const [refreshToken, setRefreshToken] = useState(0)

  console.log(clickedPair)
  console.log(correctlyPaired)

  const refresh = ()=>{setRefreshToken(prev => prev + 1)}

  const handleBothClicked = () =>{
    console.log("2 CLICKED")
    if(clickedPair.first == -1 * (clickedPair.second + 1)){
      //CORRECT
      setCorrectlyPaired(prev => [...prev, Math.max(clickedPair.first, clickedPair.second)])

    }
      
    setClickedPair({first: null, second: null})
    refresh()
  }

  const handleClickAsoc = (i, negative = false) => {
    if(negative) i = -1 * (i + 1)
    console.log(clickedPair.first != null)
    if(clickedPair.first != null){
      setClickedPair(prev => {return {...prev, "second": i}})
      handleBothClicked()
    }else{
      setClickedPair({"first": i, "second": null})
    }
    refresh()
  };

  useEffect(()=>{

    let buttons = []
    
    questions.forEach((q, i) => {
      buttons.push(
        <button 
        disabled={clickedPair.first == i || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>handleClickAsoc(i)}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : clickedPair.first == i ? "yellow" : "initial"
          }
        }
        >
          {q.q}
        </button>
      )
      buttons.push(
        <button 
        disabled={clickedPair.first == i || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>handleClickAsoc(i, true)}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : clickedPair.first == i ? "yellow" : "initial"
          }
        }
        >
          {q.a}
        </button>
      )
    } 
    )
    
    setAnswerButtons(shuffleArray(buttons))
  },[])

  return (
  <div>
   {answerButtons}
  </div>
  )
}

const SolvingQMA = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  return (<div>Solving qma</div>)
}

const SolvingMem = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  return (<div>Solving mem</div>)
}

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export default SolveQuiz;
