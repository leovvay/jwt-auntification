import React from 'react';
import { Modal, Button,  Layout} from 'antd';

import SignupForm from '../signupForm'
import LoginForm from '../loginForm'

import './style.css';

const { Header } = Layout;

const ShowSignupForm = (props) => {
  Modal.info({
    title: 'This is a sign up message',
    content: (
      <SignupForm {...props}/>
    ),
    okText: 'Cancel'
  });
}

const ShowLoginForm = (props) => {
  Modal.info({
    title: 'This is a log in message',
    content: (
      <LoginForm {...props} thisModal={Modal}/>
    ),
    okText: 'Cancel'
  });
}

export default function MyHeader(props) {
const { login } = props

  return (
    <Header>
      <div className='container'>
        <div className='userInfo'>
          <span>{login}</span>
          <img src="userIcon.png" alt="user icon" />
        </div>
        <Button type="primary" onClick={ShowSignupForm.bind(null, props)} >Sign up</Button>
        <Button type="primary" onClick={ShowLoginForm.bind(null, props)} >Log in</Button>
      </div>
    </Header>
  );
}
