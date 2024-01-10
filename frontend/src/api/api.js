// api.js
import axios from 'axios';
import { Categories, ProfileData, QuizTypes, Quizes, users, Pitanja } from './dummyData';

const API_BASE_URL = 'http://your-fastapi-backend-url';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (credentials) => {
  try {
    //const response = await api.post('/login', credentials);
    //return response.data;
    return users[1]
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    //const response = await api.post('/login', credentials);
    //return response.data;
    return users[1]
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    //const response = await api.get('/categories');
    const response = {
      data: Categories
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularQuizes = async () => {
  try {
    //const response = await api.get('/popularQuizes');
    const response = {
      data: Quizes
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getQuizById = async (id) => {
  try {
    //const response = await api.get(`/quiz/${id}`);
    const response = {
      data: Quizes.find(q=> q.id == id)
    }
    return response.data;
  } catch (error) {
    throw error;
  }
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
  try {
    //const response = await api.get(`/quizes/${category}`);
    const response = {
      data: Quizes
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getQuitTypes = async () => {
  try {
    //const response = await api.get(`/quizTypes`);
    const response = {
      data: QuizTypes
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getQuestionsForQuiz = async (id) => {
  try {
    //const response = await api.get(`/quizQuestions/${id}`);
    const response = {
      data: Pitanja[0].questions
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
