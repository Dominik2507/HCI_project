import React, { useEffect, useState } from 'react';

import CategoryButton from "./CategoryButton"
import { getCategories } from '../../api/api';
import { Categories as DummyCategories } from '../../api/dummyData';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(
    ()=>{
        //API CALL
        // const result = getCategories();
        
        const result = DummyCategories
        
        setCategories(result);
    }, []
  )

  let categoriesCompoments = []

  if(categories && categories.length > 0){

    categories.forEach(element => {
        categoriesCompoments.push(
            <CategoryButton category={element}/>
        )
    });

  }else {
    return null;
  }

  return (
    <div className="border border-3 border-danger" style={
        {
            width: "90vw",
            margin: "5vw",
            marginTop: 0
        }
    }>
        <CategoriesTitle/>
        <div className='d-flex justify-content-center'>
            <div className='d-flex flex-row gap-5 border border-2 border-success' 
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
