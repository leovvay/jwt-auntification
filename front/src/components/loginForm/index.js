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
    if (request.status === OK) {
      const answer = await request.json();
      if (answer) {
        localStorage.userData = JSON.stringify(answer);
      }
      if (answer.user) {
        setUserName(answer.user.login);
        setMessage({status: '', text: '',});
        console.log('thisModal: ', thisModal);
        if (thisModal) {
          thisModal.destroyAll();
        }
      }
    } else if (request.status === UNAUTHORIZED) {
      setMessage({status: 'error', 
      text: 'wrong login / password',});
    } else if (request.status === FORBIDDEN) {
      setMessage({status: 'error', 
      text: `you haven't confirmed the registration, check your e-mail`});
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
