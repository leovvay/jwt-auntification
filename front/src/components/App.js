import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import SignupForm from './signupForm';
import LoginForm from './loginForm';
import RegistrationSuccess from './RegistrationSuccess';
import Page404 from './Page404';
import Header from './header';

import './App.css';

const { Content } = Layout;

function App() {
  const location = useLocation();
  const [userName, setUserName] = useState('anonymous');

  useEffect(() => {
    const [, token] = location.search.split('=');
    if (token) {
      fetch('/user/activeUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
    }
  }, [location]);

  return (
    <Layout className="App">
      <Header userName={userName} setUserName={setUserName} />
      <Content className="App-header">
        <Switch>
          <Route exact path="/" component={SignupForm} />
          <Route exact path="/login" render={() => <LoginForm setUserName={setUserName} />} />
          <Route exact path="/registration-success" component={RegistrationSuccess} />
          <Route component={Page404}/>
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
