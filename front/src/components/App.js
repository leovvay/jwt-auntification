import React, {useEffect, useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom'

import SignupForm from './signupForm/';
import LoginForm from './loginForm/'
import RegistrationSuccess from './RegistrationSuccess';
import Page404 from './Page404/';
import Header from './header/'

import './App.css';

function App() {
  const location = useLocation();
  const [userName, setUserName] = useState('anonymous'); 

  useEffect(() => {
    const [ , token] = location.search.split('=');
    const localToken = JSON.parse(localStorage.userData).token
    if (token === localToken) {
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
      <Header userName={userName}/>
      <main className="App-header">
      <Switch>
        <Route exact path='/' component={SignupForm}/>
        <Route exact path='/login' render={() => <LoginForm setUserName={setUserName}/>}/>
        <Route exact path='/registration-success' component={RegistrationSuccess}/>
        <Route component={Page404}/>
      </Switch>

      </main>
    </div>
  );
}

export default App;
