import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Page404() {
  return (
    <>
      <Title>404</Title>
      <Title level={4}>Something went wrong</Title>
    </>
  );
}
