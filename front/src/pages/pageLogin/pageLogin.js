import React from 'react';
import LoginForm from '../../components/loginForm';


export default function PageLogin(props) {
  return (
    <div className='form-container'>
      <LoginForm {...props} ></LoginForm>
    </div>
  );
}
