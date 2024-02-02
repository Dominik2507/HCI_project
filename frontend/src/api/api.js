// api.js
import { Categories, ProfileData, QuizTypes, Quizes, users, Pitanja } from './dummyData';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (credentials) => {
  return api.get('/login', { params: {
    username: credentials.username,
    password: credentials.password
  }})
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
  localStorage.clear();
};

export const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  return api.get('/user', {params: {
    token: token
  }}).then(function(response) {
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
  return api.get('/quiz', {
    params: {
      id: id
    }
  })
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const saveQuizResults = async (quiz, questions, givenAnswers) => {
  const token = localStorage.getItem("token");

  let i = 0;
  let correct = 0;

  questions.forEach((element) => {
      if (element.a === givenAnswers[i]) {
        ++correct;
      }
      ++i;
  })

  let data = {
    token: token,
    solvedquestions: correct,
    timespent: quiz.duration
  }

  return api.post('/saveResult', data)
  .then(function(response) {
    return response.data;
  })
  .catch(function(error) {
    throw error;
  })
}

export const getProfileData = async () => {
    const token = localStorage.getItem("token")
    console.log(token)
    return api.get(`/user`, {
      params: {
        token: token
      }
    })
    .then(function(response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const getQuizList = async (category) => {
  return api.get('/quizes', {
    params: {
      id: category
    }
  })
  .then(function(response) {
    return response.data;
  })
  .catch(function (error) {
    throw error;
  });
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
    return api.get('/quizQuestions/', {
      params: {
        id: id
      }
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

export const saveQuiz = async (data) => {
  if(data.id == null){
    return api.post('/createQuiz', data)
    .then(function(response) {
      console.log(data.questions);
      return response.data;
    })
    .catch(function (error) {
      throw error;
    })
  }else{
    return api.post('/editQuiz', data)
    .then(function(response) {
      return response.data;
    })
    .catch(function(error) {
      throw error;
    })
  }
}