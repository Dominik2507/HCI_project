import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsForQuiz, getQuizById, saveQuizResults } from '../api/api';
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
    getQuizById(kvizId).then(data => {
      setQuiz(data)
    })

    getQuestionsForQuiz(kvizId).then(data =>{
      setQuestions(data)
      setGivenAnswers(Array(data.length).fill(''));
    })

   
   } 
  }, [])

  useEffect(() => {
    if(isRunning){
      const intervalId = setInterval(() => {
        setTimer((prevSeconds) => (prevSeconds !== undefined ? prevSeconds + 1 : 0));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
    
  }, [isRunning]);

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
  const [first, setClicked] = useState(0)
  const [correctlyPaired, setCorrectlyPaired] = useState([])
  const [answerButtons, setAnswerButtons] = useState(<></>)
  const [randomizedIndexList, setRandomIndexes] = useState([])

  console.log(first)
  console.log(correctlyPaired)

  const handleBothClicked = (second) =>{
    console.log("2 CLICKED")
    console.log(first, second)
    if(first == -1 * second){
      let index = Math.max(first, second) - 1;
      //CORRECT
      setCorrectlyPaired(prev => [...prev, index])
      let temp = [...givenAnswers]
      temp[index] = questions[index].a
      setGivenAnswers(temp)
    }
      
    setClicked(0)
  }

  const handleClickAsoc = (i) => {
    if(first != 0) handleBothClicked(i)
    else {
      setClicked(i)
    }
  };

  useEffect(()=>{
    if(viewOnly==false){
      setCorrectlyPaired([])
      setClicked(0)
    }
  }, [viewOnly])

  useEffect(()=>{
    if(viewOnly==false){
      const normalIndexes = Array(questions.length * 2).fill('').map((q,i) => i)
      setRandomIndexes(shuffleArray(normalIndexes))
    }
  }, [viewOnly])

  useEffect(()=>{

    let buttons = []
    
    questions.forEach((q, i) => {
      buttons.push(
        <button 
        disabled={viewOnly || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(i + 1)}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : first == (i + 1) ? "yellow" : "initial"
          }
        }
        >
          {q.q}
        </button>
      )
      buttons.push(
        <button 
        disabled={viewOnly || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(-1 * (i + 1))}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : first == (-1 *(i+1)) ? "yellow" : "initial"
          }
        }
        >
          {q.a}
        </button>
      )
    })

    setAnswerButtons(buttons)
    
  },[viewOnly, correctlyPaired.length, first])

  const randomizedButtons = randomizedIndexList.map(index => answerButtons[index])

  return (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${Math.floor(Math.sqrt(questions.length * 2))}, 1fr)`, // Two columns with equal width
    //gridTemplateRows: "repeat(2, 1fr)",    // Two rows with equal height
    padding: "2vh"
  }}>
   {randomizedButtons}
  </div>
  )
}

const SolvingQMA = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  const [qIndex, setQuestionIndex] = useState(0)
  const [randomizedIndexList, setRandomIndexes] = useState([])
  const [answerButtons, setAnswerButtons] = useState(<></>)

  const question = questions[qIndex]
  
  const handleAnswerChange = (answer) => {
    // Create a new array with the updated answer for the current question
    const updatedAnswers = [...givenAnswers];
    updatedAnswers[qIndex] = answer;
    setGivenAnswers(updatedAnswers);
  };

  useEffect(()=>{
    if(viewOnly==false){
      questions.forEach((q, i) => {
        const normalIndexes = Array(4).fill('').map((q,i) => i)
        setRandomIndexes(prev => [...prev, shuffleArray(normalIndexes)])
      })
      
    }
  }, [viewOnly])

  useEffect(()=>{
    setQuestionIndex(0)
  }, [viewOnly])

  useEffect(()=>{
    const buttons = [
      <button 
        style={{backgroundColor: givenAnswers[qIndex] != question.a ? "initial" : viewOnly ? "green" : "yellow"}} 
        onClick={()=>{handleAnswerChange(question.a)}}
      >
        {question.a}
      </button>,
      <button
        style={{backgroundColor: givenAnswers[qIndex] != question.wa1 ? "initial" : viewOnly ? "green" : "yellow"}} 
        onClick={()=>{handleAnswerChange(question.wa1)}}
      >
          {question.wa1}
      </button>,
      <button 
        style={{backgroundColor: givenAnswers[qIndex] != question.wa2 ? "initial" : viewOnly ? "green" : "yellow"}} 
        onClick={()=>{handleAnswerChange(question.wa2)}}
      >
          {question.wa2}
      </button>,
      <button
        style={{backgroundColor: givenAnswers[qIndex] != question.wa3 ? "initial" : viewOnly ? "green" : "yellow"}}
        onClick={()=>{handleAnswerChange(question.wa3)}}
      >
        {question.wa3}
      </button>
    ]
      
    setAnswerButtons(
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // Two columns with equal width
        gridTemplateRows: "repeat(2, 1fr)",    // Two rows with equal height
        padding: "2vh"
      }}
      >
        {randomizedIndexList[qIndex]?.map(index => buttons[index])}
      </div>
    )
  }, [qIndex, viewOnly, givenAnswers[qIndex]], randomizedIndexList.length)
  
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
    <div>
      {answerButtons}
    </div>
    <div className='d-flex flex-row'>
      {navigateToQuestion}
    </div>
  </div>
  )
}

const SolvingMem = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  const [first, setClicked] = useState(0)
  const [second, setSecond] = useState(0)
  const [correctlyPaired, setCorrectlyPaired] = useState([])
  const [answerButtons, setAnswerButtons] = useState(<></>)
  const [randomizedIndexList, setRandomIndexes] = useState([])
  const [showBothClicked, setShowBothClicked] = useState(false)

  console.log(first)
  console.log(correctlyPaired)

  const handleBothClicked = (second) =>{
    console.log("2 CLICKED")
    console.log(first, second)
    if(first == -1 * second){
      let index = Math.max(first, second) - 1;
      //CORRECT
      setCorrectlyPaired(prev => [...prev, index])
      let temp = [...givenAnswers]
      temp[index] = questions[index].a
      setGivenAnswers(temp)
    }
    
    showBothForABit(second)
  }

  const showBothForABit = (second) => {
    setSecond(second)
    setShowBothClicked(true)

    setTimeout(()=>{
      setSecond(0)
      setClicked(0)
      setShowBothClicked(false)
    }, 1000)
  }

  const handleClickAsoc = (i) => {
    if(first != 0) handleBothClicked(i)
    else {
      setClicked(i)
    }
  };

  useEffect(()=>{
    if(viewOnly==false){
      setCorrectlyPaired([])
      setClicked(0)
    }
  }, [viewOnly])

  useEffect(()=>{
    if(viewOnly==false){
      const normalIndexes = Array(questions.length * 2).fill('').map((q,i) => i)
      setRandomIndexes(shuffleArray(normalIndexes))
    }
  }, [viewOnly])

  useEffect(()=>{

    let buttons = []
    
    questions.forEach((q, i) => {
      buttons.push(
        <button
        className='memoryButton'
        disabled={viewOnly || showBothClicked || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(i + 1)}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : (first == (i + 1) || second == (i + 1))? "yellow" : "initial",
            width: "20vh",
            height: "20vh"
          }
        }
        >
          {viewOnly || correctlyPaired.findIndex(c => c==i) >= 0 || first == (i + 1) || second == (i + 1) ? q.q : ""}
        </button>
      )
      buttons.push(
        <button
        className='memoryButton'
        disabled={viewOnly || showBothClicked  || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(-1 * (i + 1))}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "green" : (first == (-1 *(i+1)) || second == (-1 *(i+1)) ) ? "yellow" : "initial",
            width: "20vh",
            height: "20vh"
          }
        }
        >
          {viewOnly || correctlyPaired.findIndex(c => c==i) >= 0 || first == (-1 *(i+1)) || second == (-1 *(i+1))? q.a : ""}
        </button>
      )
    })

    setAnswerButtons(buttons)
    
  },[viewOnly, correctlyPaired.length, first, showBothClicked])

  const randomizedButtons = randomizedIndexList.map(index => answerButtons[index])

  return (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${Math.floor(Math.sqrt(questions.length * 2))}, 1fr)`, // Two columns with equal width
    //gridTemplateRows: "repeat(2, 1fr)",    // Two rows with equal height
    padding: "2vh"
  }}>
   {randomizedButtons}
  </div>
  )
}

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export default SolveQuiz;
