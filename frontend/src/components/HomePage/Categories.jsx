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
        
        const result = DummyCategories.filter(c => c.showOnHomePage)
        
        setCategories(result);
    }, []
  )

  let categoriesCompoments = []

  if(categories && categories.length > 0){

    categories.forEach((element, index) => {
        categoriesCompoments.push(
            <CategoryButton key={"homeCat-"+ index} category={element}/>
        )
    });

  }else {
    return null;
  }

  return (
    <div className="border border-3 border-danger" style={
        {height: "50vh"}
    }>
        <CategoriesTitle/>
        <div className='d-flex flex-row justify-content-between border border-2 border-success' 
        style={{
            width: "70vw",
            marginLeft: "15vw"
        }}
        >
            {categoriesCompoments}
        </div>
        <div className='w-100 pe-5 d-flex justify-content-end align-content-center bg-primary' style={{height: "5vh", marginTop: "3vh"}}>
            <MoreButton />
        </div>
    </div>
  );
};

const MoreButton = () => {
    const navigate = useNavigate();
    return <button onClick={()=> {navigate("/kategorije")}}> Više... </button>
}

const CategoriesTitle = ()=>{
    return <h1 style={{height: "8vh",margin:"1vh"}}>Kategorije</h1>
}

export default Categories;
