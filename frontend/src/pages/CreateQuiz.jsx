import React, { useEffect, useState } from 'react';
import { Categories, QuizTypes } from '../api/dummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import AddQuestion from '../components/CreateQuiz/AddQuestion';
import Question from '../components/CreateQuiz/Question';
import Dropzone from "react-dropzone"

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("")
  const [quizImage, setQuizImage] = useState(null)

  const [quizTypesList, setQuizTypeList] = useState([])
  const [quizTypeIndex, setQuizType] = useState(0)

  const [categoryList, setCategoryList] = useState([])
  const [categoryIndex, setCategory] = useState(0)

  const [createdQuestions, setCreatedQuestions] = useState([])

  const [refreshToken, setRefreshToken] = useState([])

  const refresh = () => {setRefreshToken(prev => !prev)}

  useEffect(()=>{
    //const quizes = getQuizTypes()
    const quizes = QuizTypes
    setQuizTypeList(quizes)

    //const categories = getCategories()
    const categories = Categories
    setCategoryList(categories)

  }, [])

  const handleRemoveQuestion = () => {

  }

  const handleAddQuestion = (question) => {
    let temp = createdQuestions
    temp.push(question)

    setCreatedQuestions(temp)
    refresh()
  }

  const handleEditQuestion = () =>{

  }

  const handleSaveQuiz = () => {

  }

  const handleChangeQuizType = (e) => {
    const newQuizIndex = e.target.value;
    if(quizTypesList[newQuizIndex].id == 3 && quizTypeIndex !== 3 && createdQuestions.length > 0){
      let temp = createdQuestions;
      temp.forEach((question) =>{
        if(!question.wa1 && !question.wa2 && !question.wa3){
          question.wa1 = "Molim Vas dodajte krivi odgovor"
          question.wa2 = "Molim Vas dodajte krivi odgovor"
          question.wa3 = "Molim Vas dodajte krivi odgovor"
        }
      })
      setCreatedQuestions(temp)
    }
    setQuizType(newQuizIndex)
  }

  let quizOptions = []
  quizTypesList.forEach((type, index) =>{
    quizOptions.push(
      <option value={index}>{type.name}</option>
    )
  })

  let categoriesOptions = []
  categoryList.forEach((category, index) =>{
    categoriesOptions.push(
      <option value={index}>{category.title}</option>
    )
  })

  let questionComponents = []
  createdQuestions.forEach((question, index) =>{
    questionComponents.push(<Question quizType={quizTypesList[quizTypeIndex]} question = {question} index={index}/>)
  })

  return (
    <div>
        <div>
          <h1>
            Kreiraj novi kviz
          </h1>
        </div>

        <hr/>

        <div className='d-flex flex-row'>
          <div className='d-flex flex-column w-50 border border-4 border-danger'>
            <label>Unesi ime kviza</label>
            <input value={quizName} onChange={(e)=>setQuizName(e.target.value)} required></input>
            <label>Tip kviza <FontAwesomeIcon icon={faInfo}/></label>
            <select required onChange={handleChangeQuizType}>
              {quizOptions}
            </select>
            <label>Kategorija</label>
            <select required onChange={(e) => {setCategory(e.target.value)}}>
              {categoriesOptions}
            </select>
            
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section className='border border-2 border-secondary m-3 w-25'>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <button onClick={handleSaveQuiz}>Spremi</button>
          </div>

          <div className='d-flex flex-column w-50 border border-4 border-primary'>
            {questionComponents}
          </div>
          
        </div>

        {
          quizTypesList.length > 0 && <AddQuestion handleAddQuestion = {handleAddQuestion}  quizType={quizTypesList[quizTypeIndex]}/>
        }
    </div>
  );
};

export default CreateQuiz;
