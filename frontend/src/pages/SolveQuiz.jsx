import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionsForQuiz, getQuizById, saveQuizResults } from '../api/api';
import { Pitanja, Quizes } from '../api/dummyData';
import ResultsDialog from '../components/SolveQuiz/ResultsDialog';
import { Button } from '@mui/material';

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

  
  const handleStartQuiz = () => {
    setIsRunning(true)
  }

  const handleEndQuiz = () => {
    setIsRunning(false)
    setIsViewingResults(true)
    setResultsDialogOpen(true)  
  
    if(isAuthenticated) saveQuizResults(quiz, questions, givenAnswers)
  }

  if(quiz && timer >= quiz.duration){
    handleEndQuiz()
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
    getQuizById(kvizId).then(response => {
      setQuiz(response.data)
    })

    getQuestionsForQuiz(kvizId).then(response =>{
      setQuestions(response.data.questions)
      console.log(quiz);
      setGivenAnswers(Array(response.data.questions.length).fill(''));
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
      <div className='d-flex flex-row justify-content-evenly align-items-center' 
        style={
          {
            height: "10vh"
          }
        }
      >
  
        <div><Button disabled style={{ color: '#000000', textTransform: 'none' }}><h4>{quiz.author}</h4></Button></div>
        <div><Button disabled style={{ color: '#000000', textTransform: 'none'}}> <h4>{quiz.category}</h4></Button></div>
        <div><Button disabled style={{ color: '#000000', textTransform: 'none' }}><h4>{quiz.quizType}</h4></Button></div>
        <div><Button disabled style={{ color: '#000000' , textTransform: 'none'}}><h4>{isRunning ? timer + " / " : ""}</h4><h4>{quiz.duration} s </h4></Button></div>

        <div>
          {
            isRunning ? 
            <Button onClick={handleEndQuiz} variant="contained" style={{
              color: "#000000",
              backgroundColor: '#95BD54'}}>Završi</Button>
            :
            isViewingResults ? 
            <Button onClick={handleRestartQuiz} variant="contained" style={{
              color: "#000000",
              backgroundColor: '#95BD54'}}>Ponovi kviz</Button>
            :
            <Button onClick={handleStartQuiz} variant="contained" style={{
              color: "#000000",
              backgroundColor: '#95BD54'
          }}>Pokreni kviz</Button>
          }
        </div>
      </div>
      
      <div className='d-flex flex-row justify-content-center w-100 align-items-center' style={
              {
                width: "50vh",
                height: "50vh",
              }}> 
     
        <ResultsDialog open={openResultsDialog} questions={questions} givenAnswers={givenAnswers} onConfirm={handleRestartQuiz} onClose={()=>{setResultsDialogOpen(false)}}/>
        {
          isRunning || isViewingResults? 
          <>
            {
              quiz.quiztypeid == 1 ? <SolvingQA viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quiztypeid == 2 ? <SolvingAsoc viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quiztypeid == 3 ? <SolvingQMA viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              quiz.quiztypeid == 4 ? <SolvingMem viewOnly={isViewingResults} questions={questions} givenAnswers={givenAnswers} setGivenAnswers={setGivenAnswers}/> :
              <></>

            }
          </>:
          <>
            <div ><img src={quiz.image} style={
              {
                width: "50vh",
                height: "50vh",
                backgroundColor: 'gray'
              }
            }></img> </div>

            <div><Button disabled style={{ color: '#000000', textTransform: 'none' }}><h4> Pokreni kviz kako bi se prikazala pitanja</h4></Button></div>
          </>
        }
         
      </div>
    </div> : <></>
  );
};


const SolvingQA = ({questions, givenAnswers, setGivenAnswers, viewOnly}) => {
  console.log('AA0')
  console.log(givenAnswers)
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
        background: viewOnly ? (q.a.toUpperCase() == givenAnswers[index].toUpperCase() ? "rgb(149, 189, 84)" : "red"): index == qIndex ? "rgb(149, 189, 84)" : givenAnswers[index] !== "" ? "yellow" : "lightgray"
      }} 
    onClick={() => setQuestionIndex(index)}>
      {index + 1}
    </button>
  ));

  return (
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    <div><h2>{question.q}</h2></div>
    <div className='d-flex flex-row justify-content-center align-items-center p-2'><input disabled={viewOnly} value={givenAnswers[qIndex]} onChange={handleAnswerChange}/></div>
    <div className='d-flex flex-row justify-content-center align-items-center'>
      <h3>{navigateToQuestion}</h3>
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
        <Button  variant="outlined" color="success"
        disabled={viewOnly || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(i + 1)}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "rgb(149, 189, 84)" : first == (i + 1) ? "yellow" : "initial",
            color:"black",
            textTransform:"none"
          }
        }
        >
         <h2>{q.q}</h2> 
        </Button>
      )
      buttons.push(
        <Button  variant="outlined" color="success"
        disabled={viewOnly || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(-1 * (i + 1))}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "rgb(149, 189, 84)" : first == (-1 *(i+1)) ? "yellow" : "initial",
            color:"black",
            textTransform:"none"
          }
        }
        >
          <h2>{q.a}</h2>
        </Button>
      )
    })

    setAnswerButtons(buttons)
    
  },[viewOnly, correctlyPaired.length, first])

  const randomizedButtons = randomizedIndexList.map(index => answerButtons[index])

  return (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${Math.floor(Math.sqrt(questions.length * 2))}, 1fr)`, // Two columns with equal width
    gridTemplateRows: "repeat(2, 1fr)",    // Two rows with equal height
    padding: "8vh"
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
      <Button variant="outlined" color="success"
        style={{backgroundColor: givenAnswers[qIndex] != question.a ? "initial" : viewOnly ? "rgb(149, 189, 84)" : "yellow",
        color:"black",
        textTransform:"none"}} 
        onClick={()=>{handleAnswerChange(question.a)}}
      >
        <h3>{question.a}</h3>
      </Button>,
      <Button variant="outlined" color="success"
        style={{backgroundColor: givenAnswers[qIndex] != question.wa1 ? "initial" : viewOnly ? "rgb(149, 189, 84)" : "yellow",
        color:"black",
        textTransform:"none"}} 
        onClick={()=>{handleAnswerChange(question.wa1)}}
      >
          <h3>{question.wa1}</h3>
      </Button>,
      <Button variant="outlined" color="success"
        style={{backgroundColor: givenAnswers[qIndex] != question.wa2 ? "initial" : viewOnly ? "rgb(149, 189, 84)" : "yellow",
        color:"black",
        textTransform:"none"}} 
        onClick={()=>{handleAnswerChange(question.wa2)}}
      >
          <h3>{question.wa2}</h3>
      </Button>,
      <Button variant="outlined" color="success"
        style={{backgroundColor: givenAnswers[qIndex] != question.wa3 ? "initial" : viewOnly ? "rgb(149, 189, 84)" : "yellow",
        color:"black",
        textTransform:"none"}}
        onClick={()=>{handleAnswerChange(question.wa3)}}
      >
        <h3>{question.wa3}</h3>
      </Button>
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
        background: viewOnly ? (q.a.toUpperCase() == givenAnswers[index].toUpperCase() ? "rgb(149, 189, 84)" : "red"): index == qIndex ? "rgb(149, 189, 84)" : givenAnswers[index] !== "" ? "yellow" : "lightgray"
      }} 
    onClick={() => setQuestionIndex(index)}>
      {index + 1}
    </button>
  ));

  return (
  <div>
    <div><h2>{question.q}</h2></div>
    <div>
      {answerButtons}
    </div>
    <div className='d-flex flex-row align-items-center justify-content-center'>
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
        <Button  variant="outlined" color="success"
        className='memoryButton'
        disabled={viewOnly || showBothClicked || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(i + 1)}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "rgb(149, 189, 84)" : (first == (i + 1) || second == (i + 1))? "yellow" : "initial",
            width: "20vh",
            height: "20vh",
            textTransform:'none',
            color:'black'
          }
        }
        >
         <h3> {viewOnly || correctlyPaired.findIndex(c => c==i) >= 0 || first == (i + 1) || second == (i + 1) ? q.q : ""}</h3>
        </Button>
      )
      buttons.push(
        <Button  variant="outlined" color="success"
        className='memoryButton'
        disabled={viewOnly || showBothClicked  || correctlyPaired.findIndex(c => c==i) >= 0} 
        onClick={()=>{handleClickAsoc(-1 * (i + 1))}}
        style={
          {
            backgroundColor: correctlyPaired.findIndex(c => c==i) >= 0 ? "rgb(149, 189, 84)" : (first == (-1 *(i+1)) || second == (-1 *(i+1)) ) ? "yellow" : "initial",
            width: "20vh",
            height: "20vh",
            textTransform:'none',
            color:'black'
          }
        }
        >
          <h3>{viewOnly || correctlyPaired.findIndex(c => c==i) >= 0 || first == (-1 *(i+1)) || second == (-1 *(i+1))? q.a : ""}</h3>
        </Button>
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
    padding: "5vh",
    transform: "translate(0%, 10%)"
  }}>
   {randomizedButtons}
  </div>
  
  )
}

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export default SolveQuiz;
