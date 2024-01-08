// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/LoginLogin';
import Profile from './pages/Profile';
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
