import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';

import Header from '../components/header';
import MyFetch from '../utils/myFetch';
import { ACTIVE_USER_PATH } from '../constants/urls';
import { LOGIN_PATH, REGISTRATION_SUCCESS_PATH } from '../constants/routerPath';

import PageSignup from './pageSignup';
import PageLogin from './pageLogin';
import pageRegistrationSuccess from './pageRegistrationSuccess';
import pageWrong from './pageWrong';

import './App.css';

const { Content } = Layout;

export default function App(props) {
  const { changeInputMessage, loginFetch, inputErrorMessage, isFetching, signupFetch, login } = props;
  const location = useLocation();

  useEffect(() => {
    const [, token] = location.search.split('=');
    if (token) {
      sessionStorage.token = token;
      MyFetch(ACTIVE_USER_PATH, { method: 'POST' });
    }
  }, [location]);

  return (
    <Layout className="App">
      <Header login={login} />
      <Content className="App-main">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PageSignup
                inputErrorMessage={inputErrorMessage}
                signupFetch={signupFetch}
                changeInputMessage={signupFetch}
              />
            )}
          />
          <Route
            exact
            path={LOGIN_PATH}
            render={() => (
              <PageLogin
                inputErrorMessage={inputErrorMessage}
                loginFetch={loginFetch}
                changeInputMessage={changeInputMessage}
                isFetching={isFetching}
              />
            )}
          />
          <Route exact path={REGISTRATION_SUCCESS_PATH} component={pageRegistrationSuccess} />
          <Route component={pageWrong} />
        </Switch>
      </Content>
    </Layout>
  );
}
