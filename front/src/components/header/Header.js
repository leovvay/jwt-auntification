import React from 'react';
import { Button,  Layout} from 'antd';
import { Link } from 'react-router-dom'

import {LOGIN_PATH} from '../../constants/routerPath'

import './style.css';

const { Header } = Layout;

export default function MyHeader(props) {
const { login } = props

  return (
    <Header>
      <div className='container'>
        <div className='userInfo'>
          <span>{login}</span>
          <img src="userIcon.png" alt="user icon" />
        </div>
        <Button type="primary"><Link to='/'>Sign up</Link></Button>
        <Button type="primary"><Link to={LOGIN_PATH}>Log in</Link></Button>
      </div>
    </Header>
  );
}
