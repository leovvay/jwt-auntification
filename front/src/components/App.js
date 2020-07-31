import React, {useEffect} from 'react';

import {Switch, Route, useLocation} from 'react-router-dom'

import SignupForm from './signupForm/';
import LoginForm from './loginForm/'
import RegistrationSuccess from './RegistrationSuccess';
import Page404 from './Page404/';

import './App.css';

 
    

function App() {
  const location = useLocation();

  useEffect(() => {
    const [ , token] = location.search.split('=');
    const localToken = JSON.parse(localStorage.userData).token
    if (token === localToken) {
      console.log('да да это он');
      fetch('http://localhost:8080/user/activeUser', {
        method: 'POST',
        body: localStorage.userData,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }, [location]) 

  return (
    <div className="App">
      <main className="App-header">
      <Switch>
        <Route exact path='/' component={SignupForm}/>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/registration-success' component={RegistrationSuccess}/>
        <Route component={Page404}/>
      </Switch>
      </main>
    </div>
  );
}

export default App;
