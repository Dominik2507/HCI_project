import React, { useState } from 'react';
import Categories from "../components/HomePage/Categories"
import PopularQuizes from "../components/HomePage/PopularQuizes"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBook} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
  
  return (
    <div>
        <Categories />
        <PopularQuizes />
    </div>
  );
};

export default Home;
