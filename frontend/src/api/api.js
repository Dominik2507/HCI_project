// api.js
import { Categories, ProfileData, QuizTypes, Quizes, users, Pitanja } from './dummyData';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (credentials) => {
  return api.post('/login', credentials)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    throw error;
  });
};

export const register = async (data) => {
  return api.post('/register', data)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    throw error;
  });
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  return api.post('/logout', {
    token: token
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    throw error;
  });
};

export const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  return api.post('/user', {
    token: token
  }).then(function(response) {
    return response.data;
  }).catch(function (error) {
    throw error;
  });
};

export const getCategories = async () => {
    return api.get('/categories')
    .then(response => response.data)
    .catch(function (error) {
      throw error;
    });
};

export const getPopularQuizes = async () => {
  return api.get('/popularQuizes')
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const getQuizById = async (id) => {
  return api.get('/quiz')
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const saveQuizResults = async (quiz, questions, givenAnswers) => {
  const token = localStorage.getItem("token")

  // TO DO: build send objest and post results
}

export const getProfileData = async () => {
  try {
    const token = localStorage.getItem("token")
    //const response = await api.get(`/profileData/${token}`);
    const response = {
      data: ProfileData
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getQuizList = async (category) => {
  const response = await api.get('/quizes/${category}');
  return response.data;
}

export const getQuitTypes = async () => {
  return api.get('/quizTypes')
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}


export const getQuestionsForQuiz = async (id) => {
    return api.get('/quizQuestions/')
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const saveQuiz = async (data) => {
  if(data.id == null){
    //NOVI KVIZ
  }else{
    //EDITED STARI KVIZ
  }
}