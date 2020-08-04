import React from 'react';
import { Typography, } from 'antd';

import { Link } from 'react-router-dom'

const { Title } = Typography;

export default function RegistrationSuccess() {
  return (
    <>
      <Title>congratulations</Title>
      <Title level={2}>registration success</Title>
      <Title level={4}>now you need to <Link to='/login'>login</Link></Title>
    </>
  );
}
