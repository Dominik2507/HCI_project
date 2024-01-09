// api.js
import axios from 'axios';
import { users } from './dummyData';

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
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularQuizes = async () => {

}

export const getQuizById = async (id) => {

}

export const saveQuizResults = async (quiz, questions, givenAnswers) => {
  const token = localStorage.getItem("token")


}
