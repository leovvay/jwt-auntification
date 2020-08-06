import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import PageSignup from './pageSignup';
import PageLogin from './pageLogin';
import pageRegistrationSuccess from './pageRegistrationSuccess';
import pageWrong from './pageWrong';
import Header from '../components/header';
import MyFetch from '../utils/myFetch';

import './App.css';


const { Content } = Layout;


export default function App(props) {
  const { changeLogin } = props
  const location = useLocation();

  useEffect(() => {
    const [, token] = location.search.split('=');
    if (token) {
      sessionStorage.token = JSON.stringify(token);
      MyFetch('/user/activeUser', { method: 'POST' });
    }
  }, [location]);

  return (
    <Layout className="App">
      <Header {...props} />
      <Content className="App-main">
        <Switch>
          <Route exact path="/" component={PageSignup} />
          <Route exact path="/login" render={() => <PageLogin changeLogin={changeLogin} />} />
          <Route exact path="/registration-success" component={pageRegistrationSuccess} />
          <Route component={pageWrong} />
        </Switch>
      </Content>
    </Layout>
  );
}
