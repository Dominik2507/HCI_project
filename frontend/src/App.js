import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mui/material/styles';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import CategoriesPage from './pages/CategoriesPage';
import ViewQuizzes from './pages/ViewQuizzes';
import BeforeCreateQuizPage from './pages/BeforeCreateQuizPage';
import CreateQuiz from './pages/CreateQuiz';
import SolveQuiz from './pages/SolveQuiz';
import RegisterPage from './pages/RegisterPage';
import EditQuiz from './pages/EditQuiz';

const App = () => {
  const [isAuthenticated, setAuthentication]= useState(!!localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(false);

  useEffect(()=>{
    setAuthentication(!!localStorage.getItem('token'))
  }, [refreshToken])

  const refresh = ()=>{setRefreshToken(prev => !prev)}

  return (
    <>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/prijava" element={<Login refresh = {refresh}/>} />
          <Route path="/registracija" element={<RegisterPage />} />
          <Route path='/kategorije' element={<CategoriesPage/>}/>
          <Route path='/kategorije/:kategorija' element={<ViewQuizzes/>}/>
          <Route path='/stvoriKviz' element={<BeforeCreateQuizPage isAuthenticated = {isAuthenticated}/>}/>
          <Route path='/kviz/:imeKviza' element={<SolveQuiz isAuthenticated={isAuthenticated}/>}/>

          <Route path='/stvaranjeKviza' element={isAuthenticated ? <CreateQuiz/>: <Navigate to="/prijava"/>}/>
          <Route path='/urediKviz/:kvizName/:id' element={isAuthenticated ? <EditQuiz/>: <Navigate to="/prijava"/>}/>
          <Route path="/profil" element={isAuthenticated ? <Profile /> : <Navigate to="/prijava" /> }/>
          
          
          <Route path="*" element={<Navigate to={"/"}/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
