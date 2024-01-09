import React, { useEffect, useState } from 'react';
import { Categories, QuizTypes } from '../api/dummyData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import AddQuestion from '../components/CreateQuiz/AddQuestion';


const CreateQuiz = () => {
  const [quizTypesList, setQuizTypeList] = useState([])
  const [quizTypeIndex, setQuizType] = useState(0)

  const [categoryList, setCategoryList] = useState([])
  const [categoryIndex, setCategory] = useState(0)

  const [createdQuestions, setCreatedQuestions] = useState([])

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

  const handleAddQuestion = () => {
    
  }

  const handleEditQuestion = () =>{

  }

  const handleSaveQuiz = () => {

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
            <input></input>
            <label>Tip kviza <FontAwesomeIcon icon={faInfo}/></label>
            <select onChange={(e) => {setQuizType(e.target.value)}}>
              {quizOptions}
            </select>
            <label>Kategorija</label>
            <select onChange={(e) => {setCategory(e.target.value)}}>
              {categoriesOptions}
            </select>
            <button onClick={handleSaveQuiz}>Spremi</button>
          </div>

          <div className='d-flex flex-column w-50 border border-4 border-primary'>
            Questions
          </div>
        </div>

        {
          quizTypesList.length > 0 && <AddQuestion handleAddQuestion = {handleAddQuestion}  quizType={quizTypesList[quizTypeIndex]}/>
        }
    </div>
  );
};

export default CreateQuiz;
