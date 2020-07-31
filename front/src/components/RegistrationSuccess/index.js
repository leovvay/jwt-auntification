import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function RegistrationSuccess() {
  return (
    <div>
      <Title>congratulations</Title>
      <Title level={2}>registration success</Title>
      <Title level={4}>now you need to log in</Title>
    </div>
  );
}
