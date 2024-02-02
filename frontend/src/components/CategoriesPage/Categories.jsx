import React, { useEffect, useState } from 'react';

import CategoryButton from "./CategoryButton"
import { getCategories } from '../../api/api';
import { faEarthEurope, faBook, faBasketball,faMusic,faBurger,faFilm,faFlask,faBookOpen} from '@fortawesome/free-solid-svg-icons';
import { Categories as DummyCategories } from '../../api/dummyData';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(
    ()=>{
        //API CALL
         getCategories().then(response => {
            const data = response.data;
            setCategories(data);
         });
         //console.log(result);

        //console.warn(result);
        
        //const result = DummyCategories
    }, []
  )

  let categoriesCompoments = []

  if(categories && categories.length > 0){

    categories.forEach((element, index) => {
        categoriesCompoments.push(
            <CategoryButton key={"cat-"+index} category={element}/>
        )
    });

  }else {
    return null;
  }

  return (
    <div style={
        {
            width: "90vw",
            margin: "5vw",
            marginTop: 0
        }
    }>
        <CategoriesTitle/>
        <div className='d-flex justify-content-center'>
            <div className='d-flex flex-row gap-5' 
            style={{
            }}
            >
                <div className="flex-fill">
                    {categoriesCompoments.slice(0, categoriesCompoments.length / 2)}
                </div>
        
                <div className="flex-fill">
                    {categoriesCompoments.slice(categoriesCompoments.length / 2)}
                </div>
            </div>
        </div>
    </div>
  );
};

const CategoriesTitle = ()=>{
    return <h1 style={{height: "8vh",margin:"1vh", textAlign: "center"}}>Kategorije</h1>
}

export default Categories;
