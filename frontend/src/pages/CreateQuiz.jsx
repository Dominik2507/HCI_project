import React, { useEffect, useState } from 'react';
import { Categories, QuizTypes } from '../api/dummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AddQuestion from '../components/CreateQuiz/AddQuestion';
import Question from '../components/CreateQuiz/Question';
import Dropzone from "react-dropzone"
import EditQuestion from '../components/CreateQuiz/EditQuestion';
import { getCategories, getQuitTypes } from '../api/api';

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

  const [editingIndex, setEditingIndex] = useState(-1)
  let isEditing = editingIndex >= 0


  useEffect(()=>{
    getQuitTypes().then(data=>{
      setQuizTypeList(data)
    })

    getCategories().then(data => {
      setCategoryList(data)
    })

  }, [])

  const handleAddQuestion = (question) => {
    let temp = createdQuestions
    temp.push(question)

    setCreatedQuestions(temp)
    refresh()
  }

  const handleEditQuestion = (index) => {
    setEditingIndex(index)
    refresh()
  }

  const handleDeleteQuestion = (index) => {
    if(isEditing && index==editingIndex) setEditingIndex(-1)
    else if(isEditing && index > editingIndex) setEditingIndex(prev => prev-1)

    let temp = createdQuestions
    temp.filter((q, i) => i != index)
    setCreatedQuestions(temp.filter((q, i) => i != index))
  }

  const handleSaveEdit = (question) => {
    let temp = createdQuestions
    temp[editingIndex] = question
    setCreatedQuestions(temp)
    setEditingIndex(-1)
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
      <option key={"opt-type-" + index} value={index}>{type.name}</option>
    )
  })

  let categoriesOptions = []
  categoryList.forEach((category, index) =>{
    categoriesOptions.push(
      <option key={"opt-cat-" + index} value={index}>{category.title}</option>
    )
  })

  let questionComponents = []
  createdQuestions.forEach((question, index) =>{
    questionComponents.push(
    <Question
      key={"q"+index}
      quizType={quizTypesList[quizTypeIndex]} 
      question = {question} 
      index={index} 
      handleEdit={handleEditQuestion}
      handleDelete={handleDeleteQuestion}
    />)
  })

  return (
    <div>
        <div>
          <h1>
            Kreiraj novi kviz
          </h1>
        </div>

        <hr/>

        <div className='d-flex flex-row m-2'>
          <div className='d-flex flex-column w-50 p-2 border border-4 border-danger'>
            <label>Unesi ime kviza</label>
            <input value={quizName} onChange={(e)=>setQuizName(e.target.value)} required></input>
            <label>Tip kviza <FontAwesomeIcon icon={faInfoCircle}/></label>
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
          isEditing ? <EditQuestion handleEditQuestion={handleSaveEdit} index={editingIndex} quizType={quizTypesList[quizTypeIndex]} question={createdQuestions[editingIndex]}/> :
          quizTypesList.length > 0 && <AddQuestion handleAddQuestion = {handleAddQuestion}  quizType={quizTypesList[quizTypeIndex]}/>
        }
    </div>
  );
};

export default CreateQuiz;
