import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { OK, UNAUTHORIZED, FORBIDDEN } from '../../constants';

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
    let request;
    try {
      request = await fetch('/user/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return console.log('fetch error', error);
    }
    switch (request.status) {
      case OK:
        const answer = await request.json();
        if (answer) {
          sessionStorage.token = answer.token;
          if (answer.user) {
            setUserName(answer.user.login);
            setMessage({ status: '', text: '' });
            if (thisModal) {
              thisModal.destroyAll();
            }
          }
        }
        break;
      case UNAUTHORIZED:
        setMessage({ status: 'error', text: 'wrong login / password' });
        break;
      case FORBIDDEN:
        setMessage({
          status: 'error',
          text: `you haven't confirmed the registration, check your e-mail`,
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
