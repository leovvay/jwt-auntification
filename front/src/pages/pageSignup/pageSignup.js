import React from 'react';

import SignupForm from '../../components/signupForm';

import './style.css'


export default function PageSignup(props) {
  return (
    <div className='formContainer'>
    <SignupForm {...props}/>
    </div>
  );
}
