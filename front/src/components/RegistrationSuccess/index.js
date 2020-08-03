import React from 'react';
import { Typography, Button } from 'antd';


const { Title } = Typography;

function clickHandler() {
  document.querySelector('.loginBtn').click();
}

export default function RegistrationSuccess() {
  return (
    <div>
      <Title>congratulations</Title>
      <Title level={2}>registration success</Title>
      <Title level={4}>now you need to <Button type='primary' onClick={clickHandler}>login</Button></Title>
    </div>
  );
}
