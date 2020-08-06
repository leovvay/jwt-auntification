import React from 'react';
import { Spin } from 'antd';

import LoginForm from './loginForm';

const spinForm = (props) => {
  const { isFetching } = props;
  return (
    <Spin spinning={isFetching}>
      <LoginForm {...props} />
    </Spin>
  );
};

export default spinForm;
