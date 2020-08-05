import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import PageSignup from './pageSignup';
import PageLogin from './pageLogin';
import pageRegistrationSuccess from '../pages/pageRegistrationSuccess';
import pageWrong from '../pages/pageWrong';
import Header from '../components/header';

import './App.css';
import MyFetch from '../utils/myFetch';

const { Content } = Layout;

function App() {
  const location = useLocation();
  const [userName, setUserName] = useState('anonymous');

  useEffect(() => {
    const [, token] = location.search.split('=');
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
          <Route exact path="/" component={PageSignup} />
          <Route exact path="/login" render={() => <PageLogin setUserName={setUserName} />} />
          <Route exact path="/registration-success" component={pageRegistrationSuccess} />
          <Route component={pageWrong}/>
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
