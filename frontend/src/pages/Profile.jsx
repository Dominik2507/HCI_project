import React, { useEffect, useState } from 'react';
import PopularQuiz from '../components/Quiz/Quiz';
import { getProfileData } from '../api/api';
import QuizList from '../components/Quiz/QuizList';

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
            <div>
              <div>Broj rješenih kvizova</div>
              <div>{profileData?.results.taken}</div>
            </div>
            <div>
              <div>Broj točnih odgovora kvizova</div>
              <div>{profileData?.results.solvedQuestions}</div>
            </div>
            <div>
              <div>Provedeno vrijeme rješavajući</div>
              <div>{calculateDuration()}</div>
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
