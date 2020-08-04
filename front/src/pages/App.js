import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import SignupForm from '../components/signupForm';
import LoginForm from '../components/loginForm';
import pageRegistrationSuccess from '../pages/pageRegistrationSuccess';
import pageWrong from '../pages/pageWrong';
import Header from '../components/header';

import './App.css';
import MyFetch from '../utils/MyFetch';

const { Content } = Layout;

function App() {
  const location = useLocation();
  const [userName, setUserName] = useState('anonymous');

  useEffect(() => {
    const [, token] = location.search.split('=');
    console.log('token: ', token);
    if (token) {
      sessionStorage.token = JSON.stringify(token);
      MyFetch('/user/activeUser', { method: 'POST' });
    }
  }, [location]);

  return (
    <Layout className="App">
      <Header userName={userName} setUserName={setUserName} />
      <Content className="App-main">
        <Switch>
          <Route exact path="/" component={SignupForm} />
          <Route exact path="/login" render={() => <LoginForm setUserName={setUserName} />} />
          <Route exact path="/registration-success" component={pageRegistrationSuccess} />
          <Route component={pageWrong}/>
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
