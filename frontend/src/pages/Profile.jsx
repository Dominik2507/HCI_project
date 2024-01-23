import React, { useEffect, useState } from 'react';
import PopularQuiz from '../components/Quiz/Quiz';
import { getProfileData } from '../api/api';
import QuizList from '../components/Quiz/QuizList';
import { Button } from '@mui/material';

const Profile = () => {
  const [profileData, setProfileData] = useState(undefined)

  useEffect(()=>{
    getProfileData().then((data)=>{
      setProfileData(data)
    })
    
  }, [])

  const calculateDuration = () =>{
    if(!profileData) return

    let time = profileData.results.timeSpentSolving
    if(time < 60) return time + " sekundi"
    time = Math.round(time / 60)
    if(time < 60) return time + " minuta"
    time = Math.round(time / 60)
    if(time < 100) return time + " sati"
    time = Math.round(time / 24)
    return time + " dana"
  }

  return (
    <div>
        <div>
          <img src={profileData?.image} />
          <div className='d-flex flex-row justify-content-evenly'>
            <div class='p-2' style={{background:'linear-gradient(to bottom, #EAE6D6, #93958F)'}}>
              <div ><h4>Broj rješenih kvizova:</h4></div>
              <div><h4>{profileData?.results.taken}</h4></div>
            </div>
            <div class=' p-2 ' style={{background:'linear-gradient(to bottom, #EAE6D6, #93958F)'}}>
              <div><h4>Broj točnih odgovora:</h4></div>
              <div><h4>{profileData?.results.solvedQuestions}</h4></div>
            </div>
            <div class='p-2' style={{background:'linear-gradient(to bottom, #EAE6D6, #93958F)'}}>
              <div><h4>Vrijeme provedeno rješavajući:</h4></div>
              <div><h4>{calculateDuration()}</h4></div>
            </div>
          </div>
        </div>
        <div>
          <h1>Napravljeni kvizovi</h1>
          {profileData && <QuizList allowEdit={true} quizList={profileData.quizes}/>}
        </div>
    </div>
  );
};

export default Profile;
