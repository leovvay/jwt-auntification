import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { OK, UNAUTHORIZED, FORBIDDEN } from '../../constants/statusCode';
import { COLOR_RED, WRONG_LOGIN_OR_PASSWORD, CHECK_EMAIL } from '../../constants/infoText';
import MyFetch from '../../utils/MyFetch';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function LoginForm({ setUserName, thisModal }) {
  const [message, setMessage] = useState({
    status: '',
    text: '',
  });

  const { status, text } = message;

  const onFinish = async (values) => {
    const request = await MyFetch('/user/login', { method: 'POST', body: JSON.stringify(values) });

    switch (request.status) {
      case OK:
        const response = await request.json();
        if (response) {
          sessionStorage.token = response.token;
          if (response.user) {
            setUserName(response.user.login);
            setMessage({ status: '', text: '' });
            if (thisModal) {
              thisModal.destroyAll();
            }
          }
        }
        break;
      case UNAUTHORIZED:
        setMessage({ status: COLOR_RED, text: WRONG_LOGIN_OR_PASSWORD });
        break;
      case FORBIDDEN:
        setMessage({
          status: COLOR_RED,
          text: CHECK_EMAIL,
        });
        break;

      default:
        break;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Login"
        name="login"
        validateStatus={status}
        placeholder="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        placeholder="password"
        validateStatus={status}
        help={text}
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
