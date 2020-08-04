import React from 'react';
import { Modal, Button,  Layout} from 'antd';

import SignupForm from '../signupForm'
import LoginForm from '../loginForm'

import './style.css';

const { Header } = Layout;

const ShowSignupForm = () => {
  Modal.info({
    title: 'This is a sign up message',
    content: (
      <SignupForm/>
    ),
    okText: 'Cancel'
  });
}

const ShowLoginForm = (event, setUserName) => {
  Modal.info({
    title: 'This is a log in message',
    content: (
      <LoginForm setUserName={setUserName} thisModal={Modal}/>
    ),
    okText: 'Cancel'
  });
}

export default function MyHeader({ userName, setUserName }) {
  return (
    <Header>
      <div className='container'>
        <div className='userInfo'>
          <span>{userName}</span>
          <img src="userIcon.png" alt="user icon" />
        </div>
        <Button type="primary" onClick={ShowSignupForm} >Sign up</Button>
        <Button type="primary" onClick={(event) => ShowLoginForm(event, setUserName)} className='loginBtn'>Log in</Button>
      </div>
    </Header>
  );
}
