import React from 'react';

import './style.css';

export default function Header({ userName }) {
  return (
    <header>
      <div className='container'>
        <div className='userInfo'>
          <span>{userName}</span>
          <img src="userIcon.png" alt="user icon" />
        </div>
      </div>
    
    </header>
  );
}
